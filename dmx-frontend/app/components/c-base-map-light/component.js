import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  style: Ember.computed('lightFixtures.posY', 'lightFixtures.posX', 'lightFixture.simpleColor', {
    get() {
     return Ember.String.htmlSafe(`
        top: ${get(this, 'lightFixture.posY')}px;
        left: ${get(this, 'lightFixture.posX')}px;
        background: ${get(this, 'lightFixture.simpleColor')};
      `);
    }
  }),

  selected: Ember.computed('selectedIds.[]', 'lightFixtures.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightFixtures.id'));
    }
  }),
  
  actions: {
    select() {
      if(get(this, 'selected')) {
        // unselect
        get(this, 'select')(get(this, 'selectedIds').without(get(this, 'lightFixtures.id')));
      } else {
        // select
        get(this, 'select')([get(this, 'lightFixtures.id'), ...get(this, 'selectedIds')]);
      }
    },
  }
});
