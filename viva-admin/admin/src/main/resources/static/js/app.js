/**
 * VIVA Admin Panel - Main Application Entry Point
 * 
 * This file initializes the application and sets up all event listeners.
 * All modules should be loaded before this file.
 */

console.log('[APP.JS] Script loaded');

/**
 * Initialize the application
 */
function initApp() {
    console.log('[APP.JS] initApp() called');
    
    // Initialize configuration
    initConfig();
    console.log('[APP.JS] Config initialized');

    // Initialize navigation
    initNavigation();
    console.log('[APP.JS] Navigation initialized');

    // Initialize page modules
    initUsersPage();
    initClassroomsPage();
    initAssignmentsPage();
    initAnnouncementsPage();
    initSettingsPage();
    console.log('[APP.JS] Page modules initialized');

    // Setup event listeners
    setupEventListeners();
    console.log('[APP.JS] Event listeners setup');

    // Check authentication and redirect
    checkAuthAndRedirect();
    console.log('[APP.JS] Auth check completed');
}

/**
 * Setup global event listeners
 */
function setupEventListeners() {
    console.log('[APP.JS] setupEventListeners() called');
    console.log('[APP.JS] handleLogin function exists?', typeof handleLogin);
    
    // Login form - setup after a short delay to ensure all scripts are loaded
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        console.log('[APP.JS] Looking for login-form element:', loginForm);
        
        if (loginForm && !loginForm.hasAttribute('data-listener')) {
            console.log('[APP.JS] Attaching submit listener to login form');
            loginForm.setAttribute('data-listener', 'true');
            loginForm.addEventListener('submit', handleLogin);
            console.log('[APP.JS] Login form listener attached successfully');
        } else if (!loginForm) {
            console.warn('[APP.JS] Login form not found!');
        } else {
            console.warn('[APP.JS] Login form already has listener');
        }
    }, 100);

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
    console.log('[APP.JS] handleLogin() called', event);
    event.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const errorDiv = document.getElementById('login-error');
    const btn = event.target.querySelector('button[type="submit"]');
    
    console.log('[APP.JS] Login attempt - Email:', email, 'Password:', password ? '***' : 'empty');
    
    // Hide previous errors
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }

    if (!email || !password) {
        console.warn('[APP.JS] Email or password missing');
        showLoginError('Please enter email and password');
        return;
    }

    // Show loading state
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

    console.log('[APP.JS] Calling login API...');
    
    // Call login API
    fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        console.log('[APP.JS] Login API response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('[APP.JS] Login API response data:', data);
        
        if (!data.ok) {
            console.error('[APP.JS] Login failed:', data.message);
            showLoginError(data.message || 'Login failed');
            btn.disabled = false;
            btn.innerHTML = originalText;
            return;
        }

        console.log('[APP.JS] Login successful, storing token');
        
        // Store token and user info
        CONFIG.TOKEN = data.token;
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH, data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userId', data.user.uid);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.displayName || data.user.email);
        
        console.log('[APP.JS] Token stored, redirecting to dashboard');
        
        // Apply role-based UI restrictions
        if (typeof applyRoleBasedUI === 'function') {
            console.log('[APP.JS] Applying role-based UI restrictions');
            applyRoleBasedUI();
        }
        
        // Redirect to dashboard
        showDashboardPage();
        showToast('Login successful', 'success');
    })
    .catch(error => {
        console.error('[APP.JS] Login error:', error);
        showLoginError('Login error: ' + error.message);
        btn.disabled = false;
        btn.innerHTML = originalText;
    });
}

console.log('[APP.JS] handleLogin function defined:', typeof handleLogin);

/**
 * Show login error message
 */
function showLoginError(message) {
    console.log('[APP.JS] showLoginError():', message);
    const errorDiv = document.getElementById('login-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        console.error('[APP.JS] login-error div not found!');
    }
}

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape to close modals
        if (e.key === 'Escape') {
            closeAllModals();
        }

        // Ctrl+S to save in modal
        if (e.ctrlKey && e.key === 's') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                e.preventDefault();
                const form = activeModal.querySelector('form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        }
    });

    // Prevent form submission on enter in search boxes
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });


/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && typeof isAuthenticated === 'function' && isAuthenticated()) {
        // Refresh current section data when page becomes visible
        if (typeof loadSectionData === 'function' && typeof currentSection !== 'undefined') {
            loadSectionData(currentSection);
        }
    }
});

/**
 * Handle online/offline status
 */
window.addEventListener('online', function() {
    if (typeof showToast === 'function') {
        showToast('Connection restored', 'success');
    }
    if (typeof loadSectionData === 'function' && typeof currentSection !== 'undefined') {
        loadSectionData(currentSection);
    }
});

window.addEventListener('offline', function() {
    if (typeof showToast === 'function') {
        showToast('You are offline. Some features may not work.', 'warning');
    }
});

// Export initApp for html-loader to call after components are loaded
// Do NOT add DOMContentLoaded here - html-loader handles initialization
