import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = 'https://dev-fab-paper-tube.pantheonsite.io';
const FORM_ID_MAIN = 1144;

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

    // Field names EXACTLY as shown in WP CF7 Mail tab:
    // [your-name] [your-company] [your-phone] [your-email] [product-type] [quantity] [your-requirement]
    const fd = new FormData();
    fd.append('your-name',        body.name.trim());
    fd.append('your-company',     body.company?.trim() ?? '');
    fd.append('your-phone',       body.phone.trim());
    fd.append('your-email',       body.email?.trim() ?? '');
    fd.append('product-type',     body.product?.trim() ?? '');

    // CF7 quantity field is type="number" — extract numeric value from strings like "1 Ton", "50 Ton"
    const rawQty = body.quantity?.trim() ?? '';
    const numericQty = rawQty ? (rawQty.match(/\d+/)?.[0] ?? '1') : '';
    fd.append('quantity', numericQty);
    fd.append('your-requirement', body.message.trim());

    // Required CF7 unit tag
    fd.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

    const cf7Url = `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

    const cf7Res = await fetch(cf7Url, {
      method: 'POST',
      body: fd,
    });

    const cf7Data = await cf7Res.json() as { status: string; message: string };

    // mail_sent_but_failed = form data is valid, email failed due to server mail config
    if (cf7Data.status === 'mail_sent' || cf7Data.status === 'mail_sent_but_failed') {
      return NextResponse.json({ ok: true, message: cf7Data.message });
    }

    // Log the actual CF7 error for debugging
    console.error('[CF7] submission failed:', JSON.stringify(cf7Data));
    return NextResponse.json(
      { ok: false, message: cf7Data.message || 'Submission failed. Please try again.' },
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
