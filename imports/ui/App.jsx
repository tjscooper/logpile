import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '/imports/ui/Header';
import Timeline from '/imports/ui/Timeline';
import Footer from '/imports/ui/Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faTableTennis, faVoteYea, faCode, faProjectDiagram, faComments,
  faBell, faHeadset, faCoffee, faBong, faWindowClose, faBullseye
} from '@fortawesome/free-solid-svg-icons'

library.add([
  faTableTennis, faVoteYea, faCode, faProjectDiagram, faComments,
  faBell, faHeadset, faCoffee, faBong, faWindowClose, faBullseye
]);

const muiTheme = getMuiTheme({
  palette: {
    type: 'dark'
  },
});

export default class App extends Component {

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={ muiTheme }>
          <div style={ { height: '100%' } }>
            <Header />
            <Switch>
              <Route exact name="timeline" path="/" component={ Timeline } />
            </Switch>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}