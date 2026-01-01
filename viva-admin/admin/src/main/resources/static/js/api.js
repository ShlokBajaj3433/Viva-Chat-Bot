/**
 * VIVA Admin Panel - API Module
 */

/**
 * Make an API call with JWT authentication
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {object} body - Request body (optional)
 * @returns {Promise<any>} Response data
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, options);
    
    // Handle unauthorized
    if (response.status === 401) {
        clearAuth();
        showLoginPage();
        throw new Error('Unauthorized - Session expired');
    }

    // Handle other errors
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `HTTP Error: ${response.status}`);
    }

    // Check if response has content
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

/**
 * API helper for GET requests
 */
async function apiGet(endpoint) {
    return apiCall(endpoint, 'GET');
}

/**
 * API helper for POST requests
 */
async function apiPost(endpoint, data) {
    return apiCall(endpoint, 'POST', data);
}

/**
 * API helper for PUT requests
 */
async function apiPut(endpoint, data) {
    return apiCall(endpoint, 'PUT', data);
}

/**
 * API helper for DELETE requests
 */
async function apiDelete(endpoint) {
    return apiCall(endpoint, 'DELETE');
}
