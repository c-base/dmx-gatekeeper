import DS from 'ember-data';

const {attr,hasMany} = DS;

export default DS.Model.extend({
  posX: attr('number'),
  posY: attr('number'),
  name: attr('string'),
  elements: hasMany('light-elements'),
});
