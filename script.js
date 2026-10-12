const goodnightButton = document.getElementById("goodnightButton");
const letterOverlay = document.getElementById("letterOverlay");
const closeButton = document.getElementById("closeButton");
const doneButton = document.getElementById("doneButton");

const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

const heartContainer = document.getElementById("heartContainer");
const stars = document.getElementById("stars");

let musicPlaying = false;

// Open Julie's goodnight letter.
goodnightButton.addEventListener("click", async () => {
  letterOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  createHeartBurst();

  if (!musicPlaying) {
    await playMusic();
  }
});

// Close the letter.
function closeLetter() {
  letterOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeLetter);
doneButton.addEventListener("click", closeLetter);

// Close when clicking outside the letter.
letterOverlay.addEventListener("click", (event) => {
  if (event.target === letterOverlay) {
    closeLetter();
  }
});

// Escape key closes the letter.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLetter();
  }
});

// Reveal the hidden message.
secretButton.addEventListener("click", () => {
  const isVisible = secretMessage.classList.toggle("visible");

  secretButton.textContent = isVisible
    ? "You found my little secret! 💗"
    : "One last secret for you? 💜";

  if (isVisible) {
    createHeartBurst();

    setTimeout(() => {
      secretMessage.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  }
});

// Play background music.
async function playMusic() {
  try {
    await backgroundMusic.play();

    musicPlaying = true;
    musicIcon.textContent = "♫";
    musicLabel.textContent = "Pause music";
    musicButton.classList.add("playing");
  } catch (error) {
    musicPlaying = false;
    musicIcon.textContent = "♫";
    musicLabel.textContent = "Tap to play music";

    console.log("Music could not play. Check that music.mp3 exists.", error);
  }
}

// Pause or resume music.
musicButton.addEventListener("click", async () => {
  if (musicPlaying) {
    backgroundMusic.pause();
  } else {
    await playMusic();
  }
});

backgroundMusic.addEventListener("play", () => {
  musicPlaying = true;
  musicIcon.textContent = "♫";
  musicLabel.textContent = "Pause music";
  musicButton.classList.add("playing");
});

backgroundMusic.addEventListener("pause", () => {
  musicPlaying = false;
  musicIcon.textContent = "♫";
  musicLabel.textContent = "Play our music";
  musicButton.classList.remove("playing");
});

// Create floating hearts.
function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";

  const heartChoices = ["♡", "♥", "💜", "💕", "❤"];
  heart.textContent =
    heartChoices[Math.floor(Math.random() * heartChoices.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 15 + Math.random() * 25 + "px";
  heart.style.animationDuration = 7 + Math.random() * 7 + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 15000);
}

setInterval(createFloatingHeart, 500);

// Create a heart burst when buttons are clicked.
function createHeartBurst() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = ["💜", "💕", "♡", "✨", "💗"][
      Math.floor(Math.random() * 5)
    ];

    heart.style.left = 20 + Math.random() * 60 + "%";
    heart.style.bottom = 15 + Math.random() * 35 + "%";
    heart.style.fontSize = 18 + Math.random() * 20 + "px";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 6500);
  }
}

// Create twinkling stars.
function createStars() {
  for (let i = 0; i < 65; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 1 + Math.random() * 3 + "s";

    stars.appendChild(star);
  }
}

createStars();
