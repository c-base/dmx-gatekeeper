import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import DS from 'ember-data';

export default DS.Adapter.extend({
  state: service(),
  updateRecord(store, type, snapshot) {
    const state = get(this, 'state');
    state.save(snapshot);

    return resolve(undefined); // tell the store that all is OK.
  }
});