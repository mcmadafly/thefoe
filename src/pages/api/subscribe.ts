import type { APIRoute } from 'astro';
import { BEEHIIV } from '../../config';

// Runs on-demand in the Cloudflare Worker (not prerendered) so the Beehiiv API
// key stays server-side. The browser POSTs { email } here and we forward the
// signup to Beehiiv — the visitor never leaves the site.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, locals }) => {
  // Beehiiv API key: a Worker secret in prod, .dev.vars locally.
  const env = (locals as any)?.runtime?.env ?? {};
  const apiKey: string | undefined =
    env.BEEHIIV_API_KEY ?? import.meta.env.BEEHIIV_API_KEY;

  if (!apiKey) {
    return json({ ok: false, error: 'Newsletter signup is not configured.' }, 500);
  }

  let email = '';
  try {
    const ct = request.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      email = String((await request.json())?.email ?? '').trim();
    } else {
      email = String((await request.formData()).get('email') ?? '').trim();
    }
  } catch {
    return json({ ok: false, error: 'Could not read your request.' }, 400);
  }

  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV.publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'thefoe.dev',
          utm_medium: 'organic',
          referring_site: 'thefoe.dev',
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('Beehiiv subscribe failed', res.status, detail);
      return json(
        { ok: false, error: 'Something went wrong. Please try again.' },
        502
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Beehiiv subscribe error', err);
    return json({ ok: false, error: 'Something went wrong. Please try again.' }, 502);
  }
};
