import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { LogsCollection } from '/imports/model/log.js';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

import { LogType } from '/imports/model/log';
import LogTypeService from '/imports/service/log-type-service';

const ROOT_CSS = css({
  marginTop: 0,
  height: 850,
  width: '100%'
});

const TIMELINE_CSS = css({
  background: '#dedede'
});

class Timeline extends Component {

  render() {
    if (!this.props.logs) {
      return null;
    }
    return (
      <div className={ TIMELINE_CSS }>
        <ScrollToBottom className={ ROOT_CSS }>
          <VerticalTimeline>
            { this.props.logs.map(log => this.makeLogElement(log)) }
          </VerticalTimeline>
        </ScrollToBottom>
      </div>
    );
  }

  makeLogElement(log) {
    let logType = LogType.getIdentifier(log.type);
    const buttonInfo = LogTypeService.getInfo(logType);

    return (
      <VerticalTimelineElement
        key={ log._id }
        className="vertical-timeline-element"
        date={ moment(log.createdAt).format('h:mm A') }
        iconStyle={{
          background: 'rgb(33, 150, 243)',
          color: '#fff',
          fontSize: 21
        }}
        icon={ buttonInfo.icon }>
        <h3 className="vertical-timeline-element-title">{ buttonInfo.title }</h3>
        <h4 className="vertical-timeline-element-subtitle">{ log.projectId }</h4>
        <p>
          { log.link }
        </p>
      </VerticalTimelineElement>
    );
  }
}

export default TimelineContainer = withTracker(() => {
  Meteor.subscribe('logs');
  return {
    logs: LogsCollection.find({}, { sort: { createdAt: 1 } }).fetch(),
  };
})(Timeline);
