(function () {
  'use strict';

  /* 1. STICKY NAV SHADOW ON SCROLL*/
  const nav = document.querySelector('nav, .navbar, header');

  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* 2. SCROLL REVEAL (Intersection Observer)  */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }


  /* 3. AUTO-REVEAL CARDS (Automatically adds .reveal to service cards, blog cards,
     portfolio cards, and feature items so they animate in
     without you needing to touch every element.)   */
  const autoRevealSelectors = [
    '.service-card',
    '.blog-card',
    '.portfolio-card',
    '.testimonial-card',
    '.feature-item',
    '.stat-item',
  ];

  const autoEls = document.querySelectorAll(autoRevealSelectors.join(', '));

  if (autoEls.length > 0) {
    const autoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            autoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    autoEls.forEach((el, i) => {
      // Set initial hidden state
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 450ms ease ${i % 6 * 80}ms, transform 450ms cubic-bezier(0.4,0,0.2,1) ${i % 6 * 80}ms`;

      autoObserver.observe(el);
    });
  }


  /* 4. SMOOTH ACTIVE NAV LINK
     Highlights the nav link for whichever section is in view  */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"], .navbar a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.style.color = '';
              if (link.getAttribute('href') === `#${entry.target.id}`) {
                link.style.color = 'var(--cr-gold)';
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }


  /* 5. PORTFOLIO CARD OVERLAY INJECTION  */
  const portfolioCards = document.querySelectorAll('.portfolio-item, .portfolio-card');

  portfolioCards.forEach((card) => {
    // Only inject if overlay doesn't already exist
    if (card.querySelector('.portfolio-card-overlay')) return;

    const img = card.querySelector('img');
    const heading = card.querySelector('h3');
    const desc = card.querySelector('p');

    if (!img || !heading) return;

    // Wrap image in a div for overflow: hidden
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    card.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Build overlay
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-card-overlay';
    overlay.innerHTML = `
      <h3>${heading.textContent}</h3>
      ${desc ? `<p>${desc.textContent}</p>` : ''}
    `;

    card.style.position = 'relative';
    card.appendChild(overlay);

    // Hide the original text (it's now in the overlay)
    heading.style.display = 'none';
    if (desc) desc.style.display = 'none';
  });


  /* 6. COUNTER ANIMATION
     Animates numbers like "200+" when the stats section scrolls
     into view. Works on any element with class="stat-number" */
  const counters = document.querySelectorAll('.stat-number');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.textContent.trim();
            const suffix = raw.replace(/[\d.]/g, '');  
            const target = parseFloat(raw.replace(/[^\d.]/g, ''));

            if (isNaN(target)) return;

            let start = 0;
            const duration = 1800;
            const startTime = performance.now();

            const update = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(eased * target);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

})();
