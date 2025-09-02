// Global state
let currentRole = 'Recruiter';
let currentPage = 'dashboard';
let sidebarCollapsed = false;

// Mock applicant data
const applicantData = {
    1: {
        name: "John Davis",
        email: "john.davis@email.com",
        phone: "+1 (555) 123-4567",
        position: "Frontend Developer",
        experience: "5 years in React, JavaScript, TypeScript",
        skills: ["React", "JavaScript", "TypeScript", "CSS"],
        status: "interviewing",
        match: "85%",
        avatar: "JD"
    },
    2: {
        name: "Sarah Miller",
        email: "sarah.miller@email.com",
        phone: "+1 (555) 987-6543",
        position: "DevOps Engineer",
        experience: "7 years in AWS, Docker, Kubernetes",
        skills: ["AWS", "Docker", "Kubernetes", "Python"],
        status: "applied",
        match: "92%",
        avatar: "SM"
    },
    3: {
        name: "Michael Johnson",
        email: "m.johnson@email.com",
        phone: "+1 (555) 456-7890",
        position: "Backend Developer",
        experience: "3 years in Node.js, MongoDB",
        skills: ["Node.js", "MongoDB", "Express", "REST APIs"],
        status: "rejected",
        match: "67%",
        avatar: "MJ"
    },
    4: {
        name: "Alice Brown",
        email: "alice.brown@email.com",
        phone: "+1 (555) 321-0987",
        position: "UI/UX Designer",
        experience: "6 years in design systems, user research",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        status: "hired",
        match: "96%",
        avatar: "AB"
    },
    5: {
        name: "Robert Wilson",
        email: "r.wilson@email.com",
        phone: "+1 (555) 654-3210",
        position: "Data Scientist",
        experience: "4 years in machine learning, Python",
        skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
        status: "screening",
        match: "78%",
        avatar: "RW"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show landing page by default
    showLandingPage();
    
    // Setup upload area click handler
    setupUploadArea();
    
    // Set default dates for email ingestion
    setupEmailIngestionDates();
    
    // Setup search functionality
    setupSearch();
    
    // Show default applicant in viewer
    setTimeout(() => {
        if (currentPage === 'applicants') {
            showApplicantViewer(1);
        }
    }, 100);
});

// Navigation functions
function showLandingPage() {
    hideAllPages();
    document.getElementById('landing-page').classList.remove('hidden');
}

function showSignIn() {
    hideAllPages();
    document.getElementById('signin-page').classList.remove('hidden');
}

function showMainApp() {
    hideAllPages();
    document.getElementById('main-app').classList.remove('hidden');
    updateRoleVisibility();
}

function hideAllPages() {
    const pages = ['landing-page', 'signin-page', 'main-app'];
    pages.forEach(pageId => {
        document.getElementById(pageId).classList.add('hidden');
    });
}

// Sign in functionality
function signIn(event) {
    event.preventDefault();
    // Mock sign in - in real app, this would validate credentials
    showMainApp();
}

function signOut() {
    hideUserDropdown();
    showLandingPage();
}

// User dropdown functionality
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    const userInfo = document.querySelector('.user-info');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        userInfo.classList.add('open');
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', closeDropdownOnOutsideClick);
        }, 0);
    } else {
        hideUserDropdown();
    }
}

function hideUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    const userInfo = document.querySelector('.user-info');
    
    dropdown.classList.add('hidden');
    userInfo.classList.remove('open');
    document.removeEventListener('click', closeDropdownOnOutsideClick);
}

function closeDropdownOnOutsideClick(event) {
    const dropdown = document.getElementById('user-dropdown');
    const userInfo = document.querySelector('.user-info');
    
    if (!userInfo.contains(event.target)) {
        hideUserDropdown();
    }
}

// Role switching functionality
function switchRole(role) {
    currentRole = role;
    document.getElementById('current-role').textContent = role;
    updateRoleVisibility();
    hideUserDropdown();
    
    // Update dashboard metrics based on role (mock data)
    updateDashboardForRole(role);
}

