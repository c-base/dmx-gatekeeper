import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  posX: () => faker.random.number({ min: 0, max: 800 }),
  posY: () => faker.random.number({ min: 0, max: 569 }),
  // status: association(),
});
