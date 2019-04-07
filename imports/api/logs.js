import { Meteor } from 'meteor/meteor';

import Log from '../model/log.js';
import LogService from '../service/log-service.js';

if (Meteor.isServer) {
  Meteor.publish('logs', function logsPublication() {
    return Log.find({}, { sort: { createdAt: -1 } });
  });
}

Meteor.methods({
  'logs.insert'(model) { return LogService.insert(model); },
  'logs.update'(model, field, value) { return LogService.update(model, field, value); },
  'logs.remove'(model) { return LogService.remove(model); },
});
