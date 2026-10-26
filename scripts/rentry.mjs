// Tạo/cập nhật trang rentry.co/backlinkqueen (không cần tài khoản; sửa bằng RENTRY_EDIT_CODE trong .env.deploy)
import { randomBytes } from 'node:crypto';
import { markdown } from './links.mjs';

const BASE = 'https://rentry.co';
const SLUG = process.env.RENTRY_URL || 'backlinkqueen';

const home = await fetch(BASE + '/');
const cookie = (home.headers.getSetCookie?.() || []).map(c => c.split(';')[0]).join('; ');
const csrf = (cookie.match(/csrftoken=([^;]+)/) || [])[1];
if (!csrf) throw new Error('Không lấy được csrftoken từ rentry.co');

const editCode = process.env.RENTRY_EDIT_CODE;
const form = new URLSearchParams({ csrfmiddlewaretoken: csrf, text: markdown() });
let endpoint;
if (editCode) { endpoint = `${BASE}/api/edit/${SLUG}`; form.set('edit_code', editCode); }
else { endpoint = `${BASE}/api/new`; form.set('url', SLUG); form.set('edit_code', randomBytes(9).toString('base64url')); }

const r = await fetch(endpoint, { method: 'POST', headers: { Cookie: cookie, Referer: BASE, 'Content-Type': 'application/x-www-form-urlencoded' }, body: form });
const j = await r.json().catch(() => ({ status: String(r.status) }));
if (String(j.status) !== '200') throw new Error('Rentry: ' + JSON.stringify(j));
console.log(editCode ? `${BASE}/${SLUG}` : j.url);
if (!editCode) console.log(`RENTRY_EDIT_CODE=${j.edit_code || form.get('edit_code')}`);
