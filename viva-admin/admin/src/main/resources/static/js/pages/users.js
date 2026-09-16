/**
 * VIVA Admin Panel - Users Page Module
 */

// Users data store
let usersData = [];
let uploadedCredentials = []; // Store uploaded student credentials for download

/**
 * Load users from API
 */
async function loadUsers() {
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = '<tr><td colspan="5" class="loading">Loading...</td></tr>';

    try {
        usersData = await apiGet('/users');
        renderUsersTable();
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Failed to load users</td></tr>';
        showToast('Failed to load users', 'error');
    }
}

/**
 * Render users table
 */
function renderUsersTable() {
    const tbody = document.getElementById('users-table');
    const searchInput = document.getElementById('search-users');
    const roleFilter = document.getElementById('filter-role');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const roleValue = roleFilter ? roleFilter.value : '';
    
    let filtered = usersData.filter(u => 
        (u.displayName && u.displayName.toLowerCase().includes(search)) ||
        (u.email && u.email.toLowerCase().includes(search))
    );
    
    // Apply role filter
    if (roleValue) {
        filtered = filtered.filter(u => u.role === roleValue);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h4>No users found</h4>
                        <p>Try adjusting your search or add a new user.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td><code>${escapeHtml(user.uid) || '-'}</code></td>
            <td>${escapeHtml(user.displayName) || '-'}</td>
            <td>${escapeHtml(user.email) || '-'}</td>
            <td><span class="badge badge-${getRoleBadgeClass(user.role)}">${escapeHtml(user.role) || '-'}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm" onclick='editUser(${JSON.stringify(user).replace(/'/g, "\\'")})' title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.uid}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Get badge class for role
 */
function getRoleBadgeClass(role) {
    switch(role) {
        case 'ADMIN': return 'primary';
        case 'TEACHER': return 'info';
        case 'STUDENT': return 'success';
        default: return 'secondary';
    }
}

/**
 * Filter users by role
 */
function filterUsersByRole() {
    renderUsersTable();
}

/**
 * Edit user
 */
function editUser(user) {
    openModal('user', user);
}

/**
 * Save user (create or update)
 */
async function saveUser(event) {
    event.preventDefault();
    
    const id = document.getElementById('user-id').value;
    const data = {
        displayName: document.getElementById('user-name').value.trim(),
        email: document.getElementById('user-email').value.trim(),
        role: document.getElementById('user-role').value
    };

    // Validation
    if (!data.displayName || !data.email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        if (id) {
            await apiPut(`/users/${id}`, data);
            showToast('User updated successfully', 'success');
        } else {
            await apiPost('/users', data);
            showToast('User created successfully', 'success');
        }
        closeModal('user');
        loadUsers();
    } catch (error) {
        showToast('Failed to save user: ' + error.message, 'error');
    }
}

/**
 * Delete user
 */
async function deleteUser(id) {
    if (!confirmAction('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        await apiDelete(`/users/${id}`);
        showToast('User deleted successfully', 'success');
        loadUsers();
    } catch (error) {
        showToast('Failed to delete user: ' + error.message, 'error');
    }
}

/**
 * Initialize users page
 */
function initUsersPage() {
    // Search input handler
    const searchInput = document.getElementById('search-users');
    if (searchInput) {
        searchInput.addEventListener('input', renderUsersTable);
    }

    // Form submit handler
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', saveUser);
    }
}

// ============================================
// Bulk Student Upload Functions
// ============================================

/**
 * Open bulk upload modal
 */
function openBulkUploadModal() {
    resetBulkUpload();
    loadClassroomsForBulkUpload();
    // Directly show the modal instead of using generic openModal
    const modal = document.getElementById('modal-bulk-upload');
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error('Bulk upload modal not found');
        showToast('Bulk upload modal not loaded yet', 'error');
    }
}

/**
 * Load classrooms for bulk upload dropdown
 */
async function loadClassroomsForBulkUpload() {
    const select = document.getElementById('bulk-upload-classroom');
    if (!select) return;
    
    try {
        const classrooms = await apiGet('/classrooms');
        select.innerHTML = '<option value="">-- Select Classroom --</option>';
        classrooms.forEach(c => {
            select.innerHTML += `<option value="${c.id}">${escapeHtml(c.name)}</option>`;
        });
    } catch (error) {
        console.error('Failed to load classrooms:', error);
    }
}

