/**
 * MIRA BOOKING - Enhanced JavaScript Functionality
 * Version: 1.0.0
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initModals();
    initDropdowns();
    initSliders();
    initAccordions();
    initSearchFunctionality();
    initFormValidation();
    initAnimations();
    initDatePickers();
    setupBookingForms();

    // Check if we're on specific pages
    if (document.querySelector('.destination-grid')) {
        initDestinationFilters();
        initMapView();
    }
    
    if (document.querySelector('.document-upload-section')) {
        initDocumentUpload();
    }
    
    if (document.querySelector('.dashboard-sidebar')) {
        initDashboard();
    }
});

/**
 * Navigation Functionality
 */
function initNavigation() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle') || document.querySelector('.menu-toggle');
    if (menuToggle) {
        const mainNav = document.querySelector('.main-nav') || document.querySelector('nav');
        
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Sticky header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Add active class to current page in navigation
    const currentPageUrl = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPageUrl || (currentPageUrl === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Modal Functionality
 */
function initModals() {
    // Login Modal
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
            document.body.classList.add('modal-open');
        });
    }
    
    if (forgotPasswordLink && forgotPasswordModal && loginModal) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            forgotPasswordModal.style.display = 'block';
        });
    }
    
    if (backToLoginLink && forgotPasswordModal && loginModal) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    });
}

/**
 * Dropdown Functionality
 */
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
            
            // Close other open dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-content')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // User dropdown in dashboard
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        const userBtn = userDropdown.querySelector('.user-btn');
        const dropdownContent = userDropdown.querySelector('.dropdown-content');
        
        userBtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('active');
        });
    }
    
    // Notification dropdown in dashboard
    const notificationDropdown = document.querySelector('.notification-dropdown');
    if (notificationDropdown) {
        const notificationBtn = notificationDropdown.querySelector('.notification-btn');
        const dropdownContent = notificationDropdown.querySelector('.dropdown-content');
        
        notificationBtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('active');
        });
    }
}

/**
 * Slider Functionality
 */
function initSliders() {
    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        const testimonials = testimonialsSlider.querySelectorAll('.testimonial-item, .testimonial');
        if (testimonials.length > 1) {
            let currentSlide = 0;
            
            // Initially hide all slides except the first one
            testimonials.forEach((slide, index) => {
                if (index !== 0) {
                    slide.style.display = 'none';
                }
            });
            
            // Update dots if they exist
            const updateDots = () => {
                const dots = document.querySelectorAll('.testimonial-dots .dot');
                if (dots.length > 0) {
                    dots.forEach((dot, index) => {
                        if (index === currentSlide) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            };
            
            // Next slide function
            const nextSlide = () => {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
                updateDots();
            };
            
            // Set up automatic rotation
            setInterval(nextSlide, 5000);
            
            // Set up dots functionality
            const dots = document.querySelectorAll('.testimonial-dots .dot');
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    testimonials[currentSlide].style.display = 'none';
                    currentSlide = index;
                    testimonials[currentSlide].style.display = 'block';
                    updateDots();
                });
            });
        }
    }
    
    // Destinations slider/carousel
    const packagesSlider = document.querySelector('.packages-slider');
    if (packagesSlider) {
        // Simple carousel logic
        // This would be expanded in a real implementation
        console.log('Packages slider initialized');
    }
}

/**
 * Accordion Functionality
 */
