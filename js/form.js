/* =============================================
   FORM.JS — contact form opens a pre-filled email
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
    feedback.className = 'form-feedback ' + type;
  }

  function highlightError(el) {
    el.style.borderColor = '#c62828';
    el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
  }

  btn.addEventListener('click', () => {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const service = fields.service.value;
    const message = fields.message.value.trim();

    let valid = true;
    if (!name) { highlightError(fields.name); valid = false; }
    if (!isValidEmail(email)) { highlightError(fields.email); valid = false; }
    if (!service) { highlightError(fields.service); valid = false; }
    if (!message) { highlightError(fields.message); valid = false; }

    if (!valid) {
      setFeedback('Please fill in all fields correctly.', 'error');
      return;
    }

    const subject = encodeURIComponent(`ThinkTekk Website Enquiry - ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:info@thinktekk.com?subject=${subject}&body=${body}`;
    setFeedback('Opening your email app to send the message to info@thinktekk.com.', 'success');
  });
})();
