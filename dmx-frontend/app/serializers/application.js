import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalize(typeClass, hash, parentId) {
    const type = typeClass.modelName;
    const id = this.extractId(typeClass, hash, parentId);

    const { relationships, included } = this.extractRelationships(typeClass, hash, id);

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

  normalizeArrayResponse(store, primaryModelClass, payload) {
    const dataArr = [];
    const includedArr = [];
    payload.forEach(element => {
      const {data, included} = this.normalize(primaryModelClass, element);
      dataArr.push(data);
      included.forEach(i => includedArr.push(i));
    })

    return {data: dataArr, included: includedArr};
  },
  extractRelationships(modelClass, resourceHash, elementId) {
    const relationships = {};
    const included = [];

    modelClass.eachRelationship((key, relationshipMeta) => {
      if(relationshipMeta.kind === 'hasMany') {
        const relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
        const relationshipData = [];
        resourceHash[relationshipKey].forEach(item => {

          const relationshipModelClass = this.store.modelFor(relationshipMeta.type);

          const normalized = this.normalize(relationshipModelClass, item, elementId);

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
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  },
  extractId(typeClass, hash, parentId) {
    let idKey = Object.keys(hash).find(key => key.endsWith('_id'));
    if(idKey) {
      return hash[idKey];
    }

    if(hash.name) {
      return `${parentId}/'#/${hash.name}`
    }

    return Ember.guidFor(hash);
  },
});
