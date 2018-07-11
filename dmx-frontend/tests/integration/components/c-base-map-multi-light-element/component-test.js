import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-base-map-multi-light-element', 'Integration | Component | c base map multi light element', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{c-base-map-multi-light-element}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#c-base-map-multi-light-element}}
      template block text
    {{/c-base-map-multi-light-element}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
