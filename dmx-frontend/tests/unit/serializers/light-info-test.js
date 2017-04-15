import { moduleForModel, test } from 'ember-qunit';

moduleForModel('light-info', 'Unit | Serializer | light info', {
  // Specify the other units that are required for this test.
  needs: ['serializer:light-info']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
