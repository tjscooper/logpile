/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { LogType } from '../imports/model/log.js';
import LogTypeService from '../imports/service/log-type-service.js';

if (Meteor.isServer) {
  describe('LogTypes', () => {
    describe('methods', () => {

      const logTypes = LogType.getIdentifiers();
      
      it('can set log type as code review', () => {
        const value = LogType.PR_REVIEW;
        assert.equal(value, 1);
        assert.equal(logTypes[value -1], 'PR_REVIEW');
      });

      it('can get a title and icon for code review log', () => {
        const { icon, title } = LogTypeService.getInfo('PR_REVIEW');
        // Verify that the beforeEach method does what we expected
        assert.equal(icon.type.displayName, 'FontAwesomeIcon');
        assert.equal(title, 'Review Code');
      });

      it('can set log type as playing ping pong', () => {
        const value = LogType.PING_PONG;
        assert.equal(value, 8);
        assert.equal(logTypes[value -1], 'PING_PONG');
      });

      it('can get a title and icon for ping pong log', () => {
        const { icon, title } = LogTypeService.getInfo('PING_PONG');
        // Verify that the beforeEach method does what we expected
        assert.equal(icon.type.displayName, 'FontAwesomeIcon');
        assert.equal(title, 'Ping Pong');
      });
    });
  });
}
