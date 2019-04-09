import { Meteor } from 'meteor/meteor';

import ProjectService from '../service/project-service.js';

Meteor.methods({
  'projects.findAll'() { return ProjectService.getProjects(); }
});
