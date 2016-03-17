"use strict()";

var conceptsAPI = "./com/home/db/concepts.json";
var keywordsAPI = "./com/home/db/keywords.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";
var analyzerAPI = "./com/home/db/analyzed.json"

function HomeCtrl($http, $ionicLoading) {
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

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    keyData: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
    tone: null,
    personality: null,
    conceptCollection: null
  };

  home.graph = {};

  home.getRandomIdea = function () {
    $http.get("http://localhost:1314/nr/47.303767/-122.21053")
      .success(function (data) {
        console.log(data);

        // home.idea.product = data.this;
        // home.idea.market = data.that;

        home.idea.raw = data;
      });
  };


  home.getRandomIdea();

  //* //////////////////////////////////////////////

  // home.getRelatedConcepts();
  // home.getTone();
  // home.getPersonality();

  //*/////////////////////////////////////////////

}
