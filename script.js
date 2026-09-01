document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initCakeClick();
    initButtons();
    initMusic();
    autoConfetti();
});

/* ===== PARTICLES ===== */
function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['#ff6b9d', '#c44dff', '#4dc9ff', '#ffd700', '#00e5a0', '#ff6f61'];
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
    }
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const cards = document.querySelectorAll('.message-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => observer.observe(card));
}

/* ===== CAKE CLICK ===== */
function initCakeClick() {
    const cake = document.querySelector('.cake-wrapper');
    if (!cake) return;
    
    cake.addEventListener('click', (e) => {
        const rect = cake.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        createFireworkBurst(x, y);
        createConfettiBurst(30);
        
        cake.style.transform = 'scale(1.1) rotate(-3deg)';
        setTimeout(() => { cake.style.transform = 'scale(1) rotate(3deg)'; }, 150);
        setTimeout(() => { cake.style.transform = 'scale(1.05) rotate(0deg)'; }, 300);
        setTimeout(() => { cake.style.transform = ''; }, 450);
    });
}

/* ===== BUTTONS ===== */
function initButtons() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const fireworkBtn = document.getElementById('fireworkBtn');
    
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            createConfettiBurst(80);
            createFireworkBurst(window.innerWidth / 2, window.innerHeight / 3);
            setTimeout(() => createFireworkBurst(window.innerWidth * 0.3, window.innerHeight / 4), 200);
            setTimeout(() => createFireworkBurst(window.innerWidth * 0.7, window.innerHeight / 4), 400);
        });
    }
    
    if (fireworkBtn) {
        fireworkBtn.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2;
                    const y = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.1;
                    createFireworkBurst(x, y);
                }, i * 200);
            }
        });
    }
}

/* ===== MUSIC ===== */
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const music = document.getElementById('birthdayMusic');
    const progressBar = document.getElementById('progressBar');
    let isPlaying = false;
    
    if (!musicBtn || !music) return;
    
    music.volume = 0.35;
    
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('.btn-text').textContent = 'Play Music';
        } else {
            music.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.querySelector('.btn-text').textContent = 'Pause Music';
            }).catch(() => {
                musicBtn.querySelector('.btn-text').textContent = 'Click to Retry';
                setTimeout(() => {
                    musicBtn.querySelector('.btn-text').textContent = 'Play Music';
                }, 2000);
            });
        }
        isPlaying = !isPlaying;
    });
    
    music.addEventListener('timeupdate', () => {
        if (music.duration && progressBar) {
            const progress = (music.currentTime / music.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });
    
    music.addEventListener('ended', () => {
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.querySelector('.btn-text').textContent = 'Play Music';
    });
}

/* ===== AUTO CONFETTI ===== */
function autoConfetti() {
    setTimeout(() => createConfettiBurst(40), 1000);
    setTimeout(() => createConfettiBurst(30), 2500);
    setInterval(() => createConfettiBurst(15), 8000);
}

/* ===== CONFETTI ===== */
function createConfettiBurst(count) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c44dff', '#4dc9ff', '#ffd700', '#00e5a0', '#ff6f61', '#a29bfe', '#fd79a8'];
    const shapes = ['square', 'circle', 'strip'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 10 + 6;
        
        confetti.style.left = (Math.random() * 100) + 'vw';
        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = (shape === 'strip') ? size * 2.5 + 'px' : size + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        
        if (shape === 'circle') confetti.style.borderRadius = '50%';
        if (shape === 'strip') confetti.style.borderRadius = '2px';
        
        const drift = (Math.random() - 0.5) * 200;
        confetti.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

/* ===== FIREWORKS ===== */
function createFireworkBurst(x, y) {
    const container = document.getElementById('fireworks');
    const colors = ['#ff6b9d', '#c44dff', '#4dc9ff', '#ffd700', '#00e5a0', '#ff6f61', '#fff'];
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 5 + 2;
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 60 + Math.random() * 80;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        container.appendChild(particle);
        
        animateFireworkParticle(particle, x, y, dx, dy);
    }
    
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement('div');
        spark.className = 'firework-particle';
        const sparkSize = Math.random() * 3 + 1;
        const sparkAngle = Math.random() * Math.PI * 2;
        const sparkVel = 30 + Math.random() * 40;
        
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.width = sparkSize + 'px';
        spark.style.height = sparkSize + 'px';
        spark.style.backgroundColor = '#fff';
        spark.style.borderRadius = '50%';
        spark.style.boxShadow = '0 0 6px #fff';
        
        container.appendChild(spark);
        
        animateFireworkParticle(spark, x, y, 
            Math.cos(sparkAngle) * sparkVel, 
            Math.sin(sparkAngle) * sparkVel, true);
    }
}

function animateFireworkParticle(particle, startX, startY, dx, dy, isSpark = false) {
    let posX = startX;
    let posY = startY;
    let opacity = 1;
    let frame = 0;
    const gravity = isSpark ? 0.8 : 0.5;
    const friction = 0.98;
    const fadeRate = isSpark ? 0.03 : 0.02;
    
    function animate() {
        frame++;
        posX += dx * 0.025;
        posY += dy * 0.025 + gravity * frame * 0.05;
        dx *= friction;
        dy *= friction;
        opacity -= fadeRate;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = Math.max(0, opacity);
        particle.style.transform = `scale(${Math.max(0, opacity)})`;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    requestAnimationFrame(animate);
}
