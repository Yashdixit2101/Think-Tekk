/* =============================================
   ABOUT.JS — renders highlight boxes from data
   ============================================= */
(function () {
  const container = document.getElementById('aboutHighlights');
  if (!container) return;

  SITE_DATA.highlights.forEach(({ num, lbl }) => {
    const box = document.createElement('div');
    box.className = 'highlight-box fade-in';
    box.innerHTML = `<div class="num">${num}</div><div class="lbl">${lbl}</div>`;
    container.appendChild(box);
  });
})();
