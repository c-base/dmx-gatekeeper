import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  state: service(),
  async model() {
    await this.store.findAll('preset');
    await this.store.findAll('preset-channel');
    return this.store.findAll('light-fixture');
  },
  afterModel() {
    get(this, 'state').start();
  }
});
