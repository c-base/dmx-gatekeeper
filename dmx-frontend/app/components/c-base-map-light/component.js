import { htmlSafe } from '@ember/string';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['light'],
  isSingleElement: equal('lightFixture.elements.length', 1),
  style: computed('lightFixture.posY', 'lightFixture.posX', 'lightFixture.simpleColor', {
    get() {
     return htmlSafe(`
        top: ${get(this, 'lightFixture.posY')}px;
        left: ${get(this, 'lightFixture.posX')}px;
      `);
    }
  }),
});
