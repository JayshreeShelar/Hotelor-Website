document.addEventListener('components:ready', () => {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === page) a.classList.add('text-brand','is-active'); });
  const hdr = document.getElementById('header');
  const bar = document.getElementById('navbar'), top = document.getElementById('topbar');
  const onScroll = () => { const s = window.scrollY > 40;
    bar.classList.toggle('bg-ink/95', s); bar.classList.toggle('shadow-soft', s); bar.classList.toggle('bg-white/5', !s);
    top.classList.toggle('max-h-0', s); top.classList.toggle('max-h-10', !s); };
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
  const WA_NUMBER = '5691247891'; // +569-124-7891 (same number as in the site info)
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
    window.open(url, '_blank');
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
