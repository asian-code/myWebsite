class TypingEffect {
  constructor(element, phrases, options = {}) {
    this.element = element;
    this.phrases = phrases;
    this.currentPhrase = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.options = {
      typeSpeed: options.typeSpeed || 100,
      deleteSpeed: options.deleteSpeed || 50,
      pauseTime: options.pauseTime || 2000
    };
  }

  type() {
    const phrase = this.phrases[this.currentPhrase];
    
    if (this.isDeleting) {
      // Deleting text
      this.currentChar--;
      if (this.currentChar < 0) {
        this.isDeleting = false;
        this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
        setTimeout(() => this.type(), 500);
        return;
      }
    } else {
      // Typing text
      this.currentChar++;
      if (this.currentChar > phrase.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.options.pauseTime);
        return;
      }
    }

    this.element.textContent = phrase.substring(0, this.currentChar);
    
    setTimeout(() => this.type(), 
      this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed);
  }

  start() {
    this.type();
  }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing-text');
  const typingEffect = new TypingEffect(
    typingElement,
    ["Eric Nguyen", "{Computer Nerd}"],
    {
      typeSpeed: 150,    // Adjust typing speed (ms)
      deleteSpeed: 75,   // Adjust deleting speed (ms)
      pauseTime: 2000    // Time to wait before deleting text (ms)
    }
  );
  typingEffect.start();
});