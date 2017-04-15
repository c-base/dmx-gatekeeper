import Ember from 'ember';
import ApplicationAdapter from './application';

// const {get} = Ember;

export default ApplicationAdapter.extend({
  urlForFindAll() {
    return '/fixtures/'
  },
});
