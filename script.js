// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('mobile-menu-open');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('mobile-menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const formStatus = document.getElementById('form-status');

            let isValid = true;

            // Reset previous errors
            clearErrors();

            // Validate name
            if (!name.value.trim()) {
                showError('name', 'Name is required');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate message
            if (!message.value.trim()) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission (replace with actual form handling)
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success';
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });

        // Real-time validation
        const inputs = ['name', 'email', 'message'];
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('blur', function() {
                validateField(this);
            });
            input.addEventListener('input', function() {
                clearFieldError(this.id);
            });
        });
    }

    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();

        clearFieldError(fieldId);

        switch(fieldId) {
            case 'name':
                if (!value) {
                    showError('name', 'Name is required');
                } else if (value.length < 2) {
                    showError('name', 'Name must be at least 2 characters');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    showError('email', 'Email is required');
                } else if (!emailRegex.test(value)) {
                    showError('email', 'Please enter a valid email address');
                }
                break;
            case 'message':
                if (!value) {
                    showError('message', 'Message is required');
                } else if (value.length < 10) {
                    showError('message', 'Message must be at least 10 characters');
                }
                break;
        }
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        document.getElementById(fieldId).setAttribute('aria-invalid', 'true');
    }

    function clearFieldError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        document.getElementById(fieldId).setAttribute('aria-invalid', 'false');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
        });
    }
});