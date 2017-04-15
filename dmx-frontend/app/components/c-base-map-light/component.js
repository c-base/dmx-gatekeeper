import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  style: Ember.computed('lightFixtures.posY', 'lightFixtures.posX', 'lightFixtures.status.rgbColor', {
    get() {
      return Ember.String.htmlSafe(`
        top: ${get(this, 'lightFixtures.posY')}px;
        left: ${get(this, 'lightFixtures.posX')}px;
        background: ${get(this, 'lightFixtures.status.rgbColor')};
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
