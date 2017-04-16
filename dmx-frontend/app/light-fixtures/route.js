import Ember from 'ember';

const {get} = Ember;

export default Ember.Route.extend({
  state: Ember.inject.service(),
  model() {
    return this.store.findAll('light-fixture');
  },
  afterModel() {
    get(this, 'state').start();
  }
});
