// Contact Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (contactForm) {
        // Character counter for message
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 900) {
                charCount.classList.add('text-red-500');
            } else {
                charCount.classList.remove('text-red-500');
            }
        });
        
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                utils.validateField(this);
            });
            
            input.addEventListener('input', function() {
                utils.clearFieldError(this);
            });
        });
    }
});

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!utils.validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };

    // Show loading state
    submitBtn.innerHTML = `
        <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    submitBtn.disabled = true;

    // Prepare email parameters
    const templateParams = {
        to_email: 'khangdy38@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        })
    };

    // Send email to you
    emailjs.send('service_72v62sb', 'template_abiempv', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Send auto-reply
            emailjs.send("service_72v62sb", "template_gu3piyx", {
                to_name: formData.firstName,
                email: formData.email,
                from_name: "Khang Dy",
                from_email: "khangdy38@gmail.com",
                subject: formData.subject,
                message: formData.message,
                timestamp: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                }),
                name: `${formData.firstName} ${formData.lastName}`
            })
                .then(function(autoReplyResponse) {
                    console.log('Auto-reply sent successfully!');
                    showSuccessMessage();
                    resetForm();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, function(autoReplyError) {
                    console.log('Auto-reply failed, but main email sent');
                    showSuccessMessage();
                    resetForm();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
                
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h4 class="text-lg font-semibold text-green-800 dark:text-green-200">Message Sent Successfully!</h4>
                <p class="text-green-600 dark:text-green-300">Thank you for your message. I'll get back to you soon!</p>
            </div>
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showErrorMessage() {
    const form = document.getElementById('contactForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <div>
                <h4 class="text-lg font-semibold text-red-800 dark:text-red-200">Message Failed to Send</h4>
                <p class="text-red-600 dark:text-red-300">Sorry, there was an error sending your message. Please try again or contact me directly at khangdy38@gmail.com</p>
            </div>
        </div>
    `;
    
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function resetForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    
    // Clear all validation messages
    const errorElements = form.querySelectorAll('.validation-message');
    errorElements.forEach(element => {
        element.classList.add('hidden');
    });
    
    // Reset character count
    document.getElementById('charCount').textContent = '0';
    
    // Remove error styling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
} 