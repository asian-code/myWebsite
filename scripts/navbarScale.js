// Select DOM elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.querySelector(".nav-overlay");

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

// Close menu when clicking overlay
navOverlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  navOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
});

// Close menu when clicking links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Close hamburger menu
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    // Handle smooth scrolling for anchor links
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Get navbar height for offset
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar.offsetHeight;

      // Calculate positions
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      const windowHeight = window.innerHeight;
      const elementHeight = targetElement.offsetHeight;
      const centerOffset = (windowHeight - elementHeight) / 2;

      // Perform smooth scroll
      window.scrollTo({
        top: offsetPosition - navbarHeight - Math.max(0, centerOffset),
        behavior: "smooth",
      });
    }
  });
});