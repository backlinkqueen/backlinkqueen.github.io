import { defineConfig } from 'vite';

export default defineConfig({
  // Đường dẫn tương đối: chạy được cả ở gốc domain lẫn thư mục con (github.io/<repo>/, gitlab.io/<repo>/)
  base: './',
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
});
