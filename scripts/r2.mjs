// Đẩy toàn bộ dist/ lên bucket R2 (wrangler, đã login). r2.dev KHÔNG tự trả index.html ở "/"
// -> mở trang qua https://pub-<id>.r2.dev/index.html
import { readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const BUCKET = process.env.R2_BUCKET || 'backlinkqueen';
const DIST = path.resolve('dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p)); else out.push(p);
  }
  return out;
}

const wrangler = path.resolve('node_modules', 'wrangler', 'bin', 'wrangler.js');
for (const f of await walk(DIST)) {
  const key = path.relative(DIST, f).split(path.sep).join('/');
  const type = TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream';
  execFileSync(process.execPath, [wrangler, 'r2', 'object', 'put', `${BUCKET}/${key}`, '--file', f, '--content-type', type, '--cache-control', 'no-cache', '--remote'], { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log('↑', key);
}
console.log(`Xong: bucket ${BUCKET}`);
