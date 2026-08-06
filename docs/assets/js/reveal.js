/* SPDX-License-Identifier: MIT · © 2026 Briana Jasso · https://djbrij.github.io/dj-brij-site/ */

/* Scroll-in fade + short rise, staggered within a [data-reveal-group].
   Anything already in view on load reveals immediately. */
(function () {
  'use strict';

  var items = document.querySelectorAll('.djb-reveal');
  if (!items.length) return;

  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-visible');
    return;
  }

  // Stagger siblings inside a group so a row of cards arrives in sequence.
  var groups = document.querySelectorAll('[data-reveal-group]');
  for (var g = 0; g < groups.length; g++) {
    var kids = groups[g].querySelectorAll(':scope > .djb-reveal');
    for (var k = 0; k < kids.length; k++) {
      kids[k].style.setProperty('--djb-delay', k * 0.08 + 's');
    }
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  for (var n = 0; n < items.length; n++) io.observe(items[n]);
})();
