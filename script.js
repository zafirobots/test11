// Function to update Analog Clock & Date Display
function updateClock() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Convert 24-hour format to 12-hour format
    let hours12 = hours % 12 || 12;

    // Fix hour hand calculation by including minutes and seconds
    let hourDeg =(hours12 * 30) + (minutes * 0.5) + (seconds * (0.5 / 60)); 
    let minuteDeg = (minutes * 6) + (seconds * 0.1); 
    let secondDeg = seconds * 6; 

    // Apply rotations to clock hands
    document.querySelector('.hours').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minutes').style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector('.seconds').style.transform = `rotate(${secondDeg}deg)`;

    // Display date
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date-display").innerText = now.toLocaleDateString('en-IN', options);
}

// Ensure clock updates every second
document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});


// Ensure clock updates every second
document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});


// Ensure clock updates every second
document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});


// Ensure clock updates every second
document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
    getLocation();
});

// Fetch Live Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchLocation, showLocationError);
    } else {
        document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
    }
}

function fetchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            let locationName = `📍 ${data.address.city || data.address.town || data.address.village}, ${data.address.state}, ${data.address.country}`;
            document.getElementById("location").innerText = locationName;
        })
        .catch(() => {
            document.getElementById("location").innerText = "Location data unavailable.";
        });
}

// Error handling for location fetching
function showLocationError(error) {
    document.getElementById("location").innerText = "Unable to retrieve location.";
}
// Function to fetch sensor data from Firebase
function fetchSensorData() {
    fetch('https://prop-sat-default-rtdb.firebaseio.com/DHT22/Temperature.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperature").innerText = data ? data.toFixed(1) : "N/A";
        })
        .catch(() => document.getElementById("temperature").innerText = "Loading...");

    fetch('https://prop-sat-default-rtdb.firebaseio.com/DHT22/Humidity.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("humidity").innerText = data ? data.toFixed(1) : "N/A";
        })
        .catch(() => document.getElementById("humidity").innerText = "Loading...");

    fetch('https://prop-sat-default-rtdb.firebaseio.com/BMP180/Pressure.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("pressure").innerText = data ? data.toFixed(2) : "N/A";
        })
        .catch(() => document.getElementById("pressure").innerText = "Loading...");

    fetch('https://prop-sat-default-rtdb.firebaseio.com/RainSensor/Status.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("rain-status").innerText = data ? (data === "Rain Detected" ? "Raining" : "No Rain") : "N/A";
        })
        .catch(() => document.getElementById("rain-status").innerText = "Loading...");
}

// Fetch sensor data every 5 seconds
setInterval(fetchSensorData, 5000);
document.addEventListener("DOMContentLoaded", fetchSensorData);
