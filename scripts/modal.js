document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const modalImg = modal.querySelector('img');
  const closeButton = modal.querySelector('.close-button');
  
  // Open modal when clicking on project images
  document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close modal when clicking the close button
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
});