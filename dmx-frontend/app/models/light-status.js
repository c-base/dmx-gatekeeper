import DS from 'ember-data';

const {attr,belongsTo} = DS;

export default DS.Model.extend({
  rgbColor: attr('string'),
  info: belongsTo('light-info'),
});
