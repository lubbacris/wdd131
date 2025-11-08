//Getting the current year and display it in footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

//Displaying the last modified date
document.getElementById("lastModified").textContent = "Last modification: " + document.lastModified;