/* transição de página */
document.querySelectorAll('a.link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault(); // não troca ainda
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location = a.href; // troca depois da animação
    }, 500); // tempo igual ao transition
  });
});
