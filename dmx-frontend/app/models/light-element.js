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
      debugger;
      const channels = get(this, 'channels').map(c => get(c, 'name'));
      return channels.length === 3 &&
        channels.includes('red') &&
        channels.includes('green') &&
        channels.includes('blue');
    }
  }),
});
