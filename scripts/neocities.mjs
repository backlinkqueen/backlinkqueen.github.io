// Đẩy toàn bộ dist/ lên Neocities qua API (key trong .env.deploy: NEOCITIES_API_KEY)
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const KEY = process.env.NEOCITIES_API_KEY;
if (!KEY) throw new Error('Thiếu NEOCITIES_API_KEY (chạy qua: node --env-file=.env.deploy scripts/neocities.mjs)');
const DIST = path.resolve('dist');
const H = { Authorization: `Bearer ${KEY}` };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}

const info = await (await fetch('https://neocities.org/api/info', { headers: H })).json();
if (info.result !== 'success') throw new Error('Neocities: ' + JSON.stringify(info));
const site = info.info.sitename;

const form = new FormData();
for (const f of await walk(DIST)) {
  const rel = path.relative(DIST, f).split(path.sep).join('/');
  form.append(rel, new Blob([await readFile(f)]), path.basename(f));
}
const r = await (await fetch('https://neocities.org/api/upload', { method: 'POST', headers: H, body: form })).json();
if (r.result !== 'success') throw new Error('Upload lỗi: ' + JSON.stringify(r));
console.log(`Đã đẩy lên https://${site}.neocities.org`);
