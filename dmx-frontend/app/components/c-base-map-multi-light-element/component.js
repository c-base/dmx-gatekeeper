import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  selected: computed('selectedIds.[]', 'lightElements.@each.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightElement.id'));
    }
  }),
});
