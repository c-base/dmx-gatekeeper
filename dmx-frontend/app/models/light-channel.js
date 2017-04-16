import DS from 'ember-data';

const {attr,belongsTo} = DS;

export default DS.Model.extend({
  name: attr('string'),
  offset: attr('number'),
  element: belongsTo('light-element'),

  value: attr('number'),
});
