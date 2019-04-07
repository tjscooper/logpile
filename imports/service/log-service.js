import Log from '../model/log.js';

export default class LogService {

  constructor() { }

  static insert(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('logs.insert: invalid model');
    }
    return model.save();
  }

  static update(model, field, value) {
    if (!model instanceof Log) {
      throw new Meteor.Error('logs.update: invalid model');
    }
    model.set(field, value);
    return model.save();
  }

  static remove(model) {
    if (!model instanceof Log) {
      throw new Meteor.Error('log.remove: invalid model');
    }
    return model.remove();
  }
}
