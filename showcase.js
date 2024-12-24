document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('certTrack');
  const pauseBtn = document.getElementById('pauseBtn');
  const playBtn = document.getElementById('playBtn');
  let isPlaying = true;

  // Pause/Play functionality
  function togglePlayPause() {
    if (isPlaying) {
      track.style.animationPlayState = 'paused';
      pauseBtn.style.display = 'none';
      playBtn.style.display = 'flex';
    } else {
      track.style.animationPlayState = 'running';
      pauseBtn.style.display = 'flex';
      playBtn.style.display = 'none';
    }
    isPlaying = !isPlaying;
  }

  pauseBtn.addEventListener('click', togglePlayPause);
  playBtn.addEventListener('click', togglePlayPause);

  // Pause on hover (optional)
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    if (isPlaying) {
      track.style.animationPlayState = 'running';
    }
  });
});