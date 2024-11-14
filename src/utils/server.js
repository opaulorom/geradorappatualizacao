const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let frases = [
  "Acredite em você mesmo!",
  "Seja a mudança que você deseja ver no mundo.",
  "O sucesso vem para aqueles que persistem.",
];

// Rota para listar frases
app.get('/frases', (req, res) => {
  res.json(frases);
});

// Rota para adicionar uma nova frase
app.post('/frases', (req, res) => {
  const { frase } = req.body;
  if (frase) {
    frases.push(frase);
    res.status(201).json({ message: 'Frase adicionada com sucesso!', frase });
  } else {
    res.status(400).json({ message: 'Frase não pode ser vazia.' });
  }
});

// Rota para remover uma frase
app.delete('/frases/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < frases.length) {
    const removed = frases.splice(index, 1);
    res.json({ message: 'Frase removida com sucesso!', removed });
  } else {
    res.status(404).json({ message: 'Frase não encontrada.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});