let frases = [
    "Acredite em você mesmo!",
    "Seja a mudança que você deseja ver no mundo.",
    "O sucesso vem para aqueles que persistem.",

  ];
  
  // Função para lidar com as requisições
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Retornar a lista de frases
      res.status(200).json(frases);
    } else if (req.method === 'POST') {
      // Adicionar uma nova frase
      const { frase } = req.body;
      if (frase) {
        frases.push(frase);
        res.status(201).json({ message: 'Frase adicionada com sucesso!', frase });
      } else {
        res.status(400).json({ message: 'Frase não pode ser vazia.' });
      }
    } else if (req.method === 'DELETE') {
      // Remover uma frase
      const { index } = req.body;
      if (index >= 0 && index < frases.length) {
        const removed = frases.splice(index, 1);
        res.status(200).json({ message: 'Frase removida com sucesso!', removed });
      } else {
        res.status(404).json({ message: 'Frase não encontrada.' });
      }
    } else {
      // Método não permitido
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  }