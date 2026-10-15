(async () => {
  const load = async (id, url) => {
    const el = document.getElementById(id);
    if (!el) return;
    try { el.innerHTML = await (await fetch(url + '?v=10', { cache: 'no-cache' })).text(); }
    catch (e) { el.innerHTML = '<p class="p-6 text-center">Components load nahi zale. Website Live Server / local server varun open kara.</p>'; }
  };
  await Promise.all([load('site-header', 'components/header.html'), load('site-footer', 'components/footer.html')]);
  document.dispatchEvent(new Event('components:ready'));
})();
