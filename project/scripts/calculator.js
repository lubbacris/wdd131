// Enhanced Solar Savings Calculator

document.addEventListener('DOMContentLoaded', function() {
    // Check if calculator exists on page
    if (!document.querySelector('.calculator-container')) {
        return;
    }
    
    // DOM Elements
    const monthlyBill = document.getElementById('monthly-bill');
    const billAmount = document.getElementById('bill-amount');
    const locationSelect = document.getElementById('location');
    const systemSize = document.getElementById('system-size');
    const batteryBackup = document.getElementById('battery-backup');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset-calc');
    const resultsDiv = document.getElementById('calculation-results');
    
    // Object: Location data
    const locations = {
        johannesburg: {
            name: 'Johannesburg',
            sunlight: 4.5,
            rate: 2.50,
            costMultiplier: 1.0
        },
        'cape-town': {
            name: 'Cape Town',
            sunlight: 4.8,
            rate: 2.75,
            costMultiplier: 1.1
        },
        durban: {
            name: 'Durban',
            sunlight: 5.2,
            rate: 2.60,
            costMultiplier: 1.05
        },
        pretoria: {
            name: 'Pretoria',
            sunlight: 4.7,
            rate: 2.55,
            costMultiplier: 1.0
        }
    };
    
    // Array: System configurations
    const systemConfigs = [
        { size: 3, cost: 75000, capacity: 3000 },
        { size: 5, cost: 125000, capacity: 5000 },
        { size: 8, cost: 200000, capacity: 8000 },
        { size: 10, cost: 250000, capacity: 10000 }
    ];
    
    // Update bill display
    if (monthlyBill && billAmount) {
        monthlyBill.addEventListener('input', function() {
            billAmount.textContent = formatCurrency(parseInt(this.value));
        });
        
        // Initial display
        billAmount.textContent = formatCurrency(parseInt(monthlyBill.value));
    }
    
    // Calculate savings
    if (calculateBtn && resultsDiv) {
        calculateBtn.addEventListener('click', function() {
            const bill = parseInt(monthlyBill.value);
            const locationId = locationSelect.value;
            const size = parseInt(systemSize.value);
            const hasBattery = batteryBackup.checked;
            
            // Conditional branching for validation
            if (!locationId) {
                alert('Please select your location');
                return;
            }
            
            if (bill < 500) {
                alert('Minimum bill amount is R500');
                return;
            }
            
            // Get location data
            const location = locations[locationId];
            const systemConfig = systemConfigs.find(config => config.size === size);
            
            if (!location || !systemConfig) {
                alert('Invalid configuration');
                return;
            }
            
            // Calculate savings
            const monthlyProduction = size * location.sunlight * 30 * 0.18;
            const monthlySavings = monthlyProduction * location.rate;
            
            // Cap savings at 90% of bill
            const cappedSavings = Math.min(monthlySavings, bill * 0.9);
            const annualSavings = cappedSavings * 12;
            
            // Calculate system cost
            let systemCost = systemConfig.cost * location.costMultiplier;
            if (hasBattery) {
                systemCost *= 1.3;
            }
            
            // Calculate payback period
            const paybackYears = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : 'N/A';
            
            // Calculate CO₂ reduction
            const co2Reduction = (monthlyProduction * 12 * 0.85) / 1000;
            
            // Update results using template literals
            document.getElementById('result-monthly').textContent = formatCurrency(Math.round(cappedSavings));
            document.getElementById('result-annual').textContent = formatCurrency(Math.round(annualSavings));
            document.getElementById('result-cost').textContent = formatCurrency(Math.round(systemCost));
            document.getElementById('result-payback').textContent = `${paybackYears} years`;
            document.getElementById('result-co2').textContent = `${co2Reduction.toFixed(1)} tonnes/year`;
            
            // Show results
            resultsDiv.style.display = 'block';
            
            // Save calculation to localStorage
            const calculation = {
                bill: bill,
                location: location.name,
                systemSize: size,
                monthlySavings: Math.round(cappedSavings),
                systemCost: Math.round(systemCost),
                timestamp: new Date().toISOString()
            };
            
            saveCalculation(calculation);
            
            // Log calculation
            console.log(`Calculation saved: ${calculation.systemSize}kW system in ${calculation.location}`);
        });
    }
    
    // Reset calculator
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            monthlyBill.value = 2500;
            billAmount.textContent = 'R2,500';
            locationSelect.value = 'durban';
            systemSize.value = '5';
            batteryBackup.checked = true;
            resultsDiv.style.display = 'none';
        });
    }
    
    // Helper function: Format currency
    function formatCurrency(amount) {
        return `R${amount.toLocaleString('en-ZA')}`;
    }
    
    // Helper function: Save calculation
    function saveCalculation(data) {
        const calculations = JSON.parse(localStorage.getItem('savingsCalculations') || '[]');
        calculations.push(data);
        localStorage.setItem('savingsCalculations', JSON.stringify(calculations.slice(-10)));
        
        console.log(`Total calculations saved: ${calculations.length}`);
    }
    
    // Load previous calculation if available
    function loadPreviousCalculation() {
        const calculations = JSON.parse(localStorage.getItem('savingsCalculations') || '[]');
        if (calculations.length > 0) {
            const lastCalc = calculations[calculations.length - 1];
            
            // Set values
            monthlyBill.value = lastCalc.bill || 2500;
            billAmount.textContent = formatCurrency(monthlyBill.value);
            
            // Find location by name
            const locationEntry = Object.entries(locations).find(([key, value]) => 
                value.name === lastCalc.location
            );
            if (locationEntry) {
                locationSelect.value = locationEntry[0];
            }
            
            if (lastCalc.systemSize) {
                systemSize.value = lastCalc.systemSize;
            }
            
            console.log('Loaded previous calculation');
        }
    }
    
    // Initialize
    loadPreviousCalculation();
});