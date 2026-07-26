const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// STRONA GŁÓWNA
// Wyświetla home.html bez zmiany adresu na /home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// ZAPISYWANIE OPINII
app.post('/add-opinion', (req, res) => {
  const newOpinion = req.body;
  const opinionsPath = path.join(__dirname, 'opinions.json');

  // Wczytaj istniejące opinie
  const data = JSON.parse(
    fs.readFileSync(opinionsPath, 'utf8')
  );

  // Dodaj nową opinię
  data.push(newOpinion);

  // Zapisz opinie
  fs.writeFileSync(
    opinionsPath,
    JSON.stringify(data, null, 2)
  );

  res.json({ status: 'ok' });
});

// URUCHOMIENIE SERWERA
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
