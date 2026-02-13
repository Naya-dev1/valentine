// Elements
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const bgMusic = document.getElementById("chimeSound");
const heartsContainer = document.getElementById("heartsContainer");
const mainContent = document.getElementById("mainContent");
const valentineText = document.getElementById("valentineText");

const noMessages = [
  "Really?",
  "Are you sure?",
  "Really sure?? 😭",
  "Think again 💔",
  "Last chance 😩",
  "Just click Yes 😭💕",
  "Please?",
];

// --- No button: move anywhere in viewport ---
noBtn.addEventListener("mouseenter", () => {
  // Get viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Max X/Y so button stays fully visible
  const maxX = viewportWidth - noBtn.offsetWidth - 10;
  const maxY = viewportHeight - noBtn.offsetHeight - 10;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // Move button relative to body
  noBtn.style.position = "fixed"; // FIXED keeps it relative to viewport
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Random playful text
  const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
  noBtn.textContent = msg;
});

// --- Floating hearts ---
function createFloatingHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.className = "heart";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = 10 + Math.random() * 30 + "px";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      if (heart.parentElement) heartsContainer.removeChild(heart);
    }, 5000);
  }
}

// --- Yes button ---
yesBtn.addEventListener("click", () => {
  mainContent.style.display = "none"; // hide main content
  modal.classList.remove("hidden");
  modal.querySelector(".modal-content").classList.add("modal-enter-active");

  // Play soft audio (triggered by click)
  bgMusic.currentTime = 0;
  bgMusic.volume = 0.3; // soft
  bgMusic.play().catch((err) => console.log("Audio blocked:", err));

  // Confetti for 3 seconds
  const duration = 3 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff79c6", "#ffb86c", "#8be9fd", "#50fa7b", "#ff5555"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff79c6", "#ffb86c", "#8be9fd", "#50fa7b", "#ff5555"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  createFloatingHearts();
});

// --- Close modal: reset everything ---
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.querySelector(".modal-content").classList.remove("modal-enter-active");

  mainContent.style.display = "flex"; // show text + buttons
  valentineText.textContent = "Will you be my Valentine? 💌";

  // Reset No button
  noBtn.style.position = "relative";
  noBtn.style.left = "0px";
  noBtn.style.top = "0px";
  noBtn.textContent = "No";

  // Remove hearts
  heartsContainer.innerHTML = "";
});
