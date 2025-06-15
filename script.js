document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DE SCROLL SUAVE PARA TODOS OS LINKS DE NAVEGAÇÃO ---
  // Seleciona todos os links que apontam para uma âncora (#)
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href');
      const targetSection = document.querySelector(id);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Garante que o topo da seção alinhe com o topo da tela
        });
      }
    });
  });

  // --- LÓGICA DE SCROLLSPY PARA MARCAR O LINK ATIVO NO MENU ---
  const secoes = document.querySelectorAll('section[id]');
  const linksMenu = document.querySelectorAll('nav a.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const linkAtivo = document.querySelector(`nav a[href="#${id}"]`);
        
        // Remove a classe 'ativo' de todos os links
        linksMenu.forEach(l => l.classList.remove('ativo'));
        
        // Adiciona a classe 'ativo' apenas ao link correspondente
        if (linkAtivo) {
          linkAtivo.classList.add('ativo');
        }
      }
    });
  }, {
    // Ativa quando 50% da seção está no meio da tela
    rootMargin: '-50% 0px -50% 0px' 
  });

  secoes.forEach(secao => observer.observe(secao));


  // --- CARROSSEL DE HABILIDADES COM SCROLL INFINITO ---
  const carousel = document.getElementById('habilidades-carousel');
  
  // Boa prática: verificar se o elemento existe antes de executar o código
  if (carousel) { 
    let isPaused = false;

    // Duplica os itens para criar o efeito de loop contínuo
    carousel.innerHTML += carousel.innerHTML;

    function animateScroll() {
      if (!isPaused) {
        // Se o scroll passar da metade (onde começam os itens duplicados), reseta para o início
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1; // Ajuste a velocidade do scroll aqui
        }
      }
      // Continua a animação no próximo frame
      requestAnimationFrame(animateScroll);
    }

    // Pausa a animação quando o mouse está sobre o carrossel
    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);

    // Inicia a animação
    requestAnimationFrame(animateScroll);
  }
});