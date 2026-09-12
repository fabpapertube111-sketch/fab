import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Config ────────────────────────────────────────────────────────────────────
// Falls back to hardcoded values if env variables are not set.
// For production, set these in Vercel → Settings → Environment Variables.

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || 'fabpapertube111@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'bdfhzdgcsvlomfdg';
const CONTACT_TO = process.env.CONTACT_TO || 'fabpapertube111@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      product?: string;
      quantity?: string;
      message?: string;
    };

    // ── Server-side validation ──────────────────────────────────────────────
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ ok: false, message: 'Message / requirement is required.' }, { status: 400 });
    }

    // ── Create transporter ──────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // ── Build email HTML ────────────────────────────────────────────────────
    const rows = [
      ['Name',               body.name?.trim()],
      ['Phone',              body.phone?.trim()],
      ['Email',              body.email?.trim() || '—'],
      ['Company',            body.company?.trim() || '—'],
      ['Product Requirement',body.product?.trim() || '—'],
      ['Quantity',           body.quantity?.trim() || '—'],
      ['Message',            body.message?.trim()],
    ] as [string, string][];

    const tableRows = rows
      .map(([label, value]) => `
        <tr>
          <td style="padding:10px 14px;background:#f4f6fb;font-weight:700;color:#1a4a9e;font-size:13px;white-space:nowrap;border-bottom:1px solid #e8edf5;">${label}</td>
          <td style="padding:10px 14px;color:#0d1f3c;font-size:13px;border-bottom:1px solid #e8edf5;">${value}</td>
        </tr>`)
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8edf5;box-shadow:0 4px 24px rgba(26,74,158,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a4a9e,#2a5fc0);padding:28px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:900;">New Enquiry — FAB Paper Tube</h1>
      <p style="margin:6px 0 0;color:rgba(200,220,255,0.8);font-size:13px;">A new requirement has been submitted via the website contact form.</p>
    </div>
    <!-- Table -->
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e8edf5;">
        ${tableRows}
      </table>
    </div>
    <!-- Footer -->
    <div style="padding:16px 32px 24px;border-top:1px solid #e8edf5;">
      <p style="margin:0;color:#9aaacc;font-size:12px;">FAB Paper Tube · Shed No. 14, Star Gold Industrial Park, Kuha, Gujarat 382433</p>
    </div>
  </div>
</body>
</html>`;

    // ── Send email ──────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"FAB Paper Tube Website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: body.email?.trim() || SMTP_USER,
      subject: `New Enquiry from ${body.name?.trim()} — FAB Paper Tube`,
      html,
      text: rows.map(([l, v]) => `${l}: ${v}`).join('\n'),
    });

    return NextResponse.json({ ok: true, message: 'Your requirement has been sent successfully!' });

  } catch (err) {
    console.error('[contact/route] error:', err);
    return NextResponse.json(
      { ok: false, message: 'Failed to send. Please email us directly at fabpapertube111@gmail.com' },
      { status: 500 }
    );
  }
}
