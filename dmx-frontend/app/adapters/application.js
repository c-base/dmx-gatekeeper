import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  findAll() {
    return this._super(...arguments);
  }
});
