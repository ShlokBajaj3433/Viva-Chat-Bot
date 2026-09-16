/**
 * VIVA Admin Panel - Configuration
 */

console.log('[CONFIG.JS] Script loaded');

const CONFIG = {
    API_BASE: 'http://localhost:8080/api',
    TOKEN: null,
    STORAGE_KEYS: {
        AUTH: 'viva_auth',
        API_URL: 'viva_api_url',
        THEME: 'viva_theme'
    }
};

console.log('[CONFIG.JS] CONFIG object created:', CONFIG);

/**
 * Initialize configuration from localStorage
 */
function initConfig() {
    const savedUrl = localStorage.getItem(CONFIG.STORAGE_KEYS.API_URL);
    if (savedUrl) {
        CONFIG.API_BASE = savedUrl + '/api';
    }
    
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

/**
 * Update API base URL
 */
function setApiBaseUrl(url) {
    CONFIG.API_BASE = url + '/api';
    localStorage.setItem(CONFIG.STORAGE_KEYS.API_URL, url);
}

/**
 * Get API base URL (without /api suffix)
 */
function getApiBaseUrl() {
    return CONFIG.API_BASE.replace('/api', '');
}

// Initialize on load
initConfig();
