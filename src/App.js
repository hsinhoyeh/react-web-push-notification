import React, { Component } from 'react';

import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import WebPush from './WebPush'
import {payloadFromSubscription} from './Utility'

// TODO: chanee this application Server Public Key to yours
// and also PROTECT your secret key carefully.
const applicationServerPublicKey = "BADRpdFs_1FjzOZvs0ib7sVKzl9lT8BGUoj3X9-TKQvj0n_ougrIkbMe-yWtbDfhjANBJoseNBRjSk3grHoZ840"

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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div >
          <Toggle
            label="Enable WebPush Notification"
            style={{marginBottom: 16}}
            onToggle={()=> {this.onWebPushToggle()}}
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
