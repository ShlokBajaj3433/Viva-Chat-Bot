/**
 * VIVA Admin Panel - Navigation Module
 */

// Current active section
let currentSection = 'dashboard';

/**
 * Show login page
 */
function showLoginPage() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('dashboard-page').style.display = 'none';
}

/**
 * Show dashboard page
 */
function showDashboardPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('dashboard-page').style.display = 'flex';
    switchSection('dashboard');
}

/**
 * Switch to a section
 * @param {string} section - Section name
 */
function switchSection(section) {
    // Check if user has access to this page
    if (typeof checkPageAccess === 'function' && !checkPageAccess(section)) {
        return;
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    // Update section visibility
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    const sectionEl = document.getElementById(`section-${section}`);
    if (sectionEl) {
        sectionEl.classList.add('active');
    }

    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'users': 'Users Management',
        'classrooms': 'Classrooms Management',
        'assignments': 'Assignments Management',
        'announcements': 'Announcements Management',
        'settings': 'Settings'
    };
    document.getElementById('page-title').textContent = titles[section] || 'Dashboard';

    currentSection = section;

    // Load data for section
    loadSectionData(section);
}

/**
 * Load data for a section
 * @param {string} section - Section name
 */
function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsers();
            break;
        case 'classrooms':
            loadClassrooms();
            break;
        case 'assignments':
            loadAssignments();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

/**
 * Initialize navigation event listeners
 */
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            if (section) {
                switchSection(section);
            }
        });
    });
}