/**
 * Toggle classroom option visibility
 */
function toggleClassroomOption() {
    const selectedOption = document.querySelector('input[name="classroom-option"]:checked').value;
    const existingGroup = document.getElementById('existing-classroom-group');
    const newGroup = document.getElementById('new-classroom-group');
    
    existingGroup.style.display = selectedOption === 'existing' ? 'block' : 'none';
    newGroup.style.display = selectedOption === 'new' ? 'block' : 'none';
}

/**
 * Download Excel template for student upload
 */
function downloadTemplate() {
    window.location.href = '/api/students/template';
}

/**
 * Handle file selection
 */
function handleFileSelect(input) {
    const file = input.files[0];
    const placeholder = document.querySelector('.upload-placeholder');
    const selectedFile = document.getElementById('selected-file');
    const fileNameSpan = document.getElementById('selected-file-name');
    const uploadBtn = document.getElementById('btn-upload-students');
    
    if (file) {
        placeholder.style.display = 'none';
        selectedFile.style.display = 'flex';
        fileNameSpan.textContent = file.name;
        uploadBtn.disabled = false;
    } else {
        clearSelectedFile();
    }
}

/**
 * Clear selected file
 */
function clearSelectedFile() {
    const input = document.getElementById('student-file');
    const placeholder = document.querySelector('.upload-placeholder');
    const selectedFile = document.getElementById('selected-file');
    const uploadBtn = document.getElementById('btn-upload-students');
    
    input.value = '';
    placeholder.style.display = 'flex';
    selectedFile.style.display = 'none';
    uploadBtn.disabled = true;
}

/**
 * Upload students from Excel file
 */
async function uploadStudents() {
    const fileInput = document.getElementById('student-file');
    const classroomOption = document.querySelector('input[name="classroom-option"]:checked').value;
    
    if (!fileInput.files[0]) {
        showToast('Please select an Excel file', 'error');
        return;
    }
    
    let classroomId = null;
    
    // Handle classroom creation if "new" is selected
    if (classroomOption === 'new') {
        const classroomName = document.getElementById('new-classroom-name').value.trim();
        if (!classroomName) {
            showToast('Please enter a classroom name', 'error');
            return;
        }
        
        try {
            // Create the classroom first
            const newClassroom = await apiPost('/classrooms', {
                name: classroomName,
                subject: document.getElementById('new-classroom-subject').value.trim() || null,
                grade: document.getElementById('new-classroom-grade').value.trim() || null,
                description: document.getElementById('new-classroom-description').value.trim() || null
            });
            classroomId = newClassroom.id;
            showToast(`Classroom "${classroomName}" created`, 'success');
        } catch (error) {
            showToast('Failed to create classroom: ' + error.message, 'error');
            return;
        }
    } else if (classroomOption === 'existing') {
        const classroomSelect = document.getElementById('bulk-upload-classroom');
        classroomId = classroomSelect.value || null;
    }
    
    // Show processing step
    document.getElementById('upload-step-1').style.display = 'none';
    document.getElementById('upload-step-2').style.display = 'block';
    document.getElementById('upload-step-3').style.display = 'none';
    
    try {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        if (classroomId) {
            formData.append('classroomId', classroomId);
        }
        
        const response = await fetch('/api/students/bulk-upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.TOKEN || localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH)}`
            },
            body: formData
        });
        
        const result = await response.json();
        
        // Store credentials for download
        uploadedCredentials = result.createdStudents || [];
        
        // Show results step
        document.getElementById('upload-step-2').style.display = 'none';
        document.getElementById('upload-step-3').style.display = 'block';
        
        displayUploadResults(result);
        
    } catch (error) {
        console.error('Upload error:', error);
        document.getElementById('upload-step-2').style.display = 'none';
        document.getElementById('upload-step-1').style.display = 'block';
        showToast('Failed to upload students: ' + error.message, 'error');
    }
}

/**
 * Display upload results
 */
