import Ember from 'ember';
import DS from 'ember-data';

const {get} = Ember;
const {attr,belongsTo,hasMany} = DS;

export default DS.Model.extend({
  name: attr('string'),
  channels: hasMany('light-channel'),
  fixture: belongsTo('light-fixture'),

  isRGB: Ember.computed('channels.@each.name', {
    get() {
      let channels = get(this, 'channels').map(c => get(c, 'name'));
      return Ember.compare(channels.sort(), ['b', 'g', 'r']) === 0;
    }
  }),
  rgbColor: Ember.computed({
    get() {
      const channels = get(this, 'channels');
      [
        channels.findBy('name', 'r'),
        channels.findBy('name', 'r'),
        channels.findBy('name', 'r'),
      ].map(c => get(c, 'value')).map(c => c.toString(16));
    },
    set(key, val) {

    }
  })
});
