/*global stepper*/

const { test } = QUnit;

QUnit.module('stepper', () => {

  QUnit.module('.render()', () => {
    test('it renders the correct number of steps', assert => {
      const element = document.getElementById('qunit-fixture');
      const steps = [
        { text: 'Step 1', isActive: true },
        { text: 'Step 2'},
        { text: 'Step 3'}
      ];

      stepper.render(element, steps);
      const stepsElements = element.getElementsByTagName('li');

      assert.strictEqual(stepsElements.length, 3);
    });

    test('it renders the correct step names', assert => {
      const element = document.getElementById('qunit-fixture');
      const steps = [
        { text: 'Step 1', isActive: true },
        { text: 'Step 2'},
        { text: 'Step 3'}
      ];

      stepper.render(element, steps);
      const stepElements = Array.apply(null, element.getElementsByTagName('li'));
      const stepElementNames = stepElements.map(stepElement => stepElement.textContent);

      assert.deepEqual(stepElementNames, ['Step 1', 'Step 2', 'Step 3']);
    });

    test('it renders the first step as an active step', assert => {
      const element = document.getElementById('qunit-fixture');
      const steps = [
        { text: 'Step 1', isActive: true },
        { text: 'Step 2'},
        { text: 'Step 3'}
      ];

      stepper.render(element, steps);
      const stepsElements = element.getElementsByTagName('li');

      assert.strictEqual(stepsElements[0].classList[0], 'steps__step', 'first step is a step');
      assert.strictEqual(stepsElements[0].classList[1], 'steps__step--active', 'first step is active');
    });

    test('it renders remaining steps as inactive steps', assert => {
      const element = document.getElementById('qunit-fixture');
      const steps = [
        { text: 'Step 1', isActive: true },
        { text: 'Step 2'},
        { text: 'Step 3'}
      ];

      stepper.render(element, steps);
      const stepsElements = element.getElementsByTagName('li');

      assert.strictEqual(stepsElements[1].classList[0], 'steps__step', 'second step is a step');
      assert.strictEqual(stepsElements[1].classList[1], 'steps__step--inactive', 'second step is active');
      assert.strictEqual(stepsElements[2].classList[0], 'steps__step', 'third step is a step');
      assert.strictEqual(stepsElements[2].classList[1], 'steps__step--inactive', 'third step is active');
    });
  });

});