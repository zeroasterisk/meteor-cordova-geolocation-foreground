# Meteor get Geolocation in Foreground

This is a Meteor Package which does some basic wrapping for Geolocation.

NOTE there is an excellent
[mdg:geolocation](https://github.com/meteor/mobile-packages/tree/master/packages/mdg:geolocation)
package which does some similar wrapping and may be easier to implement.

Geolocation is pretty simple anyway and it might be easy enough for you to
write your own implementation for `navigator.geolocation.watchPosition(onPosition, onError, options);`

## Features

* ability to start and stop a "watcher"
* similar api to [zeroasterisk:cordova-geolocation-background](https://github.com/zeroasterisk/meteor-cordova-geolocation-background)

Want
[Geolocation while the application is in the background](https://github.com/zeroasterisk/meteor-cordova-geolocation-background)?

See an [example application using it here](https://github.com/zeroasterisk/meteor-cordova-geolocation-example).

## Alternatives

You may also use the
[mdg:geolocation](https://github.com/meteor/mobile-packages/tree/master/packages/mdg:geolocation)
package, which is really thin and simple, but seems to be very effective.

It works by setting a reactive variable with the location and watching geolocation, updating the reactive variable.

## Install

requires Meteor 0.9.2+

```
meteor add zeroasterisk:cordova-geolocation-foreground
```

## Example Usage

```
// callback function which has a location object argument
var GeolocationCallback = function(location) {
  GeoLog.insert(location);
};

// one time call to get the location
GeolocationFG.get(GeolocationCallback);

// auto-re-run by Cordova every ~30000 ms (30 sec)
var watchId = GeolocationFG.watch(GeolocationCallback, 30000, {
  maximumAge: 3000,
  enableHighAccuracy: true
});

GeolocationFG.clearWatch(watchId);
```

See an [example application using it here](https://github.com/zeroasterisk/meteor-cordova-geolocation-example).

