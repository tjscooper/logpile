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

  static remove(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('log.remove: invalid model');
    }
    return LogsCollection.remove({ _id: model._id });
  }
}
