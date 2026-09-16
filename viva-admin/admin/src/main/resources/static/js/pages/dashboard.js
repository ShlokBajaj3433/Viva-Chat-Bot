/**
 * VIVA Admin Panel - Dashboard Page Module
 */

/**
 * Load dashboard data
 */
async function loadDashboard() {
    try {
        // Load all stats in parallel
        const [users, classrooms, assignments, announcements] = await Promise.all([
            apiGet('/users').catch(() => []),
            apiGet('/classrooms').catch(() => []),
            apiGet('/assignments').catch(() => []),
            apiGet('/announcements').catch(() => [])
        ]);

        // Update stat cards
        document.getElementById('stat-users').textContent = users.length || 0;
        document.getElementById('stat-classrooms').textContent = classrooms.length || 0;
        document.getElementById('stat-assignments').textContent = assignments.length || 0;
        document.getElementById('stat-announcements').textContent = announcements.length || 0;

        // Check Firebase status
        await checkFirebaseStatus();

        // Update last updated time
        document.getElementById('last-updated').textContent = formatDateTime(new Date());

        // Load recent activity
        loadRecentActivity(users, classrooms, assignments, announcements);

    } catch (error) {
        console.error('Failed to load dashboard:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

/**
 * Check Firebase connection status
 */
async function checkFirebaseStatus() {
    const statusEl = document.getElementById('firebase-status');
    try {
        await apiGet('/firebase/ping');
        statusEl.textContent = 'Connected';
        statusEl.className = 'badge badge-success';
    } catch {
        statusEl.textContent = 'Disconnected';
        statusEl.className = 'badge badge-danger';
    }
}

/**
 * Load recent activity
 */
function loadRecentActivity(users, classrooms, assignments, announcements) {
    const container = document.getElementById('recent-activity');
    
    // Combine recent items
    const activities = [];
    
    if (users.length > 0) {
        activities.push({
            type: 'user',
            icon: 'fa-user',
            text: `${users.length} user(s) registered`,
            time: 'Recently'
        });
    }
    
    if (classrooms.length > 0) {
        activities.push({
            type: 'classroom',
            icon: 'fa-chalkboard',
            text: `${classrooms.length} classroom(s) created`,
            time: 'Recently'
        });
    }
    
    if (assignments.length > 0) {
        const activeAssignments = assignments.filter(a => new Date(a.dueDate) > new Date());
        activities.push({
            type: 'assignment',
            icon: 'fa-tasks',
            text: `${activeAssignments.length} active assignment(s)`,
            time: 'Currently'
        });
    }
    
    if (announcements.length > 0) {
        activities.push({
            type: 'announcement',
            icon: 'fa-bullhorn',
            text: `${announcements.length} announcement(s) posted`,
            time: 'Recently'
        });
    }

    if (activities.length === 0) {
        container.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }

    container.innerHTML = `
        <ul class="activity-list">
            ${activities.map(a => `
                <li class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${a.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p>${escapeHtml(a.text)}</p>
                        <span class="time">${a.time}</span>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}
