import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  buttonStyle: computed('lightElement.simpleColor', {
    get() {
      return htmlSafe(`
        background: ${get(this, 'lightElement.simpleColor')};
      `);
    }
  }),

  selected: computed('selectedIds.[]', 'lightElement.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightElement.id'));
    }
  }),
  actions: {
    select() {
      if(get(this, 'selected')) {
        // unselect
        get(this, 'select')(get(this, 'selectedIds').without(get(this, 'lightElement.id')));
      } else {
        // select
        get(this, 'select')([get(this, 'lightElement.id'), ...get(this, 'selectedIds')]);
      }
    },
  }
});
