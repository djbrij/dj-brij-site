/* SPDX-License-Identifier: MIT · © 2026 Briana Jasso · https://djbrij.github.io/dj-brij-site/ */

/* Mobile hamburger overlay + header condense-on-scroll. */
(function () {
  'use strict';

  var burger = document.querySelector('.djb-burger');
  var menu = document.getElementById('djb-navmenu');
  var header = document.querySelector('.djb-header');
  var lastFocus = null;

  function focusables() {
    return menu
      ? Array.prototype.slice.call(
          menu.querySelectorAll('a[href], button:not([disabled])')
        )
      : [];
  }

  function open() {
    if (!menu) return;
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.removeAttribute('aria-hidden');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('djb-noscroll');
    var f = focusables();
    if (f.length) f[0].focus();
  }

  function close() {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('djb-noscroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) close();
      else open();
    });

    var closeBtn = menu.querySelector('.djb-navmenu__close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Navigating away should not leave the overlay open on back-nav.
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key !== 'Tab') return;

      // Trap focus inside the overlay while it is open.
      var f = focusables();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // A resize past the desktop breakpoint should not strand a locked body.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && menu.classList.contains('is-open')) close();
    });
  }

  if (header) {
    var ticking = false;
    var apply = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    };
    apply();
    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(apply);
      },
      { passive: true }
    );
  }
})();
