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
    const vals = {
      r: Number.parseInt([...color].slice(1, 3).join(''), 16),
      g: Number.parseInt([...color].slice(3, 5).join(''), 16),
      b: Number.parseInt([...color].slice(5, 7).join(''), 16),
    };

    const channels = get(this, 'selectedLightFixtures')
      .reduce((arr, fixture) => [...get(fixture, 'elements').toArray(), ...arr], [])
      .reduce((arr, element) => [...get(element, 'channels').toArray(), ...arr], []);
    
    channels.forEach(c => {
      let name = get(c, 'name');
      if(vals[name] !== undefined) {
        set(c, 'value', vals[name]);
      }
    });

    yield Ember.RSVP.all(channels.map(channel => channel.save()));

    // const fixtures = yield Ember.RSVP.all(get(this, 'selectedLightFixtures'));
    // const elements = yield Ember.RSVP.all(fixtures.reduce((e, fixture) => [get(fixture, 'elements'), ...e], []));
    // const channels = yield Ember.RSVP.all(elements.reduce((c, element) => [get(element, 'channels'), ...c], []));

    // const channels = get(this, 'selectedLightFixtures')
    //   .reduce((e, fixture) => [get(fixture, 'elements'), ...e], [])
    //   .reduce((c, element) => [get(element, 'channels'), ...c], []);

    

    // console.log(channels);
    // debugger;
    // if(!lights || !get(lights, 'length')) {
    //   lights = get(this, 'lightFixtures').toArray();
    // }

    // let status = yield Ember.RSVP.all(lights.map(li => get(li, 'status')));

    // status.forEach(ls => {
    //   set(ls, 'rgbColor', color);
    //   ls.save();
    // });
  }),
  actions: {
  }
});
