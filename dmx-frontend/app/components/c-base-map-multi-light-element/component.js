import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  selected: computed('selectedIds.[]', 'lightElements.@each.id', {
    get() {
      return this.lightElements
        .map(x => x.get('id'))
        .any(x => this.selectedIds.includes(x))
    }
  }),
  actions: {
    select() {
      const ids = this.lightElements.map(le => le.get('id'));

      if(this.selected) {
        // unselect
        this.select(this.selectedIds.filter(x => !ids.includes(x)));
      } else {
        // select
        this.select([...this.selectedIds, ...ids]);
      }
    },
  }
});
