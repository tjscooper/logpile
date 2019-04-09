import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { LogsCollection } from '/imports/model/log.js';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import getUrlParameter from '/imports/util/getUrlParameter';

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

const LINK_CSS = css({
  textDecoration: 'none',
  display: 'inline'
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
          <Link
            key={ log._id }
            to={ { pathname: '/', search: `${ window.location.search }&id=${ log._id }` } }
            className={ LINK_CSS }>
              <h3 className="vertical-timeline-element-title">{ buttonInfo.title }</h3>
              <h4 className="vertical-timeline-element-subtitle">{ log.projectId }</h4>
          </Link>
          <a
            key={ `${log._id}-project-link` }
            target="_blank"
            href={ `https://app.asana.com/0/${ log.projectId }/list` }
            className={ LINK_CSS }>
            <p>{ log.link }</p>
          </a>
          <a
            key={`${ log._id }-link`}
            target="_blank"
            href={ log.link }
            className={ LINK_CSS }>
              <p>{ log.link }</p>
          </a>
      </VerticalTimelineElement>
    );
  }
}

export default TimelineContainer = withTracker(() => {

  const projectId = getUrlParameter('pid') || null;
  
  Meteor.subscribe('logs');
  return {
    logs: LogsCollection.find({ projectId }, { sort: { createdAt: 1 } }).fetch(),
  };
})(Timeline);
