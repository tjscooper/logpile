import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import getUrlParameter from '/imports/util/getUrlParameter';

import Log, { LogType } from '/imports/model/log.js';
import LogTypeService from '/imports/service/log-type-service.js';

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
  
  async addLog(logType, toggleAddLogDrawer, toggleEditLogDrawer) {
    const projectId = getUrlParameter('pid');

    if (!projectId || projectId && projectId === 'all' || logType === 'CANCEL') {
      return toggleAddLogDrawer();
    }
    // close the bottom drawer
    toggleAddLogDrawer();

    const log = new Log({
      projectId,
      userId: 'efg',
      type: LogType[logType],
      link: ''
    });
    const logId = await Meteor.callPromise('logs.insert', log);

    // open the top drawer
    if (logId
        && projectId !== 'all'
        && ['PR_REVIEW','PR_SUBMIT', 'PROJECT_WORK'].includes(logType)) {
          Meteor.setTimeout(() => {
            console.log(this);
            history.push(`/?pid=${ projectId }&id=${ logId }`);
            toggleEditLogDrawer();
          }, 1000);
    }
  }

  render() {
    const { classes, open, toggleAddLogDrawer, toggleEditLogDrawer } = this.props;
    const logTypes = LogType.getIdentifiers();
    if (!logTypes.includes('CANCEL')) {
      logTypes.push('CANCEL');
    }

    const buttonList = (
      <div className={ classes.root }>
        <GridList className={ classes.gridList } cols={ 10 }>
          { logTypes.map((logType, index) => (
            <GridListTile key={ index } className={ classes.gridListItem }>
              <GridTileLogType
                logType={logType}
                onClick={ () => this.addLog(logType, toggleAddLogDrawer, toggleEditLogDrawer) } />
            </GridListTile>
          )) }
        </GridList>
      </div>
    );

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={ open }
          color="primary">
          <div
            tabIndex={ 0 }
            role="button">
            { buttonList }
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

export default withStyles(styles)(AddLogDrawer);
