document.addEventListener('DOMContentLoaded', () => {
  const items = [...document.querySelectorAll('[data-cat]')];
  const btns = [...document.querySelectorAll('[data-filter]')];
  const lb = document.getElementById('lightbox'), img = document.getElementById('lb-img'), cap = document.getElementById('lb-cap');
  let list = [], idx = 0;
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => { x.classList.remove('bg-brand', 'text-white'); x.classList.add('bg-mist'); });
    b.classList.add('bg-brand', 'text-white'); b.classList.remove('bg-mist');
    items.forEach(i => i.classList.toggle('hidden', b.dataset.filter !== 'all' && i.dataset.cat !== b.dataset.filter));
  }));
  const open = n => { idx = (n + list.length) % list.length; img.src = list[idx].dataset.full; cap.textContent = list[idx].dataset.cap; lb.classList.add('open'); };
  items.forEach(i => i.addEventListener('click', () => { list = items.filter(x => !x.classList.contains('hidden')); open(list.indexOf(i)); }));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('[data-lbclose]')) lb.classList.remove('open'); });
  document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); open(idx - 1); });
  document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); open(idx + 1); });
  document.addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') lb.classList.remove('open'); if (e.key === 'ArrowRight') open(idx + 1); if (e.key === 'ArrowLeft') open(idx - 1); });
});
