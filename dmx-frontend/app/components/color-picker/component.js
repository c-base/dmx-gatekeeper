import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';

export default Component.extend({
  store: service(),
  colors: computed({
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
    deleteColor(color, event) {
      color.destroyRecord();
      event.stopPropagation();
    },
  }
});
