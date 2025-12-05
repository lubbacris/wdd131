//Product array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

//DOM Content Loading
document.addEventListener('DOMContentLoaded', function() {
    // Populate product select options
    populateProductSelect();
    
    //Setting current year in the footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    //Setting last modified date in the footer
    document.getElementById('lastModified').textContent = document.lastModified;
    
    //Setting minimum date for installation (can't be in the future)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('installDate').setAttribute('max', today);
    
    //Form validation and enhancements
    enhanceForm();
});

function populateProductSelect() {
    const productSelect = document.getElementById('productName');
    
    //Sorting products alphabetically
    products.sort((a, b) => a.name.localeCompare(b.name));
    
    //Adding product options
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
        productSelect.appendChild(option);
    });
}

function enhanceForm() {
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.stars input[type="radio"]');
    
    //Adding click handler for stars
    stars.forEach(star => {
        star.addEventListener('change', function() {
            //Removing all checked states first
            stars.forEach(s => {
                const label = document.querySelector(`label[for="${s.id}"]`);
                label.classList.remove('checked');
            });
            
            //Checking all stars up to the selected one
            const value = parseInt(this.value);
            for (let i = 5; i >= value; i--) {
                const starLabel = document.querySelector(`label[for="star${i}"]`);
                if (starLabel) {
                    starLabel.classList.add('checked');
                }
            }
        });
    });
    
    //Validating form before submission
    form.addEventListener('submit', function(event) {
        
        //Checking if rating is selected
        const ratingSelected = Array.from(stars).some(star => star.checked);
        if (!ratingSelected) {
            event.preventDefault();
            alert('Please select a rating before submitting.');
            return;
        }
        
        //Checking if date is valid
        const installDate = document.getElementById('installDate').value;
        if (installDate && new Date(installDate) > new Date()) {
            event.preventDefault();
            alert('Installation date cannot be in the future.');
            return;
        }
        
        //If Form is valid, then proceed with submission
        console.log('Form submitted successfully');
    });
    
    //Keyboard navigation for stars
    stars.forEach((star, index) => {
        star.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' && index < stars.length - 1) {
                stars[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                stars[index - 1].focus();
            }
        });
    });
}

//CSS for checked stars
const style = document.createElement('style');
style.textContent = `
    .star.checked {
        color: #f1c40f !important;
    }
`;
document.head.appendChild(style);