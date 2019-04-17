import { Class, Enum } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

export const LogsCollection = new Mongo.Collection('logs');

export const LogType = Enum.create({
  name: 'LogType',
  identifiers: {
    PR_REVIEW: 1,
    PR_SUBMIT: 2,
    PROJECT_WORK: 3,
    MEETING: 4,
    CALLOUT: 5,
    CALL: 6,
    BREAK: 7,
    PING_PONG: 8,
    STUFF: 9
  }
});

export default Log = Class.create({
  name: 'Log',
  collection: LogsCollection,
  fields: {
    name: {
      type: String,
      optional: true
    },
    projectId: String,
    taskId: {
      type: String,
      optional: true
    },
    notes: {
      type: String,
      optional: true
    },
    userId: String,
    type: {
      type: LogType
    },
    link: String,
    timerStart: {
      type: Date,
      default: () => new Date(),
      optional: true
    },
    timerEnd: {
      type: Date,
      optional: true
    },
    timerElapsed: {
      type: Date,
      optional: true
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
});
