/**
 * VIVA Admin Panel - Authentication Module
 */

console.log('[AUTH.JS] Script loaded');

/**
 * Set JWT token
 */
function setToken(token) {
    console.log('[AUTH.JS] setToken() called');
    CONFIG.TOKEN = token;
    localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH, token);
}

/**
 * Get JWT token
 */
function getToken() {
    if (!CONFIG.TOKEN) {
        CONFIG.TOKEN = localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH);
    }
    return CONFIG.TOKEN;
}

/**
 * Clear authentication
 */
function clearAuth() {
    console.log('[AUTH.JS] clearAuth() called');
    CONFIG.TOKEN = null;
    localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH);
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    const authenticated = !!getToken();
    console.log('[AUTH.JS] isAuthenticated():', authenticated);
    return authenticated;
}

/**
 * Handle logout
 */
function logout() {
    clearAuth();
    showLoginPage();
    showToast('Logged out successfully', 'success');
}

/**
 * Check authentication status and redirect
 */
async function checkAuthAndRedirect() {
    console.log('[AUTH.JS] checkAuthAndRedirect() called');
    if (isAuthenticated()) {
        try {
            showDashboardPage();
        } catch (error) {
            console.error('[AUTH.JS] Error in checkAuthAndRedirect:', error);
            clearAuth();
            showLoginPage();
        }
    } else {
        showLoginPage();
    }
}

console.log('[AUTH.JS] All functions defined');
