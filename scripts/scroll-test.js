// Store the original track items
let originalTrackItems = '';

// Initialize filtering and scroll behavior
function initializeShowcase() {
  const track = document.getElementById('certTrack');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Store original content
  originalTrackItems = track.innerHTML;
  
  // Initially duplicate for infinite scroll (All state)
  track.innerHTML = originalTrackItems + originalTrackItems;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Handle filtering and animation
      if (filter === 'all') {
        // Reset to duplicated content for infinite scroll
        track.innerHTML = originalTrackItems + originalTrackItems;
        track.style.animation = 'scroll 30s linear infinite';
      } else {
        // Reset to original content without duplicates
        track.innerHTML = originalTrackItems;
        track.style.animation = 'none';
        
        // Filter items
        document.querySelectorAll('.skill-card-horizontal').forEach(card => {
          const categories = card.getAttribute('data-category').split(',');
          if (categories.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Add finite scroll animation
        requestAnimationFrame(() => {
          track.style.animation = 'scrollOnce 15s linear';
        });
      }
    });
  });
  
  // Reset animation when it completes (for finite scroll)
  track.addEventListener('animationend', (e) => {
    if (e.animationName === 'scrollOnce') {
      track.style.animation = 'none';
      track.offsetHeight; // Trigger reflow
      track.style.animation = 'scrollOnce 15s linear';
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeShowcase);