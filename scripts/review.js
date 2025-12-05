document.addEventListener('DOMContentLoaded', function() {
    //Setting current year in the footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    //Setting the last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
    
    //Initializing and updating review counter
    updateReviewCounter();
    
    //Displaying form data if available
    displayFormData();
});

function updateReviewCounter() {
    //Getting current count from localStorage
    let reviewCount = localStorage.getItem('productReviewCount');
    
    //Initializing if doesn't exist
    if (!reviewCount) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }
    
    //Checking if we should increment (for form was submitted)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        //If form was submitted, then increment counter
        reviewCount++;
        localStorage.setItem('productReviewCount', reviewCount);
    }
    
    //Displaying the counter
    document.getElementById('reviewCounter').textContent = reviewCount;
    
    //Animating the counter
    animateCounter(reviewCount);
}

function animateCounter(target) {
    const counterElement = document.getElementById('reviewCounter');
    const current = parseInt(counterElement.textContent);
    
    if (current === target) return;
    
    let count = current;
    const increment = target > current ? 1 : -1;
    const duration = 1000; //ms
    const stepTime = Math.abs(Math.floor(duration / (target - current)));
    
    const timer = setInterval(() => {
        count += increment;
        counterElement.textContent = count;
        
        if (count === target) {
            clearInterval(timer);
        }
    }, stepTime);
}

function displayFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewDataElement = document.getElementById('reviewData');
    
    if (!urlParams.toString()) {
        reviewDataElement.innerHTML = '<p>No review data available.</p>';
        return;
    }
    
    let html = '<ul>';
    
    //Product Naming
    const productId = urlParams.get('product');
    if (productId) {
        html += `<li><strong>Product:</strong> ${getProductName(productId)}</li>`;
    }
    
    //Star rating
    const rating = urlParams.get('rating');
    if (rating) {
        const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
        html += `<li><strong>Rating:</strong> ${stars} (${rating}/5)</li>`;
    }
    
    //Installation Date
    const installDate = urlParams.get('installDate');
    if (installDate) {
        const date = new Date(installDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        html += `<li><strong>Installation Date:</strong> ${date}</li>`;
    }
    
    //Features
    const features = urlParams.getAll('features');
    if (features.length > 0) {
        const featureNames = features.map(f => {
            switch(f) {
                case 'durability': return 'Durability';
                case 'easeOfUse': return 'Ease of Use';
                case 'performance': return 'Performance';
                case 'design': return 'Design';
                default: return f;
            }
        });
        html += `<li><strong>Useful Features:</strong> ${featureNames.join(', ')}</li>`;
    }
    
    //Written Review
    const writtenReview = urlParams.get('writtenReview');
    if (writtenReview && writtenReview.trim()) {
        html += `<li><strong>Review:</strong> ${writtenReview.substring(0, 100)}${writtenReview.length > 100 ? '...' : ''}</li>`;
    }
    
    //User Name
    const userName = urlParams.get('userName');
    if (userName && userName.trim()) {
        html += `<li><strong>Submitted by:</strong> ${userName}</li>`;
    }
    
    html += '</ul>';
    reviewDataElement.innerHTML = html;
}

function getProductName(productId) {
    const products = [
        { id: "fc-1888", name: "Flux Capacitor" },
        { id: "fc-2050", name: "Power Laces" },
        { id: "fs-1987", name: "Time Circuits" },
        { id: "ac-2000", name: "Low Voltage Reactor" },
        { id: "jj-1969", name: "Warp Equalizer" }
    ];
    
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
}