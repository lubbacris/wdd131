//Temple data
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, November, 2",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-55945.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3548.jpg"
    },
    {
        templeName: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 21000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/hong-kong-china-temple/hong-kong-china-temple-28125.jpg"
    },
    {
        templeName: "Kona Hawaii",
        location: "Kailua-Kona, Hawaii, United States",
        dedicated: "2000, January, 23",
        area: 10500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/kona-hawaii-temple/kona-hawaii-temple-52311.jpg"
    }
];

//DOM elements
const gallery = document.getElementById('temple-gallery');
const navLinks = document.querySelectorAll('.navigation a');
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

//Function to create a temple card
function createTempleCard(temple) {
    const card = document.createElement('div');
    card.className = 'temple-card';
    
    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'temple-info';
    
    const name = document.createElement('h3');
    name.textContent = temple.templeName;
    
    const location = document.createElement('p');
    location.textContent = `Location: ${temple.location}`;
    
    const dedicated = document.createElement('p');
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;
    
    const area = document.createElement('p');
    area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;
    
    info.appendChild(name);
    info.appendChild(location);
    info.appendChild(dedicated);
    info.appendChild(area);
    
    card.appendChild(img);
    card.appendChild(info);
    
    return card;
}

//Function to display temples
function displayTemples(filteredTemples) {
    gallery.innerHTML = '';
    filteredTemples.forEach(temple => {
        const card = createTempleCard(temple);
        gallery.appendChild(card);
    });
}

//Filter functions
function filterOld() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
}

function filterNew() {
    return temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
    });
}

function filterLarge() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmall() {
    return temples.filter(temple => temple.area < 10000);
}

function filterHome() {
    return temples;
}

//Function to handle filter selection
function handleFilter(filterType) {
    let filteredTemples;
    
    switch(filterType) {
        case 'old':
            filteredTemples = filterOld();
            break;
        case 'new':
            filteredTemples = filterNew();
            break;
        case 'large':
            filteredTemples = filterLarge();
            break;
        case 'small':
            filteredTemples = filterSmall();
            break;
        default:
            filteredTemples = filterHome();
    }
    
    displayTemples(filteredTemples);
    
    //Updating active nav link
    navLinks.forEach(link => {
        if (link.dataset.filter === filterType) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

//Functionality for Hamburger Menu
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
    displayTemples(temples);
    
    //Adding event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterType = link.dataset.filter;
            handleFilter(filterType);
        });
    });
    
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

//Window resizing
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navigation.classList.contains('active')) {
        navigation.classList.remove('active');
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
    }
});