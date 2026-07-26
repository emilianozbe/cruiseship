const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.')); // serwuje Twoje pliki HTML, CSS, JS

// SAVE REVIEW
app.post('/add-opinion', (req, res) => {
  const newOpinion = req.body;

  // Wczytaj istniejące opinie
  const data = JSON.parse(fs.readFileSync('opinions.json', 'utf8'));

  // Dodaj nową
  data.push(newOpinion);

  // Zapisz z powrotem
  fs.writeFileSync('opinions.json', JSON.stringify(data, null, 2));

  res.json({ status: "ok" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
