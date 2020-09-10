import React, { Component } from 'react';

import Switch from '@material-ui/core/Switch';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import WebPush from './WebPush'
import {payloadFromSubscription} from './Utility'

// TODO: chanee this application Server Public Key to yours
// and also PROTECT your secret key carefully.
const applicationServerPublicKey = "BADRpdFs_1FjzOZvs0ib7sVKzl9lT8BGUoj3X9-TKQvj0n_ougrIkbMe-yWtbDfhjANBJoseNBRjSk3grHoZ840"

const theme = createMuiTheme({
});

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subscriveUserEnabled: false,
      subscription: {endpoint: ''},
    }

    this.onWebPushToggle = this.onWebPushToggle.bind(this)
    this.onUpdateSubscriptionOnServer = this.onUpdateSubscriptionOnServer.bind(this)
    this.onSubscriptionFailed = this.onSubscriptionFailed.bind(this)
  }

  onWebPushToggle() {
    this.setState({
      subscriveUserEnabled: !this.state.subscriveUserEnabled,
    })
  }

  onUpdateSubscriptionOnServer(subscription) {
    console.log("onUpdateSubscriptionOnServer:", subscription)
    var payload = payloadFromSubscription(subscription)
    console.log("payload:", JSON.stringify(payload))
    this.setState({subscription: subscription})
  }

  onSubscriptionFailed(error) {
    console.log("onSubscriptionFailed:", error)
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div >
          <Switch
            checked={this.state.subscriveUserEnabled}
            onChange={()=> this.onWebPushToggle()}
            name="Enable WebPush Notification"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <div> {this.state.subscription.endpoint} </div>
          <WebPush
            subscriveUserEnabled={this.state.subscriveUserEnabled}
            applicationServerPublicKey={applicationServerPublicKey}
            onSubscriptionFailed={this.onSubscriptionFailed}
            onUpdateSubscriptionOnServer={this.onUpdateSubscriptionOnServer}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
