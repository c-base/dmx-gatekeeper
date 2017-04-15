import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalize(typeClass, hash) {
    const { relationships, included } = this.extractRelationships(typeClass, hash);

    const type = typeClass.modelName;
    const id = this.extractId(typeClass, hash);

    return {
      data: {type, id},
      included: [{
        type,
        id,
        relationships,
        attributes: this.extractAttributes(typeClass, hash)
      }, ...included]
    };
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const dataArr = [];
    const includedArr = [];
    payload.forEach(element => {
      const {data, included} = this.normalize(primaryModelClass, element);
      dataArr.push(data);
      included.forEach(i => includedArr.push(i));
    })

    return {data: dataArr, included: includedArr};
  },
  extractRelationships(modelClass, resourceHash) {
    const relationships = {};
    const included = [];

    modelClass.eachRelationship((key, relationshipMeta) => {
      if(relationshipMeta.kind === 'hasMany') {
        const relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
        const relationshipData = [];
        resourceHash[relationshipKey].forEach(item => {
          item.id = `${resourceHash.id}-${item.name}`;
          item.type = relationshipMeta.type;

          const relationshipModelClass = this.store.modelFor(relationshipMeta.type);

          const normalized = this.normalize(relationshipModelClass, item);

          relationshipData.push(normalized.data);
          normalized.included.forEach(i => included.push(i));
        });
        relationships[relationshipKey] = {data: relationshipData};
      }
    });

    return {relationships, included};
  },
  extractAttributes(modelClass, resourceHash) {
    return this._super(modelClass, { attributes: resourceHash });
  },
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },
});
