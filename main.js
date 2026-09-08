/* ==========================================================================
   Steady Growth Marketing — interactions
   No dependencies. Every enhancement degrades gracefully.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');

  function closeNav() {
    if (!navList) return;
    navList.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var open = navList.classList.toggle('active');
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Header state + scroll progress
     --------------------------------------------------------------------- */
  var header = document.getElementById('header');
  var progress = document.getElementById('scrollProgress');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle('scrolled', y > 24);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(y / max, 1) : 0;
      progress.style.transform = 'scaleX(' + pct + ')';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('.animate-in');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger siblings for a smoother cascade
        var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(siblings, 5) * 70 + 'ms';
        el.classList.add('visible');
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(revealTargets, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------------------- */
  var faqList = document.getElementById('faqList');

  if (faqList) {
    faqList.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-q');
      if (!btn) return;

      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all, then open the clicked one (single-open accordion)
      faqList.querySelectorAll('.faq-item.open').forEach(function (open) {
        open.classList.remove('open');
        open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---------------------------------------------------------------------
     Scrollspy — highlight the active nav link
     --------------------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        Array.prototype.forEach.call(navLinks, function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(sections, function (section) {
      spy.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------------
     Conversion tracking (Google Analytics)
     --------------------------------------------------------------------- */
  function track(name, label) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, { event_category: 'Lead', event_label: label });
    }
  }

  /* ---------------------------------------------------------------------
     Contact form — config guard, submit state, analytics
     --------------------------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    var keyField = contactForm.querySelector('input[name="access_key"]');
    var configured = keyField && keyField.value && keyField.value.indexOf('YOUR_') !== 0;

    // Loud, unmissable warning if the Web3Forms key was never filled in —
    // without it, every submission silently fails.
    if (!configured) {
      console.error(
        '[Steady Growth] Contact form is not configured: replace ' +
        'YOUR_WEB3FORMS_ACCESS_KEY in index.html with your key from https://web3forms.com'
      );
      var notice = document.createElement('p');
      notice.className = 'form-notice';
      notice.textContent =
        'Heads up: this form is not connected yet. Email yosef@steadygrowthmarketing.com in the meantime.';
      contactForm.insertBefore(notice, contactForm.firstElementChild.nextSibling);
    }

    /* Google Ads click ID.
       Stored on arrival rather than read at submit time: a visitor usually lands
       from an ad, browses, and only then fills the form — by which point the
       gclid is long gone from the URL. Kept for 90 days to match the default
       Google Ads conversion window. */
    (function captureGclid() {
      var field = document.getElementById('gclid');
      if (!field) return;

      var KEY = 'sgm_gclid';
      var MAX_AGE = 90 * 24 * 60 * 60 * 1000;
      var fromUrl = new URLSearchParams(window.location.search).get('gclid');

      if (fromUrl) {
        try {
          localStorage.setItem(KEY, JSON.stringify({ v: fromUrl, t: Date.now() }));
        } catch (e) { /* private browsing — fall through, the field is still set below */ }
        field.value = fromUrl;
        return;
      }

      try {
        var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (saved && saved.v && Date.now() - saved.t < MAX_AGE) {
          field.value = saved.v;
        } else if (saved) {
          localStorage.removeItem(KEY);
        }
      } catch (e) { /* unreadable or malformed — leave the field empty */ }
    })();

    /* People type "example.com", which fails type="url" validation and reads as
       the form being broken. Add the scheme for them instead. */
    var website = document.getElementById('website');
    if (website) {
      var normalizeUrl = function () {
        var v = website.value.trim();
        if (v && !/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) website.value = 'https://' + v;
      };
      website.addEventListener('blur', normalizeUrl);
      contactForm.addEventListener('submit', normalizeUrl);
    }

    // Point the post-submit redirect at this host's /thank-you.html. Site-absolute,
    // so a form on a subpage such as /growth-marketing-consultant/ doesn't resolve
    // it relative to its own folder. Without JS the hardcoded URL still applies.
    var redirectField = contactForm.querySelector('input[name="redirect"]');
    if (redirectField) {
      redirectField.value = new URL('/thank-you.html', window.location.href).href;
    }

    contactForm.addEventListener('submit', function () {
      track('form_submit', 'Contact Form');

      // Disable the button so a slow network doesn't produce duplicate leads
      var submit = contactForm.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        submit.classList.add('is-sending');
        submit.textContent = 'Sending…';
      }
    });
  }

  document.querySelectorAll('.phone-link').forEach(function (link) {
    link.addEventListener('click', function () {
      track('click_to_call', 'Phone Click');
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('click_to_email', 'Email Click');
    });
  });
})();
