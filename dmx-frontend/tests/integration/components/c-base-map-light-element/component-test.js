import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-base-map-light-element', 'Integration | Component | c base map light element', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{c-base-map-light-element}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#c-base-map-light-element}}
      template block text
    {{/c-base-map-light-element}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
