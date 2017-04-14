import { faker } from 'ember-cli-mirage';

export default function(server) {

  faker.seed(3434);

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  server.createList('light-info', 10).forEach(info => {
    server.create('light-status', { info });
  });
}
