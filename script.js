document.addEventListener('DOMContentLoaded', function () {

  // ── Typewriter Effect ────────────────────────────────────────────────────
  const typewriterElement = document.querySelector('.typewriter span');
  if (typewriterElement) {
    const fullText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < fullText.length) {
        typewriterElement.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }
    setTimeout(typeWriter, 900);
  }

  // ── Navbar: scroll state ─────────────────────────────────────────────────
  const header = document.querySelector('header');

  function updateNavbar() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ── Back-to-Top Button ───────────────────────────────────────────────────
  const backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    }, { passive: true });

    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll-Reveal Animations ─────────────────────────────────────────────
  const fadeElements = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ── Theme Switcher ────────────────────────────────────────────────────────
  const themeButtons = document.querySelectorAll('.theme-btn');
  const body = document.body;

  themeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const theme = this.getAttribute('data-theme');
      body.setAttribute('data-theme', theme);
      themeButtons.forEach(function (btn) { btn.classList.remove('active'); });
      this.classList.add('active');
      localStorage.setItem('theme', theme);
    });
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
    });
  }

  // ── Projects Carousel ─────────────────────────────────────────────────────
  const projectTrack = document.querySelector('.project-track');
  const projectSlides = document.querySelectorAll('.project-slide');
  const nextButton = document.querySelector('.carousel-button--right');
  const prevButton = document.querySelector('.carousel-button--left');

  if (projectTrack && projectSlides.length && nextButton && prevButton) {
    let currentIndex = 0;

    function getSlidesToShow() {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const slidesToShow = getSlidesToShow();
      const slideWidth = projectSlides[0].offsetWidth;
      projectTrack.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= projectSlides.length - slidesToShow;
      prevButton.style.opacity = currentIndex === 0 ? '0.4' : '1';
      nextButton.style.opacity = currentIndex >= projectSlides.length - slidesToShow ? '0.4' : '1';
    }

    nextButton.addEventListener('click', function () {
      const slidesToShow = getSlidesToShow();
      if (currentIndex < projectSlides.length - slidesToShow) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevButton.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    window.addEventListener('resize', function () {
      const slidesToShow = getSlidesToShow();
      if (currentIndex > projectSlides.length - slidesToShow) {
        currentIndex = Math.max(0, projectSlides.length - slidesToShow);
      }
      updateCarousel();
    });

    updateCarousel();
  }
});
