//canvas 1

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas 2

const canvasbg = document.getElementById('canvasbg');
const ctxbg = canvasbg.getContext('2d');
canvasbg.width = window.innerWidth;
canvasbg.height = window.innerHeight;

let Bubbles = [];
let bgBubbles = [];

function addBubble() {
    Bubbles.push(new Bubble('rgba(255,194,194,0.8)', 1));
}



function addBgBubble() {
    bgBubbles.push(new Bubble('rgba(200, 200, 200,0.8)', 1.5));
}

class Bubble {
    constructor(color, ySpeed) {
        this.radius = (Math.random() * 150) + 15;
        this.life = true;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 20) + window.innerHeight + this.radius + 100;
        this.vy = (Math.random() * 0.0002) + 0.001 + ySpeed;
        this.vr = 0;
        this.vx = (Math.random() * 4) - 2;
        this.color = color;
    }
    update() {
        this.vy += 0.001;
        this.vr += 0.0002;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius < 1) {
            this.life = false;
        }
    }

    draw(currentCanvas) {
        currentCanvas.beginPath();
        currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        //testing gradient
        let lingrad = currentCanvas.createLinearGradient(0, 0, 0, 800);
        lingrad.addColorStop(1, 'rgba(0,0,0,0)');
        lingrad.addColorStop(0.95, 'rgba(200,0,200,0.1)');
        lingrad.addColorStop(0, 'rgba(150,0,150,0.98)');
        //
        let radgrad = currentCanvas.createRadialGradient(1000, 500, 10000, 0, 0, 0);
        radgrad.addColorStop(0, 'rgba(150,0,150,0)');
        radgrad.addColorStop(1, '#001010');
        // radgrad.addColorStop(1, '#fa7268');
        currentCanvas.fillStyle = lingrad;
        
        currentCanvas.fill();
    }

}

function handleBubbles() {
    for (let i = Bubbles.length - 1; i >= 0; i--) {
        Bubbles[i].update();
        if (!Bubbles[i].life) {
            Bubbles.splice(i, 1);
        }
    }
    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].update()
        if (!bgBubbles[i].life) {
            bgBubbles.splice(i, 1);
        }
    }
    if (Bubbles.length < (window.innerWidth / 12)) {
        addBubble();
    }
    if (bgBubbles.length < (window.innerWidth / 12)) {
        addBgBubble();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxbg.clearRect(0, 0, canvas.width, canvas.height);

    handleBubbles();

    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].draw(ctxbg);

    }
    for (let i = Bubbles.length - 1; i >= 0; i--) {
        Bubbles[i].draw(ctx);
    }

    requestAnimationFrame(animate);

}

window.addEventListener('load', animate);

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasbg.width = window.innerWidth;
    canvasbg.height = window.innerHeight;
    let Bubbles = [];
    let bgBubbles = [];
})