/**
 * VIVA Admin Panel - Announcements Page Module
 */

// Announcements data store
let announcementsData = [];

/**
 * Load announcements from API
 */
async function loadAnnouncements() {
    const tbody = document.getElementById('announcements-table');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';

    try {
        announcementsData = await apiGet('/announcements');
        renderAnnouncementsTable();
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Failed to load announcements</td></tr>';
        showToast('Failed to load announcements', 'error');
    }
}

/**
 * Render announcements table
 */
function renderAnnouncementsTable() {
    const tbody = document.getElementById('announcements-table');
    const searchInput = document.getElementById('search-announcements');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = announcementsData.filter(a => 
        (a.title && a.title.toLowerCase().includes(search)) ||
        (a.content && a.content.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="fas fa-bullhorn"></i>
                        <h4>No announcements found</h4>
                        <p>Try adjusting your search or create a new announcement.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(announcement => {
        const date = formatDate(announcement.createdAt);
        const targetBadgeClass = getTargetBadgeClass(announcement.targetAudience);
        
        return `
            <tr>
                <td><code>${escapeHtml(announcement.id) || '-'}</code></td>
                <td>${escapeHtml(announcement.title) || '-'}</td>
                <td>${escapeHtml(announcement.authorId) || '-'}</td>
                <td><span class="badge ${targetBadgeClass}">${escapeHtml(announcement.targetAudience) || 'ALL'}</span></td>
                <td>${date}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm" onclick='editAnnouncement(${JSON.stringify(announcement).replace(/'/g, "\\'")})' title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAnnouncement('${announcement.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Get badge class for target audience
 */
function getTargetBadgeClass(target) {
    switch(target) {
        case 'ALL': return 'badge-info';
        case 'TEACHERS': return 'badge-primary';
        case 'STUDENTS': return 'badge-success';
        default: return 'badge-info';
    }
}

/**
 * Edit announcement
 */
function editAnnouncement(announcement) {
    openModal('announcement', announcement);
}

/**
 * Save announcement (create or update)
 */
async function saveAnnouncement(event) {
    event.preventDefault();
    
    const id = document.getElementById('announcement-id').value;
    const data = {
        title: document.getElementById('announcement-title').value.trim(),
        content: document.getElementById('announcement-content').value.trim(),
        authorId: document.getElementById('announcement-author').value.trim(),
        targetAudience: document.getElementById('announcement-target').value
    };

    // Validation
    if (!data.title || !data.content || !data.authorId) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        if (id) {
            await apiPut(`/announcements/${id}`, data);
            showToast('Announcement updated successfully', 'success');
        } else {
            await apiPost('/announcements', data);
            showToast('Announcement created successfully', 'success');
        }
        closeModal('announcement');
        loadAnnouncements();
    } catch (error) {
        showToast('Failed to save announcement: ' + error.message, 'error');
    }
}

/**
 * Delete announcement
 */
async function deleteAnnouncement(id) {
    if (!confirmAction('Are you sure you want to delete this announcement?')) {
        return;
    }

    try {
        await apiDelete(`/announcements/${id}`);
        showToast('Announcement deleted successfully', 'success');
        loadAnnouncements();
    } catch (error) {
        showToast('Failed to delete announcement: ' + error.message, 'error');
    }
}

/**
 * Initialize announcements page
 */
function initAnnouncementsPage() {
    // Search input handler
    const searchInput = document.getElementById('search-announcements');
    if (searchInput) {
        searchInput.addEventListener('input', renderAnnouncementsTable);
    }

    // Form submit handler
    const form = document.getElementById('announcement-form');
    if (form) {
        form.addEventListener('submit', saveAnnouncement);
    }
}
