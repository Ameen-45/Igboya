// topicsscript.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen transition
    setTimeout(function() {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);

    // Add hover effect to topic cards
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.12)';
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#00d4ff';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '#007bff';
            }
        });

        // Click effect
        card.addEventListener('click', function(e) {
            // Don't interfere with link clicks
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            // Position ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            }, 600);
        });
    });

    // Animate progress bars on scroll
    const animateProgressBars = function() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Run once on load
});