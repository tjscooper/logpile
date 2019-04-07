import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '/imports/ui/Header';
import Timeline from '/imports/ui/Timeline';
import Footer from '/imports/ui/Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTableTennis, faVoteYea } from '@fortawesome/free-solid-svg-icons'

library.add([faTableTennis, faVoteYea]);

const muiTheme = getMuiTheme({
  palette: {
    type: 'dark'
  },
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div style={{ height: '100%' }}>
          <Header />
          <Timeline />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}