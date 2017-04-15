import Ember from 'ember';
import {task} from 'ember-concurrency';

const {get,set} = Ember;

export default Ember.Component.extend({
  localClassNames: 'map',
  selectedLightInfos: Ember.computed('selectedIds.[]', 'lightInfos.@each.id', {
    get() {
      return get(this, 'lightInfos')
        .filter(li => get(this, 'selectedIds').includes(get(li, 'id')));
    }
  }),
  selectColor: task(function * (color) {
    let lights = yield Ember.RSVP.all(get(this, 'selectedLightInfos'));
    if(!lights || !get(lights, 'length')) {
      lights = get(this, 'lightInfos').toArray();
    }

    let status = yield Ember.RSVP.all(lights.map(li => get(li, 'status')));

    status.forEach(ls => {
      set(ls, 'rgbColor', color);
      ls.save();
    });
  }),
  actions: {
  }
});
