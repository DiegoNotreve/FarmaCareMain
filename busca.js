function renderizarProdutos(lista) {
  const container = document.getElementById("resultados-pesquisa");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  lista.forEach(produto => {
    const cardHTML = `
      <div class="item-resultado">
        <div class="container-card">
          <div class="imagem-card">
            <img src="${produto.imagem}" alt="${produto.nome}" />
          </div>
          <div class="texto-card">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <span class="preco">${produto.preco}</span>
            <button class="adicionar-carrinho">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>`;
    container.innerHTML += cardHTML;
  });
}

function pesquisar() {
  const termo = document.getElementById("campo-pesquisa").value.toLowerCase().trim();

  if (termo === "") {
    // Volta para produtos em destaque
    renderizarProdutos(dados.slice(0, 4));
    return;
  }

  const resultados = dados.filter(produto =>
    produto.nome.toLowerCase().includes(termo)
  );
  renderizarProdutos(resultados);
}

// Executa busca ao apertar Enter no campo
document.getElementById("campo-pesquisa").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    pesquisar();
  }
});

// Mostra 4 produtos de destaque ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos(dados.slice(0, 4));
});
