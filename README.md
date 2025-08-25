# Modern Login Page

A beautiful, responsive login page built with Python Flask backend and modern HTML/CSS/JavaScript frontend.

## Features

✨ **Modern Design**
- Beautiful gradient backgrounds with floating animations
- Responsive design that works on all devices
- Smooth animations and transitions
- Dark mode support

🔐 **Authentication Features**
- User login with email/password
- User registration
- Forgot password functionality
- Session management
- Password visibility toggle
- Remember me functionality

🚀 **Technical Features**
- Flask backend with secure password hashing
- Real-time form validation
- AJAX form submissions
- Flash messages for user feedback
- JSON-based user storage (easily replaceable with database)
- RESTful API endpoints

## Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project**
   ```bash
   cd /workspace
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## Default Login Credentials

For testing purposes, a default admin user is created:
- **Email:** `admin@example.com`
- **Password:** `admin123`

## Project Structure

```
/workspace/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── users.json            # User data storage (auto-created)
├── templates/            # HTML templates
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── forgot_password.html # Forgot password page
│   └── dashboard.html    # Dashboard (after login)
├── static/
│   ├── css/
│   │   └── style.css     # Modern CSS styles
│   └── js/
│       └── login.js      # JavaScript functionality
└── README.md            # This file
```

## API Endpoints

### Authentication
- `GET /` - Main page (redirects to login if not authenticated)
- `GET/POST /login` - Login page and authentication
- `GET/POST /register` - User registration
- `GET/POST /forgot-password` - Password reset
- `GET /logout` - Logout user

### API
- `GET /api/check-auth` - Check authentication status

## Features in Detail

### Frontend Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Form Validation**: Real-time validation with visual feedback
- **Password Strength**: Visual indicators for password requirements
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Modern UI**: Clean, professional design with gradients and shadows

### Backend Features
- **Secure Authentication**: Passwords are hashed using Werkzeug
- **Session Management**: Secure session handling
- **JSON Storage**: Simple file-based user storage (easily replaceable)
- **Error Handling**: Proper error messages and validation
- **AJAX Support**: Both form and AJAX submissions supported

## Customization

### Changing Colors
Edit the CSS variables in `/static/css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... other colors */
}
```

### Adding Database Support
Replace the JSON file storage in `app.py` with your preferred database:
- SQLite with SQLAlchemy
- PostgreSQL
- MongoDB
- etc.

### Email Integration
To implement actual password reset emails, modify the `/forgot-password` route in `app.py` to:
1. Generate secure reset tokens
2. Send emails using Flask-Mail or similar
3. Create password reset form

## Security Considerations

⚠️ **For Production Use:**
1. Change the `secret_key` in `app.py`
2. Use environment variables for sensitive data
3. Implement proper database with connection pooling
4. Add rate limiting for login attempts
5. Use HTTPS in production
6. Implement proper password reset with email verification
7. Add CSRF protection
8. Consider implementing 2FA

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is provided as-is for educational and development purposes.

---

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**Live Demo:** Run `python app.py` and visit `http://localhost:5000`