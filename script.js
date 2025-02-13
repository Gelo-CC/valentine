const messages = [
    "Will you be my Valentine's date?",
    "Coffee date?",
    "Coffee date na, libre mo 😏",
    "Papayag ka o papayag ka?",
    "Be my Valentine! 😉",
    "Simulan na natin ang ating kwento, sister! 💖"
];

let messageIndex = 0;
let clickCount = 0;

const messageElement = document.getElementById("message");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const invitation = document.getElementById("invitation");
const noFrame = document.getElementById("noFrame");

noBtn.addEventListener("click", () => {
    clickCount++;

    // Update message
    if (messageIndex < messages.length - 1) {
        messageIndex++;
        messageElement.innerText = messages[messageIndex];
    }

    // Get frame size
    const frameWidth = noFrame.clientWidth - noBtn.clientWidth;
    const frameHeight = noFrame.clientHeight - noBtn.clientHeight;

    // Generate random position inside frame
    const randomX = Math.random() * frameWidth;
    const randomY = Math.random() * frameHeight;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Increase Yes button size
    yesBtn.style.fontSize = `${18 + clickCount * 5}px`;
    yesBtn.style.padding = `${12 + clickCount * 2}px ${24 + clickCount * 4}px`;

    // Decrease No button size
    noBtn.style.fontSize = `${18 - clickCount * 3}px`;
    noBtn.style.padding = `${12 - clickCount}px ${24 - clickCount * 2}px`;

    // Hide No button after 5 clicks
    if (clickCount >= 5) {
        noBtn.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    document.getElementById("container").style.display = "none";
    invitation.style.display = "block";
});