function updateRoleVisibility() {
    const body = document.body;
    const adminElements = document.querySelectorAll('.admin-only');
    
    // Remove all role classes
    body.classList.remove('admin', 'recruiter', 'technical-manager', 'account-manager');
    
    // Add current role class
    const roleClass = currentRole.toLowerCase().replace(/\s+/g, '-');
    body.classList.add(roleClass);
    
    // Show/hide admin elements
    if (currentRole === 'Admin') {
        adminElements.forEach(el => el.classList.remove('hidden'));
    } else {
        adminElements.forEach(el => el.classList.add('hidden'));
    }
}

function updateDashboardForRole(role) {
    // Mock data updates based on role
    const metrics = {
        'Recruiter': {
            'Active Jobs': '24',
            'Total Applicants': '156',
            'Interviews This Week': '8',
            'Avg. Time to Close': '12 days'
        },
        'Technical Manager': {
            'Assigned Reviews': '15',
            'Completed Reviews': '23',
            'Pending Interviews': '5',
            'Average Rating': '4.2/5'
        },
        'Account Manager': {
            'Active Clients': '12',
            'Open Positions': '18',
            'Placements This Month': '6',
            'Client Satisfaction': '94%'
        },
        'Admin': {
            'Total Users': '45',
            'System Uptime': '99.9%',
            'Data Records': '12.5K',
            'Monthly Growth': '+15%'
        }
    };
    
    const roleMetrics = metrics[role] || metrics['Recruiter'];
    const metricCards = document.querySelectorAll('.metric-card');
    
    Object.keys(roleMetrics).forEach((key, index) => {
        if (metricCards[index]) {
            const metricInfo = metricCards[index].querySelector('.metric-info');
            const h3 = metricInfo.querySelector('h3');
            const value = metricInfo.querySelector('.metric-value');
            
            h3.textContent = key;
            value.textContent = roleMetrics[key];
        }
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all content pages
    const contentPages = document.querySelectorAll('.content-page');
    contentPages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    currentPage = pageId;
    
    // Initialize applicant viewer for applicants page
    if (pageId === 'applicants') {
        setTimeout(() => {
            showApplicantViewer(1);
        }, 100);
    }
}

// Settings functionality
function showSettings() {
    hideUserDropdown();
    alert('Settings panel would open here');
}

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarCollapsed = !sidebarCollapsed;
    
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
}

// Applicant viewer functionality
function showApplicantViewer(applicantId) {
    const viewer = document.getElementById('applicant-viewer');
    const emptyState = document.getElementById('empty-state');
    const profileContent = document.getElementById('profile-content');
    const applicant = applicantData[applicantId];
    
    if (!applicant) return;
    
    // Hide empty state and show profile content
    emptyState.classList.add('hidden');
    profileContent.classList.remove('hidden');
    
    // Update viewer content
    document.getElementById('viewer-avatar').textContent = applicant.avatar;
    document.getElementById('viewer-name').textContent = applicant.name;
    document.getElementById('viewer-email').textContent = applicant.email;
    document.getElementById('viewer-phone').textContent = applicant.phone;
    document.getElementById('viewer-position').textContent = applicant.position;
    document.getElementById('viewer-experience').textContent = applicant.experience;
    document.getElementById('viewer-match').textContent = applicant.match;
    
    // Update skills
    const skillsContainer = document.getElementById('viewer-skills');
    skillsContainer.innerHTML = applicant.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    // Update status
    const statusElement = document.getElementById('viewer-status');
    statusElement.textContent = applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1);
    statusElement.className = `status-badge ${applicant.status}`;
    
    // Highlight selected row
    document.querySelectorAll('.table-row').forEach(row => row.classList.remove('selected'));
    const selectedRow = document.querySelector(`[data-applicant-id="${applicantId}"]`);
    if (selectedRow) {
        selectedRow.classList.add('selected');
    }
}

