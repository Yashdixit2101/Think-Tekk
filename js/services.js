/* SERVICES.JS — renders SEO-friendly internal service links */
(function () {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  SITE_DATA.services.forEach(({ title, desc, icon, url }) => {
    const card = document.createElement('a');
    card.className = 'service-card fade-in';
    card.href = url || '#services';
    card.setAttribute('aria-label', `Learn more about ${title}`);
    card.innerHTML = `<div class="service-icon"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${icon}</svg></div><h3>${title}</h3><p>${desc}</p><span class="service-link">Learn more →</span>`;
    grid.appendChild(card);
  });
})();