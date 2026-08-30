import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = 'https://dev-fab-paper-tube.pantheonsite.io';
const FORM_ID_MAIN = 1144;

// Exact option values as configured in the CF7 form on WordPress
// (must match exactly — CF7 select validation rejects any unlisted value)
const CF7_PRODUCT_OPTIONS = new Set([
  'White Sewing Thread Paper Tube',
  'Brown Notebook Cover Paper Tube',
  'Birthday Cake Sparkle Candle Tube',
  'Selfie Stick Pencil Crackers',
  'Butterfly Firecracker Tube',
  'Thermal Roll Paper Tube',
  'Mirchi Bomb Paper Tube',
  'Stretch Film Roll Paper Tube',
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string;
      email?: string;
      phone: string;
      company?: string;
      product?: string;
      quantity?: string;
      message: string;
      formId?: number;
    };

    // Server-side validation
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ ok: false, message: 'Message / requirement is required.' }, { status: 400 });
    }

    const formId = body.formId ?? FORM_ID_MAIN;

    // CF7 REST API requires multipart/form-data — use FormData
    const fd = new FormData();
    fd.append('your-name',        body.name.trim());
    fd.append('your-company',     body.company?.trim() ?? '');
    fd.append('your-phone',       body.phone.trim());
    fd.append('your-email',       body.email?.trim() ?? '');
    fd.append('product-type',     CF7_PRODUCT_OPTIONS.has(body.product?.trim() ?? '') ? (body.product?.trim() ?? '') : '');
    // CF7 quantity field is type="number" with min=1 — extract number, floor to minimum of 1
    const rawQty = body.quantity?.trim() ?? '';
    const parsedQty = parseFloat(rawQty.match(/\d+(\.\d+)?/)?.[0] ?? '0');
    const numericQty = parsedQty >= 1 ? String(Math.round(parsedQty)) : rawQty ? '1' : '';
    fd.append('quantity',         numericQty);
    fd.append('your-requirement', body.message.trim());
    // CF7 unit tag — p1 is a safe generic value; p0 causes validation failures on some CF7 builds
    fd.append('_wpcf7_unit_tag',  `wpcf7-f${formId}-p1-o1`);

    const cf7Url = `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

    const cf7Res = await fetch(cf7Url, {
      method: 'POST',
      body: fd,
      // Do NOT set Content-Type manually — fetch sets it with the correct multipart boundary
    });

    const cf7Data = await cf7Res.json() as { status: string; message: string; invalid_fields?: { field: string; message: string }[] };

    // mail_sent_but_failed = form data valid, email failed (server mail config) — treat as success
    if (cf7Data.status === 'mail_sent' || cf7Data.status === 'mail_sent_but_failed') {
      return NextResponse.json({ ok: true, message: cf7Data.message });
    }

    // Log the actual CF7 error for debugging
    console.error('[CF7] submission failed:', JSON.stringify(cf7Data));

    // Surface CF7 invalid field details if available
    const detail = cf7Data.invalid_fields?.map(f => `${f.field}: ${f.message}`).join('; ');
    return NextResponse.json(
      { ok: false, message: detail || cf7Data.message || 'Submission failed. Please try again.' },
      { status: 422 }
    );

  } catch (err) {
    console.error('[contact/route] error:', err);
    return NextResponse.json(
      { ok: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
