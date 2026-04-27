/* =============================================
   FORM.JS — contact form validation & submit
   ============================================= */
(function () {
  const btn      = document.getElementById('formSubmit');
  const feedback = document.getElementById('formFeedback');
  const fields   = {
    name:    document.getElementById('name'),
    email:   document.getElementById('email'),
    service: document.getElementById('service'),
    message: document.getElementById('message')
  };

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function setFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className   = 'form-feedback ' + type;
  }

  function highlightError(el) {
    el.style.borderColor = '#c62828';
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
  }

  btn.addEventListener('click', () => {
    const name    = fields.name.value.trim();
    const email   = fields.email.value.trim();
    const service = fields.service.value;
    const message = fields.message.value.trim();

    /* Validate */
    let valid = true;
    if (!name)               { highlightError(fields.name);    valid = false; }
    if (!isValidEmail(email)){ highlightError(fields.email);   valid = false; }
    if (!service)            { highlightError(fields.service); valid = false; }
    if (!message)            { highlightError(fields.message); valid = false; }

    if (!valid) {
      setFeedback('Please fill in all fields correctly.', 'error');
      return;
    }

    /* Simulate submission (replace with your backend / Formspree endpoint) */
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      setFeedback('Thank you! We\'ll be in touch within 24 hours.', 'success');
      btn.textContent = 'Message Sent ✓';
      Object.values(fields).forEach(f => { f.value = ''; f.style.borderColor = ''; });
      setTimeout(() => {
        btn.disabled    = false;
        btn.textContent = 'Send Message →';
        feedback.textContent = '';
        feedback.className   = 'form-feedback';
      }, 5000);
    }, 1200);

    /*
     * TO CONNECT A REAL BACKEND replace the setTimeout above with:
     *
     * fetch('https://formspree.io/f/YOUR_ID', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ name, email, service, message })
     * })
     * .then(r => r.ok ? success() : fail())
     * .catch(() => fail());
     */
  });
})();
