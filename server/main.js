// import { Meteor } from 'meteor/meteor';
import '/imports/api/logs.js';
import '/imports/api/projects.js';
import '/imports/api/tasks.js';

/*
Meteor.startup(() => {
  // Data Seed :)
  if (Log.find().count() === 0) {
    Log.insert({
      projectId: 'abc',
      userId: 'efg',
      type: LogType.PR_REVIEW,
      link: 'http://google.com'
    });

    Log.insert({
      projectId: 'abc',
      userId: 'efg',
      type: LogType.PR_SUBMIT,
      link: 'http://apple.com'
    });
  }
});
*/
