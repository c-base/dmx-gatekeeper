import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
  magic: service(),
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
