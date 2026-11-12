/**
 * Local Node.js Server with Supabase PostgreSQL Sync (/api/state)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { handler } = require('./netlify/functions/api');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath.startsWith('/api/') || urlPath.startsWith('/.netlify/functions/api')) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      const result = await handler({
        httpMethod: req.method,
        path: urlPath,
        body
      });
      res.writeHead(result.statusCode, result.headers);
      res.end(result.body);
    });
    return;
  }

  const safePath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 DLSO Benin Region Game Show Server running at http://localhost:${PORT}`);
});
