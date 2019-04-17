import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

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
    const timerEnd = new Date();
    const elapsedTime = Math.abs(moment(model.timerStart).diff(moment(timerEnd)));
    let timerElapsed = elapsedTime > 59999
      ? moment.duration(elapsedTime).format("HH:mm:ss")
      : '00:01:00';
    if (timerElapsed.length < 6) {
      timerElapsed = `00:${ timerElapsed }`;
    }

    return LogsCollection.update(
      { _id: model._id },
      { $set: {
        timerEnd,
        timerElapsed
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
