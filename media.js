document.addEventListener('DOMContentLoaded', () => {
  // Media Carousel Setup
  const mediaTrack = document.getElementById('mediaCarouselTrack');
  const mediaSlides = Array.from(mediaTrack?.querySelectorAll('.carousel-slide') || []);
  const mediaPrevBtn = document.getElementById('mediaPrevBtn');
  const mediaNextBtn = document.getElementById('mediaNextBtn');
  let mediaIndex = 0;

  if (mediaTrack && mediaPrevBtn && mediaNextBtn && mediaSlides.length) {
    const updateMediaCarousel = () => {
      const width = mediaTrack.clientWidth;
      mediaTrack.style.transform = `translateX(-${width * mediaIndex}px)`;
    };

    mediaPrevBtn.addEventListener('click', () => {
      mediaIndex = (mediaIndex - 1 + mediaSlides.length) % mediaSlides.length;
      updateMediaCarousel();
    });

    mediaNextBtn.addEventListener('click', () => {
      mediaIndex = (mediaIndex + 1) % mediaSlides.length;
      updateMediaCarousel();
    });

    window.addEventListener('resize', updateMediaCarousel);
    updateMediaCarousel();
  }
});
