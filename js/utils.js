// Unified Utilities for Portfolio
class PortfolioUtils {
    constructor() {
        this.audioContext = null;
        this.soundVolume = 0.3;
        this.init();
    }

    init() {
        this.initAudioContext();
        this.setupGlobalEventListeners();
    }

    // Audio Management
    initAudioContext() {
        try {
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                this.audioContext = new (AudioContext || webkitAudioContext)();
            }
        } catch (error) {
            console.log('Web Audio API not supported:', error);
        }
    }

    playSound(type, options = {}) {
        if (!this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            let frequency = 500;
            let duration = 0.1;
            
            switch (type) {
                case 'click':
                    frequency = 800;
                    duration = 0.1;
                    break;
                case 'hover':
                    frequency = 600;
                    duration = 0.05;
                    break;
                case 'success':
                    this.playSuccessMelody();
                    return;
                case 'error':
                    frequency = 400;
                    duration = 0.2;
                    break;
                case 'theme-toggle':
                    frequency = 400;
                    duration = 0.2;
                    break;
                case 'docs-open':
                    frequency = 800;
                    duration = 0.1;
                    break;
                case 'download-success':
                    frequency = 1000;
                    duration = 0.2;
                    break;
                default:
                    frequency = options.frequency || 500;
                    duration = options.duration || 0.1;
            }
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            if (type === 'theme-toggle') {
                oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
                oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.2);
            } else {
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, this.audioContext.currentTime + duration);
            }
            
            gainNode.gain.setValueAtTime(this.soundVolume * (options.volume || 1), this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.log('Sound failed:', error);
        }
    }

    playSuccessMelody() {
        if (!this.audioContext) return;
        
        try {
            const frequencies = [261.63, 329.63, 392.00];
            const duration = 0.15;
            
            frequencies.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(this.soundVolume * 0.4, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                
                oscillator.start(this.audioContext.currentTime + (index * 0.1));
                oscillator.stop(this.audioContext.currentTime + (index * 0.1) + duration);
            });
        } catch (error) {
            console.log('Success melody failed:', error);
        }
    }

    // Modal Management
    openModal(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        if (options.playSound !== false) {
            this.playSound('click');
        }
        
        // Auto-close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                this.closeModal(modalId);
            }
        }.bind(this));
        
        // Auto-close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.closeModal(modalId);
            }
        }.bind(this));
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            this.playSound('click');
        }
    }

    // Notification System
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="notification-close">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }

    // Download Helper
    downloadFile(url, filename = null) {
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || url.split('/').pop() || 'document.pdf';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.playSound('download-success');
            this.showNotification('File downloaded successfully!', 'success');
        } catch (error) {
            console.error('Download failed:', error);
            this.showNotification('Download failed. Please try again.', 'error');
        }
    }

    // Form Validation
    validateField(field, rules = {}) {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.validation-message');
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Name validation
        if (field.id === 'firstName' || field.id === 'lastName') {
            if (value.length < 2) {
                this.showFieldError(field, 'Name must be at least 2 characters long');
                return false;
            }
        }
        
        // Message validation
        if (field.id === 'message') {
            if (value.length < 10) {
                this.showFieldError(field, 'Message must be at least 10 characters long');
                return false;
            }
            if (value.length > 1000) {
                this.showFieldError(field, 'Message cannot exceed 1000 characters');
                return false;
            }
        }
        
        return true;
    }

    showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.validation-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            field.classList.add('border-red-500');
        }
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.validation-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
            field.classList.remove('border-red-500');
        }
    }

    // DOM Utilities
    addClickSound(element) {
        element.addEventListener('click', () => {
            this.playSound('click');
        });
    }

    addHoverSound(element) {
        element.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });
    }

    // Setup Global Event Listeners
    setupGlobalEventListeners() {
        // Add sound effects to clickable elements
        const clickableElements = document.querySelectorAll('button, a, [role="button"], .clickable');
        
        clickableElements.forEach(element => {
            if (!element.closest('#audioPlayer')) {
                this.addClickSound(element);
                this.addHoverSound(element);
            }
        });
        
        // Theme toggle sound
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.playSound('theme-toggle');
            });
        }
        
        // Form submission sound
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                this.playSound('success');
            });
        });
    }

    // Smooth Scrolling
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Global instance
window.utils = new PortfolioUtils();

// Global helper functions
function playSound(type, options = {}) {
    window.utils.playSound(type, options);
}

function showNotification(message, type = 'info', duration = 5000) {
    window.utils.showNotification(message, type, duration);
}

function openModal(modalId, options = {}) {
    window.utils.openModal(modalId, options);
}

function closeModal(modalId) {
    window.utils.closeModal(modalId);
}

function downloadFile(url, filename = null) {
    window.utils.downloadFile(url, filename);
}

function validateField(field, rules = {}) {
    return window.utils.validateField(field, rules);
}

function smoothScrollTo(target) {
    window.utils.smoothScrollTo(target);
} 