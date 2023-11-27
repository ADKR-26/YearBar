function getYearPercentage() {
    let today = new Date();
    let year = today.getFullYear();
    let startDate = new Date(`${year}-01-01`);
    let secondsInAYear = 31536000;


    let timeDifference = today - startDate;

    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let timeDifferenceInSeconds = Math.floor((today - startDate) / 1000);

    // daysDifference = 100;

    let yearCompletePercentInSeconds = ((timeDifferenceInSeconds * 100) / secondsInAYear).toFixed(6);
    let yearCompletePercent = ((daysDifference * 100) / 365).toFixed(2);

    // console.log(yearCompletePercentInSeconds);

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

