/* =============================================
   SERVICES.JS — renders service cards from data
   ============================================= */
(function () {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  SITE_DATA.services.forEach(({ title, desc, icon }) => {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    card.innerHTML = `
      <div class="service-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${icon}</svg>
      </div>
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    grid.appendChild(card);
  });
})();
