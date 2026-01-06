document.querySelector('.btn-start').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.hero-curtain').classList.add('curtain-up');
});

document.addEventListener('DOMContentLoaded', function() {
    const btnStart = document.querySelector('a[href="#open-site"]');
    const heroCurtain = document.querySelector('.hero-curtain');
    const navTop = document.querySelector('.nav-top');
    
    if (btnStart && heroCurtain) {
        btnStart.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Faire monter le rideau
            heroCurtain.classList.add('curtain-up');
            
            // Déclencher l'animation de la nav après 0.5s (quand le rideau commence à monter)
            setTimeout(function() {
                if (navTop) {
                    navTop.classList.add('nav-visible');
                }
            }, 500);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    const maxDistance = 150;
    const mouse = { x: null, y: null, radius: 150 };
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius && mouse.x !== null) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
            
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 2) {
                this.vx = (this.vx / speed) * 2;
                this.vy = (this.vy / speed) * 2;
            }
        }
        
        draw() {
            ctx.fillStyle = '#0087ca';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.5;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
});