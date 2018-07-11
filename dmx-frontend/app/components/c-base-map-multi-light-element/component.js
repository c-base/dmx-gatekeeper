import Ember from 'ember';

export default Ember.Component.extend({
  selected: Ember.computed('selectedIds.[]', 'lightElements.@each.id', {
    get() {
      return get(this, 'selectedIds').includes(get(this, 'lightElement.id'));
    }
  }),
});
