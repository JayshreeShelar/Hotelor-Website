document.addEventListener('components:ready', () => {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === page) a.classList.add('text-brand','is-active'); });
  const hdr = document.getElementById('header');
  const bar = document.getElementById('navbar'), top = document.getElementById('topbar');
  const onScroll = () => { const s = window.scrollY > 40;
    bar.classList.toggle('bg-ink/95', s); bar.classList.toggle('shadow-soft', s); bar.classList.toggle('bg-white/5', !s); bar.classList.toggle('is-scrolled', s);
    top.classList.toggle('max-h-0', s); top.classList.toggle('max-h-8', !s); };
  onScroll(); window.addEventListener('scroll', onScroll);
  const modal = document.getElementById('enquiry-modal');
  const room = document.getElementById('enq-room');
  document.querySelectorAll('[data-enquiry]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.enquiry && room) room.value = b.dataset.enquiry;
    modal.classList.add('open');
  }));
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  const toast = document.getElementById('toast');
  const WA_NUMBER = '918830532500'; // +91 88305 32500 (same number as in the site info)
  document.querySelectorAll('form[data-enquiry-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const lines = ['*New enquiry - Hotelor*'];
    f.querySelectorAll('input, select, textarea').forEach(el => {
      const v = (el.value || '').trim();
      if (!v) return;
      const label = el.placeholder || (el.tagName === 'SELECT' ? 'Room' : 'Info');
      lines.push(label + ': ' + v);
    });
    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    f.reset(); modal.classList.remove('open');
    toast.textContent = 'Opening WhatsApp to send your enquiry...';
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 3500);
    var w = window.open(url, '_blank');
    if (!w) window.location.href = url;
  }));
  document.querySelectorAll('img').forEach(i => i.addEventListener('error', () => { i.classList.add('bg-deep'); i.removeAttribute('src'); }));
});

document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.dataset.count) {
      const end = +e.target.dataset.count; let n = 0;
      const t = setInterval(() => { n += Math.ceil(end / 60); if (n >= end) { n = end; clearInterval(t); } e.target.textContent = n + (e.target.dataset.suffix || ''); }, 25);
    }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal,[data-count]').forEach(el => io.observe(el));
});

/* Header: solid dark background after scrolling, on every page (independent of other scripts) */
(function () {
  var update = function () {
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var on = y > 40, h = document.getElementById('header'), n = document.getElementById('navbar');
    if (h) h.classList.toggle('is-scrolled', on);
    if (n) n.classList.toggle('is-scrolled', on);
  };
  ['scroll', 'touchmove', 'resize'].forEach(function (ev) { document.addEventListener(ev, update, true); window.addEventListener(ev, update, true); });
  document.addEventListener('components:ready', update);
  setInterval(update, 250);
  update();
})();

/* Header: highlight the link of the page you are on (works on every page) */
(function () {
  var mark = function () {
    var page = document.body.getAttribute('data-page');
    var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      var on = a.getAttribute('data-nav') === page || href === file;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  };
  document.addEventListener('components:ready', mark);
  setTimeout(mark, 300);
  mark();
})();
