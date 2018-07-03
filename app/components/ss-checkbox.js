import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui', 'checkbox'],
  classNameBindings: ['checked:checked', 'readonly:read-only'],
  checked: false,

  click() {
    if (this.get('disabled') || this.get('readonly')) {
      return;
    }

    let action = this.get('onChange');
    if (typeof action === 'function') {
      let checked = !this.get('checked');
      action(checked);
    }
  }

});
