/**
 * MIRA BOOKING Theme Switcher
 * Allows users to change site themes and remembers preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create theme switcher HTML structure
    createThemeSwitcher();
    
    // Initialize theme on page load
    initTheme();
    
    // Setup event listeners
    setupEventListeners();
});

/**
 * Creates the theme switcher HTML and injects it into the document
 */
function createThemeSwitcher() {
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    
    themeSwitcher.innerHTML = `
        <div class="theme-switcher-toggle">
            <i class="fas fa-paint-brush"></i>
        </div>
        <div class="theme-switcher-content">
            <h4>Choisir un thème</h4>
            <div class="theme-options">
                <div class="theme-option theme-blue" data-theme="default" title="Bleu (Défaut)"></div>
                <div class="theme-option theme-purple" data-theme="theme-purple" title="Violet"></div>
                <div class="theme-option theme-teal" data-theme="theme-teal" title="Turquoise"></div>
                <div class="theme-option theme-green" data-theme="theme-green" title="Vert"></div>
                <div class="theme-option theme-dark" data-theme="theme-dark" title="Sombre"></div>
                <div class="theme-option theme-desert" data-theme="theme-desert" title="Désert"></div>
                <div class="theme-option theme-algeria" data-theme="theme-algeria" title="Algérie"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(themeSwitcher);
}

/**
 * Initializes the theme based on saved preference or default
 */
function initTheme() {
    const savedTheme = localStorage.getItem('miraTheme') || 'default';
    applyTheme(savedTheme);
    
    // Mark the active theme option
    const activeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
    if (activeOption) {
        activeOption.classList.add('active');
    }
}

/**
 * Sets up all event listeners for theme switcher
 */
function setupEventListeners() {
    // Toggle theme switcher panel
    const themeToggle = document.querySelector('.theme-switcher-toggle');
    const themeSwitcher = document.querySelector('.theme-switcher');
    
    themeToggle.addEventListener('click', function() {
        themeSwitcher.classList.toggle('active');
    });
    
    // Theme option selection
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Apply and save theme
            applyTheme(theme);
            localStorage.setItem('miraTheme', theme);
        });
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (themeSwitcher.classList.contains('active') && 
            !themeSwitcher.contains(event.target)) {
            themeSwitcher.classList.remove('active');
        }
    });
}

/**
 * Applies the selected theme to the document
 * @param {string} theme - The theme identifier to apply
 */
function applyTheme(theme) {
    // Remove all theme classes from body
    document.body.classList.remove(
        'theme-purple', 
        'theme-teal', 
        'theme-green', 
        'theme-dark', 
        'theme-desert', 
        'theme-algeria'
    );
    
    // Add the selected theme class if not default
    if (theme !== 'default') {
        document.body.classList.add(theme);
    }
    
    // Update meta theme-color for browsers that support it
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (metaThemeColor) {
        let themeColor = '#1a73e8'; // Default blue
        
        switch(theme) {
            case 'theme-purple': themeColor = '#673ab7'; break;
            case 'theme-teal': themeColor = '#009688'; break;
            case 'theme-green': themeColor = '#4caf50'; break;
            case 'theme-dark': themeColor = '#121212'; break;
            case 'theme-desert': themeColor = '#d2691e'; break;
            case 'theme-algeria': themeColor = '#136245'; break;
        }
        
        metaThemeColor.setAttribute('content', themeColor);
    }
}

/**
 * Display notification when theme is changed
 * @param {string} theme - The theme identifier
 */
function showThemeChangeNotification(theme) {
    // Create notification if it doesn't exist
    let notification = document.querySelector('.theme-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'theme-notification';
        document.body.appendChild(notification);
    }
    
    // Set theme name for display
    let themeName = 'Default Blue';
    switch (theme) {
        case 'theme-purple': themeName = 'Deep Purple'; break;
        case 'theme-teal': themeName = 'Teal'; break;
        case 'theme-green': themeName = 'Green'; break;
        case 'theme-dark': themeName = 'Dark'; break;
        case 'theme-desert': themeName = 'Desert'; break;
        case 'theme-algeria': themeName = 'Algeria'; break;
    }
    
    // Update notification content
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Theme changed to ${themeName}</span>
        </div>
    `;
    
    // Show notification
    notification.classList.add('active');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

/**
 * Add notification styles if not already in stylesheet
 */
function addNotificationStyles() {
    // Only add if not already present
    if (!document.querySelector('#theme-notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'theme-notification-styles';
        
        styleSheet.innerHTML = `
            .theme-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 10000;
            }
            
            .theme-notification.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification-content {
                background-color: var(--success-color, #4caf50);
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                font-size: 18px;
            }
        `;
        
        document.head.appendChild(styleSheet);
    }
}

// Add notification styles
addNotificationStyles(); 