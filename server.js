import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste do chatbot
app.post("/chat", (req, res) => {
  const { message } = req.body;
  
  // Aqui você pode colocar integração real com OpenAI depois
  // Por enquanto responde fixo para teste
  res.json({ reply: "Oi! Recebi sua mensagem: " + message });
});

// Porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} (usando Render)`);
});
