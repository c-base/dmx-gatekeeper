import Ember from 'ember';

const {get} = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  start() {
    Ember.run.later(() => this.initWebSocketConn());
  },

  save(snapshot) {
    const socket = get(this, 'socket';
    if(socket) {
      debugger;
      socket.send(JSON.stringify({
        'channel_id': snapshot.id,
        value: snapshot.value
      }));
    } else {
      throw "I cant save it now :/";
    }
  },

  initWebSocketConn() {
    const socket = new WebSocket('ws://localhost:4200/api/v1/state/');
    socket.onopen = (...args) => this.onopen(...args);
    socket.onclose = (...args) => this.onclose(...args);
    socket.onmessage = (...args) => this.onmessage(...args);

    set(this, 'socket', socket);
  },
  onclose() {
    set(this, 'socket', null);
    // reopen
    Ember.run.later(() => this.initWebSocketConn());
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
