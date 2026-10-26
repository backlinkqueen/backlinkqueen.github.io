// Danh sách link deploy dùng chung cho các trang giới thiệu (Telegraph, Rentry, Gist)
export const LINKS = [
  ['Firebase Hosting', 'https://backlinkqueen.web.app'],
  ['Cloudflare Pages', 'https://backlinkqueen.pages.dev'],
  ['Cloudflare Workers', 'https://backlinkqueen.wresunny.workers.dev'],
  ['Cloudflare R2', 'https://pub-845ab148551d4b6187f44892f1e8e63c.r2.dev/index.html'],
  ['AWS S3', 'http://backlinkqueen.s3-website.us-east-2.amazonaws.com'],
  ['Bunny CDN', 'https://backlinkqueen.b-cdn.net'],
  ['Netlify', 'https://backlinkqueen.netlify.app'],
  ['Vercel', 'https://backlinkqueen-beta.vercel.app'],
  ['GitHub Pages', 'https://backlinkqueen.github.io/'],
  ['GitLab Pages', 'https://backlinkqueen-fd9b34.gitlab.io'],
  ['Render', 'https://backlinkqueen.onrender.com'],
  ['Surge', 'https://backlinkqueen.surge.sh'],
  ['Neocities', 'https://backlinkqueen.neocities.org'],
  ['Bitbucket Cloud', 'https://backlinkqueen.bitbucket.io'],
  ['Hugging Face Spaces', 'https://backlinkqueen-backlinkqueen.static.hf.space'],
  ['Tencent EdgeOne', 'https://backlinkqueen.edgeone.dev'],
  ['Appwrite Sites', 'https://backlinkqueen.appwrite.network'],
];

export const INTRO = 'Backlink Queen là một trang web tĩnh nhỏ (Vite), cùng một bản build được đăng lên nhiều dịch vụ hosting miễn phí.';

export function markdown(title = 'Backlink Queen') {
  return `# ${title}\n\n${INTRO}\n\n## Các bản đang chạy\n\n${LINKS.map(([n, u]) => `- **${n}:** [${u}](${u})`).join('\n')}\n`;
}
