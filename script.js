// ============================================
    // CURTAIN ANIMATION
    // ============================================
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.add('curtain-open');
        setTimeout(() => {
          document.body.classList.add('curtain-done');
          initScrollReveal();
        }, 1400);
      }, 600);
    });

    // ============================================
    // TYPEWRITER
    // ============================================
    const typewriterElement = document.querySelector('.typewriter');

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Timings matching the reference demo
    const TYPING_SPEED = 200;
    const DELETING_SPEED = 100;
    const PAUSE_END_OF_WORD = 1200;
    const PAUSE_EMPTY_WORD = 1200;

    function typeEffect() {
      const words = ["mariages", "cocktails", "événements"];
      const currentWord = words[wordIndex];

      // Manage cursor blinking state (stop blinking while animating)
      typewriterElement.classList.add('stop-blinking');

      if (isDeleting) {
        // Deleting char by char
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Writing char by char
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      // Determine what to do next
      let timeoutLength = isDeleting ? DELETING_SPEED : TYPING_SPEED;

      if (!isDeleting && charIndex === currentWord.length) {
        // Word is fully typed - wait then delete
        timeoutLength = PAUSE_END_OF_WORD;
        isDeleting = true;
        typewriterElement.classList.remove('stop-blinking'); // let cursor blink while paused
      } else if (isDeleting && charIndex === 0) {
        // Word is fully deleted - next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutLength = PAUSE_EMPTY_WORD;
        typewriterElement.classList.remove('stop-blinking'); // let cursor blink while paused
      }

      setTimeout(typeEffect, timeoutLength);
    }

    // Start the effect after a brief delay
    setTimeout(typeEffect, 1200);

    // Hero paralax

    const img = document.querySelector('.hero img');

  window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // 0.5 = deux fois plus lent que le scroll
      img.style.transform = `translateY(${scrollY * 0.5}px)`;
  });

    /* ── Carousel arrows (desktop) ──────────────────────────── */
    const carouselTrack = document.querySelector('.carousel__track');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (carouselTrack && prevBtn && nextBtn) {
      // Scroll distance = one card width + gap
      function getScrollAmount() {
        const card = carouselTrack.querySelector('.card');
        if (!card) return 340;
        const style = window.getComputedStyle(carouselTrack);
        const gap = parseFloat(style.gap) || 24;
        return card.offsetWidth + gap;
      }

      // Update arrow disabled states
      function updateArrowStates() {
        const { scrollLeft, scrollWidth, clientWidth } = carouselTrack;
        prevBtn.classList.toggle('disabled', scrollLeft <= 25);
        nextBtn.classList.toggle('disabled', scrollLeft + clientWidth >= scrollWidth - 15);
      }

      prevBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });

      carouselTrack.addEventListener('scroll', updateArrowStates, { passive: true });
      window.addEventListener('resize', updateArrowStates);

      // Initial state
      updateArrowStates();
    }


      /* ── Mobile menu ────────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    /* ── Navbar scroll effect ───────────────────────────────── */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navbar.classList.toggle('scrolled', scrollY > 50);
      lastScroll = scrollY;
    }, { passive: true });

    // ============================================
    // SCROLL REVEAL
    // ============================================
    function initScrollReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Fallback if curtain-done fires before load
    if (document.body.classList.contains('curtain-done')) initScrollReveal();

    // ============================================
    // TESTIMONIAL SLIDER
    // ============================================


    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item.open').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', false);
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', true);
        }
      });
    });

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      item.addEventListener('click', () => {
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const form = document.getElementById('contactForm');

    function validateField(id, errorId, condition) {
      const fg = document.getElementById('fg-' + id);
      const err = document.getElementById('err-' + id);
      if (!fg || !err) return condition;
      if (!condition) {
        fg.classList.add('has-error');
        document.getElementById(id).classList.add('error');
      } else {
        fg.classList.remove('has-error');
        document.getElementById(id).classList.remove('error');
      }
      return condition;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const prenom = document.getElementById('prenom').value.trim();
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const type = document.getElementById('type').value;
      const message = document.getElementById('message').value.trim();

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;
      valid = validateField('prenom', 'err-prenom', prenom.length > 0) && valid;
      valid = validateField('nom', 'err-nom', nom.length > 0) && valid;
      valid = validateField('email', 'err-email', emailRe.test(email)) && valid;
      valid = validateField('type', 'err-type', type !== '') && valid;
      valid = validateField('message', 'err-message', message.length > 10) && valid;

      if (valid) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }
    });

    // Live validation
    ['prenom','nom','message'].forEach(id => {
      const el = document.getElementById(id);
      el.addEventListener('blur', () => validateField(id, 'err-' + id, el.value.trim().length > 0));
    });
    document.getElementById('email').addEventListener('blur', () => {
      const v = document.getElementById('email').value.trim();
      validateField('email', 'err-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    });

    // ============================================
    // SMOOTH SCROLL — ACTIVE NAV
    // ============================================
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cerise)' : '';
      });
    }, { passive: true });