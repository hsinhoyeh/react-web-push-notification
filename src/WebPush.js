import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {urlB64ToUint8Array} from './Utility'

var swRegistration = null

class WebPush extends Component {
  constructor(props) {
    super(props)

    this.onRegisterServiceWorker = this.onRegisterServiceWorker.bind(this)
    this.onSubscribeUser = this.onSubscribeUser.bind(this)
  }

  componentWillMount() {
    if (swRegistration == null) {
      this.onRegisterServiceWorker()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subscriveUserEnabled  != nextProps.subscriveUserEnabled && nextProps.subscriveUserEnabled) {
      this.onSubscribeUser()
    }
  }

  onSubscribeUser() {
    if (swRegistration == null) {
      return
    }

    var onUpdateSubscriptionOnServer = this.props.onUpdateSubscriptionOnServer
    var onSubscribeFailed = this.props.onSubscribeFailed
    var applicationServerPublicKey = this.props.applicationServerPublicKey

    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      var isSubscribed = !(subscription === null)
      if (isSubscribed) {
        onUpdateSubscriptionOnServer(subscription)
      } else {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(function(subscription) {
          console.log('User is subscribed.')
          if (onUpdateSubscriptionOnServer) {
            onUpdateSubscriptionOnServer(subscription)
          }
        })
        .catch(function(err) {
          console.log('Failed to subscribe the user: ', err)
          if (onSubscribeFailed) {
            onSubscribeFailed(err)
          }
        });
      }
    })
  }

  onRegisterServiceWorker() {
    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
    })
  }

  render() {
    return (<div></div>)
  }
}

WebPush.propTypes = {
  subscriveUserEnabled: PropTypes.bool.isRequired,
  applicationServerPublicKey: PropTypes.string.isRequired,
  onUpdateSubscriptionOnServer: PropTypes.func,
  onSubscribeFailed: PropTypes.func,
}

export default WebPush;
