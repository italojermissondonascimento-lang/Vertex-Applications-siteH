const plans = {
  mensal: { name: "Plano Mensal", price: "R$ 4,00", days: 30 },
  trimestral: { name: "Plano Trimestral", price: "R$ 10,00", days: 90 },
  anual: { name: "Plano Anual", price: "R$ 30,00", days: 365 }
};
const dialog = document.querySelector("#checkout");
const form = document.querySelector("#checkout-form");
let selectedPlan = null;
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    selectedPlan = button.dataset.plan;
    document.querySelector("#chosen-plan").textContent = plans[selectedPlan].name;
    document.querySelector("#chosen-price").textContent = `${plans[selectedPlan].price} · ${plans[selectedPlan].days} dias`;
    document.querySelector("#form-message").textContent = "";
    dialog.showModal();
  });
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
form.addEventListener("submit", async event => {
  event.preventDefault();
  const message = document.querySelector("#form-message");
  const data = Object.fromEntries(new FormData(form));
  message.textContent = "Enviando solicitação...";
  try {
    const response = await fetch("/api/orders", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, plan: selectedPlan })
    });
    const result = await response.json();
    message.textContent = result.error || "Solicitação recebida.";
  } catch {
    message.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde.";
  }
});

const copyPixButton = document.querySelector("#copy-pix");
if (copyPixButton) {
  copyPixButton.addEventListener("click", async () => {
    const key = document.querySelector("#pix-key").textContent.trim();
    const status = document.querySelector("#pix-copy-status");
    try {
      await navigator.clipboard.writeText(key);
      status.textContent = "Chave PIX copiada.";
    } catch {
      status.textContent = "Não foi possível copiar automaticamente. Selecione e copie a chave.";
    }
  });
}
