import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import RSVP from 'rsvp';

export default Component.extend({
  values: null,
  store: service(),
  init() {
    this._super(...arguments);
    this.set('values', []);
  },
  presets: computed({
    get() {
      return this.store.findAll('preset');
    },
  }),
  lightChannels: computed({
    get() {
      return get(this, 'store').peekAll('light-channel');
    }
  }),
  nonRgbChannels: computed('channels.@each.name', 'values.@each.{name,value}', {
    get() {
      return this.lightChannels
        .map(c => c.get('name'))
        .uniq()
        .filter(c => !['r', 'g', 'b'].includes(c))
        .map(name => {
          const value = this.values.find(v => v.name === name);
          if(value) {
            return value;
          }
          return {name, disabled: true};
        });
    }
  }),
  currentRgb: computed('channels.@each.name', 'values.@each.{name,value}', {
    get() {
      const colors = ['r', 'g', 'b']
        .map(c => this.values.find(v => v.name === c))
        .filter(x => x)
        .map(c => c.value);
      if(colors.length !== 3) {
        return null;
      }

      return `#${colors.map(v => v.toString(16).padStart(2, '0')).join('')}`;
    }
  }),
  actions: {
    selectChannelValue(name, value) {
      const other = this.values.filter(v => v.name !== name);
      if(value === null) {
        this.set('values', other);
      } else {
        value = parseInt(value);
        this.set('values', [{ name, value }, ...other]);
      }
    },
    selectColor(color) {
      const vals = {
        r: Number.parseInt([...color].slice(1, 3).join(''), 16),
        g: Number.parseInt([...color].slice(3, 5).join(''), 16),
        b: Number.parseInt([...color].slice(5, 7).join(''), 16),
      };
      Object.keys(vals)
        .forEach(k => this.send('selectChannelValue', k, vals[k]));
    },
    clear() {
      this.set('values', []);
    },
    enableRgb() {
      this.set('values', [
        { name: 'r', value: 0 },
        { name: 'g', value: 0 },
        { name: 'b', value: 0 },
        ...this.values,
      ]);
    },
    disableRgb() {
      this.set('values', this.values.filter(v => !['r', 'g', 'b'].includes(v.name)));
    },
    async save() {
      const id = Math.random().toString().substr(2);
      const preset = this.store.createRecord('preset', {id});
      await preset.save();

      await RSVP.all(this.values.map(value => this.store.createRecord('preset-channel', {
        id: `${id}-${value.name}`,
        value: value.value,
        name: value.name,
        preset,
      }).save()));
    },
    deletePreset(preset) {
      preset.destroyRecord()
    },
  }
});
