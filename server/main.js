import { Meteor } from 'meteor/meteor';
import Log, { LogType } from '/imports/model/log';
import '/imports/api/logs.js';

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
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
