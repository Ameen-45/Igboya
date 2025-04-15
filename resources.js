// Optional: Smooth Scroll to Top Button (add this to HTML if you want)
window.addEventListener('DOMContentLoaded', () => {
    const pdfLinks = document.querySelectorAll("a[href$='.pdf']");
    const toolLinks = document.querySelectorAll("section ul li a[target='_blank']");
  
    pdfLinks.forEach(link => {
      link.addEventListener('click', () => {
      });
    });
  
    toolLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log("User clicked external tool:", link.href);
      });
    });
  });
// Show/hide the back to top button
const backToTop = document.getElementById('backToTop');
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
};

// Scroll to top on click
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
