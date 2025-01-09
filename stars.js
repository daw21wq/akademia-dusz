class Star {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.z = Math.random() * 1500;
        this.px = 0;
        this.py = 0;
        this.size = Math.random() * 0.5 + 0.1; // zmniejszony rozmiar gwiazd
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 255, 255, ',  // biały
            'rgba(173, 216, 230, ',  // jasnoniebieski
            'rgba(255, 182, 193, ',  // różowy
            'rgba(221, 160, 221, ',  // fioletowy
            'rgba(255, 218, 185, '   // brzoskwiniowy
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.z = this.z - 0.5; // Wolniejszy ruch
        if (this.z <= 0) {
            this.z = 1500;
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.color = this.getRandomColor();
        }

        this.px = (this.x - window.innerWidth/2) * (128/this.z) + window.innerWidth/2;
        this.py = (this.y - window.innerHeight/2) * (128/this.z) + window.innerHeight/2;
        this.size = (1 - this.z/1500) * 0.5 + 0.1; // zmniejszony rozmiar gwiazd
    }
}

class Nebula {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 300 + 100;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.2;
    }

    getRandomColor() {
        const colors = [
            'rgba(70, 130, 180, ',   // niebieski
            'rgba(147, 112, 219, ',  // fioletowy
            'rgba(199, 21, 133, ',   // różowy
            'rgba(65, 105, 225, ',   // królewski niebieski
            'rgba(138, 43, 226, '    // fioletowy
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class StarField {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.nebulas = [];
        this.numStars = 100; // zmniejszona liczba gwiazd
        this.numNebulas = 5;
        this.initStars();
        this.initNebulas();
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    initStars() {
        for(let i = 0; i < this.numStars; i++) {
            this.stars.push(new Star());
        }
    }

    initNebulas() {
        for(let i = 0; i < this.numNebulas; i++) {
            this.nebulas.push(new Nebula());
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(14, 21, 58, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Rysowanie mgławic
        for(let nebula of this.nebulas) {
            nebula.draw(this.ctx);
        }

        // Rysowanie gwiazd
        for(let star of this.stars) {
            star.update();
            
            const opacity = (1 - star.z/1500) * 0.8 + 0.2;
            
            // Główna gwiazda
            this.ctx.beginPath();
            this.ctx.arc(star.px, star.py, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = star.color + opacity + ')';
            this.ctx.fill();

            // Poświata
            const glow = this.ctx.createRadialGradient(
                star.px, star.py, 0,
                star.px, star.py, star.size * 2
            );
            glow.addColorStop(0, star.color + opacity * 0.5 + ')');
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            this.ctx.fillStyle = glow;
            this.ctx.beginPath();
            this.ctx.arc(star.px, star.py, star.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const starField = new StarField(canvas);
    starField.animate();
});
