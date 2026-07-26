const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// STRONA GŁÓWNA
app.get('/', (req, res) => {
  res.redirect('/home.html');
});

// ZAPISYWANIE OPINII
app.post('/add-opinion', (req, res) => {
  const newOpinion = req.body;

  // Wczytaj istniejące opinie
  const data = JSON.parse(
    fs.readFileSync('opinions.json', 'utf8')
  );

  // Dodaj nową opinię
  data.push(newOpinion);

  // Zapisz opinie
  fs.writeFileSync(
    'opinions.json',
    JSON.stringify(data, null, 2)
  );

  res.json({ status: 'ok' });
});

// URUCHOMIENIE SERWERA
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
