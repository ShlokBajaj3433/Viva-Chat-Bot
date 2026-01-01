/**
 * VIVA Admin Panel - Role-Based Access Control
 */

console.log('[RBAC.JS] Script loaded');

// Role definitions
const ROLES = {
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER'
};

/**
 * Get current user role from localStorage
 */
function getCurrentUserRole() {
    return localStorage.getItem('userRole') || 'TEACHER';
}

/**
 * Check if current user is admin
 */
function isAdmin() {
    return getCurrentUserRole() === ROLES.ADMIN;
}

/**
 * Check if current user is teacher
 */
function isTeacher() {
    return getCurrentUserRole() === ROLES.TEACHER;
}

/**
 * Check if user has permission for a feature
 */
function hasPermission(feature) {
    const role = getCurrentUserRole();
    
    // Define permissions for each feature
    const permissions = {
        // Admin-only features
        'manage-users': [ROLES.ADMIN],
        'manage-teachers': [ROLES.ADMIN],
        'delete-users': [ROLES.ADMIN],
        'view-all-users': [ROLES.ADMIN],
        'system-settings': [ROLES.ADMIN],
        
        // Features available to both
        'manage-classrooms': [ROLES.ADMIN, ROLES.TEACHER],
        'manage-assignments': [ROLES.ADMIN, ROLES.TEACHER],
        'manage-announcements': [ROLES.ADMIN, ROLES.TEACHER],
        'view-dashboard': [ROLES.ADMIN, ROLES.TEACHER]
    };
    
    const allowedRoles = permissions[feature] || [];
    return allowedRoles.includes(role);
}

/**
 * Show/hide elements based on role
 */
function applyRoleBasedUI() {
    console.log('[RBAC.JS] Applying role-based UI for role:', getCurrentUserRole());
    
    // Hide admin-only menu items for non-admins
    if (!isAdmin()) {
        // Hide Users menu item
        const usersMenuItem = document.querySelector('[data-section="users"]');
        if (usersMenuItem) {
            usersMenuItem.style.display = 'none';
            console.log('[RBAC.JS] Hidden Users menu for non-admin');
        }
        
        // Hide Settings menu item
        const settingsMenuItem = document.querySelector('[data-section="settings"]');
        if (settingsMenuItem) {
            settingsMenuItem.style.display = 'none';
            console.log('[RBAC.JS] Hidden Settings menu for non-admin');
        }
    }
    
    // Add role badge to header
    const header = document.querySelector('.header-user');
    if (header && !document.getElementById('role-badge')) {
        const roleBadge = document.createElement('span');
        roleBadge.id = 'role-badge';
        roleBadge.className = 'badge ' + (isAdmin() ? 'badge-danger' : 'badge-info');
        roleBadge.textContent = getCurrentUserRole();
        roleBadge.style.marginLeft = '10px';
        header.appendChild(roleBadge);
    }
}

/**
 * Restrict access to admin-only pages
 */
function checkPageAccess(pageName) {
    console.log('[RBAC.JS] Checking access to page:', pageName);
    
    const adminOnlyPages = ['users', 'settings'];
    
    if (adminOnlyPages.includes(pageName) && !isAdmin()) {
        console.warn('[RBAC.JS] Access denied to', pageName, 'for non-admin user');
        showToast('Access denied. Admin privileges required.', 'error');
        showDashboardPage();
        return false;
    }
    
    return true;
}

console.log('[RBAC.JS] All functions defined');
