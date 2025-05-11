const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const dirPath = path.join(__dirname, 'public', 'screenshots');
  const images = fs.existsSync(dirPath) ? fs.readdirSync(dirPath).reverse() : [];
  let html = '<h1>YouTube Screenshot History</h1>';
  images.forEach(file => {
    html += `<div><p>${file}</p><img src="/screenshots/${file}" width="400"/></div>`;
  });
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));