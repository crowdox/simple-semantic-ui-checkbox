import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ss-checkbox', 'Integration | Component | ss checkbox', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ss-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ss-checkbox}}
      template block text
    {{/ss-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders and changes', function(assert) {
  assert.expect(2);

  let count = 0;
  this.set('changed', () => {
    count++;
  });

  this.set('checked', false);
  this.render(hbs`
    {{#ss-checkbox checked=checked onChange=(action changed)}}
      <label>Make my profile visible</label>
    {{/ss-checkbox}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  assert.equal(count, 0, 'onChange should not have been called');
});

test('checking will update the bound property', function(assert) {
  assert.expect(3);

  let count = 0;
  this.set('changed', (value) => {
    this.set('checked', value);
    count++;
  });

  this.set('checked', false);
  this.render(hbs`
    {{#ss-checkbox checked=checked onChange=(action changed)}}
      <label>Make my profile visible</label>
    {{/ss-checkbox}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
  assert.equal(count, 1, 'onChange should have only been called once');
});

test('setting disabled ignores click', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('checked', value);
    count++;
  });

  this.set('checked', false);
  this.set('disabled', true);
  this.render(hbs`
    {{#ss-checkbox checked=checked disabled=disabled onChange=(action changed)}}
      <label>Make my profile visible</label>
    {{/ss-checkbox}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('disabled', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
  assert.equal(count, 1, 'onChange should have only been called once');
});

test('setting readonly ignores click', function(assert) {
  assert.expect(4);

  let count = 0;
  this.set('changed', (value) => {
    this.set('checked', value);
    count++;
  });

  this.set('checked', false);
  this.set('readonly', true);
  this.render(hbs`
    {{#ss-checkbox checked=checked readonly=readonly onChange=(action changed)}}
      <label>Make my profile visible</label>
    {{/ss-checkbox}}
  `);

  assert.equal(this.$('.ui.checkbox').length, 1);
  this.$('.ui.checkbox').click();
  assert.equal(false, this.get('checked'));

  this.set('readonly', false);
  this.$('.ui.checkbox').click();
  assert.equal(true, this.get('checked'));
  assert.equal(count, 1, 'onChange should have only been called once');
});