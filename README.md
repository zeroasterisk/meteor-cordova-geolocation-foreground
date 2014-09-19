# Meteor + Cordova get Geolocation in Foreground

This is a Meteor Smart Package which installs the
[Cordova Geolocation Plugin](http://plugins.cordova.io/#/package/org.apache.cordova.geolocation)
and exposes a simpler API.

Only works in `isCordova` (client)

Only works while the Cordova app is open and running in the Foreground...

*Want [Geolocation while the application is in the
background](https://github.com/zeroasterisk/meteor-cordova-geolocation-background)?*


## How it Works

1. Meteor build Cordova with this Plugin
2. Meteor Client gets Geolocation or starts watching it

## Alternatives

You may also use the
[mdg:geolocation](https://github.com/meteor/mobile-packages/tree/master/packages/mdg:geolocation)
package, which is really thin and simple, but seems to be very effective.

It works by seting a reactive variable with the location and watching geolocation, updating the reactive variable.

## Install

requires Meteor 0.9.2+

```
meteor add zeroasterisk:meteor-cordova-geolocation-background
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



