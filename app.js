const input = document.querySelector(".search-bar");
const botaoBuscar = document.querySelector(".search-button");
const container = document.getElementById("resultados-container");
const btnCarrinho = document.getElementById("btn-carrinho");
const painelCarrinho = document.getElementById("painel-carrinho");
const itensCarrinhoContainer = document.getElementById("itens-carrinho");
const totalCarrinhoElem = document.getElementById("total-carrinho");
const fecharCarrinhoBtn = document.getElementById("fechar-carrinho");

let carrinho = [];

function normalizeText(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarResultados(produtosEncontrados) {
  if (produtosEncontrados.length === 0) {
    container.innerHTML = `<p class="retorno">Nenhum resultado encontrado ⚠</p>`;
    return;
  }

  container.innerHTML = produtosEncontrados
    .map(
      (produto) => `
    <div class="resultado-item">
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button class="add-cart-btn" data-id="${produto.id}">Adicionar ao carrinho</button>
    </div>
  `
    )
    .join("");

  // Adiciona event listeners aos botões
  document.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      adicionarAoCarrinho(id);
    });
  });
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find((p) => p.id == id);
  if (!produto) return;

  const itemNoCarrinho = carrinho.find((item) => item.id == id);

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
  alert(`${produto.nome} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
  if (carrinho.length === 0) {
    itensCarrinhoContainer.innerHTML = "<p>Carrinho vazio.</p>";
    totalCarrinhoElem.textContent = "0.00";
    return;
  }

  itensCarrinhoContainer.innerHTML = carrinho
    .map(
      (item) => `
    <div class="item-carrinho">
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="item-carrinho-info">
        <p>${item.nome}</p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
      </div>
      <button class="botao-remover" data-id="${item.id}">&times;</button>
    </div>
  `
    )
    .join("");

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  totalCarrinhoElem.textContent = total.toFixed(2);

  // Adiciona event listener para botões remover
  document.querySelectorAll(".botao-remover").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removerDoCarrinho(id);
    });
  });

  // Atualiza contador do carrinho no botão do header
  document.getElementById("contador-carrinho").textContent = carrinho.length;
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((item) => item.id != id);
  atualizarCarrinho();
}

// Abrir e fechar painel do carrinho
btnCarrinho.addEventListener("click", () => {
  painelCarrinho.classList.toggle("oculto");
});

fecharCarrinhoBtn.addEventListener("click", () => {
  painelCarrinho.classList.add("oculto");
});

// Função de busca
botaoBuscar.addEventListener("click", () => {
  const termo = input.value.trim();

  if (!termo) {
    container.innerHTML = "<p class='retorno'>Digite algo para buscar ⚠</p>";
    return;
  }

  const resultados = produtos.filter((produto) =>
    normalizeText(produto.nome).includes(normalizeText(termo))
  );

  mostrarResultados(resultados);
});

// Exibir todos os produtos ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  mostrarResultados(produtos);
});

/* busca com enter */

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") botaoBuscar.click();
});