function displayUploadResults(result) {
    const summaryDiv = document.getElementById('result-summary');
    const detailsDiv = document.getElementById('result-details');
    const downloadBtn = document.getElementById('btn-download-credentials');
    
    let summaryClass = 'success';
    let icon = 'check-circle';
    let iconColor = 'var(--success)';
    
    if (!result.ok || result.successCount === 0) {
        summaryClass = 'error';
        icon = 'times-circle';
        iconColor = 'var(--danger)';
    } else if (result.failureCount > 0) {
        summaryClass = 'partial';
        icon = 'exclamation-triangle';
        iconColor = 'var(--warning)';
    }
    
    summaryDiv.className = `result-summary ${summaryClass}`;
    summaryDiv.innerHTML = `
        <h4><i class="fas fa-${icon}" style="color: ${iconColor}"></i> ${result.message || 'Upload Complete'}</h4>
        <div class="stats">
            <div class="stat">
                <div class="stat-value" style="color: var(--success)">${result.successCount || 0}</div>
                <div class="stat-label">Created</div>
            </div>
            <div class="stat">
                <div class="stat-value" style="color: var(--danger)">${result.failureCount || 0}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat">
                <div class="stat-value">${result.totalProcessed || 0}</div>
                <div class="stat-label">Total</div>
            </div>
        </div>
    `;
    
    // Show failed students if any
    if (result.failedStudents && result.failedStudents.length > 0) {
        let failedHtml = `
            <h5 style="color: var(--danger); margin-top: 20px;">
                <i class="fas fa-exclamation-circle"></i> Failed Records (${result.failedStudents.length})
            </h5>
            <div class="failed-students-table">
                <div class="table-header">
                    <div class="col-row">Row</div>
                    <div class="col-name">Student Name</div>
                    <div class="col-email">Email</div>
                    <div class="col-reason">Reason</div>
                </div>
        `;
        
        result.failedStudents.forEach(f => {
            failedHtml += `
                <div class="table-row">
                    <div class="col-row">${f.rowNumber}</div>
                    <div class="col-name">${escapeHtml(f.displayName || 'N/A')}</div>
                    <div class="col-email">${escapeHtml(f.email || 'N/A')}</div>
                    <div class="col-reason"><span class="error-badge">${escapeHtml(f.reason)}</span></div>
                </div>
            `;
        });
        
        failedHtml += `</div>`;
        detailsDiv.innerHTML = failedHtml;
        
        // Hide download button if there are failures
        downloadBtn.style.display = 'none';
    } else {
        detailsDiv.innerHTML = '';
        // Show download button only if all succeeded
        downloadBtn.style.display = uploadedCredentials && uploadedCredentials.length > 0 ? 'inline-block' : 'none';
    }
    
    downloadBtn.disabled = !uploadedCredentials || uploadedCredentials.length === 0;
}

/**
 * Download credentials file
 */
async function downloadCredentials() {
    if (!uploadedCredentials || uploadedCredentials.length === 0) {
        showToast('No credentials to download', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/students/credentials-export', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.TOKEN || localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadedCredentials)
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate credentials file');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student_credentials_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        
        showToast('Credentials file downloaded', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to download credentials: ' + error.message, 'error');
    }
}

/**
 * Reset bulk upload modal to initial state
 */
function resetBulkUpload() {
    document.getElementById('upload-step-1').style.display = 'block';
    document.getElementById('upload-step-2').style.display = 'none';
    document.getElementById('upload-step-3').style.display = 'none';
    
    clearSelectedFile();
    uploadedCredentials = [];
    
    // Reset classroom options
    const noneOption = document.querySelector('input[name="classroom-option"][value="none"]');
    if (noneOption) {
        noneOption.checked = true;
        toggleClassroomOption();
    }
    
    const classroomSelect = document.getElementById('bulk-upload-classroom');
    if (classroomSelect) {
        classroomSelect.value = '';
    }
    
    // Reset new classroom fields
    const newClassroomName = document.getElementById('new-classroom-name');
    const newClassroomSubject = document.getElementById('new-classroom-subject');
    const newClassroomGrade = document.getElementById('new-classroom-grade');
    const newClassroomDesc = document.getElementById('new-classroom-description');
    
    if (newClassroomName) newClassroomName.value = '';
    if (newClassroomSubject) newClassroomSubject.value = '';
    if (newClassroomGrade) newClassroomGrade.value = '';
    if (newClassroomDesc) newClassroomDesc.value = '';
}
