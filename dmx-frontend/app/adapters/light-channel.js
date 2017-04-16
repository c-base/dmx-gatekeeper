import Ember from 'ember';
import DS from 'ember-data';

const {get} = Ember;

export default DS.Adapter.extend({
  state: Ember.inject.service(),
  updateRecord(store, type, snapshot) {
    const state = get(this, 'state');
    state.save(snapshot);

    return Ember.RSVP.resolve(undefined); // tell the store that all is OK.
  }
});