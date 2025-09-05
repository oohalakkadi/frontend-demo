# Gray Matter - Recruitment Management System

A modern, static frontend for a comprehensive recruitment management system built with vanilla HTML, CSS, and JavaScript.

## Features

- **Multi-role Support**: Recruiter, Technical Manager, Account Manager, and Admin roles
- **Modern UI**: Clean gray and white design with Prociono headings
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Dashboard**: Role-specific metrics and activity feeds
- **Job Management**: Post, view, and manage job listings
- **Candidate Tracking**: View and manage candidate applications
- **Resume Ingestion**: Upload and process candidate resumes
- **Admin Features**: Audit trail, validation, and company settings

## User Roles

### Recruiter
- Manage job postings and candidate pipelines
- Schedule interviews and provide feedback
- Access to candidate database and matching scores

### Technical Manager
- Review assigned candidate profiles
- Conduct technical interviews
- Provide detailed technical feedback

### Account Manager
- Manage client relationships and job orders
- Submit candidates to clients
- Track job statuses for clients

### Admin
- Full system access and user management
- Executive dashboard with performance metrics
- Audit trail and system configuration
- Data validation and company settings

## Getting Started

1. Open `index.html` in a web browser
2. Click "Get Started" on the landing page
3. Use the mock sign-in form (any email/password will work)
4. Explore the different role perspectives using the user dropdown

## File Structure

```
├── index.html          # Main application file
├── styles/
│   └── main.css        # All styles and responsive design
├── scripts/
│   └── main.js         # Application logic and interactions
└── README.md          # This file
```

## Key Features

### Navigation
- Landing page with call-to-action
- Mock authentication flow
- Sidebar navigation with role-based visibility
- User dropdown with role switching

### Dashboard
- Role-specific metrics and KPIs
- Recent activity feed
- Performance tracking

### Job Management
- Job listing with filtering
- Job status tracking (Open/Closed)
- Job posting interface

### Candidate Management
- Candidate database with search
- Matching scores and status tracking
- Interview scheduling

### Resume Processing
- Drag-and-drop file upload
- Processing queue with progress
- Support for PDF, DOC, DOCX formats

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons throughout the interface
- **Google Fonts**: Prociono serif font for headings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

The application uses CSS custom properties for easy theming. Key colors and spacing can be modified in the CSS file to match brand requirements.

## Development

This is a static frontend application that doesn't require a build process. Simply open `index.html` in a browser to run the application.

For production deployment, serve the files through any web server or CDN.
