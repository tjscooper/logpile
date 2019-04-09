import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    marginLeft: '0px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  grow: {
    flexGrow: 1
  },
  menu: {
    marginRight: 36,
    color: '#fff'
  },
  menuButton: {
    color: '#fff'
  },
  menuButtonTitle: {
    marginLeft: 16
  },
  logo: {
    marginRight: 16
  }
});

class Header extends React.Component {

  state = {
    projects: [],
    project: {
      name: 'All Projects',
      id: null
    },
    menuEl: null
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  classes = this.props.classes;

  async componentDidMount() {
    const projects = await Meteor.callPromise('projects.findAll');
    await this.setStateAsync({ projects: projects.data });
  }

  handleMenuClick = event => {
    this.setState({ menuEl: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ menuEl: null });
  }

  handleMenuSelect = (project) => {
    this.setState({ project }, () => {
      this.handleMenuClose();
    });
  }

  buildMenu(projects) {
    const { menuEl } = this.state;
    return (
      <Menu
        id="project-menu"
        anchorEl={ menuEl }
        open={ Boolean(menuEl) }
        onClose={ this.handleMenuClose }>
        {
          projects.map((project) => (
            <MenuItem
              key={ project.id }
              value={ project.id }
              onClick={ () => this.handleMenuSelect(project) }>
                { project.name }
            </MenuItem>
          ))
        }
      </Menu>
    );
  }

  render() {
    const { menuEl, projects, project } = this.state;
    
    return (
      <div className={ this.classes.root }>
        <AppBar position="fixed">
          <Toolbar>
            <div className={ this.classes.logo }>
              <FontAwesomeIcon icon="bullseye" />
            </div>
            <Typography className={ this.classes.title } variant="h6" color="inherit" noWrap>
              Logpile
            </Typography>
            <div className={ this.classes.grow } />
            { 
              projects.length 
                ? <div className={ this.classes.menu } >
                    <Button
                      aria-owns={ menuEl ? 'project-menu' : undefined }
                      aria-haspopup="true"
                      onClick={ this.handleMenuClick }
                      className={ this.classes.menuButton }>
                        <FontAwesomeIcon icon="project-diagram" />
                        <span className={ this.classes.menuButtonTitle }>{ project.name }</span>
                    </Button>
                    { this.buildMenu(projects) }
                  </div>
                : null
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
