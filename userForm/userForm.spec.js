/* global UserForm, UserStore */

const { test, todo } = QUnit;

QUnit.module('UserForm', {
  afterEach: () => {
    localStorage.clear();
    sessionStorage.clear();
  }
}, () => {
  test('it requires an element', assert => {
    assert.throws(() => new UserForm());
  });

  test('it renders form rows in the given element', assert => {
    const element = document.getElementById('qunit-fixture');
    const userStore = new UserStore('myStore');
    userStore.users = [{ name: 'John Doe', email: 'john.doe@idf.com' }];

    new UserForm(element, userStore);

    assert.strictEqual(document.getElementsByName('username')[0].value, 'John Doe', 'has an input with user name');
    assert.strictEqual(document.getElementsByName('email')[0].value, 'john.doe@idf.com', 'has an email input');
    assert.strictEqual(document.getElementsByClassName('icon__bin').length, 1, 'has a bin icon');
  });

  todo('it stores user name from user name input when it is deselected', assert => {
    const element = document.getElementById('qunit-fixture');
    const userStore = new UserStore('myStore');
    userStore.users = [{ name: 'John Doe', email: 'john.doe@idf.com' }];
    new UserForm(element, userStore);
    const usernameInput = element.querySelector('input[name="username"]');

    // Blur handler is not triggered in username input, don't know why yet
    usernameInput.focus();
    usernameInput.value = 'Johanna Doe';
    usernameInput.blur();

    assert.strictEqual(userStore.users[0].name, 'Johanna Doe', 'has stored a new name');
  });

  todo('it stores user email from email input when it is deselected', assert => {
    const element = document.getElementById('qunit-fixture');
    const userStore = new UserStore('myStore');
    userStore.users = [{ name: 'John Doe', email: 'john.doe@idf.com' }];
    new UserForm(element, userStore);
    const emailInput = element.querySelector('input[name="email"]');

    // Blur handler is not triggered on email input, don't know why yet
    emailInput.focus();
    emailInput.value = 'johanna.doe@idf.com';
    emailInput.blur();

    assert.strictEqual(userStore.users[0].email, 'johanna.doe@idf.com', 'has stored a new email');
  });

  test('it appends a row when a user is added', assert => {
    const element = document.getElementById('qunit-fixture');
    const userStore = new UserStore('myStore');
    new UserForm(element, userStore);

    userStore.add({ name: 'John Doe', email: 'john.doe@idf.com' });

    assert.strictEqual(document.getElementsByName('username')[0].value, 'John Doe', 'appends an input with user name');
    assert.strictEqual(document.getElementsByName('email')[0].value, 'john.doe@idf.com', 'appends an input with user email');
    assert.strictEqual(document.getElementsByClassName('icon__bin').length, 1, 'appends a bin icon');
  });

  test('it removes the user\'s row when a users is removed', assert => {
    const element = document.getElementById('qunit-fixture');
    const userJohn = { name: 'John Doe', email: 'john.doe@idf.com' };
    const userJohanna = { name: 'Johanna Doe', email: 'johanna.doe@idf.com' };
    const userStore = new UserStore('myStore');
    new UserForm(element, userStore);
    const johnUserId = userStore.add(userJohn);
    userStore.add(userJohanna);

    userStore.remove(johnUserId);

    assert.strictEqual(document.getElementsByClassName('userForm__row').length, 1, 'removes a row');
    assert.strictEqual(document.getElementsByName('username')[0].value, 'Johanna Doe', 'keeps the correct user\'s usersname input');
    assert.strictEqual(document.getElementsByName('email')[0].value, 'johanna.doe@idf.com', 'keeps the correct user\'s email input');
    assert.strictEqual(document.getElementsByClassName('icon__bin').length, 1, 'keeps a bin icon');
  });
});