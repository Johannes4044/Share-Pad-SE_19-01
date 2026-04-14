require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Pad = require('./models/Pad');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not set. Add it to .env (local) or the Render environment.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Home
app.get('/', (req, res) => res.render('index'));

// About
app.get('/about', (req, res) => res.render('about'));

// READ 
app.get('/:padName', async (req, res) => {
  const pad = await Pad.findOne({ name: req.params.padName });
  res.render('pad', {
    pad: pad || { name: req.params.padName, content: '' },
    isNew: !pad
  });
});

// CREATE / UPDATE 
app.post('/:padName', async (req, res) => {
  await Pad.findOneAndUpdate(
    { name: req.params.padName },
    { name: req.params.padName, content: req.body.content },
    { upsert: true }
  );
  res.redirect('/' + req.params.padName);
});

// DELETE 
app.post('/:padName/delete', async (req, res) => {
  await Pad.findOneAndDelete({ name: req.params.padName });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));