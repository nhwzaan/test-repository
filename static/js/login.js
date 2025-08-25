// Modern Login Page JavaScript
class LoginManager {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loginBtn = document.getElementById('loginBtn');
        this.alertContainer = document.getElementById('alertContainer');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupPasswordToggle();
        this.setupFormValidation();
        this.setupFlashMessages();
        this.setupSocialButtons();
        this.setupAnimations();
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Input focus animations
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
            input.addEventListener('input', () => this.handleInputChange(input));
        });
        
        // Real-time validation
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.passwordInput.addEventListener('input', () => this.validatePassword());
    }
    
    setupPasswordToggle() {
        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', () => {
                const type = this.passwordInput.type === 'password' ? 'text' : 'password';
                this.passwordInput.type = type;
                
                const icon = this.passwordToggle.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
                
                // Add animation
                this.passwordToggle.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.passwordToggle.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }
    
    setupFormValidation() {
        // Email validation
        this.emailInput.addEventListener('blur', () => {
            if (this.emailInput.value && !this.isValidEmail(this.emailInput.value)) {
                this.showFieldError(this.emailInput, 'Please enter a valid email address');
            } else {
                this.clearFieldError(this.emailInput);
            }
        });
        
        // Password validation
        this.passwordInput.addEventListener('blur', () => {
            if (this.passwordInput.value && this.passwordInput.value.length < 6) {
                this.showFieldError(this.passwordInput, 'Password must be at least 6 characters');
            } else {
                this.clearFieldError(this.passwordInput);
            }
        });
    }
    
    setupFlashMessages() {
        // Auto-hide flash messages
        const flashMessages = document.querySelectorAll('.flash-message');
        flashMessages.forEach(message => {
            const closeBtn = message.querySelector('.flash-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    message.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => message.remove(), 300);
                });
            }
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => message.remove(), 300);
                }
            }, 5000);
        });
    }
    
    setupSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('google-btn') ? 'Google' : 'GitHub';
                this.showAlert('info', `${provider} authentication is not implemented in this demo`);
            });
        });
    }
    
    setupAnimations() {
        // Add entrance animations to form elements
        const formElements = this.form.querySelectorAll('.form-group, .form-options, .login-btn, .social-login');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 300);
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showAlert('success', result.message || 'Login successful!');
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = result.redirect || '/';
                }, 1000);
            } else {
                this.showAlert('error', result.message || 'Login failed. Please try again.');
                this.shakeForm();
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showAlert('error', 'Network error. Please check your connection and try again.');
            this.shakeForm();
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm() {
        let isValid = true;
        
        // Validate email
        if (!this.emailInput.value.trim()) {
            this.showFieldError(this.emailInput, 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(this.emailInput.value)) {
            this.showFieldError(this.emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            this.clearFieldError(this.emailInput);
        }
        
        // Validate password
        if (!this.passwordInput.value) {
            this.showFieldError(this.passwordInput, 'Password is required');
            isValid = false;
        } else if (this.passwordInput.value.length < 6) {
            this.showFieldError(this.passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            this.clearFieldError(this.passwordInput);
        }
        
        return isValid;
    }
    
    validateEmail() {
        if (this.emailInput.value && this.isValidEmail(this.emailInput.value)) {
            this.emailInput.style.borderColor = 'var(--success-color)';
            setTimeout(() => {
                this.emailInput.style.borderColor = '';
            }, 2000);
        }
    }
    
    validatePassword() {
        if (this.passwordInput.value && this.passwordInput.value.length >= 6) {
            this.passwordInput.style.borderColor = 'var(--success-color)';
            setTimeout(() => {
                this.passwordInput.style.borderColor = '';
            }, 2000);
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error-color);
            font-size: 0.75rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease;
        `;
        
        input.style.borderColor = 'var(--error-color)';
        input.parentNode.appendChild(errorDiv);
        
        // Add shake animation to input
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
    
    clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }
    
    handleInputFocus(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('focused');
        }
    }
    
    handleInputBlur(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('focused');
        }
    }
    
    handleInputChange(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            if (input.value) {
                formGroup.classList.add('has-value');
            } else {
                formGroup.classList.remove('has-value');
            }
        }
    }
    
    setLoading(loading) {
        const btnText = this.loginBtn.querySelector('.btn-text');
        const btnLoader = this.loginBtn.querySelector('.btn-loader');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            this.loginBtn.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            this.loginBtn.disabled = false;
        }
    }
    
    showAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        const icon = this.getAlertIcon(type);
        alert.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        this.alertContainer.appendChild(alert);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }
    
    getAlertIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }
}

// Additional CSS animations
const additionalStyles = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .form-group.focused input {
        border-color: var(--border-focus);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-group.has-value label {
        color: var(--primary-color);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize login manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});

// Utility functions
window.LoginUtils = {
    // Password strength checker
    checkPasswordStrength: function(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[^A-Za-z0-9]/.test(password)
        };
        
        strength = Object.values(checks).filter(Boolean).length;
        
        return {
            score: strength,
            checks: checks,
            level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
        };
    },
    
    // Generate secure password
    generatePassword: function(length = 12) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    },
    
    // Local storage helpers
    saveRememberMe: function(email) {
        if (document.getElementById('remember').checked) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    },
    
    loadRememberedEmail: function() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('remember').checked = true;
        }
    }
};

// Load remembered email on page load
document.addEventListener('DOMContentLoaded', () => {
    window.LoginUtils.loadRememberedEmail();
});