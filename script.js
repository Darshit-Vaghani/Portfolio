
    // Typewriter Effect
    document.addEventListener('DOMContentLoaded', function() {
      const typewriterElement = document.querySelector('.typewriter span');
      const text = typewriterElement.textContent;
      typewriterElement.textContent = '';
      
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          typewriterElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
      
      setTimeout(typeWriter, 1000);
      
      // Back to Top Button
      const backToTopButton = document.querySelector('.back-to-top');
      
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('active');
        } else {
          backToTopButton.classList.remove('active');
        }
      });
      
      backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
      
      // Navbar background on scroll
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          document.querySelector('header').style.background = 'rgba(18, 18, 18, 0.95)';
          document.querySelector('header').style.backdropFilter = 'blur(10px)';
        } else {
          document.querySelector('header').style.background = 'var(--dark)';
          document.querySelector('header').style.backdropFilter = 'none';
        }
      });
      
      // Animation on scroll
      const fadeElements = document.querySelectorAll('.fade-in-up');
      
      const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
      
      // Set initial state
      fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      });
      
      window.addEventListener('scroll', fadeInOnScroll);
      fadeInOnScroll(); // Check on load
      
      // Theme Switcher
      const themeButtons = document.querySelectorAll('.theme-btn');
      const body = document.body;
      
      themeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const theme = this.getAttribute('data-theme');
          body.setAttribute('data-theme', theme);
          
          // Update active button
          themeButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Save theme preference
          localStorage.setItem('theme', theme);
        });
      });
      
      // Load saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeButtons.forEach(btn => {
          btn.classList.remove('active');
          if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
          }
        });
      }
      
      // Projects Carousel
      const projectTrack = document.querySelector('.project-track');
      const projectSlides = document.querySelectorAll('.project-slide');
      const nextButton = document.querySelector('.carousel-button--right');
      const prevButton = document.querySelector('.carousel-button--left');
      
      let currentIndex = 0;
      const slidesToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      
      function updateCarousel() {
        const slideWidth = projectSlides[0].offsetWidth;
        projectTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
      
      nextButton.addEventListener('click', function() {
        if (currentIndex < projectSlides.length - slidesToShow) {
          currentIndex++;
          updateCarousel();
        }
      });
      
      prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
      
      // Update carousel on window resize
      window.addEventListener('resize', function() {
        const newSlidesToShow = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (newSlidesToShow !== slidesToShow) {
          currentIndex = 0;
          updateCarousel();
        }
      });
      
      // Initialize carousel
      updateCarousel();
    });

    //--------------------------------

    // Update the carousel initialization in your existing script
// Projects Carousel
const projectTrack = document.querySelector('.project-track');
const projectSlides = document.querySelectorAll('.project-slide');
const nextButton = document.querySelector('.carousel-button--right');
const prevButton = document.querySelector('.carousel-button--left');

let currentIndex = 0;

function getSlidesToShow() {
  if (window.innerWidth >= 992) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1; // Mobile shows only 1 card
}

function updateCarousel() {
  const slidesToShow = getSlidesToShow();
  const slideWidth = projectSlides[0].offsetWidth;
  projectTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  
  // Disable buttons at boundaries
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= projectSlides.length - slidesToShow;
  
  // Visual feedback for disabled state
  prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
  nextButton.style.opacity = currentIndex >= projectSlides.length - slidesToShow ? '0.5' : '1';
}

nextButton.addEventListener('click', function() {
  const slidesToShow = getSlidesToShow();
  if (currentIndex < projectSlides.length - slidesToShow) {
    currentIndex++;
    updateCarousel();
  }
});

prevButton.addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Update carousel on window resize
window.addEventListener('resize', function() {
  const newSlidesToShow = getSlidesToShow();
  // Reset to first slide if current index would be out of bounds
  if (currentIndex > projectSlides.length - newSlidesToShow) {
    currentIndex = Math.max(0, projectSlides.length - newSlidesToShow);
  }
  updateCarousel();
});

// Initialize carousel
updateCarousel();