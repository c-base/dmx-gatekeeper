import Ember from 'ember';
import {task} from 'ember-concurrency';

const {get,set} = Ember;

export default Ember.Component.extend({
  localClassNames: 'map',
  selectedLightFixtures: Ember.computed('selectedIds.[]', 'lightFixtures.@each.id', {
    get() {
      return get(this, 'lightFixtures')
        .filter(li => get(this, 'selectedIds').includes(get(li, 'id')));
    }
  }),
  selectColor: task(function * (color) {
    let lights = yield Ember.RSVP.all(get(this, 'selectedLightFixtures'));
    if(!lights || !get(lights, 'length')) {
      lights = get(this, 'lightFixtures').toArray();
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
