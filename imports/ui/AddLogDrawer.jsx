import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Log, { LogType } from '/imports/model/log.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 250,
  },
});

const getButtonInfo = (logType) => {
  let icon;
  let title;
  switch(logType) {
    case 'PR_REVIEW':
      icon = <FontAwesomeIcon icon='vote-yea' />;
      title = 'Review Code';
      break;
    // 8
    case 'PING_PONG':
      icon = <FontAwesomeIcon icon='table-tennis' />;
      title = 'Play Ping Pong';
      break;
  }
  return { icon, title };
}

class GridTileLogType extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { logType, onClick } = this.props;
    const buttonInfo = getButtonInfo(logType);
    return (
      <Button onClick={ () => onClick() }>
        { buttonInfo.icon }
        { buttonInfo.title }
      </Button>
    );
  }

}

class AddLogDrawer extends Component {

  constructor(props) {
    super(props);
  }
  
  async addLogTest(logType, toggleAddLogDrawer) {
    const logId = await Meteor.callPromise('logs.insert', new Log({
      projectId: 'abc',
      userId: 'efg',
      type: LogType[logType],
      link: 'http://asana.com'
    }));
    console.log('logId', logId);
    toggleAddLogDrawer();
  }

  render() {
    const { classes, open, toggleAddLogDrawer } = this.props;
    const logTypes = LogType.getIdentifiers();

    const buttonList = (
      <div className={ classes.root }>
        <GridList cellHeight={ 160 } className={ classes.gridList } cols={ 5 }>
          { logTypes.map((logType, index) => (
            <GridListTile key={ index }>
              <GridTileLogType
                logType={logType}
                onClick={ () => this.addLogTest(logType, toggleAddLogDrawer) } />
            </GridListTile>
          )) }
        </GridList>
      </div>
    );

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={ open }>
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
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(AddLogDrawer);
