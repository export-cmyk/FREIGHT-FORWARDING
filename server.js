(async () => {
  const http = await import('node:http');
  const fs = await import('node:fs');
  const path = await import('node:path');

  const root = path.join(process.cwd(), 'dist');
  const types = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain'
  };

  http.createServer((req, res) => {
    let file;
    try {
      file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    } catch { file = root; }
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(root, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  }).listen(process.env.PORT || 3000);
})();
