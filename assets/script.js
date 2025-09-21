document.addEventListener('DOMContentLoaded', () => {

// Mobile nav toggle
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();

// Year in footer
(function(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Lightbox for gallery (gallery.html)
(function(){
  const root = document.querySelector('[data-lightbox-root]');
  if (!root) return;

  const frameImg = root.querySelector('img');
  const caption = root.querySelector('.lightbox-caption');
  const closeBtn = root.querySelector('.lightbox-close');

  function openLightbox(src, text){
    frameImg.src = src;
    frameImg.alt = text || '';
    caption.textContent = text || '';
    root.hidden = false;
    root.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    root.hidden = true;
    frameImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  // Open
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.getAttribute('data-caption') || img.alt || '');
    });
  });

  // Close events
  root.addEventListener('click', (e) => {
    if (e.target === root) closeLightbox();
  });
  closeBtn?.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (!root.hidden && e.key === 'Escape') closeLightbox();
  });
})();

// Contact form -> opens mail client
(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#name') || {}).value || '';
    const email = (form.querySelector('#email') || {}).value || '';
    const message = (form.querySelector('#message') || {}).value || '';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  });
})();

//
// validate username
function validateUsername(username) {
  if(username.trim() === '') {
    alert('Username cannot be empty');
    return false;
  }
}
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const isMatcing = usernameRegex.test(username);
  if(!isMatcing) {
    alert('Username invalid');
    return false;
  }

//login
async function loginUser(username) {
  const url = 'https://randomuser.me/api/${redmeercat189}';
  try {
    searchButton.disabled = true;
    searchButton.textContent = 'Loading...';
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    alert(`Login successful! Welcome, ${username}`);
  }
  catch(error) {
    Container.innerHTML = `<p>An error occurred</p>`;
  }
  finally {
    searchButton.disabled = false;
    searchButton.textContent = 'Login';
  }
}
searchButton.addEventListener('click', function() {
  const username = usernameInput.value;
  if(validateUsername(username)) {
    loginUser(username);
}
})
})