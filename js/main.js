/* Lyhour site — nav state, mobile menu, scroll reveal, count-up */
(function () {
  const header = document.querySelector('header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rise').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
    io.observe(el);
  });

  // count-up for [data-to]
  const nums = document.querySelectorAll('[data-to]');
  const numIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = parseFloat(el.dataset.to), suf = el.dataset.suf || '';
      const dec = (el.dataset.dec | 0); let t0 = null;
      const step = (t) => {
        if (!t0) t0 = t; const p = Math.min((t - t0) / 1100, 1);
        el.textContent = (to * (0.5 - Math.cos(Math.PI * p) / 2)).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); numIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => numIO.observe(n));
})();
