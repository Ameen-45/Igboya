// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Simulate loading delay
  setTimeout(function() {
    document.getElementById('loadingScreen').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('loadingScreen').style.display = 'none';
    }, 500);
  }, 2000);
  
  // Add click effect to button
  const startButton = document.querySelector('.start-button');
  if (startButton) {
    startButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      // Get click position
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Position ripple
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
        window.location.href = startButton.getAttribute('href');
      }, 600);
    });
  }
});