/*global text*/

const { test } = QUnit;

QUnit.module('text', () => {

  QUnit.module('.render()', () => {
    test('it renders a text in given element', assert => {
      const element = document.getElementById('qunit-fixture');

      text.render(element, 4);

      assert.strictEqual(element.textContent, '4');
    });

    test('it renders markup as text', assert => {
      const element = document.getElementById('qunit-fixture');

      text.render(element, '<span>IDF ftw!</span>');

      assert.strictEqual(element.textContent, '<span>IDF ftw!</span>');
    });
  });
  
});