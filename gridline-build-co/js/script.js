/* =========================================================
   Gridline Build Co. — shared site script
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav ---------- */
  var hamburger = document.getElementById('hamburgerBtn');
  var mainNav = document.getElementById('mainNav');

  function closeMenu() {
    if (!mainNav) return;
    mainNav.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- project filters (projects page) ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.filter;
        document.querySelectorAll('#projectsGrid .project-card').forEach(function (card) {
          var cats = card.dataset.cat.split(' ');
          card.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
        });
      });
    });
  }

  /* ---------- quote form (quote page) ---------- */
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }
      quoteForm.style.display = 'none';
      var success = document.getElementById('quoteSuccess');
      if (success) success.classList.add('show');
    });
  }

  /* ---------- contact form (contact page) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactForm.style.display = 'none';
      var success = document.getElementById('contactSuccess');
      if (success) success.classList.add('show');
    });
  }

});
