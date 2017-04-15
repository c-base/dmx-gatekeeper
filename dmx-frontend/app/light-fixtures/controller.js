import Ember from 'ember';

const {set} = Ember;

export default Ember.Controller.extend({
  lightFixtures: Ember.computed.alias('model'),
  queryParams: ['selectedIds'],
  selectedIds: [],
  actions: {
    select(selected) {
      set(this, 'selectedIds', selected);
    }
  }
});
