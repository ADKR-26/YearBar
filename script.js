function getYearPercentage() {
    let today = new Date();
    let year = today.getFullYear();
    let startDate = new Date(`${year}-01-01`);
    let secondsInAYear = 31536000;


    let timeDifference = today - startDate;

    // console.log(timeDifference);

    // var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let timeDifferenceInSeconds = Math.floor((today - startDate) / 1000);

    // daysDifference = 100;

    let yearCompletePercentInSeconds = ((timeDifferenceInSeconds * 100) / secondsInAYear).toFixed(6);
    // let yearCompletePercent = ((daysDifference * 100) / 365).toFixed(2);

    // console.log(timeDifferenceInSeconds);

    var progressBar = document.getElementById("myProgress");
    progressBar.value = yearCompletePercentInSeconds;

    var progressData = document.getElementById('data');
    data.innerHTML = yearCompletePercentInSeconds + " %";
}

setInterval(getYearPercentage, 1000);

getYearPercentage();

//to show current time
function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Add leading zero if the number is less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('currentTime').textContent = timeString;
}

setInterval(getCurrentTime, 1000);

getCurrentTime();


console.log('%cHIRE ME', 'font-size: 24px; color: #3498db; font-weight: bold;');

console.log(
    '%cCheck out my portfolio: %chttps://adkr-portfolio.vercel.app/',
    'font-size: 16px; color: #2ecc71; font-weight: bold;',
    'font-size: 16px; color: #3498db;'
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
    "oTransform"
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

// function to execute snowflakes around christmas

let date = new Date();
let todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
let currentYear = date.getFullYear();


var start = `${currentYear}-12-20`;
var end = `${currentYear}-12-30`;

// condition to check christmas week
if (todayDate >= start && todayDate <= end) {
    var oldElement = document.getElementById('snowflakeInactive');
    oldElement.id = 'snowflakeContainer';
    setup();
    console.log('%c 🎄✨ Merry Christmas! 🎅🌟', 'color: #e44d26; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px #228b22;');
    console.log('%c May your holidays be filled with love, laughter, and magic. 🎁❄️', 'color: #3498db; font-size: 16px;');
    console.log('  ');
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

//! SNOW ENDS HERE


//! Counter API Starts
async function fetchData() {
    try {
        let visitCounter = document.getElementById('visitCount');
        visitCounter.innerHTML = 'Loading...';

        const response = await fetch('https://counter-api.onrender.com/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'year-bar',
            }),
        });

        // Assuming the API returns JSON
        const data = await response.json();
        const visitCount = data?.newData?.visits;


        visitCounter.innerHTML = visitCount;

        // console.log(data.newData.visits);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

//! COUNTER API ENDS