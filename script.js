// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skill Items Animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.background = getRandomColor();
    });
});

function getRandomColor() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('Window width:', window.innerWidth);

    // Force show popup on mobile
    function showMobilePopup() {
        const popup = document.getElementById('mobilePopup');
        if (popup && window.innerWidth < 768) {
            popup.style.display = 'flex';
            console.log('Showing popup');
        }
    }

    // Initial check
    showMobilePopup();

    // Check on resize
    window.addEventListener('resize', () => {
        console.log('Resize detected');
        showMobilePopup();
    });

    // Close button
    const closeBtn = document.getElementById('closePopup');
    console.log('Close button element:', closeBtn);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            const popup = document.getElementById('mobilePopup');
            if (popup) {
                popup.style.display = 'none';
                console.log('Popup hidden');
            }
        });
    } else {
        console.log('Close button not found in DOM');
    }
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.project-card, .skill-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if(position.top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
});

// Search Functionality
const quickSearch = document.getElementById('quickSearch');
const skillFilter = document.getElementById('skillFilter');
const projectFilter = document.getElementById('projectFilter');
const resultCounter = document.querySelector('.counter');
const unit = document.querySelector('.unit');

function updateResults() {
    const selectedSkill = skillFilter.value;
    const selectedProject = projectFilter.value;
    const searchText = quickSearch.value.toLowerCase();
    
    let visibleCount = 0;
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const skills = card.dataset.skills ? card.dataset.skills.split(',') : [];
        const project = card.dataset.project;
        const cardText = card.textContent.toLowerCase();
        
        const matchesSkill = selectedSkill === 'all' || skills.includes(selectedSkill);
        const matchesProject = selectedProject === 'all' || project === selectedProject;
        const matchesSearch = searchText === '' || cardText.includes(searchText);
        
        if (matchesSkill && matchesProject && matchesSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (visibleCount === 0) {
        // Show no results message
        resultCounter.textContent = 'No';
        unit.textContent = 'results found for selected combination';
        
        // Add a helpful message div if it doesn't exist
        let noResultsMsg = document.querySelector('.no-results-message');
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            document.querySelector('.results-display').appendChild(noResultsMsg);
        }
        noResultsMsg.textContent = 'Try adjusting your filters or search terms';
        noResultsMsg.style.display = 'block';
    } else {
        // Normal results display
        resultCounter.textContent = visibleCount;
        unit.textContent = visibleCount === 1 ? 'item shown' : 'items shown';
        
        // Hide the no results message if it exists
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// Add event listeners
quickSearch.addEventListener('input', updateResults);
skillFilter.addEventListener('change', updateResults);
projectFilter.addEventListener('change', updateResults);

// Add interactive animations
quickSearch.addEventListener('focus', () => {
    quickSearch.parentElement.classList.add('measuring');
});

quickSearch.addEventListener('blur', () => {
    quickSearch.parentElement.classList.remove('measuring');
}); 