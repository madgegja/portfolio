/* ===== Portfolio Main JS ===== */
(function () {
  'use strict';

  // ===== Language Toggle =====
  const STORAGE_KEY = 'portfolio-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Update all i18n elements
    document.querySelectorAll('.i18n').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text) el.innerHTML = text;
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  // Init language
  setLanguage(currentLang);

  // Toggle click handlers
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (btn) setLanguage(btn.getAttribute('data-lang'));
    });
  }

  // ===== Resume Dropdown =====
  var resumeBtn = document.getElementById('resumeBtn');
  var resumeDropdown = document.getElementById('resumeDropdown');

  if (resumeBtn && resumeDropdown) {
    resumeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      resumeDropdown.classList.toggle('show');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!resumeBtn.contains(e.target)) {
        resumeDropdown.classList.remove('show');
      }
    });

    // Prevent dropdown links from closing prematurely
    resumeDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // ===== Mobile Hamburger =====
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Nav Scroll Shadow =====
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 20);
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ===== Active Nav Link =====
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== Scroll Reveal (IntersectionObserver) =====
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== Skill Bar Animation =====
  var skillBars = document.querySelectorAll('.skill-bar-fill');

  if ('IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  } else {
    skillBars.forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }

  // ===== Number Counter Animation =====
  var counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(function (counter) {
      counter.textContent = parseInt(counter.getAttribute('data-target'), 10).toLocaleString();
    });
  }

})();
