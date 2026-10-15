document.addEventListener('DOMContentLoaded', () => {
  const items = [...document.querySelectorAll('.acc-item')];
  if (!items.length) return;
  const canHover = window.matchMedia('(hover:hover) and (min-width:768px)').matches;
  const activate = el => {
    if (el.classList.contains('active')) return;
    items.forEach(i => i.classList.toggle('active', i === el));
    if (window.innerWidth < 768) setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < 90 || r.bottom > innerHeight) window.scrollBy({ top: r.top - 100, behavior: 'smooth' });
    }, 650);
  };
  items.forEach(el => {
    el.addEventListener('click', () => activate(el));
    el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); activate(el); } if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); const n = items[(items.indexOf(el) + 1) % items.length]; n.focus(); activate(n); } if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); const n = items[(items.indexOf(el) - 1 + items.length) % items.length]; n.focus(); activate(n); } });
    if (canHover) el.addEventListener('mouseenter', () => activate(el));
  });
});
