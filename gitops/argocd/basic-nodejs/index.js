import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Current version: v2.0.0');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});