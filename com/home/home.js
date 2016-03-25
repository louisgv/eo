"use strict";

var conceptsAPI = "./db/concepts.json";
var keywordsAPI = "./db/keywords.json";
var personalityAPI = "./db/personality.json";
var toneAPI = "./db/tone.json";
var analyzerAPI = "./db/analyzed.json";
var yelpAPI = "./db/yelp-nr.json";

function HomeCtrl($http, $ionicLoading, geolocation, NgMap, $ionicSlideBoxDelegate, $state, DataStore, $sce) {
  console.log("HomeCtrl");

  var home = this;

  NgMap.getMap()
    .then(function (map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });

  home.levelLabel = [
    "Broad",
    "Common",
    "Academic",
    "Specialized"
  ]

  home.classLabel = [
    "item-positive",
    "item-assertive",
    "item-energized",
    "item-balanced",
    "item-calm"
  ]

  home.iframeTrust = function (url) {
    return $sce.trustAsResourceUrl(url);
  }

  home.previousPlace = function () {
    $ionicSlideBoxDelegate.previous(999);
  }

  home.nextPlace = function () {
    $ionicSlideBoxDelegate.next(999);
  }

  home.locationString = function (c) {
    return `${c.latitude}, ${c.longitude}`;
  }

  home.map = {
    center: {},
    zoom: 18
  };

  function updateMap(lat, long, zoom) {
    home.map = {
      // center: {
      //   latitude: lat,
      //   longitude: long
      // },
      center: `${lat}, ${long}`,
      zoom: zoom || 18
    };
  }

  geolocation.getLocation()
    .then(function (data) {
      let coords = data.coords;

      getNearbyRestaurant(coords.latitude, coords.longitude);

      updateMap(coords.latitude, coords.longitude);
    });


  var getNearbyRestaurant = function (lat, lng) {
    $http.get(yelpAPI)
      // $http.get(`http://localhost:1314/nb/${lat}/${lng}/1800`)
      // $http.get(`https://eo.mybluemix.net/nb/${lat}/${lng}/1800`)
      .success(function (data) {

        console.log(data);

        // home.idea.product = data.this;
        // home.idea.market = data.that;

        home.bizs = data.businesses;
        $ionicSlideBoxDelegate.update();
      });
  };

  //* //////////////////////////////////////////////

  // home.getRelatedConcepts();
  // home.getTone();
  // home.getPersonality();

  //*/////////////////////////////////////////////

}
