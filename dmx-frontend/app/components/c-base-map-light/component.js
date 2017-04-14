import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  style: Ember.computed('lightInfo.posY', 'lightInfo.posX', 'lightInfo.status.rgbColor', {
    get() {
      return Ember.String.htmlSafe(`
        top: ${get(this, 'lightInfo.posY')}px;
        left: ${get(this, 'lightInfo.posX')}px;
        background: ${get(this, 'lightInfo.status.rgbColor')};
      `);
    }
  }),

  selected: Ember.computed('selectedIds.[]', 'lightInfo.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightInfo.id'));
    }
  }),
  
  actions: {
    select() {
      if(get(this, 'selected')) {
        // unselect
        get(this, 'select')(get(this, 'selectedIds').without(get(this, 'lightInfo.id')));
      } else {
        // select
        get(this, 'select')([get(this, 'lightInfo.id'), ...get(this, 'selectedIds')]);
      }
    },
  }
});
