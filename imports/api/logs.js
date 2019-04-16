import { Meteor } from 'meteor/meteor';

import Log, { LogsCollection } from '../model/log.js';
import LogService from '../service/log-service.js';

if (Meteor.isServer) {
  Meteor.publish('logs', logsPublication = () => {
    return LogsCollection.find({}, { sort: { timerStart: 1 } });
  });

  Meteor.publish('log', logsPublication = ({ logId }) => {
    return LogsCollection.find(logId);
  });

  Meteor.publish('log.last', logsPublication = () => {
    return LogsCollection.find({}, { sort: { timerStart: -1 }, limit: 1 });
  });
}

Meteor.methods({
  'logs.insert'(model) { return LogService.insert(model); },
  'logs.update'(model) { return LogService.update(model); },
  'logs.update.last'(model) { return LogService.updateLastLog(model); },
  'logs.remove'(model) { return LogService.remove(model); },
});
