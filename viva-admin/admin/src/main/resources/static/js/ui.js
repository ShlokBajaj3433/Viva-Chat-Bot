/**
 * VIVA Admin Panel - UI Utilities Module
 */

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Get icon for toast type
 */
function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * Open a modal
 * @param {string} type - Modal type (user, classroom, assignment, announcement)
 * @param {object} data - Data to populate form (optional)
 */
function openModal(type, data = null) {
    const modal = document.getElementById(`${type}-modal`);
    const title = document.getElementById(`${type}-modal-title`);
    const form = document.getElementById(`${type}-form`);
    
    if (data) {
        title.textContent = `Edit ${capitalize(type)}`;
        populateForm(type, data);
    } else {
        title.textContent = `Add ${capitalize(type)}`;
        form.reset();
        document.getElementById(`${type}-id`).value = '';
    }

    modal.classList.add('active');
    
    // Focus first input
    const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

/**
 * Close a modal
 * @param {string} type - Modal type
 */
function closeModal(type) {
    // Try both naming conventions: {type}-modal and modal-{type}
    let modal = document.getElementById(`${type}-modal`);
    if (!modal) {
        modal = document.getElementById(`modal-${type}`);
    }
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Close all modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

/**
 * Populate form with data
 * @param {string} type - Form type
 * @param {object} data - Data to populate
 */
function populateForm(type, data) {
    switch(type) {
        case 'user':
            document.getElementById('user-id').value = data.uid || '';
            document.getElementById('user-name').value = data.displayName || '';
            document.getElementById('user-email').value = data.email || '';
            document.getElementById('user-role').value = data.role || 'TEACHER';
            break;
        case 'classroom':
            document.getElementById('classroom-id').value = data.id || '';
            document.getElementById('classroom-name').value = data.name || '';
            document.getElementById('classroom-subject').value = data.subject || '';
            document.getElementById('classroom-description').value = data.description || '';
            document.getElementById('classroom-teacher').value = data.teacherId || '';
            break;
        case 'assignment':
            document.getElementById('assignment-id').value = data.id || '';
            document.getElementById('assignment-title').value = data.title || '';
            document.getElementById('assignment-description').value = data.description || '';
            document.getElementById('assignment-classroom').value = data.classroomId || '';
            document.getElementById('assignment-type').value = data.type || 'VIVA';
            toggleVivaFields();
            if (data.vivaConfig) {
                document.getElementById('viva-role').value = data.vivaConfig.role || '';
                document.getElementById('viva-level').value = data.vivaConfig.level || '';
                const ts = Array.isArray(data.vivaConfig.techStack) ? data.vivaConfig.techStack.join(', ') : (data.vivaConfig.techStack || '');
                document.getElementById('viva-techstack').value = ts;
                document.getElementById('viva-questioncount').value = data.vivaConfig.questionCount || '';
                document.getElementById('viva-duration').value = data.vivaConfig.duration || '';
            }
            if (data.dueDate) {
                const date = new Date(data.dueDate);
                document.getElementById('assignment-duedate').value = date.toISOString().slice(0, 16);
            }
            break;
        case 'announcement':
            document.getElementById('announcement-id').value = data.id || '';
            document.getElementById('announcement-title').value = data.title || '';
            document.getElementById('announcement-content').value = data.content || '';
            document.getElementById('announcement-author').value = data.authorId || '';
            document.getElementById('announcement-target').value = data.targetAudience || 'ALL';
            break;
    }
}

/**
 * Show confirmation dialog
 * @param {string} message - Confirmation message
 * @returns {boolean} User's choice
 */
function confirmAction(message) {
    return confirm(message);
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
}

/**
 * Format datetime for display
 */
function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate text with ellipsis
 */
function truncate(str, length = 50) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}
