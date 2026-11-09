require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/", rateLimit({ windowMs: 60 * 1000, limit: 20 }));

const PLANS = {
  mensal: { name: "Plano Mensal", price: 4.00, days: 30 },
  trimestral: { name: "Plano Trimestral", price: 10.00, days: 90 },
  anual: { name: "Plano Anual", price: 30.00, days: 365 }
};

app.get("/api/plans", (_req, res) => res.json(PLANS));

app.post("/api/orders", (req, res) => {
  const { plan, customerName, contact } = req.body || {};
  if (!PLANS[plan] || typeof customerName !== "string" ||
      customerName.trim().length < 2 || customerName.length > 80 ||
      typeof contact !== "string" || contact.trim().length < 3 ||
      contact.length > 120) {
    return res.status(400).json({ error: "Confira o plano e os dados informados." });
  }

  // Integração pendente: crie a cobrança PIX no provedor escolhido AQUI,
  // no servidor. Valide o webhook assinado antes de ativar qualquer hospedagem.
  // Não aceite comprovante, status ou valor enviados pelo navegador como confirmação.
  return res.status(501).json({
    error: "Checkout PIX ainda não configurado.",
    nextStep: "Conecte um provedor de pagamento e configure o webhook seguro no servidor."
  });
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`VERTEX APPLICATIONS disponível na porta ${port}`));
