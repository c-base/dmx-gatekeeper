import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse() {
    const data = this._super(...arguments);
    return data;
  },
  normalize() {
    const model = this._super(...arguments);
    
    const included = [model.data];
    Object.keys(model.data.relationships).forEach(key => {
      let rel = model.data.relationships[key];
      if(!Ember.isArray(rel)) {
        rel = [rel];
      }
      rel.forEach(item => {
        item.included.forEach(i => {
          included.push(i);
        });
        delete item.included;
      });
    });

    const data = { id: model.data.id, type: model.data.type };
    return { data, included };
  },
  extractRelationships(modelClass, resourceHash) {
    const relationships = {};

    modelClass.eachRelationship((key, relationshipMeta) => {
      if(relationshipMeta.kind === 'hasMany') {
        const relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, 'deserialize');

        relationships[relationshipKey] = resourceHash[relationshipKey].map(item => {
          item.id = `${resourceHash.id}-${item.name}`;
          const relationshipModelClass = this.store.modelFor(relationshipMeta.type);
          return this.normalize(relationshipModelClass, item);
        });
      }
    });

    return relationships;
  }
});
