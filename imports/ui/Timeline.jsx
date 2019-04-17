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
import Button from '@material-ui/core/Button';
import { LogType } from '/imports/model/log';
import LogTypeService from '/imports/service/log-type-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const ROOT_CSS = css({
  marginTop: 0,
  height: window.innerHeight - 50,
  width: '100%'
});

const TIMELINE_CSS = css({
  background: '#747478'
});

const LINK_CSS = css({
  textDecoration: 'none',
  display: 'inline'
});
class Timeline extends Component {

  componentDidMount() {
    // reset filters
    history.push(`/`);
  }

  render() {
    const { logs, projectId, toggleEditLogDrawer } = this.props;
    if (!logs || !logs.length) {
      return null;
    }
    return (
      <div className={ TIMELINE_CSS }>
        <ScrollToBottom className={ ROOT_CSS }>
          <VerticalTimeline>
            { logs.map(log => this.makeLogElement(log, projectId, toggleEditLogDrawer)) }
          </VerticalTimeline>
        </ScrollToBottom>
      </div>
    );
  }

  makeLogElement(log, projectId, toggleEditLogDrawer) {
    let logType = LogType.getIdentifier(log.type);
    const buttonInfo = LogTypeService.getInfo(logType);
    const search = projectId === 'all' || getUrlParameter('pid') !== 'all'
      ? `?pid=${projectId || log.projectId}&id=${log._id}`
      : null;
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
            to={ { pathname: '/', search } }
            className={ LINK_CSS }
            onClick={ toggleEditLogDrawer }>
              <h3 className="vertical-timeline-element-title">{ log.name || buttonInfo.title }</h3>
              <h4 className="vertical-timeline-element-subtitle"></h4>
          </Link>
        {
          log.timerElapsed && <h4 id="elapsed">{ moment(log.timerEnd).to(moment(log.timerStart), true) }</h4>
        }
          { log.projectId && <Button color="default">
              <Link 
                id="project"
                key={ `${ log.id }-project` }
                to={ window.location }
                onClick={ () => window.open(`https://app.asana.com/0/${ log.projectId }/list`, '_blank') }>
                  <FontAwesomeIcon icon="project-diagram" />
              </Link>
            </Button>
          }
          { log.taskId && <Button color="default">
              <Link
                id="task"
                key={ `${log.id}-task` }
                to={ window.location }
                onClick={ () => window.open(`https://app.asana.com/0/${ log.projectId }/${ log.taskId }/f`, '_blank') }>
                <FontAwesomeIcon icon="tasks" />
              </Link>
            </Button>
          }
          { log.link && <Button color="default">
              <Link
                id="link"
                key={ `${ log.id }-link` }
                to=''
                onClick={ () => window.open(log.link, '_blank') }>
                <FontAwesomeIcon icon="link" />
              </Link>
            </Button>
          }
      </VerticalTimelineElement>
    );
  }
}

export default TimelineContainer = withTracker(() => {

  let query = {};
  const projectId = getUrlParameter('pid');
  if (projectId && projectId !== 'all') {
    query['projectId'] = projectId;
  }

  Meteor.subscribe('logs');
  return {
    logs: LogsCollection.find(query, { sort: { timerStart: 1 } }).fetch(),
    projectId
  };
})(Timeline);
