import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Configura a OpenAI com a variável de ambiente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota do chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Não recebi nenhuma mensagem." });
    }

    // Chamada à API da OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ou "gpt-4" se disponível
      messages: [
        { role: "system", content: "Você é um assistente educacional sobre racismo ambiental." },
        { role: "user", content: message }
      ]
    });

    const botReply = completion.choices[0].message.content;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ reply: "Desculpe, houve um erro no servidor." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
