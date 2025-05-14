const video = document.getElementById('ytVideo');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const player = new YT.Player('ytVideo');
      if (entry.isIntersecting) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  }, { threshold: 0.6 });

  window.onYouTubeIframeAPIReady = function () {
    observer.observe(document.getElementById('top-video'));
  };

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);