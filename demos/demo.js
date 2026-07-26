/* ============================================================
   Shared interactivity for all portfolio demos.
   - Sidebar/nav view switching: .nav[data-view] -> [data-panel]
   - Tabs: [data-tab] -> [data-tabpanel]
   - Kanban advance: [data-advance] moves a card to the next column
   - Injects a "back to portfolio" pill
   Works even if a demo has no panels (nav still highlights).
   ============================================================ */
(function () {
  // ---- view switching (sidebar nav or topbar) ----
  function wireViews(scope) {
    const navs = Array.from(document.querySelectorAll('.nav'));
    const panels = Array.from(document.querySelectorAll('[data-panel]'));
    navs.forEach(nav => {
      nav.style.cursor = 'pointer';
      nav.addEventListener('click', () => {
        navs.forEach(n => n.classList.remove('on'));
        nav.classList.add('on');
        const view = nav.getAttribute('data-view');
        // only switch if a matching panel exists — otherwise keep the current view (no blank screen)
        if (view && panels.some(p => p.getAttribute('data-panel') === view)) {
          panels.forEach(p => { p.style.display = (p.getAttribute('data-panel') === view) ? '' : 'none'; });
        }
      });
    });
    // show only the default panel on load
    if (panels.length) {
      const onNav = document.querySelector('.nav.on[data-view]');
      const def = onNav ? onNav.getAttribute('data-view') : panels[0].getAttribute('data-panel');
      panels.forEach(p => { p.style.display = (p.getAttribute('data-panel') === def) ? '' : 'none'; });
    }
  }

  // ---- tabs ----
  function wireTabs() {
    const tabs = Array.from(document.querySelectorAll('[data-tab]'));
    const tpanels = Array.from(document.querySelectorAll('[data-tabpanel]'));
    tabs.forEach(tab => {
      tab.style.cursor = 'pointer';
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('on'));
        tab.classList.add('on');
        const v = tab.getAttribute('data-tab');
        tpanels.forEach(p => { p.style.display = (p.getAttribute('data-tabpanel') === v) ? '' : 'none'; });
      });
    });
  }

  // ---- kanban advance (café / order boards) ----
  function wireKanban() {
    document.querySelectorAll('[data-advance]').forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => {
        const card = btn.closest('[data-card]') || btn.closest('.ord') || btn.closest('.card');
        const cols = Array.from(document.querySelectorAll('[data-col]'));
        if (!card) return;
        const cur = card.closest('[data-col]');
        if (!cur) return;
        const idx = cols.indexOf(cur);
        if (idx > -1 && idx < cols.length - 1) {
          cols[idx + 1].querySelector('[data-drop]')?.appendChild(card) ||
            cols[idx + 1].appendChild(card);
        } else {
          card.style.transition = 'opacity .3s'; card.style.opacity = '0';
          setTimeout(() => card.remove(), 300);
        }
      });
    });
  }

  // ---- generic clickable feedback for buttons/chips ----
  function wirePressable() {
    document.querySelectorAll('.btn, .chip, .cat, .prod').forEach(el => {
      el.addEventListener('click', () => {
        el.style.transition = 'transform .08s'; el.style.transform = 'scale(.97)';
        setTimeout(() => { el.style.transform = ''; }, 90);
      });
    });
  }

  // ---- back-to-portfolio pill ----
  function addBackPill() {
    const a = document.createElement('a');
    a.href = '../work.html';
    a.textContent = '◂ Back to portfolio · interactive demo — click around';
    Object.assign(a.style, {
      position: 'fixed', left: '50%', bottom: '18px', transform: 'translateX(-50%)',
      background: 'rgba(14,14,16,.9)', color: '#fff', font: "600 12px/1 ui-monospace,Menlo,monospace",
      letterSpacing: '.02em', padding: '11px 18px', borderRadius: '100px', zIndex: '200',
      textDecoration: 'none', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      boxShadow: '0 8px 26px rgba(0,0,0,.25)', whiteSpace: 'nowrap'
    });
    a.addEventListener('mouseenter', () => a.style.background = '#2F6BFF');
    a.addEventListener('mouseleave', () => a.style.background = 'rgba(14,14,16,.9)');
    document.body.appendChild(a);
  }

  function init() { wireViews(); wireTabs(); wireKanban(); wirePressable(); addBackPill(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
