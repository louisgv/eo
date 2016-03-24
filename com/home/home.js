"use strict";

var conceptsAPI = "./com/home/db/concepts.json";
var keywordsAPI = "./com/home/db/keywords.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";
var analyzerAPI = "./com/home/db/analyzed.json";
var yelpAPI = "./com/home/db/yelp-nr.json";

function HomeCtrl($http, $ionicLoading, geolocation, $ionicSlideBoxDelegate) {
  console.log("HomeCtrl");

  var home = this;

  home.levelLabel = [
    "Broad",
    "Common",
    "Academic",
    "Specialized"
  ]

  home.classLabel = [
    "item-assertive",
    "item-energized",
    "item-balanced",
    "item-calm"
  ]

  home.map = {
    center: {
      latitude: 45,
      longitude: -127
    },
    zoom: 18
  };

  function updateMap(lat, long, zoom) {
    home.map = {
      center: {
        latitude: lat,
        longitude: long
      },
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
      // $http.get(`http://localhost:1314/nr/${lat}/${lng}`)
      // $http.get(`https://eo.mybluemix.net/nr/${lat}/${lng}`)
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
