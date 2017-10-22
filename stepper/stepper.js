/* exported stepper */

const stepper = (function () {
  'use strict';

  function render(element, steps) {
    const stepper = document.createDocumentFragment();
    const ul = document.createElement('ul');

    ul.classList.add('steps');
    steps.forEach(appendAsLiToUl);

    stepper.appendChild(ul);
    element.appendChild(stepper);

    function appendAsLiToUl(step) {
      const li = document.createElement('li');
      const span = document.createElement('span');

      li.classList.add('steps__step');

      if (step.isActive) {
        li.classList.add('steps__step--active');
      } else {
        li.classList.add('steps__step--inactive');
      }

      span.textContent = step.text;
      li.appendChild(span);

      ul.appendChild(li);
    }
  }

  return { render };
})();