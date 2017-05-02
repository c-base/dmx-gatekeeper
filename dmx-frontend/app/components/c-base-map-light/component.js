import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  style: Ember.computed('lightFixture.posY', 'lightFixture.posX', 'lightFixture.simpleColor', {
    get() {
     return Ember.String.htmlSafe(`
        top: ${get(this, 'lightFixture.posY')}px;
        left: ${get(this, 'lightFixture.posX')}px;
        background: ${get(this, 'lightFixture.simpleColor')};
      `);
    }
  }),

  selected: Ember.computed('selectedIds.[]', 'lightFixture.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightFixture.id'));
    }
  }),
  
  actions: {
    select() {
      if(get(this, 'selected')) {
        // unselect
        get(this, 'select')(get(this, 'selectedIds').without(get(this, 'lightFixture.id')));
      } else {
        // select
        get(this, 'select')([get(this, 'lightFixture.id'), ...get(this, 'selectedIds')]);
      }
    },
  }
});
