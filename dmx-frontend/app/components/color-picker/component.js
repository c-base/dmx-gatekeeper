import Ember from 'ember';

const {get,set} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  colors: Ember.computed({
    get() {
      return get(this, 'store').findAll('color');
    }
  }),
  actions: {
    selectColor(color) {
      set(this, 'selectedColor', color);
      if(get(this, 'selectColor')) {
        get(this, 'selectColor')(color);
      }
    },
    addColor() {
      const color = get(this, 'selectedColor');
      const store = get(this, 'store');
      store.createRecord('color', {
        id: color
      }).save();
    },
  }
});
