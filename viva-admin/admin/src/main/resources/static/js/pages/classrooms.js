/**
 * VIVA Admin Panel - Classrooms Page Module
 */

// Classrooms data store
let classroomsData = [];

/**
 * Load classrooms from API
 */
async function loadClassrooms() {
    const tbody = document.getElementById('classrooms-table');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';

    try {
        classroomsData = await apiGet('/classrooms');
        renderClassroomsTable();
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Failed to load classrooms</td></tr>';
        showToast('Failed to load classrooms', 'error');
    }
}

/**
 * Render classrooms table
 */
function renderClassroomsTable() {
    const tbody = document.getElementById('classrooms-table');
    const searchInput = document.getElementById('search-classrooms');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = classroomsData.filter(c => 
        (c.name && c.name.toLowerCase().includes(search)) ||
        (c.subject && c.subject.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="fas fa-chalkboard"></i>
                        <h4>No classrooms found</h4>
                        <p>Try adjusting your search or create a new classroom.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(classroom => `
        <tr>
            <td><code>${escapeHtml(classroom.id) || '-'}</code></td>
            <td>${escapeHtml(classroom.name) || '-'}</td>
            <td>${escapeHtml(classroom.subject) || '-'}</td>
            <td>${escapeHtml(classroom.teacherId) || '-'}</td>
            <td><span class="badge badge-info">${classroom.studentIds?.length || 0}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm" onclick='editClassroom(${JSON.stringify(classroom).replace(/'/g, "\\'")})' title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteClassroom('${classroom.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Load teachers into dropdown
 */
async function loadTeachersDropdown() {
    const select = document.getElementById('classroom-teacher');
    const userIdSpan = document.getElementById('current-user-id');
    
    if (!select) return;
    
    try {
        // Get current user info from localStorage
        const currentUserId = localStorage.getItem('userId') || 'super_admin_001';
        
        // Show current user ID
        if (userIdSpan) {
            userIdSpan.textContent = currentUserId;
        }
        
        // Try to load all users with ADMIN or TEACHER role
        let teachers = [];
        try {
            const allUsers = await apiGet('/users');
            teachers = allUsers.filter(u => u.role === 'ADMIN' || u.role === 'TEACHER');
        } catch (error) {
            console.warn('Could not load users, using current user only:', error);
            teachers = [{
                uid: currentUserId,
                displayName: 'Current User',
                email: localStorage.getItem('userEmail') || 'admin@viva.com'
            }];
        }
        
        // Populate dropdown
        select.innerHTML = teachers.map(teacher => `
            <option value="${escapeHtml(teacher.uid)}" ${teacher.uid === currentUserId ? 'selected' : ''}>
                ${escapeHtml(teacher.displayName || teacher.email)} (${escapeHtml(teacher.uid)})
            </option>
        `).join('');
        
        // If no teachers found, add current user as option
        if (teachers.length === 0) {
            select.innerHTML = `<option value="${currentUserId}" selected>Current User (${currentUserId})</option>`;
        }
        
    } catch (error) {
        console.error('Failed to load teachers:', error);
        const currentUserId = localStorage.getItem('userId') || 'super_admin_001';
        select.innerHTML = `<option value="${currentUserId}" selected>Current User (${currentUserId})</option>`;
    }
}

/**
 * Edit classroom
 */
function editClassroom(classroom) {
    loadTeachersDropdown();
    openModal('classroom', classroom);
}

/**
 * Open add classroom modal
 */
window.addClassroom = function() {
    loadTeachersDropdown();
    openModal('classroom');
};

/**
 * Save classroom (create or update)
 */
async function saveClassroom(event) {
    event.preventDefault();
    
    const id = document.getElementById('classroom-id').value;
    const data = {
        name: document.getElementById('classroom-name').value.trim(),
        subject: document.getElementById('classroom-subject').value.trim(),
        description: document.getElementById('classroom-description').value.trim(),
        teacherId: document.getElementById('classroom-teacher').value.trim(),
        studentIds: []
    };

    // Validation
    if (!data.name || !data.subject || !data.teacherId) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        if (id) {
            await apiPut(`/classrooms/${id}`, data);
            showToast('Classroom updated successfully', 'success');
        } else {
            await apiPost('/classrooms', data);
            showToast('Classroom created successfully', 'success');
        }
        closeModal('classroom');
        loadClassrooms();
    } catch (error) {
        showToast('Failed to save classroom: ' + error.message, 'error');
    }
}

/**
 * Delete classroom
 */
async function deleteClassroom(id) {
    if (!confirmAction('Are you sure you want to delete this classroom?')) {
        return;
    }

    try {
        await apiDelete(`/classrooms/${id}`);
        showToast('Classroom deleted successfully', 'success');
        loadClassrooms();
    } catch (error) {
        showToast('Failed to delete classroom: ' + error.message, 'error');
    }
}

/**
 * Initialize classrooms page
 */
function initClassroomsPage() {
    // Search input handler
    const searchInput = document.getElementById('search-classrooms');
    if (searchInput) {
        searchInput.addEventListener('input', renderClassroomsTable);
    }

    // Form submit handler
    const form = document.getElementById('classroom-form');
    if (form) {
        form.addEventListener('submit', saveClassroom);
    }
}
