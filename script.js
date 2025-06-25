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
        if (linkAtivo) linkAtivo.classList.add('ativo');
      }
    });
  }, {
    rootMargin: '-50% 0px -50% 0px'
  });

  secoes.forEach(secao => observer.observe(secao));

  const carousel = document.getElementById('habilidades-carousel');

  if (carousel) {
    let isPaused = false;

    const originalItems = carousel.querySelectorAll('.carousel-item');
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      carousel.appendChild(clone);
    });

    const scrollStep = 2;
    const scrollInterval = 20;

    const scrollLoop = setInterval(() => {
      if (!isPaused) {
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += scrollStep;
        }
      }
    }, scrollInterval);

    carousel.addEventListener('mouseenter', () => isPaused = true);
    carousel.addEventListener('mouseleave', () => isPaused = false);
  }

  const projetosGrid = document.querySelector('.projetos-grid');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (projetosGrid && prevBtn && nextBtn) {
    const updateArrowState = () => {
      const scrollLeft = projetosGrid.scrollLeft;
      const maxScrollLeft = projetosGrid.scrollWidth - projetosGrid.clientWidth;

      const isPrevDisabled = scrollLeft <= 0;
      const isNextDisabled = scrollLeft >= maxScrollLeft - 1;

      prevBtn.disabled = isPrevDisabled;
      nextBtn.disabled = isNextDisabled;

      prevBtn.setAttribute('aria-disabled', isPrevDisabled.toString());
      nextBtn.setAttribute('aria-disabled', isNextDisabled.toString());

      prevBtn.style.cursor = isPrevDisabled ? 'not-allowed' : 'pointer';
      nextBtn.style.cursor = isNextDisabled ? 'not-allowed' : 'pointer';

      prevBtn.style.opacity = isPrevDisabled ? '0.5' : '1';
      nextBtn.style.opacity = isNextDisabled ? '0.5' : '1';
    };

    nextBtn.addEventListener('click', () => {
      const firstCard = projetosGrid.querySelector('.projeto-card');
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(projetosGrid).gap);
      projetosGrid.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      const firstCard = projetosGrid.querySelector('.projeto-card');
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(projetosGrid).gap);
      projetosGrid.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });

    projetosGrid.addEventListener('scroll', updateArrowState);
    updateArrowState();
  }

});
