/* global Bin */
/* exported UserList */

class UserList {
  constructor(element, userStore) {
    if (!element) {
      throw new Error('UserList: element required');
    }

    userStore.onAdd(user => addRow(user));
    userStore.onRemove(userId => removeRow(userId));

    render();

    function render() {
      const rows = [];

      userStore.users.forEach((user) => rows.push(getRowTemplate(user)));

      element.innerHTML = rows.join('').trim();

      const fromRows = Array.apply(null, element.getElementsByClassName('userList__row'));
      fromRows.forEach(initBin);
    }

    function addRow(user) {
      const rowTemplate = getRowTemplate(user);

      element.insertAdjacentHTML('beforeend', rowTemplate);

      const rowElements = element.getElementsByClassName('userList__row');
      const lastRowElement = rowElements[rowElements.length-1];
      initBin(lastRowElement);
    }

    function removeRow(rowId) {
      const formRows = Array.apply(null, element.getElementsByClassName('userList__row'));
      const rowToRemove = formRows.find(formRow => formRow.getAttribute('data-id') === rowId);

      if (rowToRemove) {
        element.removeChild(rowToRemove);
      }
    }

    function initBin(formRow) {
      const binElement = formRow.querySelector('.userList__bin');
      const bin = new Bin(binElement);

      bin.onClick(() => {
        const userId = formRow.getAttribute('data-id');
        userStore.remove(userId);
      });
    }

    function getRowTemplate(user) {
      return `
        <div class='userList__row' data-id='${user.id}'>
          <span class='userList__text'>${user.name} (${user.email})</span>
          <span class='userList__bin'></span>
        </div>
      `;
    }
  }
}
