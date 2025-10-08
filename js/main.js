// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    // Only handle in-page anchors
    if (href && href.length > 1) {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Reveal sections on scroll
(function setupScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

// Optional: Elevate header shadow after scrolling
(function setupHeaderShadow() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var last = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 6 && last <= 6) {
      header.style.boxShadow = '0 6px 20px rgba(2, 6, 23, 0.08)';
    } else if (y <= 6 && last > 6) {
      header.style.boxShadow = 'var(--shadow-sm)';
    }
    last = y;
  }, { passive: true });
})();


