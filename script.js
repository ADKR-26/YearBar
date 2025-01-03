// import visitCount from "./scripts/visitCount.js";

// function getYearPercentage() {
//     let today = new Date();
//     let year = today.getFullYear();
//     let startDate = new Date(`${year}-01-01T00:00:00Z`);
//     let secondsInAYear = 31536000;

//     let timeDifference = today - startDate;

//     // console.log("Today",year);

//     // var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     let timeDifferenceInSeconds = Math.floor((today - startDate) / 1000);

//     // daysDifference = 100;

//     function getTotalSeconds() {
//         // Define the start date (January 1, 2023, 00:00:00)
//         const startDate = new Date(`${year}-01-01T00:00:00`);

//         // Define the current date and time
//         const currentDate = new Date();

//         // Calculate the difference in milliseconds
//         const timeDifference = currentDate - startDate;

//         // Convert milliseconds to seconds
//         const totalSeconds = Math.floor(timeDifference / 1000);

//         return totalSeconds;
//     }

//     // Call the function and get the total seconds
//     const totalSeconds = getTotalSeconds();

//     // Display the result
//     // console.log(`Total seconds from January 1, 2023, 00:00:00, to now: ${totalSeconds} seconds`);

//     let yearCompletePercentInSeconds = (
//         (totalSeconds * 100) /
//         secondsInAYear
//     ).toFixed(6);
//     // let yearCompletePercent = ((daysDifference * 100) / 365).toFixed(2);

//     // console.log(timeDifferenceInSeconds);

//     var progressBar = document.getElementById("myProgress");
//     progressBar.value = yearCompletePercentInSeconds;

//     var progressData = document.getElementById("data");
//     data.innerHTML = yearCompletePercentInSeconds + " %";
// }
function getYearPercentage() {
    let today = new Date();
    let year = today.getFullYear();
  
    // Set the start date in the local time zone
    let startDate = new Date(year, 0, 1, 0, 0, 0); // January 1, 00:00:00 local time
  
    // Check if the year is a leap year
    let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    let secondsInAYear = isLeapYear ? 31622400 : 31536000;
  
    // Get the total seconds elapsed in the current year
    let totalSeconds = Math.floor((today - startDate) / 1000);
  
    // Calculate the percentage of the year completed
    let yearCompletePercentInSeconds = (
      (totalSeconds * 100) /
      secondsInAYear
    ).toFixed(6);
  
    // Update the progress bar and display the percentage
    var progressBar = document.getElementById("myProgress");
    progressBar.value = yearCompletePercentInSeconds;
  
    var progressData = document.getElementById("data");
    progressData.innerHTML = yearCompletePercentInSeconds + " %";
  
    console.log(`Year Percentage Completed: ${yearCompletePercentInSeconds}%`);
  }
  
  setInterval(getYearPercentage, 1000);
  

//to show current time
function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Add leading zero if the number is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var timeString = hours + ":" + minutes + ":" + seconds;

  document.getElementById("currentTime").textContent = timeString;
}

setInterval(getCurrentTime, 1000);

getCurrentTime();

console.log("%cHIRE ME", "font-size: 24px; color: #3498db; font-weight: bold;");

console.log(
  "%cCheck out my portfolio: %chttps://adkr-portfolio.vercel.app/",
  "font-size: 16px; color: #2ecc71; font-weight: bold;",
  "font-size: 16px; color: #3498db;"
);

//! SNOW STARTS HERE

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var transforms = [
  "transform",
  "msTransform",
  "webkitTransform",
  "mozTransform",
  "oTransform",
];

var transformProperty = getSupportedPropertyName(transforms);

// Array to store our Snowflake objects
var snowflakes = [];

// Global variables to store our browser's window size
var browserWidth;
var browserHeight;

// Specify the number of snowflakes you want visible
var numberOfSnowflakes = 50;

// Flag to reset the position of the snowflakes
var resetPosition = false;

//
// It all starts here...
//
function setup() {
  window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
  window.addEventListener("resize", setResetFlag, false);
}

//
// Vendor prefix management
//
function getSupportedPropertyName(properties) {
  for (var i = 0; i < properties.length; i++) {
    if (typeof document.body.style[properties[i]] != "undefined") {
      return properties[i];
    }
  }
  return null;
}

//
// Constructor for our Snowflake object
//
function Snowflake(element, speed, xPos, yPos) {
  // set initial snowflake properties
  this.element = element;
  this.speed = speed;
  this.xPos = xPos;
  this.yPos = yPos;

  // declare variables used for snowflake's motion
  this.counter = 0;
  this.sign = Math.random() < 0.5 ? 1 : -1;

  // setting an initial opacity and size for our snowflake
  this.element.style.opacity = 0.1 + Math.random();
  this.element.style.fontSize = 14 + Math.random() * 50 + "px";
}

//
// The function responsible for actually moving our snowflake
//
Snowflake.prototype.update = function () {
  // using some trigonometry to determine our x and y position
  this.counter += this.speed / 5000;
  this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
  this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;

  // setting our snowflake's position
  setTranslate3DTransform(
    this.element,
    Math.round(this.xPos),
    Math.round(this.yPos)
  );

  // if snowflake goes below the browser window, move it back to the top
  if (this.yPos > browserHeight) {
    this.yPos = -50;
  }
};

