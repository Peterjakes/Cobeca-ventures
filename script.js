// Cobeca Ventures Limited Website JavaScript
// -----------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components and functionalities
    initMobileMenu();
    initScrollToTop();
    initProjectFilter();
    initFormValidation();
    initScrollAnimation();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Change hamburger to X
            if(this.classList.contains('active')) {
                this.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                this.querySelectorAll('span')[1].style.opacity = '0';
                this.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                this.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if(!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-menu') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close mobile menu when clicking on a menu item
        document.querySelectorAll('.nav-menu a').forEach(item => {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if(scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if(window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Project Filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if(filterButtons.length && projectItems.length) {
        // Initial state - show only building projects since that button is active by default
        filterProjects('building');
        
        // Add click event for each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the filter value
                const filter = this.getAttribute('data-filter');
                
                // Update UI - remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to current button
                this.classList.add('active');
                
                // Filter the projects
                if(filter === 'all') {
                    showAllProjects();
                } else {
                    filterProjects(filter);
                }
            });
        });
        
        // Helper function to show all projects
        function showAllProjects() {
            projectItems.forEach(item => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            });
        }
        
        // Helper function to filter projects by category
        function filterProjects(filterValue) {
            // Hide all projects first
            projectItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            });
            
            // Show only projects matching the filter
            setTimeout(() => {
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if(category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    }
                });
            }, 310);
        }
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validation flags
            let isValid = true;
            
            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Validate name
            if(!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if(!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email address');
                isValid = false;
            } else if(!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if(!subjectInput.value.trim()) {
                showError(subjectInput, 'Please enter a subject');
                isValid = false;
            }
            
            // Validate message
            if(!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, submit it or show success message
            if(isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                
                // Create success message element
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you, ${nameInput.value}! We have received your message and will contact you soon.</p>
                    <button type="button" class="btn btn-accent close-message">Close</button>
                `;
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Add event listener to close button
                const closeButton = successMessage.querySelector('.close-message');
                closeButton.addEventListener('click', function() {
                    // Remove success message and show form again
                    successMessage.remove();
                    contactForm.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                });
            }
        });
        
        // Email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Show error message function
        function showError(inputElement, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            
            inputElement.parentElement.appendChild(errorMessage);
            inputElement.style.borderColor = 'var(--error)';
            
            // Remove error styling when input changes
            inputElement.addEventListener('input', function() {
                this.style.borderColor = '';
                const error = this.parentElement.querySelector('.error-message');
                if(error) error.remove();
            });
        }
    }
}

// Scroll Animation
function initScrollAnimation() {
    // Add .hidden class to elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.classList.add('hidden');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(el => {
            if(isInViewport(el)) {
                el.classList.add('show');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on page load
    handleScroll();
    
    // Add animation to stat counters
    const statItems = document.querySelectorAll('.stat-number');
    
    if(statItems.length) {
        // Function to animate counter
        function animateCounter(element) {
            const target = parseInt(element.innerText.replace(/\D/g, ''));
            const duration = 2000; // in milliseconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if(current >= target) {
                    element.innerText = element.innerText.includes('+') ? 
                        target + '+' : element.innerText.includes('%') ? 
                        target + '%' : target;
                    clearInterval(timer);
                } else {
                    element.innerText = element.innerText.includes('+') ? 
                        Math.floor(current) + '+' : element.innerText.includes('%') ? 
                        Math.floor(current) + '%' : Math.floor(current);
                }
            }, 16);
        }
        
        // Check if stat item is in viewport and animate
        function checkStats() {
            statItems.forEach(el => {
                if(isInViewport(el) && !el.classList.contains('animated')) {
                    el.classList.add('animated');
                    animateCounter(el);
                }
            });
        }
        
        // Add scroll event listener for stats
        window.addEventListener('scroll', checkStats);
        
        // Initial check on page load
        checkStats();
    }
}

// Create placeholder SVG backgrounds for missing images
function createPlaceholderSVG(width, height, text) {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#e9e9e9"/>
            <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle" fill="#888">${text}</text>
        </svg>
    `;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Fix missing images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            const alt = this.getAttribute('alt') || 'Image';
            const width = this.getAttribute('width') || 300;
            const height = this.getAttribute('height') || 200;
            this.src = createPlaceholderSVG(width, height, alt);
        });
    });
});



