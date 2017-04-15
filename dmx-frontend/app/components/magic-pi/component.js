import Ember from 'ember';

const {get,set} = Ember;

export default Ember.Component.extend({
  magic: Ember.inject.service(),
  actions: {
    pi(event) {
      if(event.shiftKey && event.ctrlKey && !get(this, 'magic.active')) {
        set(this, 'magic.active', true);
        set(this, 'showWarning', true);
      }

      return false;
    },
    continue() {
      set(this, 'showWarning', false);
    },
  }
});
