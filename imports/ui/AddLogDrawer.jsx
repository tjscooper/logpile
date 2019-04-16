import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import getUrlParameter from '/imports/util/getUrlParameter';
import Log, { LogType, LogsCollection } from '/imports/model/log.js';
import LogTypeService from '/imports/service/log-type-service.js';
import { withSnackbar } from 'notistack';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    display: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center'
  },
  gridList: {
    width: '100%',
    height: 150,
  },
  gridListItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase'
  },
  pos: {
    marginBottom: 4,
  },
});

const PROJECT_TYPE_LOGS = ['PR_REVIEW', 'PR_SUBMIT', 'PROJECT_WORK', 'MEETING'];
class GridTileLogType extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    const { logType, onClick } = this.props;
    const buttonInfo = LogTypeService.getInfo(logType);
    return (
      <Card raised={ false } onClick={ () => onClick() } style={{ boxShadow: 'none' }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            { buttonInfo.title }
          </Typography>
          <Typography variant="h2" component="h2">
            { buttonInfo.icon }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
class AddLogDrawer extends Component {

  constructor(props) {
    super(props);
  }
  
  async addLog(logType) {
    const { toggleAddLogDrawer, toggleEditLogDrawer, lastLog } = this.props;
    let projectId = getUrlParameter('pid');

    // close the bottom drawer
    toggleAddLogDrawer();

    if (!PROJECT_TYPE_LOGS.includes(logType)) {
      projectId = '';
    }

    const log = new Log({
      projectId,
      userId: 'efg',
      type: LogType[logType],
      link: '',
      name: '',
      taskId: '',
      notes: ''
    });

    const logId = await Meteor.callPromise('logs.insert', log);
    if (lastLog) {
      await Meteor.callPromise('logs.update.last', lastLog);
    }

    // open the top drawer
    if (logId
        && PROJECT_TYPE_LOGS.includes(logType)) {
          Meteor.setTimeout(() => {
            history.push(`/?pid=${ projectId }&id=${ logId }`);
            toggleEditLogDrawer();
          }, 1500);
    }
  }

  renderGridItem = (logType) => {
    const { toggleAddLogDrawer, toggleEditLogDrawer } = this.props;
    return (
      <GridTileLogType
        logType={ logType }
        onClick={ () => {
          const projectId = getUrlParameter('pid');
          if (logType === 'CANCEL') {
            return toggleAddLogDrawer();
          } else if (!projectId && PROJECT_TYPE_LOGS.includes(logType)) {
            this.props.enqueueSnackbar('A PROJECT MUST BE SELECTED', {
              variant: 'error',
              preventDuplicate: true,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            });
            return toggleAddLogDrawer();
          } else {
            return this.addLog(logType, toggleAddLogDrawer, toggleEditLogDrawer);
          }
        } } />
    );
  };

  render() {
    const { open } = this.props;
    const logTypes = LogType.getIdentifiers();

    if (!logTypes.includes('CANCEL')) {
      logTypes.push('CANCEL');
    }

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={ open }
          color="primary">
          <div
            tabIndex={ 0 }
            role="button">
              <div className="container">
                <div className="grid-row">
                  { logTypes.map((logType, index) => {
                    return (
                        <div key={ index } className="grid-item">
                          { this.renderGridItem(logType) }
                        </div>
                      );
                  }) }
                </div>
              </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

AddLogDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleAddLogDrawer: PropTypes.func.isRequired,
  toggleEditLogDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddLogDrawerContainer = withTracker(() => {

  Meteor.subscribe('log.last');
  const lastLog = LogsCollection.find({}, { sort: { timerStart: -1 } }, { limit: 1 }).fetch()[0];
  return {
    lastLog
  };
})(withStyles(styles)(withSnackbar(AddLogDrawer)));