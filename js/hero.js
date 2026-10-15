document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('[data-dot]')];
  if (!slides.length) return;
  let i = 0, timer;
  const show = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    dots.forEach((d, k) => { d.classList.toggle('bg-brand', k === i); d.classList.toggle('w-10', k === i); d.classList.toggle('bg-white/50', k !== i); d.classList.toggle('w-3', k !== i); });
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 6500); };
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
  show(0); play();
});
