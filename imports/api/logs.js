import { Meteor } from 'meteor/meteor';

import Log, { LogsCollection } from '../model/log.js';
import LogService from '../service/log-service.js';

if (Meteor.isServer) {
  Meteor.publish('logs', logsPublication = () => {
    return LogsCollection.find({}, { sort: { createdAt: -1 } });
  });

  Meteor.publish('log', logsPublication = ({ logId }) => {
    return LogsCollection.find(logId);
  });
}

Meteor.methods({
  'logs.insert'(model) { return LogService.insert(model); },
  'logs.update'(model) { return LogService.update(model); },
  'logs.remove'(model) { return LogService.remove(model); },
});
