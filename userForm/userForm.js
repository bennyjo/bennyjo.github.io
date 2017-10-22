/* global Bin */
/* exported UserForm */

class UserForm {
  constructor(element, userStore) {
    if (!element) {
      throw new Error('UserForm: element required');
    }

    userStore.onAdd(user => addRow(user));
    userStore.onRemove(userId => removeRow(userId));
    userStore.onEmpty(() => render());

    render();

    function render() {
      const rows = [];

      userStore.users.forEach((user) => rows.push(getRowTemplate(user)));

      element.innerHTML = rows.join('').trim();

      const formRows = Array.apply(null, element.getElementsByClassName('userForm__row'));
      formRows.forEach(initBin);
      formRows.forEach(initInputs);
    }

    function addRow(user) {
      const rowTemplate = getRowTemplate(user);

      element.insertAdjacentHTML('beforeend', rowTemplate);

      const rowElements = element.getElementsByClassName('userForm__row');
      const lastRowElement = rowElements[rowElements.length-1];
      initBin(lastRowElement);
      initInputs(lastRowElement);
    }

    function removeRow(rowId) {
      const formRows = Array.apply(null, element.getElementsByClassName('userForm__row'));
      const rowToRemove = formRows.find(formRow => formRow.getAttribute('data-id') === rowId);

      if (rowToRemove) {
        element.removeChild(rowToRemove);
      }
    }

    function getRowTemplate(user) {
      return `
        <div class='userForm__row' data-id='${user.id}'>
          <input class='userForm__input' name='username' value='${user.name}' placeholder='John Doe'></input>
          <input class='userForm__input' name='email' type='email' value='${user.email}'placeholder='john.doe@gmail.com'></input>
          <span class='userForm__bin'></span>
        </div>
      `;
    }

    function initBin(formRow) {
      const binElement = formRow.querySelector('.userForm__bin');
      const bin = new Bin(binElement);

      bin.onClick(() => {
        const userId = formRow.getAttribute('data-id');
        userStore.remove(userId);
      });
    }

    function initInputs(formRow) {
      const nameInput = formRow.querySelector('input[name="username"]');
      const emailInput = formRow.querySelector('input[name="email"]');
      const userId = formRow.getAttribute('data-id');

      nameInput.addEventListener('blur', () => {
        userStore.update(userId, {name: nameInput.value});
      });

      emailInput.addEventListener('blur', () => {
        // TODO: handle duplicate email addresses
        userStore.update(userId, {email: emailInput.value});
      });
    }
  }
}
