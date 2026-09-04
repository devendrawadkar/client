/**
 * Client-Side Form Validation
 * Comprehensive JavaScript validation with multiple validation techniques
 */

// Get form and all input elements
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const websiteInput = document.getElementById('website');
const dobInput = document.getElementById('dob');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const termsCheckbox = document.getElementById('terms');

/**
 * Validation Rules Object
 */
const validationRules = {
    fullName: {
        required: true,
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
        errorMessages: {
            required: 'Full name is required',
            minLength: 'Full name must be at least 3 characters',
            maxLength: 'Full name cannot exceed 50 characters',
            pattern: 'Full name can only contain letters, spaces, hyphens, and apostrophes'
        }
    },
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessages: {
            required: 'Email address is required',
            pattern: 'Please enter a valid email address'
        }
    },
    phone: {
        required: true,
        pattern: /^[0-9\-\+\(\)\s]{10,}$/,
        errorMessages: {
            required: 'Phone number is required',
            pattern: 'Please enter a valid phone number (at least 10 digits)'
        }
    },
    age: {
        required: true,
        min: 18,
        max: 100,
        errorMessages: {
            required: 'Age is required',
            min: 'You must be at least 18 years old',
            max: 'Please enter a valid age'
        }
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
        errorMessages: {
            required: 'Password is required',
            minLength: 'Password must be at least 8 characters long',
            pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
        }
    },
    confirmPassword: {
        required: true,
        match: 'password',
        errorMessages: {
            required: 'Please confirm your password',
            match: 'Passwords do not match'
        }
    },
    website: {
        optional: true,
        pattern: /^https?:\/\/.+/,
        errorMessages: {
            pattern: 'Please enter a valid URL (must start with http:// or https://)'
        }
    },
    dob: {
        required: true,
        errorMessages: {
            required: 'Date of birth is required'
        }
    },
    gender: {
        required: true,
        errorMessages: {
            required: 'Please select a gender'
        }
    },
    terms: {
        required: true,
        errorMessages: {
            required: 'You must agree to the terms and conditions'
        }
    }
};

/**
 * Validate Full Name
 */
function validateFullName() {
    const value = fullNameInput.value.trim();
    const errorElement = document.getElementById('fullNameError');
    const formGroup = fullNameInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.fullName.errorMessages.required);
        return false;
    }

    if (value.length < validationRules.fullName.minLength) {
        showError(errorElement, formGroup, validationRules.fullName.errorMessages.minLength);
        return false;
    }

    if (value.length > validationRules.fullName.maxLength) {
        showError(errorElement, formGroup, validationRules.fullName.errorMessages.maxLength);
        return false;
    }

    if (!validationRules.fullName.pattern.test(value)) {
        showError(errorElement, formGroup, validationRules.fullName.errorMessages.pattern);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Email
 */
function validateEmail() {
    const value = emailInput.value.trim();
    const errorElement = document.getElementById('emailError');
    const formGroup = emailInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.email.errorMessages.required);
        return false;
    }

    if (!validationRules.email.pattern.test(value)) {
        showError(errorElement, formGroup, validationRules.email.errorMessages.pattern);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Phone Number
 */
function validatePhone() {
    const value = phoneInput.value.trim();
    const errorElement = document.getElementById('phoneError');
    const formGroup = phoneInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.phone.errorMessages.required);
        return false;
    }

    if (!validationRules.phone.pattern.test(value)) {
        showError(errorElement, formGroup, validationRules.phone.errorMessages.pattern);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Age
 */
function validateAge() {
    const value = ageInput.value.trim();
    const errorElement = document.getElementById('ageError');
    const formGroup = ageInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.age.errorMessages.required);
        return false;
    }

    const age = parseInt(value);

    if (age < validationRules.age.min) {
        showError(errorElement, formGroup, validationRules.age.errorMessages.min);
        return false;
    }

    if (age > validationRules.age.max) {
        showError(errorElement, formGroup, validationRules.age.errorMessages.max);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Password
 */
function validatePassword() {
    const value = passwordInput.value;
    const errorElement = document.getElementById('passwordError');
    const formGroup = passwordInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.password.errorMessages.required);
        updatePasswordStrength('');
        return false;
    }

    if (value.length < validationRules.password.minLength) {
        showError(errorElement, formGroup, validationRules.password.errorMessages.minLength);
        updatePasswordStrength(value);
        return false;
    }

    if (!validationRules.password.pattern.test(value)) {
        showError(errorElement, formGroup, validationRules.password.errorMessages.pattern);
        updatePasswordStrength(value);
        return false;
    }

    clearError(errorElement, formGroup);
    updatePasswordStrength(value);
    return true;
}

/**
 * Calculate and display password strength
 */
