// Fundo interativo de partículas, fora do palco de slides (implementação própria, sem libs externas)
(function () {
    const GREENS = ['#16a34a', '#166534', '#8fe3a8', '#dcf3e2'];
    const DENSITY = 11000; // px² por partícula — monitores widescreen geram mais partículas
    const MIN_COUNT = 90, MAX_COUNT = 260;
    const LINK_DIST = 140;
    const MOUSE_DIST = 180;

    const canvas = document.getElementById('bgfx');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, particles = [];
    const mouse = { x: -9999, y: -9999 };

    function count() {
        return Math.max(MIN_COUNT, Math.min(MAX_COUNT, Math.round((w * h) / DENSITY)));
    }

    function resize() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        spawn();
    }

    function spawn() {
        particles = Array.from({ length: count() }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - .5) * .3,
            vy: (Math.random() - .5) * .3,
            r: Math.random() * 1.8 + 1,
            c: GREENS[Math.floor(Math.random() * GREENS.length)]
        }));
    }

    function step() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
            if (d < MOUSE_DIST && d > .01) {
                const f = (MOUSE_DIST - d) / MOUSE_DIST * .5;
                p.x += (dx / d) * f; p.y += (dy / d) * f;
            }
        }
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
                if (d < LINK_DIST) {
                    ctx.globalAlpha = (1 - d / LINK_DIST) * .25;
                    ctx.strokeStyle = '#166534';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = .55;
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(step);
    }

    addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    addEventListener('resize', resize);

    resize(); step();
})();
