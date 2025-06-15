const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5000;
const basePath = path.join(__dirname, 'files');

if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && pathname === '/create') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const { filename, content } = JSON.parse(body);
      const filePath = path.join(basePath, filename);
      fs.writeFile(filePath, content, err => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: err ? 'Error writing file' : 'File created!' }));
      });
    });
    return;
  }

  if (req.method === 'GET' && pathname === '/read') {
    const filePath = path.join(basePath, query.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ content: err ? 'File not found' : data }));
    });
    return;
  }

  if (req.method === 'DELETE' && pathname === '/delete') {
    const filePath = path.join(basePath, query.filename);
    fs.unlink(filePath, err => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: err ? 'File delete failed' : 'File deleted!' }));
    });
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
