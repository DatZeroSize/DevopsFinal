// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Custom JavaScript for DevopsFinal Application

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeTooltips();
    initializeAnimations();
});

// Form Validation Functions
function initializeFormValidation() {
    // Create User Form Validation
    const createUserForm = document.getElementById('createUserForm');
    if (createUserForm) {
        createUserForm.addEventListener('submit', function(e) {
            if (!validateCreateUserForm()) {
                e.preventDefault();
                return false;
            }
        });

        // Real-time validation feedback
        const formControls = createUserForm.querySelectorAll('.form-control');
        formControls.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearValidationState(this);
            });
        });
    }
}

function validateCreateUserForm() {
    const nameInput = document.querySelector('input[name="Name"]');
    const emailInput = document.querySelector('input[name="Email"]');
    
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Vui lòng nhập họ và tên!');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Tên phải có ít nhất 2 ký tự!');
        isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Vui lòng nhập địa chỉ email!');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showFieldError(emailInput, 'Vui lòng nhập địa chỉ email hợp lệ!');
        isValid = false;
    }

    if (!isValid) {
        showAlert('Vui lòng kiểm tra lại thông tin đã nhập!', 'danger');
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.name === 'Name') {
        if (!value) {
            showFieldError(field, 'Vui lòng nhập họ và tên!');
        } else if (value.length < 2) {
            showFieldError(field, 'Tên phải có ít nhất 2 ký tự!');
        } else {
            showFieldSuccess(field);
        }
    } else if (field.name === 'Email') {
        if (!value) {
            showFieldError(field, 'Vui lòng nhập địa chỉ email!');
        } else if (!isValidEmail(value)) {
            showFieldError(field, 'Vui lòng nhập địa chỉ email hợp lệ!');
        } else {
            showFieldSuccess(field);
        }
    }
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
    
    // Remove error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function clearValidationState(field) {
    field.classList.remove('is-valid', 'is-invalid');
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}



function confirmDelete(userName) {
    return confirm(`Bạn có chắc chắn muốn xóa user "${userName}" không?\n\nHành động này không thể hoàn tác!`);
}

// Alert Functions
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show custom-alert`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function getAlertIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'danger': return 'exclamation-triangle';
        case 'warning': return 'exclamation-circle';
        default: return 'info-circle';
    }
}

// Tooltip Initialization
function initializeTooltips() {
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Animation Functions
function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading state management
function showLoading(button) {
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...';
    button.disabled = true;
}

function hideLoading(button) {
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

// Form submission with loading state
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                showLoading(submitButton);
                
                // Simulate processing time (remove in production)
                setTimeout(() => {
                    hideLoading(submitButton);
                    if (successMessage) {
                        showAlert(successMessage, 'success');
                    }
                }, 1000);
            }
        });
    }
}

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('userSearch');
    if (searchInput) {
        const debouncedSearch = debounce(performSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
}

function performSearch() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const name = row.querySelector('td:first-child').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Export functions for global use
window.DevopsFinal = {
    showAlert,
    showLoading,
    hideLoading,
    validateCreateUserForm,
    confirmDelete,
    handleFormSubmission
};


// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeHomeAnimations();
    initializeTeamMemberEffects();
    initializeCounters();
    initializeScrollEffects();
});

// Initialize home page animations
function initializeHomeAnimations() {
    // Stagger animation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Hero badges animation
    const badges = document.querySelectorAll('.hero-badges .badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.4s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 1000 + (index * 100));
    });
}

// Team member row effects
function initializeTeamMemberEffects() {
    const teamRows = document.querySelectorAll('.team-member-row');
    
    teamRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
            
            // Animate avatar
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
            
            // Animate role badge
            const badge = this.querySelector('.role-badge');
            if (badge) {
                badge.style.transform = 'scale(1.05)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            
            // Reset avatar
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset role badge
            const badge = this.querySelector('.role-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
}

// Counter animation for team members
function initializeCounters() {
    const memberNumbers = document.querySelectorAll('.member-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    memberNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', debounce(handleScroll, 10));
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Fade in elements on scroll
    const elements = document.querySelectorAll('.info-card, .team-section');
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        const viewportTop = scrolled;
        const viewportBottom = viewportTop + window.innerHeight;
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Team member click effects
function addTeamMemberClickEffect() {
    const teamRows = document.querySelectorAll('.team-member-row');
    
    teamRows.forEach(row => {
        row.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(37, 99, 235, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize click effects
document.addEventListener('DOMContentLoaded', addTeamMemberClickEffect);

// Export functions for global use
window.HomePageEffects = {
    initializeHomeAnimations,
    initializeTeamMemberEffects,
    initializeCounters,
    addTeamMemberClickEffect
};