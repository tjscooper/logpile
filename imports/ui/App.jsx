import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '/imports/ui/Header';
import Timeline from '/imports/ui/Timeline';
import Footer from '/imports/ui/Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { css } from 'glamor';
import { 
  faTableTennis, faVoteYea, faCode, faProjectDiagram, faComments,
  faBell, faHeadset, faCoffee, faBong, faWindowClose, faBullseye,
  faEllipsisV, faLink, faLongArrowAltLeft, faSync, faTasks, faBullhorn, faStopwatch
} from '@fortawesome/free-solid-svg-icons'


library.add([
  faTableTennis, faVoteYea, faCode, faProjectDiagram, faComments,
  faBell, faHeadset, faCoffee, faBong, faWindowClose, faBullseye,
  faEllipsisV, faLink, faLongArrowAltLeft, faSync,
  faTasks, faBullhorn, faStopwatch
]);

const muiTheme = getMuiTheme();

const APP_CSS = css({
  width: '100%'
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      projectId: null,
      openAddLogDrawer: false,
      openEditLogDrawer: false
    };
  }

  toggleAddLogDrawer = () => {
    this.setState(prevState => ({ openAddLogDrawer: !prevState.openAddLogDrawer }));
  }

  toggleEditLogDrawer = () => {
    this.setState(prevState => ({ openEditLogDrawer: !prevState.openEditLogDrawer }));
  }

  setLogs = (logs) => {
    this.setState({ logs });
  }

  render() {
    const { openAddLogDrawer, openEditLogDrawer, logs } = this.state;
    return (
      <Router>
        <MuiThemeProvider muiTheme={ muiTheme }>
          <div className={ APP_CSS }>
            <Header />
            <Switch>
              <Route
                exact
                name="timeline"
                path="/"
                render={ (props) => (
                  <Timeline
                    { ...props }
                    toggleEditLogDrawer={ this.toggleEditLogDrawer }
                    setLogs={ this.setLogs } />
                )}/>
            </Switch>
            <Footer
              logs={ logs }
              openAddLogDrawer={ openAddLogDrawer }
              openEditLogDrawer={ openEditLogDrawer }
              toggleAddLogDrawer={ this.toggleAddLogDrawer }
              toggleEditLogDrawer={ this.toggleEditLogDrawer } />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}