//
// A performant way to set your snowflake's position
//
function setTranslate3DTransform(element, xPosition, yPosition) {
  var val = "translate3d(" + xPosition + "px, " + yPosition + "px" + ", 0)";
  element.style[transformProperty] = val;
}

//
// The function responsible for creating the snowflake
//
function generateSnowflakes() {
  // get our snowflake element from the DOM and store it
  var originalSnowflake = document.querySelector(".snowflake");

  // access our snowflake element's parent container
  var snowflakeContainer = originalSnowflake.parentNode;

  // get our browser's size
  browserWidth = document.documentElement.clientWidth;
  browserHeight = document.documentElement.clientHeight;

  // create each individual snowflake
  for (var i = 0; i < numberOfSnowflakes; i++) {
    // clone our original snowflake and add it to snowflakeContainer
    var snowflakeClone = originalSnowflake.cloneNode(true);
    snowflakeContainer.appendChild(snowflakeClone);

    // set our snowflake's initial position and related properties
    var initialXPos = getPosition(50, browserWidth);
    var initialYPos = getPosition(50, browserHeight);
    var speed = 5 + Math.random() * 40;

    // create our Snowflake object
    var snowflakeObject = new Snowflake(
      snowflakeClone,
      speed,
      initialXPos,
      initialYPos
    );

    snowflakes.push(snowflakeObject);
  }

  // remove the original snowflake because we no longer need it visible
  snowflakeContainer.removeChild(originalSnowflake);

  // call the moveSnowflakes function every 30 milliseconds
  moveSnowflakes();
}

//
// Responsible for moving each snowflake by calling its update function
//
function moveSnowflakes() {
  for (var i = 0; i < snowflakes.length; i++) {
    var snowflake = snowflakes[i];
    snowflake.update();
  }

  // Reset the position of all the snowflakes to a new value
  if (resetPosition) {
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];

      snowflake.xPos = getPosition(50, browserWidth);
      snowflake.yPos = getPosition(50, browserHeight);
    }

    resetPosition = false;
  }

  requestAnimationFrame(moveSnowflakes);
}

//
// This function returns a number between (maximum - offset) and (maximum + offset)
//
function getPosition(offset, size) {
  return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

//
// Trigger a reset of all the snowflakes' positions
//
function setResetFlag(e) {
  resetPosition = true;
}

// function to execute snowflakes around christmas

let date = new Date();
// let todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
let currentYear = date.getFullYear();

let todayDate = new Date();

let start;
let end;

if (currentYear === currentYear + 1) {
  // console.log("YES");
  start = new Date(`${currentYear}-01-01T00:00:00Z`);
  end = new Date(`${currentYear}-03-02`);
} else {
  // console.log("NO");
  start = new Date(`${currentYear}-10-01`);
  end = new Date(`${currentYear}-12-31T23:59:59Z`);
}

// condition to check christmas week
if (todayDate >= start && todayDate <= end) {
  // console.log(todayDate);
  var oldElement = document.getElementById("snowflakeInactive");
  oldElement.id = "snowflakeContainer";
  setup();
  // console.log(
  //     "%c 🎄✨ Merry Christmas! 🎅🌟",
  //     "color: #e44d26; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #228b22;"
  // );
  // console.log(
  //     "%c May your holidays be filled with love, laughter, and magic. 🎁❄️",
  //     "color: #3498db; font-size: 16px;"
  // );
  console.log("  ");
}

//! SNOW ENDS HERE

//! NEW YEAR
// let newYearDate = new Date(`${currentYear}-01-01`);

// Check if the day and month components match
// if (
//   todayDate.getDate() === newYearDate.getDate() &&
//   todayDate.getMonth() === newYearDate.getMonth()
// ) {
//   console.log(
//     "%c 🎄✨ Happy New Year!! 🎅🌟",
//     "color: #e44d26; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #228b22;"
//   );
// } else {
//   var newYearElement = document.getElementById("newYear");
//   newYearElement.className = "new-year-none";
//   var fireElement = document.getElementById("firework");
//   fireElement.className = "none";
// }

function checkNewYear() {
  const currentYear = new Date().getFullYear();
  const todayDate = new Date();

  // Calculate the difference between now and the next New Year's Day
  const newYearDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
  const timeRemaining = newYearDate - todayDate;

  if (timeRemaining <= 0) {
    // Happy New Year message and style update
    console.log(
      "%c 🎄✨ Happy New Year!! 🎅🌟",
      "color: #e44d26; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #228b22;"
    );
  } else {
    var newYearElement = document.getElementById("newYear");
    newYearElement.className = "new-year-none";
    var fireElement = document.getElementById("firework");
    fireElement.className = "none";
  }

  setTimeout(checkNewYear, 1000);
}

// Start the countdown checker
checkNewYear();

//! NEW YEAR ENDS HERE

//! Counter API Starts
async function fetchData() {
  try {
    let visitCounter = document.getElementById("visitCount");
    visitCounter.innerHTML = "Loading...";

    const response = await fetch("https://counter-api.onrender.com/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "year-bar",
      }),
    });

    // Assuming the API returns JSON
    const data = await response.json();
    const visitCount = data?.newData?.visits;

    visitCounter.innerHTML = visitCount;

    // console.log(data.newData.visits);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

//! COUNTER API ENDS
