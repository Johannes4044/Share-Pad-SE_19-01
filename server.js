const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Home route hit');
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/:padName', (req, res) => {
  console.log('Dynamic route hit:', req.params.padName);
  res.sendFile(path.join(__dirname, 'views', 'pad.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});