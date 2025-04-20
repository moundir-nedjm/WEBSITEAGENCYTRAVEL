/**
 * MIRA BOOKING - Professional Travel Solutions
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Search Tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // You would typically show/hide different search forms here
            // based on the selected tab (hotels, flights, packages)
        });
    });
    
    // Modal Handling
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Switch to forgot password modal
    if (forgotPasswordLink && forgotPasswordModal && loginModal) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            forgotPasswordModal.style.display = 'flex';
        });
    }
    
    // Back to login modal
    if (backToLoginLink && loginModal && forgotPasswordModal) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Form Submissions
    const loginForm = document.querySelector('.login-form');
    const forgotPasswordForm = document.querySelector('.forgot-password-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Here you would typically make an API call to authenticate the user
            console.log('Login attempt with:', { email, password });
            
            // Simulate successful login
            alert('Login successful!');
            loginModal.style.display = 'none';
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get email for password reset
            const email = document.getElementById('reset-email').value;
            
            // Here you would typically make an API call to send reset email
            console.log('Password reset requested for:', email);
            
            // Simulate successful request
            alert('Password reset instructions sent to your email!');
            forgotPasswordModal.style.display = 'none';
        });
    }
    
    // Testimonial Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonialDots.length > 0 && testimonials.length > 0) {
        // Initially hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Setup dot click handlers
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Hide all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'none';
                });
                
                // Show selected testimonial
                if (testimonials[index]) {
                    testimonials[index].style.display = 'block';
                }
                
                // Update active dot
                testimonialDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                currentTestimonial = index;
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            // Show current testimonial
            testimonials[currentTestimonial].style.display = 'block';
            
            // Update active dot
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialDots[currentTestimonial].classList.add('active');
        }, 5000);
    }
    
    // Date picker defaults - set minimum dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkInField = document.getElementById('check-in');
    const checkOutField = document.getElementById('check-out');
    
    if (checkInField && checkOutField) {
        // Format date as YYYY-MM-DD for the date input
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        // Set minimum dates
        checkInField.min = formatDate(today);
        checkOutField.min = formatDate(tomorrow);
        
        // When check-in date changes, update check-out minimum date
        checkInField.addEventListener('change', () => {
            const checkInDate = new Date(checkInField.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            checkOutField.min = formatDate(nextDay);
            
            // If current check-out date is before new check-in date, update it
            if (new Date(checkOutField.value) <= checkInDate) {
                checkOutField.value = formatDate(nextDay);
            }
        });
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's a modal trigger or doesn't point to an element
            if (targetId === '#' || targetId === '#loginModal' || targetId === '#forgotPasswordModal') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle sticky header with scroll color change
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const expanded = mainNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when escape key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}); 