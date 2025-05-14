//ARTICLE SECTION
  document.addEventListener('DOMContentLoaded', () => {
  const track      = document.getElementById('carouselTrack');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const slides     = Array.from(track.querySelectorAll('.carousel-slide'));
  let   currentIndex = 0;

  // Bail out if anything’s missing
  if (!track || !prevButton || !nextButton || slides.length === 0) {
    console.error('Carousel: missing elements or no slides found');
    return;
  }

  // Slide into place
  function updateCarousel() {
    const width = track.clientWidth;
    track.style.transform = `translateX(-${width * currentIndex}px)`;
  }

  // Next / Prev handlers
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Reposition on resize
  window.addEventListener('resize', updateCarousel);

  // Kickoff
  updateCarousel();
});
