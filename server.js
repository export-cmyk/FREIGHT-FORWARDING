(async () => {
  const http = await import('node:http');
  const fs = await import('node:fs');
  const path = await import('node:path');

  const root = path.join(process.cwd(), 'dist');
  const indexFile = path.join(root, 'index.html');
  const port = process.env.PORT || 3000;

  const types = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain'
  };

  if (!fs.existsSync(indexFile)) {
    console.error('dist/index.html not found at ' + root + ' - the build step ("npm run build") has not run or has failed.');
  }

  http.createServer((req, res) => {
    let file;
    try {
      file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    } catch {
      file = indexFile;
    }

    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = indexFile;
    }

    if (!fs.existsSync(file)) {
      res.writeHead(503, { 'Content-Type': 'text/plain' });
      res.end('Website not built yet: dist/index.html is missing. Check the build command in Hostinger.');
      return;
    }

    const stream = fs.createReadStream(file);
    stream.on('open', () => {
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      stream.pipe(res);
    });
    stream.on('error', (err) => {
      console.error('Could not read ' + file + ': ' + err.message);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
    });
  }).listen(port, () => {
    console.log('Freightree site running on port ' + port);
  });
})();
