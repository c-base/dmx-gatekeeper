import DS from 'ember-data';

const {attr,belongsTo} = DS;

export default DS.Model.extend({
  posX: attr('number'),
  posY: attr('number'),
  status: belongsTo('light-status'),
});
