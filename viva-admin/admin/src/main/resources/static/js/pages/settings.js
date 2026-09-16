/**
 * VIVA Admin Panel - Settings Page Module
 */

/**
 * Load settings
 */
function loadSettings() {
    // Load API URL
    const apiUrlInput = document.getElementById('api-url');
    if (apiUrlInput) {
        apiUrlInput.value = getApiBaseUrl();
    }

    // Load theme
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light';
        themeSelect.value = savedTheme;
    }
}

/**
 * Save settings
 */
function saveSettings() {
    const apiUrl = document.getElementById('api-url').value.trim();
    const theme = document.getElementById('theme-select').value;

    // Save API URL
    if (apiUrl) {
        setApiBaseUrl(apiUrl);
    }

    // Save theme
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);

    showToast('Settings saved successfully', 'success');
}

/**
 * Reset settings to defaults
 */
function resetSettings() {
    if (!confirmAction('Are you sure you want to reset all settings to defaults?')) {
        return;
    }

    // Clear storage
    localStorage.removeItem(CONFIG.STORAGE_KEYS.API_URL);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.THEME);

    // Reset UI
    document.getElementById('api-url').value = 'http://localhost:8080';
    document.getElementById('theme-select').value = 'light';
    document.documentElement.removeAttribute('data-theme');

    // Reinit config
    initConfig();

    showToast('Settings reset to defaults', 'success');
}

/**
 * Export data as JSON
 */
async function exportData() {
    try {
        const [users, classrooms, assignments, announcements] = await Promise.all([
            apiGet('/users').catch(() => []),
            apiGet('/classrooms').catch(() => []),
            apiGet('/assignments').catch(() => []),
            apiGet('/announcements').catch(() => [])
        ]);

        const data = {
            exportedAt: new Date().toISOString(),
            users,
            classrooms,
            assignments,
            announcements
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `viva-admin-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Data exported successfully', 'success');
    } catch (error) {
        showToast('Failed to export data: ' + error.message, 'error');
    }
}

/**
 * Initialize settings page
 */
function initSettingsPage() {
    loadSettings();
}
