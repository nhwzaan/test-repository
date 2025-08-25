from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# Simple user storage (in production, use a proper database)
USERS_FILE = 'users.json'

def load_users():
    """Load users from JSON file"""
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    """Save users to JSON file"""
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def create_default_user():
    """Create a default user for testing"""
    users = load_users()
    if not users:
        users['admin@example.com'] = {
            'password': generate_password_hash('admin123'),
            'username': 'admin',
            'created_at': datetime.now().isoformat()
        }
        save_users(users)

# Initialize with default user
create_default_user()

@app.route('/')
def index():
    """Main page - redirect to login if not authenticated"""
    if 'user' in session:
        return render_template('dashboard.html', user=session['user'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page and authentication"""
    if request.method == 'POST':
        if request.is_json:
            # Handle AJAX request
            data = request.get_json()
            email = data.get('email', '').lower().strip()
            password = data.get('password', '')
        else:
            # Handle form submission
            email = request.form.get('email', '').lower().strip()
            password = request.form.get('password', '')
        
        if not email or not password:
            if request.is_json:
                return jsonify({'success': False, 'message': 'Please provide both email and password'})
            flash('Please provide both email and password', 'error')
            return render_template('login.html')
        
        users = load_users()
        
        if email in users and check_password_hash(users[email]['password'], password):
            session['user'] = {
                'email': email,
                'username': users[email]['username']
            }
            if request.is_json:
                return jsonify({'success': True, 'message': 'Login successful', 'redirect': url_for('index')})
            return redirect(url_for('index'))
        else:
            if request.is_json:
                return jsonify({'success': False, 'message': 'Invalid email or password'})
            flash('Invalid email or password', 'error')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """User registration"""
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            email = data.get('email', '').lower().strip()
            username = data.get('username', '').strip()
            password = data.get('password', '')
        else:
            email = request.form.get('email', '').lower().strip()
            username = request.form.get('username', '').strip()
            password = request.form.get('password', '')
        
        if not all([email, username, password]):
            message = 'Please provide email, username, and password'
            if request.is_json:
                return jsonify({'success': False, 'message': message})
            flash(message, 'error')
            return render_template('register.html')
        
        users = load_users()
        
        if email in users:
            message = 'Email already registered'
            if request.is_json:
                return jsonify({'success': False, 'message': message})
            flash(message, 'error')
            return render_template('register.html')
        
        # Create new user
        users[email] = {
            'password': generate_password_hash(password),
            'username': username,
            'created_at': datetime.now().isoformat()
        }
        save_users(users)
        
        if request.is_json:
            return jsonify({'success': True, 'message': 'Registration successful', 'redirect': url_for('login')})
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Forgot password functionality"""
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            email = data.get('email', '').lower().strip()
        else:
            email = request.form.get('email', '').lower().strip()
        
        if not email:
            message = 'Please provide your email address'
            if request.is_json:
                return jsonify({'success': False, 'message': message})
            flash(message, 'error')
            return render_template('forgot_password.html')
        
        users = load_users()
        
        if email in users:
            # In a real application, you would send a password reset email
            # For demo purposes, we'll just show a success message
            message = f'Password reset instructions have been sent to {email}'
            if request.is_json:
                return jsonify({'success': True, 'message': message})
            flash(message, 'success')
        else:
            # Don't reveal if email exists or not for security
            message = f'If {email} is registered, password reset instructions have been sent'
            if request.is_json:
                return jsonify({'success': True, 'message': message})
            flash(message, 'info')
        
        return redirect(url_for('login'))
    
    return render_template('forgot_password.html')

@app.route('/logout')
def logout():
    """Logout user"""
    session.pop('user', None)
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

@app.route('/api/check-auth')
def check_auth():
    """API endpoint to check authentication status"""
    return jsonify({'authenticated': 'user' in session})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)