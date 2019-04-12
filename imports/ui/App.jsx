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
  faEllipsisV, faLink, faLongArrowAltLeft, faSync, faTasks
} from '@fortawesome/free-solid-svg-icons'


library.add([
  faTableTennis, faVoteYea, faCode, faProjectDiagram, faComments,
  faBell, faHeadset, faCoffee, faBong, faWindowClose, faBullseye,
  faEllipsisV, faLink, faLongArrowAltLeft, faSync, faTasks
]);

const muiTheme = getMuiTheme();

const APP_CSS = css({
  width: '100%'
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const { openAddLogDrawer, openEditLogDrawer } = this.state;
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
                    toggleEditLogDrawer={ this.toggleEditLogDrawer } />
                )}/>
            </Switch>
            <Footer
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