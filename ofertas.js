    const tabs = document.querySelectorAll(".tab-btn");
    const carousels = document.querySelectorAll(".carousel");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // remove active de todos os botões
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // troca os carrosseis
        const target = tab.getAttribute("data-target");
        carousels.forEach(c => {
          c.classList.remove("active");
          if (c.id === target) c.classList.add("active");
        });
      });
    });