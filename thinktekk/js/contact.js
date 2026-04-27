/* =============================================
   CONTACT.JS — renders contact details from data
   ============================================= */
(function () {
  const container = document.getElementById('contactInfo');
  if (!container) return;

  const { address, phone, website, url } = SITE_DATA.contact;

  container.innerHTML = `
    <h3>Contact Information</h3>
    <p>Ready to transform your business with technology? Reach out — we'd love to hear about your project.</p>

    <div class="contact-detail">
      <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      <div>
        <span class="detail-label">Address</span>
        <span class="detail-value">${address}</span>
      </div>
    </div>

    <div class="contact-detail">
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.22a2 2 0 0 1 1.99-2.18H6.6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <div>
        <span class="detail-label">Phone</span>
        <span class="detail-value"><a href="tel:${phone.replace(/\s/g,'')}">${phone}</a></span>
      </div>
    </div>

    <div class="contact-detail">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <div>
        <span class="detail-label">Website</span>
        <span class="detail-value"><a href="${url}" target="_blank" rel="noopener">${website}</a></span>
      </div>
    </div>
  `;
})();
