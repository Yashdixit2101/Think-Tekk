/* =============================================
   ANIMATIONS.JS — IntersectionObserver fade-ins
   ============================================= */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Stagger cards that appear together */
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  /* Add stagger delays to grid children */
  document.querySelectorAll(
    '.services-grid .service-card, .about-highlights .highlight-box, .why-grid .why-item'
  ).forEach((el, i) => {
    el.dataset.delay = (i % 3) * 100; // stagger by column
  });

  /* Observe all fade-in elements */
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* Also fade in static section headings */
  document.querySelectorAll(
    '.hero-text, .services-header, .about-text, .why .section-inner > *, .contact-header, .contact-info, .contact-form'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
})();
