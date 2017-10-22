/* exported Bin */
class Bin {
  constructor(element, id) {
    const bin = this;

    bin.element = element;
    bin.onClickHandlers = [];

    element.innerHTML = `
      <span class='icon icon__bin'></span>
    `;

    bin.element.addEventListener('click', () => {
      bin.onClickHandlers.forEach(onClickHandler => onClickHandler(id));
    });
  }

  onClick(onClickHandler) {
    const bin = this;

    bin.onClickHandlers.push(onClickHandler);
  }
}