import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ss checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{ss-checkbox}}`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      {{#ss-checkbox}}
        template block text
      {{/ss-checkbox}}
    `);

    assert.dom().hasText('template block text');
  });

  test('it renders and changes', async function(assert) {
    assert.expect(2);

    let count = 0;
    this.set('changed', () => {
      count++;
    });

    this.set('checked', false);
    await render(hbs`
      {{#ss-checkbox checked=checked onChange=(action changed)}}
        <label>Make my profile visible</label>
      {{/ss-checkbox}}
    `);

    assert.dom('.ui.checkbox').exists();
    assert.equal(count, 0, 'onChange should not have been called');
  });

  test('checking will update the bound property', async function(assert) {
    assert.expect(3);

    let count = 0;
    this.set('changed', (value) => {
      this.set('checked', value);
      count++;
    });

    this.set('checked', false);
    await render(hbs`
      {{#ss-checkbox checked=checked onChange=(action changed)}}
        <label>Make my profile visible</label>
      {{/ss-checkbox}}
    `);

    assert.dom('.ui.checkbox').exists();
    await click('.ui.checkbox');
    assert.equal(true, this.get('checked'));
    assert.equal(count, 1, 'onChange should have only been called once');
  });

  test('setting disabled ignores click', async function(assert) {
    assert.expect(4);

    let count = 0;
    this.set('changed', (value) => {
      this.set('checked', value);
      count++;
    });

    this.set('checked', false);
    this.set('disabled', true);
    await render(hbs`
      {{#ss-checkbox checked=checked disabled=disabled onChange=(action changed)}}
        <label>Make my profile visible</label>
      {{/ss-checkbox}}
    `);

    assert.dom('.ui.checkbox').exists();
    await click('.ui.checkbox');
    assert.equal(false, this.get('checked'));

    this.set('disabled', false);
    await click('.ui.checkbox');
    assert.equal(true, this.get('checked'));
    assert.equal(count, 1, 'onChange should have only been called once');
  });

  test('setting readonly ignores click', async function(assert) {
    assert.expect(4);

    let count = 0;
    this.set('changed', (value) => {
      this.set('checked', value);
      count++;
    });

    this.set('checked', false);
    this.set('readonly', true);
    await render(hbs`
      {{#ss-checkbox checked=checked readonly=readonly onChange=(action changed)}}
        <label>Make my profile visible</label>
      {{/ss-checkbox}}
    `);

    assert.dom('.ui.checkbox').exists();
    await click('.ui.checkbox');
    assert.equal(false, this.get('checked'));

    this.set('readonly', false);
    await click('.ui.checkbox');
    assert.equal(true, this.get('checked'));
    assert.equal(count, 1, 'onChange should have only been called once');
  });
});
