function initializeShowcase() {
  const track = document.getElementById('SkillsTrack');
  const container = document.querySelector('.showcase-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  let isPaused = false;
  let originalTrackItems = track.innerHTML;
  
  // Initially duplicate for infinite scroll (All state)
  track.innerHTML = originalTrackItems + originalTrackItems;

  // Add hover handlers
  track.addEventListener('mouseenter', () => {
    isPaused = true;
    if (track.style.animation) {
      track.style.animationPlayState = 'paused';
    }
  });

  track.addEventListener('mouseleave', () => {
    isPaused = false;
    if (track.style.animation) {
      track.style.animationPlayState = 'running';
    }
  });

  // Function to determine if content should scroll
  function shouldScroll(trackElement) {
    const containerWidth = container.offsetWidth;
    const visibleItems = Array.from(trackElement.children).filter(item => 
      item.style.display !== 'none'
    );
    const gap = 24; // 1.5rem converted to pixels
    const totalItemsWidth = visibleItems.reduce((width, item) => 
      width + item.offsetWidth + gap, 0) - gap;
      
    return visibleItems.length > 4 && totalItemsWidth > containerWidth;
  }

  // Function to apply the scroll animation
  function applyScrollAnimation(trackElement) {
    if (shouldScroll(trackElement)) {
      trackElement.style.animation = 'scroll 30s linear infinite';
      trackElement.style.animationPlayState = isPaused ? 'paused' : 'running';
    } else {
      trackElement.style.animation = 'none';
    }
  }

  // Center filtered content
  function centerFilteredContent(trackElement) {
    const containerWidth = container.offsetWidth;
    const visibleItems = Array.from(trackElement.children).filter(item => 
      item.style.display !== 'none'
    );
    const gap = 24;
    const totalItemsWidth = visibleItems.reduce((width, item) => 
      width + item.offsetWidth + gap, 0) - gap;

    const offset = (containerWidth - totalItemsWidth) / 2;
    
    if (totalItemsWidth < containerWidth) {
      trackElement.style.transform = `translateX(${offset}px)`;
      trackElement.style.justifyContent = 'center';
    } else {
      trackElement.style.transform = '';
      trackElement.style.justifyContent = '';
    }
  }
  
  // Filter buttons click handler
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      if (filter === 'all') {
        track.style.transform = '';
        track.style.justifyContent = '';
        track.innerHTML = originalTrackItems + originalTrackItems;
        applyScrollAnimation(track);
        if (isPaused) {
          track.style.animationPlayState = 'paused';
        }
      } else {
        track.innerHTML = originalTrackItems;
        track.style.animation = 'none';
        
        const cards = document.querySelectorAll('.skill-card-horizontal');
        cards.forEach(card => {
          const categories = card.getAttribute('data-category').split(',');
          card.style.display = categories.includes(filter) ? 'flex' : 'none';
        });

        centerFilteredContent(track);
        if (shouldScroll(track)) {
          track.style.transform = '';
          requestAnimationFrame(() => {
            track.style.animation = 'scrollOnce 15s linear';
            if (isPaused) {
              track.style.animationPlayState = 'paused';
            }
          });
        }
      }
    });
  });
  
  // Reset animation on end
  track.addEventListener('animationend', (e) => {
    if (e.animationName === 'scrollOnce' && shouldScroll(track)) {
      track.style.animation = 'none';
      track.offsetHeight; // Trigger reflow
      track.style.animation = 'scrollOnce 15s linear';
      if (isPaused) {
        track.style.animationPlayState = 'paused';
      }
    }
  });
  
  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeFilter = document.querySelector('.filter-btn.active');
      if (activeFilter) {
        activeFilter.click();
      }
    }, 250);
  });
  
  // Ensure scroll animation starts on page load
  applyScrollAnimation(track);
}

document.addEventListener('DOMContentLoaded', initializeShowcase);