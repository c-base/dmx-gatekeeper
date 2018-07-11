import ApplicationAdapter from './application';

// const {get} = Ember;

export default ApplicationAdapter.extend({
  urlForFindAll() {
    return 'api/v1/fixtures/'
  },
});

