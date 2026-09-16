/**
 * VIVA Admin Panel - Assignments Page Module
 */

// Assignments data store
let assignmentsData = [];

/**
 * Load assignments from API
 */
async function loadAssignments() {
    const tbody = document.getElementById('assignments-table');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading...</td></tr>';

    try {
        assignmentsData = await apiGet('/assignments');
        renderAssignmentsTable();
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Failed to load assignments</td></tr>';
        showToast('Failed to load assignments', 'error');
    }
}

/**
 * Render assignments table
 */
function renderAssignmentsTable() {
    const tbody = document.getElementById('assignments-table');
    const searchInput = document.getElementById('search-assignments');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = assignmentsData.filter(a => 
        (a.title && a.title.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <i class="fas fa-tasks"></i>
                        <h4>No assignments found</h4>
                        <p>Try adjusting your search or create a new assignment.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(assignment => {
        const dueDate = formatDate(assignment.dueDate);
        const isPastDue = assignment.dueDate && new Date(assignment.dueDate) < new Date();
        const statusClass = isPastDue ? 'badge-danger' : 'badge-success';
        const status = isPastDue ? 'Past Due' : 'Active';
        
        return `
            <tr>
                <td><code>${escapeHtml(assignment.id) || '-'}</code></td>
                <td>${escapeHtml(assignment.title) || '-'}</td>
                <td>${escapeHtml(assignment.classroomId) || '-'}</td>
                <td>${dueDate}</td>
                <td><span class="badge ${statusClass}">${status}</span></td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm" onclick='editAssignment(${JSON.stringify(assignment).replace(/'/g, "\\'")})' title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAssignment('${assignment.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Edit assignment
 */
function editAssignment(assignment) {
    openModal('assignment', assignment);
}

/**
 * Save assignment (create or update)
 */
async function saveAssignment(event) {
    event.preventDefault();
    
    const id = document.getElementById('assignment-id').value;
    const dueDateValue = document.getElementById('assignment-duedate').value;
    
    const data = {
        title: document.getElementById('assignment-title').value.trim(),
        description: document.getElementById('assignment-description').value.trim(),
        classroomId: document.getElementById('assignment-classroom').value.trim(),
        dueDate: dueDateValue ? new Date(dueDateValue).toISOString() : null,
        type: document.getElementById('assignment-type').value,
        status: 'active'
    };

    // Include vivaConfig when type is VIVA
    if (data.type === 'VIVA') {
        const role = document.getElementById('viva-role').value.trim();
        const level = document.getElementById('viva-level').value.trim();
        const techstackStr = document.getElementById('viva-techstack').value.trim();
        const questionCount = document.getElementById('viva-questioncount').value;
        const duration = document.getElementById('viva-duration').value;

        if (!role || !level) {
            showToast('Please fill role and level for Viva assignment', 'error');
            return;
        }
        data.vivaConfig = {
            role,
            level,
            techStack: techstackStr ? techstackStr.split(',').map(s => s.trim()).filter(Boolean) : [],
            questionCount: questionCount ? parseInt(questionCount, 10) : undefined,
            duration: duration ? parseInt(duration, 10) : undefined
        };
    }

    // Validation
    if (!data.title || !data.classroomId || !data.dueDate) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        if (id) {
            await apiPut(`/assignments/${id}`, data);
            showToast('Assignment updated successfully', 'success');
        } else {
            await apiPost('/assignments', data);
            showToast('Assignment created successfully', 'success');
        }
        closeModal('assignment');
        loadAssignments();
    } catch (error) {
        showToast('Failed to save assignment: ' + error.message, 'error');
    }
}

/**
 * Delete assignment
 */
async function deleteAssignment(id) {
    if (!confirmAction('Are you sure you want to delete this assignment?')) {
        return;
    }

    try {
        await apiDelete(`/assignments/${id}`);
        showToast('Assignment deleted successfully', 'success');
        loadAssignments();
    } catch (error) {
        showToast('Failed to delete assignment: ' + error.message, 'error');
    }
}

/**
 * Initialize assignments page
 */
function initAssignmentsPage() {
    // Search input handler
    const searchInput = document.getElementById('search-assignments');
    if (searchInput) {
        searchInput.addEventListener('input', renderAssignmentsTable);
    }

    // Form submit handler
    const form = document.getElementById('assignment-form');
    if (form) {
        form.addEventListener('submit', saveAssignment);
    }

    const typeSelect = document.getElementById('assignment-type');
    if (typeSelect) {
        typeSelect.addEventListener('change', toggleVivaFields);
        toggleVivaFields();
    }
}

function toggleVivaFields() {
    const typeSelect = document.getElementById('assignment-type');
    const vivaFields = document.getElementById('viva-config-fields');
    if (!typeSelect || !vivaFields) return;
    vivaFields.style.display = typeSelect.value === 'VIVA' ? 'block' : 'none';
}
