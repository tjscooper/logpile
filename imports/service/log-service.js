import Log, { LogsCollection } from '../model/log.js';
export default class LogService {

  static insert(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('logs.insert: invalid model');
    }
    return model.save();
  }

  static update(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('logs.update: invalid model');
    }
    return LogsCollection.update(
      { _id: model._id },
      { $set: model }
    );
  }

  static updateLastLog(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('logs.update.last: invalid model');
    }
    const endTime = Date.now();
    const elapsedTime = endTime - model.timerStart;
    return LogsCollection.update(
      { _id: model._id },
      { $set: {
        timerEnd: endTime,
        timerElapsed: elapsedTime
      } }
    );
  }

  static remove(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('log.remove: invalid model');
    }
    return LogsCollection.remove({ _id: model._id });
  }
}
