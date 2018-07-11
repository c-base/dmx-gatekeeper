import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  lightFixtures: alias('model'),
  queryParams: ['selectedIds'],
  selectedIds: [],
  actions: {
    select(selected) {
      set(this, 'selectedIds', selected);
    }
  }
});
