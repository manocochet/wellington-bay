(function () {
  if (window.__wbfx) return; window.__wbfx = true;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.2,.7,.2,1)';
  var BTN_T = 'color .25s, background-color .3s, border-color .25s, box-shadow .35s, opacity .3s';

  function css() {
    if (document.getElementById('wb-fx-css')) return;
    var s = document.createElement('style'); s.id = 'wb-fx-css';
    s.textContent = '@keyframes wb-kenburns{from{scale:1.02}to{scale:1.12}}@keyframes wb-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes wb-cue{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}@keyframes wb-pulse{0%{box-shadow:0 0 0 0 rgba(226,172,50,.7)}80%,100%{box-shadow:0 0 0 12px rgba(226,172,50,0)}}html{scroll-behavior:smooth}::selection{background:#E2AC32;color:#14213D}:focus-visible{outline:2px solid #E2AC32;outline-offset:3px}';
    document.head.appendChild(s);
  }

  function progressBar() {
    if (document.getElementById('wb-progress')) return;
    var p = document.createElement('div'); p.id = 'wb-progress';
    Object.assign(p.style, { position: 'fixed', left: 0, top: 0, height: '3px', width: '100%', background: '#E2AC32', transformOrigin: '0 50%', transform: 'scaleX(0)', zIndex: 9999, pointerEvents: 'none' });
    document.body.appendChild(p);
  }

  var pending = [];
  var io = { observe: function (el) { pending.push(el); } };
  function check() {
    if (!pending.length) return;
    var lim = innerHeight * 0.94, vis = [], rest = [];
    pending.forEach(function (el) {
      if (!el.isConnected) return;
      var b = el.getBoundingClientRect();
      if (b.top < lim && b.bottom > 0 && (b.width || b.height)) vis.push(el); else if (b.bottom <= 0) vis.push(el); else rest.push(el);
    });
    pending = rest;
    vis.forEach(function (el, i) {
      var d = Math.min(i * 70, 560) + (+el.dataset.wbDelay || 0);
      var dur = el.tagName === 'H1' ? 1.1 : .9;
      el.style.transition = 'opacity ' + dur + 's ' + EASE + ' ' + d + 'ms, transform ' + dur + 's ' + EASE + ' ' + d + 'ms, translate ' + dur + 's ' + EASE + ' ' + d + 'ms, rotate 1.1s ' + EASE + ' ' + d + 'ms, scale 1.1s ' + EASE + ' ' + d + 'ms';
      el.style.opacity = ''; el.style.transform = ''; el.style.translate = ''; el.style.rotate = ''; el.style.scale = '';
      setTimeout(function () { el.style.transition = el.dataset.wbT || ''; }, d + dur * 1000 + 100);
      if (el.dataset.count) count(el);
    });
  }

  function hide(el, mode) {
    el.setAttribute('data-wb-r', '');
    if (el.matches('a,button')) el.dataset.wbT = BTN_T;
    if (reduce) return;
    el.style.transition = 'none';
    if (mode === 'star') { el.style.rotate = '-180deg'; el.style.scale = '.3'; el.style.opacity = '0'; }
    else if (mode === 'draw') { el.style.transform = 'scaleX(0)'; }
    else if (mode === 'left') { el.style.opacity = '0'; el.style.translate = '-160px 0'; }
    else { el.style.opacity = '0'; el.style.transform = el.tagName === 'H1' ? 'translateY(40px)' : 'translateY(28px)'; }
    io.observe(el);
  }

  var GRID = /display:\s*grid/;
  var BASIC = 'h1,h2,p,img,figure,article,dl>div,blockquote,[data-reveal]';
  function reveal() {
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.closest('header,footer')) return;
      sec.querySelectorAll('*').forEach(function (el) {
        if (el.hasAttribute('data-wb-r') || el.closest('[data-no-reveal]')) return;
        var anc = el.parentElement && el.parentElement.closest('[data-wb-r]');
        if (anc && !anc.contains(sec)) return;
        var p = el.parentElement;
        var isGridChild = p && GRID.test(p.getAttribute('style') || '') && el.tagName !== 'SC-FOR';
        if (el.matches(BASIC) || isGridChild) hide(el, el.dataset.reveal);
      });
    });
    document.querySelectorAll('[data-count]:not([data-wb-r])').forEach(function (el) { el.setAttribute('data-wb-r', ''); io.observe(el); });
    document.querySelectorAll('[data-draw]:not([data-wb-r])').forEach(function (el) { hide(el, 'draw'); });
    document.querySelectorAll('section span').forEach(function (el) {
      if (el.textContent === '✷' && !el.children.length && !el.hasAttribute('data-wb-r') && !el.closest('[data-marquee]')) { el.style.display = 'inline-block'; hide(el, 'star'); }
    });
  }

  function layerize(el, kb) {
    if (el.__wbL) return;
    var bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none' || bg.indexOf('url(') < 0) return;
    el.__wbL = true;
    var cs = getComputedStyle(el);
    var L = document.createElement('div'); L.__wbL = true; L.setAttribute('data-wb-layer', '');
    Object.assign(L.style, { position: 'absolute', left: 0, right: 0, top: kb ? '-8%' : 0, bottom: kb ? '-8%' : 0, backgroundImage: bg, backgroundSize: 'cover', backgroundPosition: cs.backgroundPosition, zIndex: 0, pointerEvents: 'none', willChange: 'scale, translate' });
    if (cs.position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden'; el.style.backgroundImage = 'none';
    el.insertBefore(L, el.firstChild);
    if (kb) {
      if (!reduce) L.style.animation = 'wb-kenburns 24s ease-in-out infinite alternate';
      paras.push({ host: el, L: L });
    } else {
      L.style.transition = 'scale 1.1s ' + EASE;
      var host = el.closest('a,article,figure,[data-card]') || el;
      host.addEventListener('mouseenter', function () { L.style.scale = '1.07'; });
      host.addEventListener('mouseleave', function () { L.style.scale = '1'; });
    }
  }
  var paras = [];
  function images() {
    document.querySelectorAll('section[style*="url("]').forEach(function (s) { if (!s.closest('header,footer')) layerize(s, true); });
    document.querySelectorAll('section [style*="url("]').forEach(function (el) { if (el.tagName !== 'SECTION') layerize(el, false); });
  }

  function count(el) {
    if (reduce || el.__wbC) return; el.__wbC = true;
    var target = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), D = 1800;
    var fmt = function (n) { return Math.round(n).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ') + suf; };
    setTimeout(function () { el.textContent = fmt(target); }, D + 200);
    (function step(t) { var k = Math.min(1, (t - t0) / D); var e = 1 - Math.pow(1 - k, 4); el.textContent = fmt(target * e); if (k < 1) requestAnimationFrame(step); })(t0);
  }

  function marquees() {
    document.querySelectorAll('[data-marquee]').forEach(function (m) { if (!m.style.animation && !reduce) m.style.animation = 'wb-marquee ' + (m.dataset.marquee || 40) + 's linear infinite'; });
    document.querySelectorAll('[data-cue]').forEach(function (m) { if (!m.style.animation && !reduce) m.style.animation = 'wb-cue 2.4s ' + EASE + ' infinite'; });
    document.querySelectorAll('[data-pulse]').forEach(function (m) { if (!m.style.animation && !reduce) m.style.animation = 'wb-pulse 2.2s ease-out infinite'; });
  }

  function clocks() {
    var els = document.querySelectorAll('[data-clock]'); if (!els.length) return;
    var s = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago' }).replace(':', ' h ');
    els.forEach(function (e) { if (e.textContent !== s) e.textContent = s; });
  }

  function buttons() {
    document.querySelectorAll('a:not([data-wb-b]),button:not([data-wb-b])').forEach(function (a) {
      a.setAttribute('data-wb-b', '');
      if (!a.hasAttribute('data-wb-r')) a.style.transition = BTN_T;
      if ((a.getAttribute('style') || '').indexOf('clip-path') > -1) {
        a.addEventListener('mouseenter', function () { a.style.paddingRight = (parseFloat(getComputedStyle(a).paddingRight) + 6) + 'px'; });
        a.addEventListener('mouseleave', function () { a.style.paddingRight = ''; });
        a.style.transition = BTN_T + ', padding .3s ' + EASE;
      }
    });
  }

  var stickyHost = null, bar = null;
  function sticky() {
    var h = document.querySelector('header'); if (!h) return;
    var host = h;
    while (host.parentElement && !host.parentElement.querySelector('footer') && host.parentElement !== document.body) host = host.parentElement;
    if (host === stickyHost) return;
    stickyHost = host;
    var util = h.firstElementChild;
    bar = h.children[1];
    var a = host.parentElement;
    while (a && a !== document.body) { a.style.height = 'auto'; a.style.overflow = 'visible'; a = a.parentElement; }
    host.style.position = 'sticky'; host.style.top = -(util ? util.offsetHeight : 0) + 'px'; host.style.zIndex = 50;
    if (bar) bar.style.transition = 'box-shadow .35s';
  }

  function onScroll() {
    check();
    var y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    var p = document.getElementById('wb-progress'); if (p) p.style.transform = 'scaleX(' + (H > 0 ? y / H : 0) + ')';
    if (bar) bar.style.boxShadow = y > 60 ? '0 10px 30px rgba(20,33,61,.12)' : 'none';
    if (!reduce) paras.forEach(function (o) {
      var r = o.host.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) o.L.style.translate = '0 ' + (r.top * -0.18).toFixed(1) + 'px';
    });
    document.querySelectorAll('[data-totop]').forEach(function (b) { b.style.opacity = y > 600 ? '1' : '0'; b.style.pointerEvents = y > 600 ? 'auto' : 'none'; });
  }

  function run() { css(); progressBar(); images(); reveal(); marquees(); clocks(); buttons(); sticky(); onScroll(); }
  var pend = false;
  function schedule() { if (pend) return; pend = true; setTimeout(function () { pend = false; run(); }, 120); }
  function onMut(list) {
    for (var i = 0; i < list.length; i++) { var t = list[i].target; if (!(t.closest && t.closest('[data-count],[data-clock],[data-no-reveal]'))) { schedule(); return; } }
  }

  function init() {
    run();
    new MutationObserver(onMut).observe(document.body, { childList: true, subtree: true });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', function () { stickyHost = null; schedule(); });
    setInterval(clocks, 20000); setInterval(check, 400);
    [300, 1000, 2500, 5000].forEach(function (t) { setTimeout(schedule, t); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-totop]');
      if (t) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      var href = a.getAttribute('href');
      if (!/\.dc\.html(#.*)?$/.test(href) || href.indexOf(location.pathname.split('/').pop() + '#') === 0) return;
      e.preventDefault();
      document.body.style.transition = 'opacity .25s'; document.body.style.opacity = '0';
      setTimeout(function () { location.href = href; }, 230);
    });
    addEventListener('pageshow', function () { document.body.style.opacity = '1'; });
    if (!reduce) document.body.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
