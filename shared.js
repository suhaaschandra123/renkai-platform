/* RENKAI — shared.js  |  Used by every page */
document.addEventListener('DOMContentLoaded', function () {

  /* Nav scroll */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('up', window.scrollY > 40);
    }, { passive: true });
  }

  /* Hamburger */
  var burger = document.getElementById('burger');
  var mob    = document.getElementById('mob');
  var mobX   = document.getElementById('mobX');
  function closeMob() { if (mob) { mob.classList.remove('open'); document.body.style.overflow = ''; } }
  if (burger && mob) {
    burger.addEventListener('click', function () { mob.classList.add('open'); document.body.style.overflow = 'hidden'; });
  }
  if (mobX) mobX.addEventListener('click', closeMob);
  if (mob)  mob.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMob); });

  /* Scroll reveal */
  var rvEls = document.querySelectorAll('.rv');
  var rvObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); rvObs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  rvEls.forEach(function (el) { rvObs.observe(el); });

  /* Underline draw-in */
  var ulEls = document.querySelectorAll('.ul-w');
  var ulObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('drawn'); ulObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  ulEls.forEach(function (el) { ulObs.observe(el); });

  /* Active nav link */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href !== '#' && path.includes(href.replace('.html', ''))) {
      a.classList.add('active');
    }
    if ((path === 'index.html' || path === '') && (href === 'index.html' || href === '/')) {
      a.classList.add('active');
    }
  });

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });
});
