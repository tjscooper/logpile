import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { LogsCollection } from '/imports/model/log.js';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SchoolIcon from '@material-ui/icons/School';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
  marginTop: 0,
  height: 800,
  width: '100%'
});

const TIMELINE_CSS = css({
  background: '#dedede'
});

class Timeline extends Component {

  render() {
    console.log(this.props);
    if (!this.props.logs) {
      return null;
    }
    return (
      <div className={ TIMELINE_CSS }>
        <ScrollToBottom className={ ROOT_CSS }>
          <VerticalTimeline>
            { this.props.logs.map(log => this.makeLink(log)) }
          </VerticalTimeline>
        </ScrollToBottom>
      </div>
    );
  }

  getLogTitle(type) {
    let title;
    switch(type) {
      case 1: 
        title ='PR REVIEW';
        break;
      case 2:
        title = 'PR SUBMIT';
        break;
      case 3:
        title = 'PROJECT WORK';
        break;
      case 4:
        title = 'MEETING';
        break;
      case 5:
        title = 'REMINDER';
        break;
      case 6:
        title = 'CALL';
        break;
      case 7:
        title = 'BREAK';
        break;
      case 8:
        title = 'PING PONG';
        break;
      case 9:
        title = 'STUFF';
        break; 
      default:
        title = 'STUFF';
        break;
    }
    return title;
  }

  makeLink(log) {
    return (
      <VerticalTimelineElement
        key={ log._id }
        ref={ this.logsEnd }
        className="vertical-timeline-element--work"
        date={ moment(log.createdAt).format('h:mm A') }
        iconStyle={ { background: 'rgb(33, 150, 243)', color: '#fff' } }
        icon={ <SchoolIcon /> }>
        <h3 className="vertical-timeline-element-title">{ this.getLogTitle(log.type) }</h3>
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
    logs: LogsCollection.find({}, { sort: { timerStart: 1 } }).fetch(),
  };
})(Timeline);
