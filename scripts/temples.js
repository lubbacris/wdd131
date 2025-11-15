//Functionality for Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('active');
    
//Changing hamburger menu to X when active
    if (navigation.classList.contains('active')) {
        hamburger.innerHTML = '✕';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

//Closing menu when clicking on a link
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

//Closing menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-content') && navigation.classList.contains('active')) {
        navigation.classList.remove('active');
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

//Updating copyright year and last modified date
function updateFooterDates() {
// Current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

//Last modification date
    const lastModified = new Date(document.lastModified);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('lastModified').textContent = 
        `Last Modification: ${lastModified.toLocaleDateString('en-US', options)}`;
}

//Initializing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateFooterDates();
    
//Adding loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

//Window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navigation.classList.contains('active')) {
        navigation.classList.remove('active');
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    }
});