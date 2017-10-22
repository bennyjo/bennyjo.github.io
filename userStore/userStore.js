/* exported UserStore */

class UserStore {
  constructor(id, webStore) {
    if (!id) {
      throw new Error('UserStore: a store id is required.');
    }

    this.id = id;
    this.webStore = webStore || localStorage;

    const storedUsersString = this.webStore.getItem(id);
    const users = storedUsersString ? JSON.parse(storedUsersString) : [];

    this.users = users;
    this.onAddCallbacks = [];
    this.onRemoveCallbacks = [];
    this.onEmptyCallbacks = [];
  }

  add(user) {
    const userStore = this;

    if (user.email && userStore._isDuplicateEmail(user.email)) {
      throw new Error('UserStore: user email "' + user.email + '" has already been added.');
    }

    user = Object.assign({}, user);
    user.id = user.id || generateId(user);

    userStore.users.push(user);
    userStore.webStore.setItem(userStore.id, JSON.stringify(userStore.users));
    userStore.onAddCallbacks.forEach(onAddCallback => onAddCallback(user));

    return user.id;

    function generateId(user) {
      return user.email ? Date.now() + user.email : (Date.now() + Math.random()).toString();
    }
  }

  addAnonymous() {
    const userStore = this;

    return userStore.add({ name: '', email: '' });
  }

  remove(userId) {
    const userStore = this;
    const userIndex = userStore.users.findIndex(storedUser => storedUser.id === userId);

    if (foundUserToRemove(userIndex)) {
      removeUser(userIndex);

      if (thereAreUsersRemaining(userStore)) {
        userStore.webStore.setItem(userStore.id, JSON.stringify(userStore.users));
      } else {
        userStore.webStore.removeItem(userStore.id);
      }
    }

    function foundUserToRemove(userIndex) {
      return userIndex >= 0;
    }

    function thereAreUsersRemaining(userStore) {
      return userStore.users.length;
    }

    function removeUser(userIndex) {
      userStore.users.splice(userIndex, 1);
      userStore.onRemoveCallbacks.forEach(onRemoveCallback => onRemoveCallback(userId));
    }
  }

  update(userId, userData) {
    const userStore = this;

    if (userData.email && userStore._isDuplicateEmail(userData.email)) {
      throw new Error('UserStore: user email "' + userData.email + '" already exists.');
    }

    const userToUpdate = userStore.users.find(storedUser => storedUser.id === userId);

    if (userToUpdate) {
      if (userData.email) {
        userToUpdate.email = userData.email;
      }

      if (userData.name) {
        userToUpdate.name = userData.name;
      }

      userStore.webStore.setItem(userStore.id, JSON.stringify(userStore.users));
    }
  }

  empty() {
    const userStore = this;

    userStore.webStore.removeItem(userStore.id);
    userStore.users = [];
    userStore.onEmptyCallbacks.forEach(onEmptyCallBack => onEmptyCallBack());
  }

  onAdd(callback) {
    if (typeof callback === 'function') {
      this.onAddCallbacks.push(callback);
    }
  }

  onRemove(callback) {
    if (typeof callback === 'function') {
      this.onRemoveCallbacks.push(callback);
    }
  }

  onEmpty(callback) {
    if (typeof callback === 'function') {
      this.onEmptyCallbacks.push(callback);
    }
  }

  _isDuplicateEmail(email) {
    const userStore = this;
    return userStore.users.some(storedUser => storedUser.email === email);
  }
}