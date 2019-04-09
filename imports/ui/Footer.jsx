import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddLogDrawer from './AddLogDrawer';
import EditLogDrawer from './EditLogDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
});

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  
  toggleAddLogDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={ classes.appBar }>
          <Toolbar className={ classes.toolbar }>
            <Fab 
              color="secondary"
              aria-label="Add"
              className={ classes.fabButton }
              onClick={ () => this.toggleAddLogDrawer() }>
              <FontAwesomeIcon icon="bullseye" style={{ fontSize: 40 }}/>
            </Fab>
          </Toolbar>
        </AppBar>
        <AddLogDrawer
          open={ this.state.open }
          toggleAddLogDrawer={ () => this.toggleAddLogDrawer() } />
      </React.Fragment>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
