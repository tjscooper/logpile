import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddLogDrawer from './AddLogDrawer';
import EditLogDrawer from './EditLogDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getUrlParameter from '/imports/util/getUrlParameter';
import { SnackbarProvider } from 'notistack';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -28,
    left: 0,
    right: 0,
    margin: '0 auto',
    height: 72,
    width: 72
  },
  success: { backgroundColor: 'purple' },
  error: { 
    backgroundColor: '#f50057', fontSize: 16, padding: 20, paddingLeft: 75, textAlign: 'center', weight: 'bold'
  },
  warning: { backgroundColor: 'green' },
  info: { backgroundColor: 'yellow' },
});

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editLogDrawerOpen: getUrlParameter('id') !== null,
      logs: [],
      elapsedTimers: []
    };
  }

  componentDidMount() {
    if (getUrlParameter('id') === null) {
      this.setState({ editLogDrawerOpen: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logs.length > this.state.logs.length) {
      const elapsedTimers = nextProps.logs.reduce((result, t) => { 
        if (t.timerElapsed) {
          result.push(t.timerElapsed);
        }
        return result;
      }, []);
      this.setState({ logs: nextProps.logs, elapsedTimers });
    }
  }

  getTotalElapsedTime(elapsedTimers) {
    const totalDurations = elapsedTimers.slice(1)
      .reduce((prev, cur) => moment.duration(cur).add(prev),
        moment.duration(elapsedTimers[0]));
    return moment.utc(totalDurations.asMilliseconds()).format("H [hr] mm [min] ss [sec]");
  }

  render() {
    const { 
      classes, openAddLogDrawer, openEditLogDrawer, toggleAddLogDrawer, toggleEditLogDrawer
    } = this.props;
    const totalElapsedTimeText = this.state.elapsedTimers.length
      ? this.getTotalElapsedTime(this.state.elapsedTimers)
      : 'No time logged today';
    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={ classes.appBar }>
          <Toolbar className={ classes.toolbar }>
            <div className="stopwatch">
              <FontAwesomeIcon icon="stopwatch" style={ { marginRight: 16 } } /> { totalElapsedTimeText }
            </div>
            <Fab 
              color="secondary"
              aria-label="Add"
              className={ classes.fabButton }
              onClick={ () => toggleAddLogDrawer() }>
              <FontAwesomeIcon icon="bullseye" style={{ fontSize: 40 }}/>
            </Fab>
          </Toolbar>
        </AppBar>
        <SnackbarProvider
          maxSnack={3}
          hideIconVariant
          classes={ {
            variantSuccess: classes.success,
            variantError: classes.error,
            variantWarning: classes.warning,
            variantInfo: classes.info,
          } }>
          <AddLogDrawer
            open={ openAddLogDrawer }
            toggleAddLogDrawer={ () => toggleAddLogDrawer() }
            toggleEditLogDrawer={ () => toggleEditLogDrawer() } />
        </SnackbarProvider>
        { this.state.editLogDrawerOpen
            ? <EditLogDrawer
                open={ openEditLogDrawer }
                toggleEditLogDrawer={ () => toggleEditLogDrawer() } />
            : null
        }
      </React.Fragment>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
