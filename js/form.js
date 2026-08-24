/* =============================================
   FORM.JS — contact form delivery
   ============================================= */
(function () {
  const btn = document.getElementById('formSubmit');
  const feedback = document.getElementById('formFeedback');
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    service: document.getElementById('service'),
    message: document.getElementById('message')
  };

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'form-feedback ' + type;
  }

  function highlightError(element) {
    element.style.borderColor = '#c62828';
    element.addEventListener('input', () => { element.style.borderColor = ''; }, { once: true });
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

    btn.disabled = true;
    btn.textContent = 'Sending...';

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/info@thinktekk.com';
    form.style.display = 'none';

    const values = {
      name,
      email,
      service,
      message,
      _subject: `New ThinkTekk Website Enquiry - ${service}`,
      _captcha: 'false',
      _template: 'table'
    };

    Object.entries(values).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    setFeedback('Sending your enquiry to info@thinktekk.com…', 'success');
    form.submit();
  });
})();
