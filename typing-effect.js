let textElement = document.getElementById("typing-effect");
let phrases = ["I'm Eric Nguyen", "{computer nerd}"];
let currentPhraseIndex = 0;

function typeText(phrase, callback) {
  let index = 0;
  let typingInterval = setInterval(() => {
    textElement.innerHTML += phrase.charAt(index);
    index++;
    if (index === phrase.length) {
      clearInterval(typingInterval);
      callback();
    }
  }, 150);
}

function deleteText(callback) {
  let currentText = textElement.innerHTML;
  let deletingInterval = setInterval(() => {
    textElement.innerHTML = currentText.slice(0, -1);
    currentText = textElement.innerHTML;
    if (currentText.length === 0) {
      clearInterval(deletingInterval);
      callback();
    }
  }, 75);
}

function startTypingCycle() {
  typeText(phrases[currentPhraseIndex], () => {
    setTimeout(() => {
      deleteText(() => {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        startTypingCycle();
      });
    }, 2000); // Wait 1 second before starting to delete text
  });
}

startTypingCycle(); // Start the cycle
