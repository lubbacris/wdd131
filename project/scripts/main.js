// Solar System Rollout - Main JavaScript File
// Demonstrates all required JavaScript features

// Object: Review template
const reviewTemplate = {
    id: 0,
    name: '',
    location: '',
    rating: 5,
    comment: '',
    date: '',
    
    getFormattedReview: function() {
        return `${this.name} from ${this.location}: "${this.comment}"`;
    }
};

// Array: Testimonials
const testimonials = [
    { name: 'Thabo M.', location: 'Johannesburg', rating: 5, comment: 'Life-changing installation!' },
    { name: 'Sarah K.', location: 'Cape Town', rating: 5, comment: 'Best investment ever' },
    { name: 'David L.', location: 'Durban', rating: 4, comment: 'Great value for money' }
];

// Function 1: Toggle mobile menu
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Close menu when clicking on links (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                menuToggle.click();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 && 
            mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            menuToggle.click();
        }
    });
}

// Function 2: Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Function 3: Update last modified date
function updateLastModified() {
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        lastModifiedElement.textContent = lastModified.toLocaleDateString('en-ZA', options);
    }
}

// Function 4: Animate stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function animateCount(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.includes('%') ? `${target}%` : target;
                clearInterval(timer);
            } else {
                element.textContent = element.textContent.includes('%') 
                    ? `${Math.floor(current)}%`
                    : Math.floor(current);
            }
        }, 30);
    }
    
    function handleScrollAnimation() {
        statNumbers.forEach(stat => {
            if (isInViewport(stat) && !stat.hasAttribute('data-animated')) {
                const target = parseInt(stat.getAttribute('data-count'));
                stat.setAttribute('data-animated', 'true');
                animateCount(stat, target);
            }
        });
    }
    
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
}

// Function 5: Initialize newsletter forms
function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Save to localStorage
            const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
            subscriptions.push({
                email: email,
                date: new Date().toISOString()
            });
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            
            // Show success message using template literal
            alert(`Thank you for subscribing! You'll receive updates at ${email}.`);
            this.reset();
        });
    });
}

// Function 6: Page visit tracker
function trackPageVisit() {
    const pageVisits = JSON.parse(localStorage.getItem('pageVisits') || '{}');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (!pageVisits[currentPage]) {
        pageVisits[currentPage] = 0;
    }
    pageVisits[currentPage]++;
    
    localStorage.setItem('pageVisits', JSON.stringify(pageVisits));
}

// Function 7: Gallery filter
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Function 8: FAQ accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Toggle current FAQ
            answer.classList.toggle('open');
            toggle.textContent = answer.classList.contains('open') ? '−' : '+';
        });
    });
}

// Function 9: Quick calculator
function initQuickCalculator() {
    const quickBillInput = document.getElementById('quick-bill');
    const billDisplay = document.getElementById('quick-bill-display');
    const calculateBtn = document.getElementById('quick-calculate');
    
    if (!quickBillInput || !billDisplay || !calculateBtn) return;
    
    // Update bill display
    quickBillInput.addEventListener('input', function() {
        billDisplay.textContent = `R${parseInt(this.value).toLocaleString()}`;
    });
    
    // Calculate savings
    calculateBtn.addEventListener('click', function() {
        const billAmount = parseInt(quickBillInput.value);
        
        // Conditional branching
        let savingsPercentage;
        if (billAmount < 1000) {
            savingsPercentage = 0.6;
        } else if (billAmount < 3000) {
            savingsPercentage = 0.75;
        } else {
            savingsPercentage = 0.85;
        }
        
        const monthlySavings = Math.round(billAmount * savingsPercentage);
        const annualSavings = monthlySavings * 12;
        const systemCost = 125000;
        const paybackYears = (systemCost / annualSavings).toFixed(1);
        
        // Update results using template literals
        document.getElementById('quick-monthly-savings').textContent = `R${monthlySavings.toLocaleString()}`;
        document.getElementById('quick-annual-savings').textContent = `R${annualSavings.toLocaleString()}`;
        document.getElementById('quick-payback').textContent = `${paybackYears} years`;
        
        // Save calculation
        const calculation = {
            billAmount: billAmount,
            monthlySavings: monthlySavings,
            timestamp: new Date().toISOString()
        };
        
        const calculations = JSON.parse(localStorage.getItem('calculations') || '[]');
        calculations.push(calculation);
        localStorage.setItem('calculations', JSON.stringify(calculations));
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    toggleMobileMenu();
    updateCopyrightYear();
    updateLastModified();
    animateStats();
    initNewsletterForms();
    trackPageVisit();
    
    // Initialize page-specific features
    if (document.querySelector('.gallery-filters')) {
        initGalleryFilters();
    }
    
    if (document.querySelector('.faq-container')) {
        initFAQAccordion();
    }
    
    if (document.getElementById('quick-calculate')) {
        initQuickCalculator();
    }
    
    // Log initialization
    console.log('Solar System Rollout website initialized');
    console.log('Testimonials array:', testimonials);
    console.log('Array method - Filtered high ratings:', testimonials.filter(t => t.rating >= 5));
});