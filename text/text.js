/* exported text */

const text = (function () {
  'use strict';

  function render(element, text) {
    element.textContent = text;
  }

  return { render };
})();