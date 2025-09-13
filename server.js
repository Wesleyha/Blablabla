const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", (req, res) => {
  const question = req.body.question;
  exec(`gpt4all --model gpt4all-lora-quantized.bin --prompt "${question}" --n_predict 150`, (err, stdout) => {
    if (err) return res.json({ answer: "Erro ao gerar resposta." });
    res.json({ answer: stdout });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    if (error.code === 429) {
      res.json({ reply: "Erro: limite de requisições atingido. Tente novamente mais tarde." });
    } else if (error.code === 401) {
      res.json({ reply: "Erro: token inválido. Verifique sua chave API." });
    } else {
      res.json({ reply: "Erro ao processar a mensagem. Tente novamente." });
    }
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
