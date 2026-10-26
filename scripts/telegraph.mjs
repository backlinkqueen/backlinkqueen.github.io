// Tạo/cập nhật trang Telegraph liệt kê các link deploy.
// Lần đầu: tạo tài khoản + trang, in TELEGRAPH_TOKEN / TELEGRAPH_PATH để lưu vào .env.deploy.
// Lần sau (đã có 2 biến đó): sửa lại đúng trang cũ.
const API = 'https://api.telegra.ph';
const LINKS = [
  ['Firebase Hosting', 'https://backlinkqueen.web.app'],
  ['Cloudflare Pages', 'https://backlinkqueen.pages.dev'],
  ['Cloudflare R2', 'https://pub-845ab148551d4b6187f44892f1e8e63c.r2.dev/index.html'],
  ['AWS S3', 'http://backlinkqueen.s3-website.us-east-2.amazonaws.com'],
  ['Netlify', 'https://backlinkqueen.netlify.app'],
  ['Vercel', 'https://backlinkqueen-beta.vercel.app'],
  ['GitHub Pages', 'https://backlinkqueen.github.io/'],
  ['GitLab Pages', 'https://backlinkqueen-fd9b34.gitlab.io'],
  ['Render', 'https://backlinkqueen.onrender.com'],
  ['Surge', 'https://backlinkqueen.surge.sh'],
  ['Neocities', 'https://backlinkqueen.neocities.org'],
];

async function call(method, params) {
  const r = await fetch(`${API}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) });
  const j = await r.json();
  if (!j.ok) throw new Error(`${method}: ${j.error}`);
  return j.result;
}

const content = [
  { tag: 'p', children: ['Backlink Queen là một trang web tĩnh nhỏ (Vite), cùng một bản build được đăng lên nhiều dịch vụ hosting miễn phí.'] },
  { tag: 'h4', children: ['Các bản đang chạy'] },
  { tag: 'ul', children: LINKS.map(([name, url]) => ({ tag: 'li', children: [`${name}: `, { tag: 'a', attrs: { href: url }, children: [url] }] })) },
];

let token = process.env.TELEGRAPH_TOKEN;
let path = process.env.TELEGRAPH_PATH;
if (!token) {
  const acc = await call('createAccount', { short_name: 'backlinkqueen', author_name: 'Backlink Queen', author_url: 'https://backlinkqueen.github.io/' });
  token = acc.access_token;
}
const page = path
  ? await call(`editPage/${path}`, { access_token: token, title: 'Backlink Queen', author_name: 'Backlink Queen', author_url: 'https://backlinkqueen.github.io/', content })
  : await call('createPage', { access_token: token, title: 'Backlink Queen', author_name: 'Backlink Queen', author_url: 'https://backlinkqueen.github.io/', content });
console.log(page.url);
if (!process.env.TELEGRAPH_TOKEN) console.log(`TELEGRAPH_TOKEN=${token}\nTELEGRAPH_PATH=${page.path}`);
