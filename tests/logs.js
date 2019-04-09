/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import Log, { LogType, LogsCollection } from '../imports/model/log.js';

if (Meteor.isServer) {
  describe('Logs', () => {
    describe('methods', () => {

      let log;
      let log2;

      beforeEach(() => {
        LogsCollection.remove({});

        log = new Log({
          projectId: 'abc',
          userId: 'user_01',
          type: LogType.PR_REVIEW,
          link: 'http://github.com/tjscooper/logpile'
        });
        log.save();

        log2 = new Log({
          projectId: 'def',
          userId: 'user_01',
          type: LogType.MEETING,
          link: 'http://meet.google.com'
        });
      });

      it('can create a log using logs.insert method', () => {
        const method = Meteor.server.method_handlers['logs.insert'];
        console.log('method', method);
        // Run the method with `this` set to the fake invocation
        method.apply({}, [log2]);

        // Verify that the beforeEach method does what we expected
        assert.equal(Log.find().count(), 2);
      });

      it('can update a log using logs.update method', () => {
        const method = Meteor.server.method_handlers['logs.update'];

        log = Log.findOne({ projectId: 'abc' });

        // Run the method with `this` set to the fake invocation
        method.apply({}, [log, 'link', 'http://join.me']);

        log2 = Log.findOne({ projectId: 'abc' });
        assert.isObject(log2);
        assert.equal(log2.link, 'http://join.me');
      });

      it('can delete a log using logs.remove method', () => {
        const method = Meteor.server.method_handlers['logs.remove'];

        log = Log.findOne({ projectId: 'abc' });

        method.apply({}, [log]);

        // Verify that the method does what we expected
        assert.equal(Log.find().count(), 0);
      });

    });
  });
}
