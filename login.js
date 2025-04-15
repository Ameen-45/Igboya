document.addEventListener('DOMContentLoaded', function() {
    // Initialize local storage with default users if empty
    initializeUsers();
    
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const sessionIdInput = document.getElementById('sessionId');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const signupLink = document.getElementById('signupLink');
    const notification = document.getElementById('notification');
    
    // Check if credentials are remembered
    const rememberedSessionId = localStorage.getItem('rememberedSessionId');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    
    if (rememberedSessionId && rememberedPassword) {
        sessionIdInput.value = rememberedSessionId;
        passwordInput.value = rememberedPassword;
        rememberCheckbox.checked = true;
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const sessionId = sessionIdInput.value.trim();
        const password = passwordInput.value;
        
        // Validate credentials
        if (validateCredentials(sessionId, password)) {
            // Remember credentials if checkbox is checked
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedSessionId', sessionId);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedSessionId');
                localStorage.removeItem('rememberedPassword');
            }
            
            // Show success notification
            showNotification('Login successful!', 'success');
            
            // Redirect to topics.html after 0 seconds
            setTimeout(() => {
                window.location.href = 'topics.html';
            }, 1500);
        } else {
            showNotification('Invalid session ID or password', 'error');
            passwordInput.value = '';
        }
    });
    
    // Forgot password link
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Please contact the administrator to reset your password', 'info');
    });
    
    // Sign up link
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Please contact the administrator to get access', 'info');
    });
    
    // Function to validate credentials
    function validateCredentials(sessionId, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.sessionId === sessionId && user.password === password);
    }
    
    // Function to show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Function to initialize default users
    function initializeUsers() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [];
            
            // Create 10 default users (igboya1 to igboya10 with password 12345)
            for (let i = 1; i <= 10; i++) {
                defaultUsers.push({
                    sessionId: `igboya${i}`,
                    password: '12345'
                });
            }
            
            // Add the main igboya user
            defaultUsers.push({
                sessionId: 'igboya',
                password: '12345'
            });
            
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }
    
    // Add animation to form inputs on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.style.transform = 'scale(1)';
        });
    });
});