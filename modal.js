const dialog = document.getElementById("trabalheDialog");
const abrirBtn = document.getElementById("abrirDialog");
const fecharBtn = document.getElementById("fecharDialog");

// Abrir modal com animação
abrirBtn.addEventListener("click", () => {
  dialog.showModal();
  setTimeout(() => dialog.classList.add("show"), 10); // delay curto para ativar transição
});

// Fechar modal com animação
fecharBtn.addEventListener("click", () => {
  dialog.classList.remove("show");             // inicia transição de saída
  setTimeout(() => dialog.close(), 300);       // fecha depois da transição
});
