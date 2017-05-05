import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  tagName: '',

  buttonStyle: Ember.computed('lightElement.simpleColor', {
    get() {
      return Ember.String.htmlSafe(`
        background: ${get(this, 'lightElement.simpleColor')};
      `);
    }
  }),

  selected: Ember.computed('selectedIds.[]', 'lightElement.id', {
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
