// Form Validation for Get Started and Review Pages

document.addEventListener('DOMContentLoaded', function() {
    // Get Started Form
    const assessmentForm = document.getElementById('solar-assessment-form');
    const reviewForm = document.getElementById('product-review-form');
    
    if (assessmentForm) {
        initAssessmentForm(assessmentForm);
    }
    
    if (reviewForm) {
        initReviewForm(reviewForm);
    }
});

// Assessment Form
function initAssessmentForm(form) {
    const clearBtn = document.getElementById('clear-form');
    const successMsg = document.getElementById('success-message');
    const newRequestBtn = document.getElementById('new-request');
    
    // Set max date to today for date inputs
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('max', today);
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        // Save to localStorage
        saveAssessment(data);
        
        // Show success message
        showSuccess(this, successMsg, data.email);
    });
    
    // Clear form
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            form.reset();
        });
    }
    
    // New request
    if (newRequestBtn && successMsg) {
        newRequestBtn.addEventListener('click', function() {
            successMsg.style.display = 'none';
            form.style.display = 'block';
        });
    }
}

// Review Form
function initReviewForm(form) {
    const resetBtn = document.getElementById('reset-review');
    const successDiv = document.getElementById('review-success');
    const submitAnotherBtn = document.getElementById('submit-another');
    
    // Set max date to today
    const dateInput = document.getElementById('installation-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('max', today);
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Create review object
        const review = {
            id: Date.now(),
            ...data,
            date: new Date().toISOString().split('T')[0]
        };
        
        // Save to localStorage
        saveReview(review);
        
        // Show success
        showReviewSuccess(this, successDiv);
        
        // Update reviews list
        updateReviewsList();
    });
    
    // Reset form
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            form.reset();
        });
    }
    
    // Submit another
    if (submitAnotherBtn && successDiv) {
        submitAnotherBtn.addEventListener('click', function() {
            successDiv.style.display = 'none';
            form.style.display = 'block';
            form.reset();
        });
    }
    
    // Load existing reviews
    updateReviewsList();
}

// Form validation function
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightError(field);
        } else {
            removeError(field);
            
            // Specific validation for email
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    highlightError(field, 'Please enter a valid email address');
                }
            }
            
            // Specific validation for phone
            if (field.type === 'tel') {
                const phoneRegex = /^[0-9+\s]{10,15}$/;
                if (!phoneRegex.test(field.value)) {
                    isValid = false;
                    highlightError(field, 'Please enter a valid phone number');
                }
            }
        }
    });
    
    return isValid;
}

function highlightError(field, message = 'This field is required') {
    field.style.borderColor = '#e74c3c';
    
    // Create or update error message
    let errorMsg = field.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        field.parentNode.insertBefore(errorMsg, field.nextSibling);
    }
    
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

function removeError(field) {
    field.style.borderColor = '';
    
    // Remove error message
    const errorMsg = field.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.style.display = 'none';
    }
}

function saveAssessment(data) {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    assessments.push(data);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    
    console.log(`Assessment saved. Total: ${assessments.length}`);
}

function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('userReviews', JSON.stringify(reviews));
    
    console.log(`Review saved. Total: ${reviews.length}`);
}

function showSuccess(form, successDiv, email) {
    form.style.display = 'none';
    successDiv.style.display = 'block';
    
    // Update email in success message
    const emailSpan = document.getElementById('user-email');
    if (emailSpan) {
        emailSpan.textContent = email;
    }
}

function showReviewSuccess(form, successDiv) {
    form.style.display = 'none';
    successDiv.style.display = 'block';
}

function updateReviewsList() {
    const reviewsContainer = document.getElementById('reviews-list');
    if (!reviewsContainer) return;
    
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    
    // If no reviews, show sample
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="review-card">
                <div class="review-header">
                    <h4>Life-changing installation!</h4>
                    <div class="review-meta">
                        <span class="reviewer">Thabo M.</span>
                        <span class="location">Johannesburg</span>
                        <span class="rating">★★★★★</span>
                    </div>
                </div>
                <p>"Since installing solar, we haven't experienced a single hour of load-shedding. Our electricity bill has dropped by 75%!"</p>
            </div>
        `;
        return;
    }
    
    // Display reviews using template literals
    reviewsContainer.innerHTML = '';
    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const reviewHTML = `
            <div class="review-card">
                <div class="review-header">
                    <h4>${review['review-title'] || 'Great Service'}</h4>
                    <div class="review-meta">
                        <span class="reviewer">${review['reviewer-name']}</span>
                        <span class="location">${review.location}</span>
                        <span class="rating">${stars}</span>
                    </div>
                </div>
                <p>"${review['review-text']}"</p>
                <div class="review-date">${review.date}</div>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHTML;
    });
}