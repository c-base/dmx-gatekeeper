import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  isSingleElement: Ember.computed.equal('lightFixture.elements.length', 1),
  style: Ember.computed('lightFixture.posY', 'lightFixture.posX', 'lightFixture.simpleColor', {
    get() {
     return Ember.String.htmlSafe(`
        top: ${get(this, 'lightFixture.posY')}px;
        left: ${get(this, 'lightFixture.posX')}px;
      `);
    }
  }),
});
