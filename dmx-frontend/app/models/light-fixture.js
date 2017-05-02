import Ember from 'ember';
import DS from 'ember-data';

const {get} = Ember;
const {attr,hasMany} = DS;

export default DS.Model.extend({
  posX: attr('number'),
  posY: attr('number'),
  name: attr('string'),
  elements: hasMany('light-elements'),

  simpleColor: Ember.computed('elements.@each.simpleColor', {
    get() {
      const elements = get(this, 'elements').map(e => get(e, 'simpleColor'));
      if(elements.length > 0 && elements.every(e => e === elements[0])) {
        return elements[0]
      }

      return `repeating-linear-gradient(
        45deg,
        ${elements.map(e => `${e} 1px`).join(',')}
      )`;
    }
  }),
});