function closeApplicantViewer() {
    const emptyState = document.getElementById('empty-state');
    const profileContent = document.getElementById('profile-content');
    
    // Show empty state and hide profile content
    emptyState.classList.remove('hidden');
    profileContent.classList.add('hidden');
    
    // Remove selection from all rows
    document.querySelectorAll('.table-row').forEach(row => row.classList.remove('selected'));
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('applicant-search');
    const statusFilter = document.getElementById('status-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterApplicants);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterApplicants);
    }
}

function filterApplicants() {
    const searchTerm = document.getElementById('applicant-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        const name = row.querySelector('.applicant-name').textContent.toLowerCase();
        const email = row.querySelector('.applicant-email').textContent.toLowerCase();
        const position = row.cells ? row.cells[1].textContent.toLowerCase() : row.children[1].textContent.toLowerCase();
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        
        const matchesSearch = name.includes(searchTerm) || 
                            email.includes(searchTerm) || 
                            position.includes(searchTerm);
        
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesStatus) {
            row.style.display = 'grid';
        } else {
            row.style.display = 'none';
        }
    });
}

// Email ingestion setup
function setupEmailIngestionDates() {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput && endDateInput) {
        startDateInput.value = oneWeekAgo.toISOString().split('T')[0];
        endDateInput.value = today.toISOString().split('T')[0];
    }
}

// Upload area functionality
function setupUploadArea() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = uploadArea.querySelector('input[type="file"]');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4a5568';
        uploadArea.style.backgroundColor = '#f7fafc';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e2e8f0';
        uploadArea.style.backgroundColor = 'white';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e2e8f0';
        uploadArea.style.backgroundColor = 'white';
        
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFileUpload(e.target.files);
    });
}

function handleFileUpload(files) {
    console.log('Files uploaded:', files);
    // In a real application, this would upload files to a server
    // For now, we'll just show an alert
    alert(`${files.length} file(s) selected for upload`);
}

// Filter functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-button')) {
        // Remove active class from all filter buttons in the same group
        const filterGroup = e.target.closest('.filter-group');
        const buttons = filterGroup.querySelectorAll('.filter-button');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
    }
});

// Job card click handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.job-card')) {
        const jobCard = e.target.closest('.job-card');
        const jobTitle = jobCard.querySelector('h3').textContent;
        alert(`Opening job details for: ${jobTitle}`);
    }
});

// Action button handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-button')) {
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.target.closest('.action-button');
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('fa-eye')) {
            // This is now handled by the onclick attribute in HTML
            return;
        } else if (icon.classList.contains('fa-calendar')) {
            alert('Scheduling interview...');
        }
    }
});

// Primary button handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.primary-button')) {
        const button = e.target.closest('.primary-button');
        const text = button.textContent.trim();
        
        if (text.includes('Post New Job')) {
            alert('Opening job posting form...');
        } else if (text.includes('Add Applicant')) {
            alert('Opening add applicant form...');
        } else if (text.includes('Scan Outlook Inbox')) {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            const folder = document.getElementById('email-folder').value;
            
            if (startDate && endDate) {
                alert(`Scanning ${folder} from ${startDate} to ${endDate}...`);
            } else {
                alert('Please select start and end dates');
            }
        }
    }
});

// Initialize tooltips and other interactive elements
function initializeInteractiveElements() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Call initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close dropdown
    if (e.key === 'Escape') {
        hideUserDropdown();
    }
    
    // Ctrl/Cmd + number keys for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const pages = ['dashboard', 'jobs', 'applicants', 'ingestion'];
        const pageIndex = parseInt(e.key) - 1;
        if (pages[pageIndex]) {
            showPage(pages[pageIndex]);
        }
    }
});

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Export functions for potential external use
window.GrayMatter = {
    showPage,
    switchRole,
    toggleUserDropdown,
    signIn,
    signOut,
    toggleSidebar,
    showApplicantViewer,
    closeApplicantViewer
};
