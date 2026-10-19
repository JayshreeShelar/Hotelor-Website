/* Hotelor mobile menu - self-contained glass dropdown.
   Builds its own panel inside <body> with inline styles, so it does not depend on
   header markup, style.css or Tailwind. */
(function () {
  if (window.__hotelorMenu) return;
  window.__hotelorMenu = true;

  var LINKS = [['home', 'Home', 'index.html'], ['about', 'About Us', 'about.html'], ['rooms', 'Rooms', 'rooms.html'],
               ['services', 'Services', 'services.html'], ['gallery', 'Gallery', 'gallery.html'], ['contact', 'Contact', 'contact.html']];
  var ICON_MENU = '<svg class="w-7 h-7 pointer-events-none" style="width:28px;height:28px;pointer-events:none" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICON_CLOSE = '<svg class="w-7 h-7 pointer-events-none" style="width:28px;height:28px;pointer-events:none" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var backdrop = null, panel = null, isOpen = false;

  function el(tag, css, html) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (html != null) e.innerHTML = html; return e; }
  var GLASS_BLUR = 'backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);';

  function build() {
    var page = document.body.getAttribute('data-page');

    // click-catcher under the header bar (dims the page a little, closes on tap)
    backdrop = el('div', 'position:fixed;left:0;right:0;bottom:0;top:80px;z-index:2147482999;display:none;background:rgba(8,28,38,.28);');
    backdrop.setAttribute('data-menu-close', '');

    panel = el('div', 'position:fixed;z-index:2147483000;display:none;flex-direction:column;box-sizing:border-box;overflow-y:auto;-webkit-overflow-scrolling:touch;color:#fff;font-family:Jost,Arial,sans-serif;' +
      'padding:10px 18px 18px;border-radius:26px;border:1px solid rgba(255,255,255,.30);' +
      'background:linear-gradient(145deg,rgba(255,255,255,.20) 0%,rgba(255,255,255,.06) 45%,rgba(16,48,61,.50) 100%),rgba(16,48,61,.42);' +
      GLASS_BLUR + 'box-shadow:0 24px 60px -12px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.38);transform-origin:top right;');
    panel.id = 'hotelor-menu';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Menu');

    LINKS.forEach(function (l, i) {
      var active = l[0] === page;
      var a = el('a', 'display:flex;align-items:center;justify-content:space-between;padding:9px 8px;text-decoration:none;' +
        'border-bottom:' + (i === LINKS.length - 1 ? '0' : '1px solid rgba(255,255,255,.16)') + ';' +
        'font-family:\'Cormorant Garamond\',Georgia,serif;font-size:24px;font-weight:700;color:' + (active ? '#7fdcf5' : '#fff') + ';text-shadow:0 1px 8px rgba(0,0,0,.25);',
        '<span>' + l[1] + '</span><span style="font-family:Jost,Arial,sans-serif;font-size:16px;color:' + (active ? '#7fdcf5' : 'rgba(255,255,255,.7)') + '">&rarr;</span>');
      a.href = l[2]; a.setAttribute('data-menu-link', ''); panel.appendChild(a);
    });

    var cta = el('button', 'margin-top:10px;background:rgba(31,162,200,.92);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:12px;font-size:15px;font-weight:600;cursor:pointer;font-family:Jost,Arial,sans-serif;box-shadow:0 10px 24px -10px rgba(31,162,200,.9);', 'Enquire now');
    cta.type = 'button'; cta.setAttribute('data-menu-enquire', ''); panel.appendChild(cta);
    panel.appendChild(el('div', 'margin-top:12px;text-align:center;font-size:12.5px;color:rgba(255,255,255,.75);', '+91 88305 32500 &nbsp;&middot;&nbsp; stay@hotelor.com'));

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
  }

  function place() {
    if (!panel) return;
    var nav = document.getElementById('navbar') || document.getElementById('header');
    var top = nav ? Math.round(nav.getBoundingClientRect().bottom) : 80;
    if (top < 56) top = 80;
    backdrop.style.top = top + 'px';
    panel.style.top = (top + 10) + 'px';
    panel.style.maxHeight = 'calc(100vh - ' + (top + 22) + 'px)';
    if (window.innerWidth >= 640) { panel.style.left = 'auto'; panel.style.right = '20px'; panel.style.width = '360px'; }
    else { panel.style.left = '12px'; panel.style.right = '12px'; panel.style.width = 'auto'; }
  }

  function setOpen(on) {
    if (on && !panel) build();
    if (!panel) return;
    isOpen = on;
    if (on) place();
    backdrop.style.display = on ? 'block' : 'none';
    panel.style.display = on ? 'flex' : 'none';
    if (on && panel.animate) { try { panel.animate([{ opacity: 0, transform: 'translateY(-10px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' }); } catch (e) {} }
    document.documentElement.style.overflow = on ? 'hidden' : '';
    document.body.style.overflow = on ? 'hidden' : '';
    var b = document.getElementById('menu-btn');
    if (b) { b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.setAttribute('aria-label', on ? 'Close menu' : 'Open menu'); b.innerHTML = on ? ICON_CLOSE : ICON_MENU; }
  }

  function openEnquiry() { var m = document.getElementById('enquiry-modal'); if (m) m.classList.add('open'); }

  // capture phase: runs before anything else can swallow the click
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('#menu-btn,[data-menu-toggle]')) { e.preventDefault(); e.stopPropagation(); setOpen(!isOpen); return; }
    if (!isOpen) return;
    if (t.closest('[data-menu-enquire]')) { setOpen(false); openEnquiry(); return; }
    if (t.closest('[data-menu-link]')) { setOpen(false); return; }
    if (t.closest('[data-menu-close]') || !t.closest('#hotelor-menu')) { setOpen(false); }
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) setOpen(false); });
  window.addEventListener('resize', function () { if (!isOpen) return; if (window.innerWidth >= 1024) setOpen(false); else place(); });
  window.addEventListener('pageshow', function () { if (isOpen) setOpen(false); });
  if (window.console) console.log('[Hotelor] menu.js ready');
})();
