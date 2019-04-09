import { Meteor } from 'meteor/meteor';

import TaskService from '../service/task-service.js';

Meteor.methods({
  'tasks.findAll'(projectId) { return TaskService.getTasks(projectId); }
});
