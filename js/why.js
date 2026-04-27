/* =============================================
   WHY.JS — renders "why us" grid from data
   ============================================= */
(function () {
  const grid = document.getElementById('whyGrid');
  if (!grid) return;

  SITE_DATA.whyUs.forEach(({ num, title, text }) => {
    const item = document.createElement('div');
    item.className = 'why-item fade-in';
    item.innerHTML = `
      <div class="why-num">${num}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    `;
    grid.appendChild(item);
  });
})();
