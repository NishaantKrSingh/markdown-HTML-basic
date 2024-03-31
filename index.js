const showdown  = require('showdown')
const http = require('http');
const fs = require('fs');
const path = require('path');

converter = new showdown.Converter();

// const content = fs.readSync('/readme.md') 
 fs.readFile(path.join(__dirname, 'readme.md'), 'utf8', (err, data) => {
      const content = data
    //   console.log(content);
      html = converter.makeHtml(content);
})





const server = http.createServer((req, res) => {
  // Check if the requested URL is "/"
  if (req.url === '/') {
    // Read the HTML file
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // Modify the HTML content
        const modifiedData = data.replace('<body>', '<body>'+ html);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(modifiedData);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

