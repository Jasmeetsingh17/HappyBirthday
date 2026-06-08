// Sakura Petal Animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let petals = [];
    const numPetals = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function Petal() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.flip = Math.random();
        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1;
        this.flipSpeed = Math.random() * 0.03;
    }

    Petal.prototype.draw = function() {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -this.w;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flip = Math.random();
        }
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
        ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
        ctx.closePath();
        ctx.fillStyle = '#FFB7C5';
        ctx.fill();
    }

    Petal.prototype.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;
        this.draw();
    }

    function createPetals() {
        petals = [];
        for (let i = 0; i < numPetals; i++) {
            petals.push(new Petal());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
        });
        requestAnimationFrame(animate);
    }

    createPetals();
    animate();
});