function initAccordions() {
    // FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                
                // Close other open accordions (optional)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

/**
 * Search Functionality
 */
function initSearchFunctionality() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get search parameters
            const destination = document.getElementById('destination')?.value;
            const checkIn = document.getElementById('check-in')?.value;
            const checkOut = document.getElementById('check-out')?.value;
            const guests = document.getElementById('guests')?.value;
            
            // Validate if needed
            if (!destination) {
                alert('Please enter a destination');
                return;
            }
            
            // In a real app, this would redirect to search results
            // For now, just show an alert
            alert(`Searching for: ${destination}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
            
            // This would typically redirect to a search results page
            // window.location.href = `search-results.html?dest=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`;
        });
    }
    
    // Destination filters
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get filter values
            const searchQuery = document.getElementById('destination-search')?.value;
            const type = document.getElementById('destination-type')?.value;
            const region = document.getElementById('destination-region')?.value;
            const budget = document.getElementById('budget-range')?.value;
            const season = document.getElementById('travel-season')?.value;
            
            // This would typically filter the destination cards
            // For now, just log the filter values
            console.log('Filters applied:', { searchQuery, type, region, budget, season });
            
            // Simple filtering for demonstration
            const destinationCards = document.querySelectorAll('.destination-card');
            destinationCards.forEach(card => {
                const cardName = card.querySelector('.destination-name').textContent.toLowerCase();
                const cardRegion = card.querySelector('.destination-meta span:first-child').textContent.toLowerCase();
                
                let showCard = true;
                
                if (searchQuery && !cardName.includes(searchQuery.toLowerCase())) {
                    showCard = false;
                }
                
                if (region && region !== 'all' && !cardRegion.includes(region.toLowerCase().replace('-', ' '))) {
                    showCard = false;
                }
                
                card.style.display = showCard ? 'block' : 'none';
            });
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('[name="name"]')?.value;
            const email = this.querySelector('[name="email"]')?.value;
            const message = this.querySelector('[name="message"]')?.value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real app, this would submit the form to a server
            // For now, just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Registration form validation
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const agencyName = this.querySelector('[name="agency-name"]')?.value;
            const email = this.querySelector('[name="email"]')?.value;
            const password = this.querySelector('[name="password"]')?.value;
            const confirmPassword = this.querySelector('[name="confirm-password"]')?.value;
            
            // Validate required fields
            if (!agencyName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Check password match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Check password strength
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            // In a real app, this would submit the form to a server
            // For now, just show a success message
            alert('Registration successful! You will receive an email with further instructions.');
            this.reset();
        });
    }
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                passwordField.type = 'password';
                this.innerHTML = '<i class="far fa-eye"></i>';
            }
        });
    });
}

/**
 * Animation Functions
 */
function initAnimations() {
    // Simple animations for elements as they come into view
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    const handleScroll = () => {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    };
    
    // Call once to check elements in view on page load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

/**
 * Date Picker Initialization
 */
function initDatePickers() {
    const checkInField = document.getElementById('check-in');
    const checkOutField = document.getElementById('check-out');
    
    if (checkInField && checkOutField) {
        // Set min date for check-in to today
        const today = new Date().toISOString().split('T')[0];
        checkInField.setAttribute('min', today);
        
        // Update check-out min date when check-in changes
        checkInField.addEventListener('change', function() {
            if (this.value) {
                checkOutField.setAttribute('min', this.value);
                
                // If check-out date is before new check-in, reset it
                if (checkOutField.value && checkOutField.value < this.value) {
                    checkOutField.value = '';
                }
            }
        });
    }
}

/**
 * Booking Form Setup
 */
function setupBookingForms() {
    // Handle booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation would go here
            
            // Display confirmation message or redirect
            alert('Your booking request has been submitted successfully!');
        });
    }
}

/**
 * Destination Filters
 */
function initDestinationFilters() {
    // Grid/Map view toggle
    const gridViewBtn = document.getElementById('grid-view-btn');
    const mapViewBtn = document.getElementById('map-view-btn');
    const destinationGrid = document.querySelector('.destination-grid');
    const mapView = document.getElementById('map-view');
    
    if (gridViewBtn && mapViewBtn && destinationGrid && mapView) {
        gridViewBtn.addEventListener('click', function() {
            destinationGrid.style.display = 'grid';
            mapView.style.display = 'none';
            gridViewBtn.classList.add('active');
            mapViewBtn.classList.remove('active');
        });
        
        mapViewBtn.addEventListener('click', function() {
            destinationGrid.style.display = 'none';
            mapView.style.display = 'block';
            mapViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would load more destinations
            alert('In a real implementation, this would load more destinations from the server.');
        });
    }
}

/**
 * Map View Initialization
 */
function initMapView() {
    // This would initialize a map using a library like Google Maps or Leaflet
    const mapView = document.getElementById('map-view');
    if (mapView) {
        console.log('Map view initialized');
        // This is just a placeholder for the real map initialization
        mapView.innerHTML = '<div style="padding: 20px; text-align: center;"><p>Map view would be implemented with a mapping API like Google Maps or Leaflet.js</p></div>';
    }
}

/**
 * Document Upload Functionality
 */
function initDocumentUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        // Handle click to browse files
        area.addEventListener('click', function() {
            const fileInput = this.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.click();
            }
        });
        
        // Handle file selection
        const fileInput = area.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                handleFileUpload(this.files[0], area);
            });
        }
        
        // Handle drag and drop
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        area.addEventListener('dragleave', function() {
            this.classList.remove('active');
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('active');
            
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0], area);
            }
        });
    });
    
    // Handle file upload
    function handleFileUpload(file, uploadArea) {
        if (!file) return;
        
        // Update UI to show the selected file
        const filePreview = uploadArea.nextElementSibling;
        if (filePreview && filePreview.classList.contains('file-preview')) {
            filePreview.classList.add('active');
            
            // Create file preview item
            const fileItem = document.createElement('div');
            fileItem.className = 'file-preview-item';
            
            // Determine file type icon
            let fileIcon = 'fa-file';
            if (file.type.startsWith('image/')) {
                fileIcon = 'fa-file-image';
            } else if (file.type === 'application/pdf') {
                fileIcon = 'fa-file-pdf';
            } else if (file.type.includes('word')) {
                fileIcon = 'fa-file-word';
            }
            
            // Format file size
            const fileSize = file.size < 1024 * 1024 
                ? Math.round(file.size / 1024) + ' KB' 
                : Math.round(file.size / (1024 * 1024) * 10) / 10 + ' MB';
            
            fileItem.innerHTML = `
                <div class="file-type-icon">
                    <i class="fas ${fileIcon}"></i>
                </div>
                <div class="file-info">
                    <h4 class="file-name">${file.name}</h4>
                    <div class="file-meta">
                        <span>${file.type || 'Unknown type'}</span>
                        <span>${fileSize}</span>
                    </div>
                </div>
                <div class="file-actions">
                    <button type="button" class="file-action-btn delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            // Clear previous preview
            filePreview.innerHTML = '';
            filePreview.appendChild(fileItem);
            
            // Handle delete button
            const deleteBtn = fileItem.querySelector('.delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    filePreview.innerHTML = '';
                    filePreview.classList.remove('active');
                    // Reset file input
                    const fileInput = uploadArea.querySelector('input[type="file"]');
                    if (fileInput) {
                        fileInput.value = '';
                    }
                });
            }
        }
    }
}

