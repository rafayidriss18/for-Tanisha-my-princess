const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");

const particleCanvas = document.getElementById("particles");
const particleCtx = particleCanvas.getContext("2d");

let stars = [];
let particles = [];
let width, height;

function resize() {
    width = starCanvas.width = particleCanvas.width = window.innerWidth;
    height = starCanvas.height = particleCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* STARFIELD */
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3
    });
}

function drawStars() {
    starCtx.clearRect(0, 0, width, height);
    starCtx.fillStyle = "white";

    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > height) star.y = 0;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fill();
    });
}

/* GLOWING PARTICLES */
for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random()
    });
}

function drawParticles() {
    particleCtx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particleCtx.fillStyle = `rgba(255, 200, 255, ${p.opacity})`;
        particleCtx.fill();
    });
}

function animate() {
    drawStars();
    drawParticles();
    requestAnimationFrame(animate);
}
animate();

/* BASIC GAME START */
const textDiv = document.getElementById("text");
const choicesDiv = document.getElementById("choices");
const chapterDiv = document.getElementById("chapter");

chapterDiv.innerText = "PROLOGUE";

textDiv.innerText = "Under this same sky... Tanisha and Rafay are about to relive everything.";

function createButton(text, action) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = action;
    choicesDiv.appendChild(btn);
}

createButton("Begin", () => {
    textDiv.innerText = "Version 2 cinematic engine loaded.";
    choicesDiv.innerHTML = "";
});
