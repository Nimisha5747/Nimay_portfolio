document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  (function() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  })();

  // Year in footer
  (function() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  })();

  // Lightbox for gallery (gallery.html)
  (function() {
    const root = document.querySelector('[data-lightbox-root]');
    if (!root) return;

    const frameImg = root.querySelector('img');
    const caption = root.querySelector('.lightbox-caption');
    const closeBtn = root.querySelector('.lightbox-close');

    function openLightbox(src, text) {
      frameImg.src = src;
      frameImg.alt = text || '';
      caption.textContent = text || '';
      root.hidden = false;
      root.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      root.hidden = true;
      frameImg.removeAttribute('src');
      document.body.style.overflow = '';
    }

    // Open lightbox on image click
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
  (function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = (form.querySelector('#name') || {}).value || '';
      const email = (form.querySelector('#email') || {}).value || '';
      const subject = (form.querySelector('#subject') || {}).value || 'Portfolio Inquiry';
      const message = (form.querySelector('#message') || {}).value || '';

      const emailSubject = encodeURIComponent(`${subject} - from ${name}`);
      const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      
      // Replace with your actual email
      window.location.href = `mailto:hello@nimaybhatnagar.com?subject=${emailSubject}&body=${emailBody}`;
    });
  })();

  // Smooth scroll for anchor links
  (function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  })();

  // Enhanced form validation
  (function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearError);
    });

    function validateField(e) {
      const field = e.target;
      const value = field.value.trim();
      
      // Remove existing error styling
      field.classList.remove('error');
      
      if (!value) {
        showFieldError(field, 'This field is required');
        return false;
      }
      
      if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
      
      return true;
    }

    function showFieldError(field, message) {
      field.classList.add('error');
      
      // Add error message if not exists
      let errorMsg = field.parentNode.querySelector('.error-message');
      if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        field.parentNode.appendChild(errorMsg);
      }
      errorMsg.textContent = message;
    }

    function clearError(e) {
      const field = e.target;
      field.classList.remove('error');
      const errorMsg = field.parentNode.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  })();

  // Loading states for buttons
  (function() {
    document.querySelectorAll('.btn').forEach(btn => {
      if (btn.type === 'submit') {
        btn.addEventListener('click', function() {
          const originalText = this.textContent;
          this.textContent = 'Sending...';
          this.disabled = true;
          
          // Reset after 2 seconds (enough time for email client to open)
          setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
          }, 2000);
        });
      }
    });
  })();

  // Intersection Observer for animations
  (function() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements that should animate in
    document.querySelectorAll('.hero, .about-section, .featured-grid, .story, .photo').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  })();
});