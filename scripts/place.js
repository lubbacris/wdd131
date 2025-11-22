//Updating footer with current year and last modification date
document.addEventListener('DOMContentLoaded', function() {
    //Setting current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    //Setting last modification date
    const lastModified = document.lastModified;
    document.getElementById('lastmodified').textContent = lastModified;
    
    //Calculating and displaying wind chill
    calculateAndDisplayWindChill();
});

function calculateAndDisplayWindChill() {
    const temperature = 10; //
    const windSpeed = 5;
    
    //Checking conditions for wind chill calculation
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        document.getElementById('wind-chill').textContent = `${windChill} °C`;
    } else {
        document.getElementById('wind-chill').textContent = "N/A";
    }
}

function calculateWindChill(temperature, windSpeed) {

    const windChill = 13.12 + 
                      (0.6215 * temperature) - 
                      (11.37 * Math.pow(windSpeed, 0.16)) + 
                      (0.3965 * temperature * Math.pow(windSpeed, 0.16));
    
    return Math.round(windChill * 10) / 10;
}