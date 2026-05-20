// Colorful Interactive Canvas Background - Gradient + Floating Particles
(function() {
    console.log('🎨 Background.js loaded - Initializing canvas...');
    
    const canvas = document.getElementById('interactive-bg');
    if (!canvas) {
        console.error('❌ Canvas element not found!');
        return;
    }
    
    let ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = null;
    let mouseY = null;
    let time = 0;
    let animationId = null;
    
    const colors = [
        'rgba(108, 43, 217, 0.4)',
        'rgba(22, 104, 220, 0.4)',
        'rgba(255, 107, 157, 0.3)',
        'rgba(0, 210, 255, 0.3)',
        'rgba(157, 78, 221, 0.35)'
    ];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(`📐 Canvas resized to ${canvas.width}x${canvas.height}`);
        createParticles(); // Recreate particles on resize
    }
    
    function createParticles() {
        const particleCount = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 8000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 5 + 1.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        console.log(`✨ Created ${particles.length} particles`);
    }
    
    function drawGradientBackground() {
        const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient1.addColorStop(0, 'rgba(108, 43, 217, 0.08)');
        gradient1.addColorStop(0.3, 'rgba(22, 104, 220, 0.06)');
        gradient1.addColorStop(0.6, 'rgba(255, 107, 157, 0.05)');
        gradient1.addColorStop(1, 'rgba(0, 210, 255, 0.04)');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const gradient2 = ctx.createRadialGradient(
            canvas.width / 2 + Math.sin(time * 0.001) * 100,
            canvas.height / 2 + Math.cos(time * 0.0012) * 100,
            100,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 1.5
        );
        gradient2.addColorStop(0, 'rgba(108, 43, 217, 0.12)');
        gradient2.addColorStop(0.5, 'rgba(22, 104, 220, 0.06)');
        gradient2.addColorStop(1, 'rgba(255, 107, 157, 0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;
            if (p.y < -20) p.y = canvas.height + 20;
            if (p.y > canvas.height + 20) p.y = -20;
            
            const pulseRadius = p.radius + Math.sin(time * p.pulseSpeed * 1000 + p.pulsePhase) * 0.8;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            if (p.radius > 2.5) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseRadius + 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace('0.4', '0.1').replace('0.3', '0.08');
                ctx.fill();
            }
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    const opacity = (1 - distance / 130) * 0.12;
                    ctx.strokeStyle = `rgba(108, 43, 217, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    function drawMouseInteraction() {
        if (mouseX !== null && mouseY !== null) {
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108, 43, 217, 0.06)';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108, 43, 217, 0.1)';
            ctx.fill();
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const angle = Math.atan2(dy, dx);
                    const force = (120 - distance) / 120 * 1.2;
                    p.x += Math.cos(angle) * force;
                    p.y += Math.sin(angle) * force;
                }
            }
        }
    }
    
    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGradientBackground();
        drawParticles();
        drawMouseInteraction();
        time++;
        animationId = requestAnimationFrame(animate);
    }
    
    function handleMove(e) {
        if (e.touches) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    }
    
    function handleLeave() {
        mouseX = null;
        mouseY = null;
    }
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleLeave);
    
    console.log('✅ Canvas animation started successfully');
})();