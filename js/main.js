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

// Lead form submission
(function setupLeadForm() {
  var form = document.getElementById('lead-form');
  if (!form) return;
  var status = document.getElementById('lead-form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    // Honeypot: if filled in, silently drop (likely a bot)
    if (data.get('_gotcha')) return;

    if (submitBtn) submitBtn.disabled = true;
    status.textContent = 'Sending...';
    status.removeAttribute('data-state');

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = 'Thanks! We\'ll be in touch shortly.';
          status.setAttribute('data-state', 'success');
          form.reset();
        } else {
          return response.json().then(function (body) {
            var message = (body && body.errors && body.errors.length)
              ? body.errors.map(function (err) { return err.message; }).join(', ')
              : 'Something went wrong. Please email us directly at support@banxtel.io.';
            status.textContent = message;
            status.setAttribute('data-state', 'error');
          });
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please email us directly at support@banxtel.io.';
        status.setAttribute('data-state', 'error');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
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