/*global Bin*/

const { test } = QUnit;

QUnit.module('Bin', () => {
  test('it renders a bin icon in given element', assert => {
    const element = document.getElementById('qunit-fixture');

    new Bin(element);

    assert.strictEqual(element.getElementsByClassName('icon').length, 1, 'renders an icon');
    assert.strictEqual(element.getElementsByClassName('icon__bin').length, 1, 'renders a bin icon');
  });

  test('it handles click events', assert => {
    const element = document.getElementById('qunit-fixture');
    let clickCount = 0;
    const bin = new Bin(element);
    bin.onClick(() => { clickCount++; });

    element.getElementsByClassName('icon__bin')[0].click();

    assert.strictEqual(clickCount, 1, 'registers clicks');
  });
});