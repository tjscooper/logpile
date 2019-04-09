import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Log, { LogType } from '/imports/model/log.js';
import LogTypeService from '/imports/service/log-type-service.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 600,
    height: 450,
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
  
  async addLogTest(logType, toggleAddLogDrawer) {
    if (logType === 'CANCEL') {
      return toggleAddLogDrawer();
    }
    const log = new Log({
      projectId: 'abc',
      userId: 'efg',
      type: LogType[logType],
      link: 'http://asana.com'
    });
    const logId = await Meteor.callPromise('logs.insert', log);
    console.log('logId', logId);
    toggleAddLogDrawer();
  }

  render() {
    const { classes, open, toggleAddLogDrawer } = this.props;
    const logTypes = LogType.getIdentifiers();
    if (!logTypes.includes('CANCEL')) {
      logTypes.push('CANCEL');
    }

    const buttonList = (
      <div className={ classes.root }>
        <GridList cellHeight={ 130 } className={ classes.gridList } cols={ 5 } style={{ margin: 0, padding: 0 }}>
          { logTypes.map((logType, index) => (
            <GridListTile key={ index } style={{ margin: 0, padding: 0 }}>
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
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(AddLogDrawer);
