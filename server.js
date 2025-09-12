import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// Permite qualquer site acessar (CORS)
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Cliente OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint do chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Mensagem vazia" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // ou gpt-4 se tiver acesso
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    // Log detalhado para o Render
    console.error("🚨 ERRO COMPLETO DA API OPENAI 🚨");
    console.error(error);

    // Mensagem genérica para o frontend
    res.status(500).json({ reply: "Erro ao processar mensagem. Verifique os logs do backend." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    console.error("🚨 ERRO COMPLETO DA API OPENAI 🚨");
    console.error(error);

    // Mensagem genérica para o frontend
    res.status(500).json({ reply: "Erro ao processar mensagem. Verifique os logs do backend." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
