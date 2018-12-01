import { get, computed } from '@ember/object';
import DS from 'ember-data';

const {attr,belongsTo,hasMany} = DS;

export default DS.Model.extend({
  name: attr('string'),
  channels: hasMany('light-channel'),
  fixture: belongsTo('light-fixture'),

  simpleColor: computed('channels.@each.{name,value}', {
    get() {
      const channels = get(this, 'channels');

      const r = channels.findBy('name', 'r');
      const b = channels.findBy('name', 'b');
      const g = channels.findBy('name', 'g');

      if((get(channels, 'length') === 3) && r && g && b) {
        return '#' + [r,g,b]
          .map(c => get(c, 'value') || 0)
          .map(c => c.toString(16))
          .map(c => c.padStart(2, '0'))
          .join('');
      }

      return `repeating-linear-gradient(
        45deg,
        white,
        white 5px,
        #aaa 5px,
        #aaa 10px
      )`;
    },
  })
});
