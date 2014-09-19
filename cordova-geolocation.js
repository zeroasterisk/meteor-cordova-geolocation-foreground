/**
 * Geolocation API for foreground actions
 *
 * basically a wrapper for
 * http://plugins.cordova.io/#/package/org.apache.cordova.geolocation
 *
 * - get()
 * - watch()
 * - clearWatch()
 */
GeolocationFG = GeolocationFG || {};

/**
 * Default options
 */
GeolocationFG.options = GeolocationFG.options || {
  maximumAge: 3000,
  timeout: 5000,
  enableHighAccuracy: true
};

/**
 * Global and generic onError handler for foreground actions
 *
 * @param object error
 * @return void
 */
GeolocationFG.onError = function(error) {
  if (!_.isObject(error)) {
    throw new Meteor.Error(500, 'GeolocationFG error' . error);
    return;
  }
  throw new Meteor.Error(500, 'GeolocationFG error [' + error.code + '] ' + error.message);
};

/**
 * Get the current Geolocation now, in the foreground
 *
 * @param function onSuccess
 * @param object options
 * @return boolean
 */
GeolocationFG.get = function(onSuccess, options) {
  if (!_.isFunction(onSuccess)) {
    throw new Meteor.Error(500, 'GeolocationFG.get onSuccess is not a function');
  }
  if (!_.isObject(options)) {
    options = GeolocationFG.options;
  }
  return navigator.geolocation.getCurrentPosition(onSuccess, GeolocationFG.onError, options);
};

/**
 * Start a foreground "watch" for Geolocation
 *
 * @param function onSuccess
 * @param int timeout
 * @param object options
 * @return string watchId
 */
GeolocationFG.watch = function(onSuccess, timeout, options) {
  if (!_.isFunction(onSuccess)) {
    throw new Meteor.Error(500, 'GeolocationFG.watch onSuccess is not a function');
  }
  if (!_.isInt(timeout)) {
    timeout = 30000;
  }
  if (!_.isObject(options)) {
    options = GeolocationFG.options;
  }
  options.timeout = timeout;
  return navigator.geolocation.watchPosition(onSuccess, GeolocationFG.onError, options);
};

/**
 * Clear a foreground "watch" for Geolocation
 *
 * @param string watchId
 * @return void
 */
GeolocationFG.clearWatch = function(watchId) {
  if (!_.isString(watchId)) {
    throw new Meteor.Error(500, 'GeolocationFG.clearWatch watchId is not a string');
  }
  return navigator.geolocation.clearWatch(watchId);
};