/**
 * Dashboard Functionality
 */
function initDashboard() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardWrapper = document.querySelector('.dashboard-wrapper');
    
    if (sidebarToggle && dashboardWrapper) {
        sidebarToggle.addEventListener('click', function() {
            dashboardWrapper.classList.toggle('sidebar-collapsed');
        });
    }
    
    // Chart initialization (placeholder)
    const chartCanvases = document.querySelectorAll('.dashboard-chart');
    if (chartCanvases.length) {
        console.log('Dashboard charts would be initialized here with a charting library');
    }
    
    // Table sorting
    const sortableTableHeaders = document.querySelectorAll('.sortable');
    sortableTableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const index = Array.from(this.parentNode.children).indexOf(this);
            const isAscending = !this.classList.contains('asc');
            
            // Update sort direction indicators
            sortableTableHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            this.classList.add(isAscending ? 'asc' : 'desc');
            
            // Sort the table rows
            if (table) {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                rows.sort((a, b) => {
                    const cellA = a.querySelectorAll('td')[index].textContent.trim();
                    const cellB = b.querySelectorAll('td')[index].textContent.trim();
                    
                    if (!isNaN(cellA) && !isNaN(cellB)) {
                        return isAscending ? cellA - cellB : cellB - cellA;
                    } else {
                        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
                    }
                });
                
                // Reinsert sorted rows
                rows.forEach(row => tbody.appendChild(row));
            }
        });
    });
} 