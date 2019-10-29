"use strict";

//Unsplash api key
const apiKEY =
  "0255087c8f6e762a1936ff211ee660ff9ac6de72b0dc99fd4379a1ffb5a3109a";
const trumpSearchURL = "https://cors-anywhere.herokuapp.com/https://api.tronalddump.io/random/quote";
const unsplashSearchURL = `https://api.unsplash.com/photos/random?client_id=${apiKEY}`;

function displayResults(responseJson) {
  $("#landing-page").addClass("hidden");

  $("#results-quote").empty();

  $('#results-quote').append(
      `<p>${responseJson.value}</p>`
  )
  $("#results").removeClass("hidden");
}

function getBackgroundImage() {
    var orientation = 'portrait';
    if ($(window).width() >= 900) {
        orientation = 'landscape'
    } else { orientation = 'portrait'}
    var userName = 'eberhardgross';
    var url = unsplashSearchURL + '&username=' + userName + '&orientation=' + orientation;

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => setBackground(responseJson))
      .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
      });
}

function setBackground(responseJson) {
    console.log(responseJson);
    document.body.style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url(${responseJson.urls.regular})`;
}

function getRandomQuote() {

  fetch(trumpSearchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}


function show() {
    getBackgroundImage();
  $(".button_one").click(function() {
    getRandomQuote();
  });
  $(".button_two").click(function() {
    getRandomQuote();
  });
}

$(show);
