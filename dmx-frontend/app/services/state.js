import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';

const {get,set} = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  start() {
    Ember.run.later(() => get(this, 'initWebSocketConn').perform());
  },

  toSave: [],

  save(snapshot) {
    get(this, 'toSave').pushObject(snapshot);

    get(this, 'flushSave').perform();
  },

  flushSave: task(function * () {
    yield timeout(1);

    const socket = get(this, 'socket');

    if(!socket) {
      throw "not good";
    }

    const toSave = get(this, 'toSave');
    set(this, 'toSave', []);

    if(get(toSave, 'length')) {
      let data = toSave.map(snapshot => ({
        'channel_id': snapshot.id,
          value: snapshot.attr('value')
      }));
      
      console.log('flush', data);
      socket.send(JSON.stringify(data));
    }
  }).enqueue(),

  initWebSocketConn: task(function * (ms = 0) {
    yield timeout(ms);

    const socket = new WebSocket(`ws://${window.location.host}/api/v1/websocket_state/`);
    socket.onopen = (...args) => this.onopen(...args);
    socket.onclose = (...args) => this.onclose(...args);
    socket.onmessage = (...args) => this.onmessage(...args);

    set(this, 'socket', socket);
  }).drop(),

  onclose() {
    set(this, 'socket', null);
    // reopen
    Ember.run.later(() => get(this, 'initWebSocketConn').perform(1000));
  },


  onmessage(message) {
    const payload = JSON.parse(message.data);

    const store = get(this, 'store');

    const typeClass = store.modelFor('light-channel');
    const serializer = store.serializerFor('light-channel');
    const normalized = serializer.normalizeArrayResponse(store, typeClass, payload);

    store.push(normalized);
  },
  onopen() {

  }
});
