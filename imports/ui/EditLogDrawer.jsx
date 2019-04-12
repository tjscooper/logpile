import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'glamor';
import Log, { LogType, LogsCollection } from '/imports/model/log.js';
import LogTypeService from '/imports/service/log-type-service';
import { Paper } from 'material-ui';
import { createBrowserHistory } from 'history';
import isEqual from 'lodash.isequal';
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase'
  },
  pos: {
    marginBottom: 4,
  },
  editLogMenuRoot: {
    flexGrow: 1,
  },
  editLogMenuGrow: {
    flexGrow: 1,
  },
  editLogMenuOptionsButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  editLogSaveButton: {
    marginTop: 10
  }
});

const DRAWER_CSS = css({
  marginTop: 100
});

const TITLE_ICON_CSS = css({
  marginRight: 10
});

const FORM_CSS = css({
  padding: 24
});

class EditLogDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // UI
      auth: true,
      anchorEl: null,
      labelWidth: 30,
      // Asana Tasks
      tasks: [],
      // Editable fields
      name: '',
      projectId: '',
      taskId: 'None',
      link: '',
      notes: '',
      timerStart: 0,
      timerEnd: 0,
      timerElapsed: 0
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    const projectId = getUrlParameter('pid');
    const tasks = await Meteor.callPromise('tasks.findAll', projectId);
    if (tasks && tasks.data && tasks.data.length) {
      await this.setStateAsync({ tasks: tasks.data, projectId });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const projectId = getUrlParameter('pid');
    if (
      (prevState.projectId && prevState.projectId !== projectId)
      || (!prevState.tasks.length) 
      || (!isEqual(this.state.tasks, prevState.tasks))
    ) {
      const tasks = await Meteor.callPromise('tasks.findAll', projectId);
      if (tasks && tasks.data && tasks.data.length) {
        await this.setStateAsync({ tasks: tasks.data, projectId });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.log) {
      this.setStateAsync({
        name: nextProps.log.name,
        taskId: nextProps.log.taskId,
        link: nextProps.log.link,
        notes: nextProps.log.notes,
        timerStart: nextProps.log.timerStart,
        timerEnd: nextProps.log.timerEnd,
        timerElapsed: nextProps.log.timerElapsed,
      });
    }
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleTextInput = ({ event, field }) => {
    const { value } = event.currentTarget;
    this.setState({ [field]: value });
  }

  handleTaskChange = ({ event, field }) => {
    const { value } = event.target;
    this.setState({ [field]: value });
  }

  handleLogSave = async () => {
    const log = Object.assign(this.props.log, {
      name: this.state.name,
      taskId: this.state.taskId,
      link: this.state.link,
      notes: this.state.notes,
      timerStart: this.state.timerStart,
      timerEnd: this.state.timerEnd,
      timerElapsed: this.state.timerElapsed
    });
    const updateId = await Meteor.callPromise('logs.update', log);
    if (updateId) {
      this.handleClose();
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    const { toggleEditLogDrawer } = this.props;
    this.setState({ anchorEl: null }, () => {
      history.push(`/?pid=${ this.props.projectId }`);
      toggleEditLogDrawer();
    });
  };

  handleDeleteLog = async () => {
    const { log, projectId, toggleEditLogDrawer } = this.props;
    const removeId = await Meteor.callPromise('logs.remove', new Log(log));
    if (removeId) {
      this.setState({ anchorEl: null }, () => toggleEditLogDrawer());
    }
    history.push(`/?pid=${projectId}`);
  }

  renderEditLogForm(classes) {
    const { log, toggleEditLogDrawer } = this.props;
    const { auth, anchorEl } = this.state;
    const logType = LogType.getIdentifier(log.type);
    const logTypeInfo = LogTypeService.getInfo(logType);
    const open = Boolean(anchorEl);
    if (!log) {
      return null;
    }
    return (
      <div className={ classes.editLogMenuRoot }>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={ classes.editLogMenuOptionsButton }
              color="inherit"
              aria-label="Menu"
              onClick={ () => this.handleClose(toggleEditLogDrawer) }>
              <FontAwesomeIcon icon="long-arrow-alt-left" />
            </IconButton>
            <div className={ TITLE_ICON_CSS }>
              { logTypeInfo.icon }
            </div>
            <Typography variant="h6" color="inherit" className={ classes.editLogMenuGrow }>
              { logTypeInfo.title }
            </Typography>
            { auth && (
              <div>
                <IconButton
                  aria-owns={ open ? 'menu-appbar' : undefined }
                  aria-haspopup="true"
                  onClick={ this.handleMenu }
                  color="inherit">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={ anchorEl }
                  anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                  } }
                  transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                  } }
                  open={ open }
                  onClose={ () => this.handleClose(toggleEditLogDrawer) }>
                  <MenuItem onClick={ () => this.handleClose(toggleEditLogDrawer) }>Close</MenuItem>
                  <Divider />
                  <MenuItem onClick={ () => this.handleDeleteLog() }>Delete</MenuItem>
                </Menu>
              </div>
            ) }
          </Toolbar>
        </AppBar>
        <Paper className={ FORM_CSS }>
          <FormGroup>
            <TextField
              id="outlined-name"
              label="Name"
              placeholder={ logTypeInfo.title }
              className={ classes.textField }
              value={ this.state.name }
              onChange={ event => this.handleTextInput({ event, field: 'name' }) }
              margin="normal"
              variant="outlined"
            />
            { this.state.tasks.length
                ? <FormControl variant="outlined" className={ classes.formControl } style={{ marginTop: 10 }}>
                    <InputLabel
                      ref={ ref => {
                        this.InputLabelRef = ref;
                      } }
                      htmlFor="task-select-list">
                      Task
                    </InputLabel>
                    <Select
                      value={ this.state.taskId || this.state.tasks[0].id }
                      onChange={ event => this.handleTaskChange({ event, field: 'taskId' }) }
                      input={
                        <OutlinedInput
                          labelWidth={ this.state.labelWidth }
                          name="tasks"
                          id="task-select-list"/>
                      }>
                      { this.state.tasks.map((task) => (
                          <MenuItem key={ `${ task.id }-task` } value={ task.id }>{ task.name }</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                : null 
              }
            <TextField
              id="outlined-link"
              label="Link"
              placeholder="link"
              className={ classes.textField }
              value={ this.state.link }
              onChange={ event => this.handleTextInput({ event, field: 'link' }) }
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-notes"
              label="Notes"
              placeholder="notes"
              className={ classes.textField }
              value={ this.state.notes }
              onChange={ event => this.handleTextInput({ event, field: 'notes' }) }
              margin="normal"
              variant="outlined"
              multiline={ true }
              rows={ 4 }
              rowsMax= { 20 }
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={ () => this.handleLogSave() }
            className={ classes.editLogSaveButton }>
              Save
          </Button>
        </Paper>
      </div>
    );
  }

  render() {
    const { classes, open, log } = this.props;
    if (!log) {
      return null;
    }
    return (
      <div>
        <Drawer
          anchor="top"
          open={ open }
          color="default"
          classes={ DRAWER_CSS }>
          <div
            tabIndex={ 0 }
            role="button">
            { this.renderEditLogForm(classes) }
          </div>
        </Drawer>
      </div>
    );
  }
}

EditLogDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleEditLogDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default EditLogDrawerContainer = withTracker(() => {
  
  const _id = getUrlParameter('id');
  Meteor.subscribe('log', { _id });
  const log = LogsCollection.find({ _id }).fetch()[0];
  const projectId = !log ? getUrlParameter('pid') : log.projectId;
  return {
    log,
    projectId
  };
})(withStyles(styles)(EditLogDrawer));