function updatePasswordStrength(password) {
    const strengthElement = document.getElementById('passwordStrength');

    if (!password) {
        strengthElement.classList.remove('show', 'weak', 'medium', 'strong');
        return;
    }

    strengthElement.classList.add('show');

    let strength = 0;

    // Check length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Check character types
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    strengthElement.classList.remove('weak', 'medium', 'strong');

    if (strength <= 2) {
        strengthElement.textContent = '⚠️ Weak Password';
        strengthElement.classList.add('weak');
    } else if (strength <= 4) {
        strengthElement.textContent = '⚠️ Medium Password';
        strengthElement.classList.add('medium');
    } else {
        strengthElement.textContent = '✓ Strong Password';
        strengthElement.classList.add('strong');
    }
}

/**
 * Validate Confirm Password
 */
function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    const errorElement = document.getElementById('confirmPasswordError');
    const formGroup = confirmPasswordInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.confirmPassword.errorMessages.required);
        return false;
    }

    if (value !== passwordValue) {
        showError(errorElement, formGroup, validationRules.confirmPassword.errorMessages.match);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Website URL
 */
function validateWebsite() {
    const value = websiteInput.value.trim();
    const errorElement = document.getElementById('websiteError');
    const formGroup = websiteInput.parentElement;

    if (!value) {
        clearError(errorElement, formGroup);
        return true;
    }

    if (!validationRules.website.pattern.test(value)) {
        showError(errorElement, formGroup, validationRules.website.errorMessages.pattern);
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Date of Birth
 */
function validateDob() {
    const value = dobInput.value;
    const errorElement = document.getElementById('dobError');
    const formGroup = dobInput.parentElement;

    if (!value) {
        showError(errorElement, formGroup, validationRules.dob.errorMessages.required);
        return false;
    }

    const dob = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
        showError(errorElement, formGroup, 'You must be at least 18 years old');
        return false;
    }

    clearError(errorElement, formGroup);
    return true;
}

/**
 * Validate Gender Selection
 */
function validateGender() {
    const errorElement = document.getElementById('genderError');
    const checked = Array.from(genderInputs).some(input => input.checked);

    if (!checked) {
        errorElement.textContent = validationRules.gender.errorMessages.required;
        errorElement.classList.add('show');
        return false;
    }

    errorElement.classList.remove('show');
    return true;
}

/**
 * Validate Terms Checkbox
 */
function validateTerms() {
    const errorElement = document.getElementById('termsError');

    if (!termsCheckbox.checked) {
        showError(errorElement, termsCheckbox.parentElement, validationRules.terms.errorMessages.required);
        return false;
    }

    clearError(errorElement, termsCheckbox.parentElement);
    return true;
}

/**
 * Show Error Message
 */
function showError(errorElement, formGroup, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
    formGroup.classList.add('error');
}

/**
 * Clear Error Message
 */
function clearError(errorElement, formGroup) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    formGroup.classList.remove('error');
}

/**
 * Validate Entire Form
 */
function validateForm() {
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAgeValid = validateAge();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isWebsiteValid = validateWebsite();
    const isDobValid = validateDob();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    return (
        isFullNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isAgeValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isWebsiteValid &&
        isDobValid &&
        isGenderValid &&
        isTermsValid
    );
}

/**
 * Handle Form Submission
 */
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateForm()) {
        // Show success message
        form.style.display = 'none';
        document.getElementById('successMessage').classList.remove('hidden');

        // Log form data
        console.log('Form submitted successfully!');
        console.log({
            fullName: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            age: ageInput.value,
            website: websiteInput.value,
            dob: dobInput.value,
            gender: Array.from(genderInputs).find(input => input.checked).value,
            newsletter: document.getElementById('newsletter').checked
        });

        // Reset after 3 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            document.getElementById('successMessage').classList.add('hidden');
        }, 3000);
    }
});

/**
 * Real-time Validation on Input
 */
fullNameInput.addEventListener('blur', validateFullName);
fullNameInput.addEventListener('input', validateFullName);

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', validateEmail);

phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('input', validatePhone);

ageInput.addEventListener('blur', validateAge);
ageInput.addEventListener('input', validateAge);

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', validatePassword);

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

websiteInput.addEventListener('blur', validateWebsite);
websiteInput.addEventListener('input', validateWebsite);

dobInput.addEventListener('blur', validateDob);
dobInput.addEventListener('change', validateDob);

genderInputs.forEach(input => {
    input.addEventListener('change', validateGender);
});

termsCheckbox.addEventListener('change', validateTerms);

/**
 * Reset Form Handler
 */
form.addEventListener('reset', function() {
    setTimeout(() => {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });
        document.getElementById('passwordStrength').classList.remove('show');
    }, 0);
});
