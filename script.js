document.addEventListener('DOMContentLoaded', () => {


  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href');
      const targetSection = document.querySelector(id);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start' 
        });
      }
    });
  });

  const secoes = document.querySelectorAll('section[id]');
  const linksMenu = document.querySelectorAll('nav a.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const linkAtivo = document.querySelector(`nav a[href="#${id}"]`);
        
        linksMenu.forEach(l => l.classList.remove('ativo'));
         
        if (linkAtivo) {
          linkAtivo.classList.add('ativo');
        }
      }
    });
  }, {
  
    rootMargin: '-50% 0px -50% 0px' 
  });

  secoes.forEach(secao => observer.observe(secao));

  const carousel = document.getElementById('habilidades-carousel');
  
  if (carousel) { 
    let isPaused = false;

    carousel.innerHTML += carousel.innerHTML;

    function animateScroll() {
      if (!isPaused) {
     
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1; 
        }
      }
     
      requestAnimationFrame(animateScroll);
    }

    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);

    requestAnimationFrame(animateScroll);
  }
});