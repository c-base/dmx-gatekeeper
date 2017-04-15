import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(typeClass, hash) {
    console.log('normalize', typeClass.modelName);
    console.log(hash);
    console.log(this._super(...arguments));
    return this._super(...arguments);
  },
  extractRelationships(modelClass, resourceHash) {
    const relationships = {};

    modelClass.eachRelationship((key, relationshipMeta) => {
      const relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, 'deserialize');

      relationships[relationshipKey] = {
        [relationshipKey]: resourceHash[relationshipKey].map(item => {
          item.id = `${resourceHash.id}-${item.name}`;
          return this.normalize(relationshipMeta.type, item);
        })
      }
    });
  }
});
