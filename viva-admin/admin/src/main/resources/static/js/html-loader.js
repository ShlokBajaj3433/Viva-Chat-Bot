/**
 * VIVA Admin Panel - HTML Template Loader
 * Handles dynamic loading of HTML components and pages
 */

const HTMLLoader = {
    // Cache for loaded templates
    cache: {},

    /**
     * Load an HTML template from a file
     * @param {string} path - Path to the HTML file
     * @returns {Promise<string>} HTML content
     */
    async load(path) {
        // Check cache first
        if (this.cache[path]) {
            return this.cache[path];
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${path}`);
            }
            const html = await response.text();
            this.cache[path] = html;
            return html;
        } catch (error) {
            console.error(`Error loading template ${path}:`, error);
            return `<div class="error">Failed to load content</div>`;
        }
    },

    /**
     * Load and insert HTML into an element
     * @param {string} path - Path to the HTML file
     * @param {string|HTMLElement} target - Target element or selector
     * @returns {Promise<void>}
     */
    async loadInto(path, target) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (!element) {
            console.error(`Target element not found: ${target}`);
            return;
        }

        const html = await this.load(path);
        element.innerHTML = html;
    },

    /**
     * Load multiple templates in parallel
     * @param {Object} templates - Object with selector: path pairs
     * @returns {Promise<void>}
     */
    async loadMultiple(templates) {
        const promises = Object.entries(templates).map(([selector, path]) => 
            this.loadInto(path, selector)
        );
        await Promise.all(promises);
    },

    /**
     * Clear the template cache
     */
    clearCache() {
        this.cache = {};
    }
};

// Template paths configuration
const TEMPLATES = {
    // Components
    sidebar: 'html/components/sidebar.html',
    header: 'html/components/header.html',
    
    // Modals
    modals: {
        user: 'html/components/modals/user-modal.html',
        classroom: 'html/components/modals/classroom-modal.html',
        assignment: 'html/components/modals/assignment-modal.html',
        announcement: 'html/components/modals/announcement-modal.html',
        'bulk-upload': 'html/components/modals/bulk-upload-modal.html'
    },
    
    // Pages
    pages: {
        login: 'html/pages/login.html',
        dashboard: 'html/pages/dashboard.html',
        users: 'html/pages/users.html',
        classrooms: 'html/pages/classrooms.html',
        assignments: 'html/pages/assignments.html',
        announcements: 'html/pages/announcements.html',
        settings: 'html/pages/settings.html'
    }
};

/**
 * Load all components into the page
 */
async function loadAllComponents() {
    // Load sidebar
    await HTMLLoader.loadInto(TEMPLATES.sidebar, '#sidebar-container');
    
    // Load header
    await HTMLLoader.loadInto(TEMPLATES.header, '#header-container');
    
    // Load all modals
    const modalsContainer = document.getElementById('modals-container');
    if (modalsContainer) {
        let modalsHtml = '';
        for (const [name, path] of Object.entries(TEMPLATES.modals)) {
            const html = await HTMLLoader.load(path);
            modalsHtml += html;
        }
        modalsContainer.innerHTML = modalsHtml;
    }
    
    // Load all page sections
    const sectionsContainer = document.getElementById('sections-container');
    if (sectionsContainer) {
        let sectionsHtml = '';
        for (const [name, path] of Object.entries(TEMPLATES.pages)) {
            if (name !== 'login') {
                const html = await HTMLLoader.load(path);
                const isActive = name === 'dashboard' ? 'active' : '';
                sectionsHtml += `<div id="section-${name}" class="section ${isActive}">${html}</div>`;
            }
        }
        sectionsContainer.innerHTML = sectionsHtml;
    }
    
    // Load login page
    await HTMLLoader.loadInto(TEMPLATES.pages.login, '#login-content');
}

/**
 * Initialize the application after loading components
 */
async function initializeApp() {
    console.log('[HTML-LOADER] initializeApp() called');
    
    try {
        console.log('[HTML-LOADER] Loading HTML components...');
        
        // Load all HTML components
        await loadAllComponents();
        
        console.log('[HTML-LOADER] All HTML components loaded');
        console.log('[HTML-LOADER] Checking if initApp exists:', typeof initApp);
        
        // Initialize the app (from app.js)
        if (typeof initApp === 'function') {
            console.log('[HTML-LOADER] Calling initApp()');
            initApp();
        } else {
            console.error('[HTML-LOADER] initApp function not found!');
        }
    } catch (error) {
        console.error('[HTML-LOADER] Failed to initialize application:', error);
        console.error('[HTML-LOADER] Error stack:', error.stack);
        
        document.body.innerHTML = `
            <div class="error-page" style="padding: 40px; text-align: center;">
                <h1>Failed to Load Application</h1>
                <p style="color: red;">${error.message}</p>
                <pre style="background: #f5f5f5; padding: 20px; text-align: left; overflow: auto;">${error.stack}</pre>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Retry</button>
            </div>
        `;
    }
}

console.log('[HTML-LOADER] Setting up DOMContentLoaded listener');

// Start loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[HTML-LOADER] DOMContentLoaded event fired');
    initializeApp();
});
