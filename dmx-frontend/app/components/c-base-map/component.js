import { all } from 'rsvp';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  localClassNames: 'map',
  lightElements: computed('lightFixtures.@each.elements', {
    get() {
      return get(this, 'lightFixtures')
        .map(f => get(f, 'elements').toArray())
        .reduce((a, b) => [...a, ...b], []);
    }
  }),
  selectedLightElements: computed('selectedIds.[]', 'lightElements.@each.id', {
    get() {
      return get(this, 'lightElements')
        .filter(li => get(this, 'selectedIds').includes(get(li, 'id')));
    }
  }),
  selectedChannels: computed('selectedLightElements.@each.channels', function() {
    return this.selectedLightElements.map(l => l.get('channels'))
      .reduce((a,b) => [...a.toArray(), ...b.toArray()], []);
  }),
  // selectWhite: task(function * (on) {
  //   const vals = on
  //     ? { cw: 102, ww: 51, dim: 128 }
  //     : { cw: 0, ww: 0, dim: 0 };

  //   yield this.get('setVals').perform(vals);
  // }),
  // selectColor: task(function * (color) {
  //   const vals = {
  //     r: Number.parseInt([...color].slice(1, 3).join(''), 16),
  //     g: Number.parseInt([...color].slice(3, 5).join(''), 16),
  //     b: Number.parseInt([...color].slice(5, 7).join(''), 16),
  //   };

  //   yield this.get('setVals').perform(vals);
  // }),
  // setVals: task(function * (vals) {
  //   const channels = get(this, 'selectedLightElements')
  //     .reduce((arr, element) => [...get(element, 'channels').toArray(), ...arr], []);

  //   channels.forEach(c => {
  //     let name = get(c, 'name');
  //     if(vals[name] !== undefined) {
  //       set(c, 'value', vals[name]);
  //     }
  //   });

  //   yield all(channels.map(channel => channel.save()));
  // }),
  actions: {
    selectAll() {
      get(this, 'select')(get(this, 'lightElements').map(f => get(f, 'id')));
    },
    deselectAll() {
      get(this, 'select')([]);
    },
    setChannel(name, value) {
      const channels = get(this, 'selectedLightElements')
        .reduce((arr, element) => [...get(element, 'channels').toArray(), ...arr], []);

        channels.filter(c => c.name === name)
          .forEach(c => {
            c.set('value', value)
            c.save();
          });
    },
  }
});
