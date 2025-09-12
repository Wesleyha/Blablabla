import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota para o chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ reply: "Mensagem vazia não é permitida." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente especializado em racismo ambiental." },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);

    // Tratamento de erros
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
