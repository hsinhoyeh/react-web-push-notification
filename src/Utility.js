'use strict';

const payloadFromSubscription = function(subscription) {
  var key = subscription.getKey ? subscription.getKey('p256dh') : '';
  var auth = subscription.getKey ? subscription.getKey('auth') : '';
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
      auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
      },
  }
}

exports.payloadFromSubscription = payloadFromSubscription
