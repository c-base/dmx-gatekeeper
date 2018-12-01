import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import {get,computed} from '@ember/object';

export default DS.Model.extend({
  channels: hasMany('preset-channel'),
  rgb: computed('channels.@each.{name,value}', function() {
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
  }),
});
