```javascript
// ==========================================
// CLIENT-SIDE FORM VALIDATION
// ==========================================

// Get form elements
const form = document.getElementById("registrationForm");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const websiteInput = document.getElementById("website");

const genderInputs = document.querySelectorAll(
    'input[name="gender"]'
);

const termsCheckbox = document.getElementById("terms");
const newsletterCheckbox = document.getElementById("newsletter");

const successMessage = document.getElementById("successMessage");


// ==========================================
// SHOW ERROR
// ==========================================

function showError(errorElement, formGroup, message) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
    formGroup.classList.add("error");
}


// ==========================================
// CLEAR ERROR
// ==========================================

function clearError(errorElement, formGroup) {
    errorElement.textContent = "";
    errorElement.classList.remove("show");
    formGroup.classList.remove("error");
}


// ==========================================
// FULL NAME VALIDATION
// ==========================================

function validateFullName() {

    const value = fullNameInput.value.trim();

    const error = document.getElementById("fullNameError");
    const group = fullNameInput.parentElement;

    if (value === "") {
        showError(
            error,
            group,
            "Full name is required"
        );
        return false;
    }

    if (value.length < 3) {
        showError(
            error,
            group,
            "Full name must be at least 3 characters"
        );
        return false;
    }

    if (value.length > 50) {
        showError(
            error,
            group,
            "Full name cannot exceed 50 characters"
        );
        return false;
    }

    const namePattern = /^[A-Za-z\s'-]+$/;

    if (!namePattern.test(value)) {
        showError(
            error,
            group,
            "Name can contain only letters, spaces, hyphens and apostrophes"
        );
        return false;
    }

    clearError(error, group);
    return true;
}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail() {

    const value = emailInput.value.trim();

    const error = document.getElementById("emailError");
    const group = emailInput.parentElement;

    if (value === "") {
        showError(
            error,
            group,
            "Email address is required"
        );
        return false;
    }

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value)) {
        showError(
            error,
            group,
            "Please enter a valid email address"
        );
        return false;
    }

    clearError(error, group);
    return true;
}


// ==========================================
// PHONE VALIDATION
// ==========================================

function validatePhone() {

    const value = phoneInput.value.trim();

    const error = document.getElementById("phoneError");
    const group = phoneInput.parentElement;

    if (value === "") {
        showError(
            error,
            group,
            "Phone number is required"
        );
        return false;
    }

    // Remove spaces, +, -, brackets
    const digits = value.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
        showError(
            error,
            group,
            "Please enter a valid phone number"
        );
        return false;
    }

    clearError(error, group);
    return true;
}


// ==========================================
// AGE VALIDATION
// ==========================================

function validateAge() {

    const value = ageInput.value.trim();

    const error = document.getElementById("ageError");
    const group = ageInput.parentElement;

    if (value === "") {
        showError(
            error,
            group,
            "Age is required"
        );
        return false;
    }

    const age = Number(value);

    if (isNaN(age)) {
        showError(
            error,
            group,
            "Please enter a valid age"
        );
        return false;
    }

    if (age < 18) {
        showError(
            error,
            group,
            "You must be at least 18 years old"
        );
        return false;
    }

    if (age > 100) {
        showError(
            error,
            group,
            "Please enter a valid age"
        );
        return false;
    }

    clearError(error, group);
    return true;
}


// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validatePassword() {

    const value = passwordInput.value;

    const error = document.getElementById("passwordError");
    const group = passwordInput.parentElement;

    if (value === "") {

        showError(
            error,
            group,
            "Password is required"
        );

        updatePasswordStrength("");

        return false;
    }

    if (value.length < 8) {

        showError(
            error,
            group,
            "Password must be at least 8 characters long"
        );

        updatePasswordStrength(value);

        return false;
    }

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!passwordPattern.test(value)) {

        showError(
            error,
            group,
            "Password must contain uppercase, lowercase, number and special character"
        );

        updatePasswordStrength(value);

        return false;
    }

    clearError(error, group);

    updatePasswordStrength(value);

    return true;
}


// ==========================================
// PASSWORD STRENGTH
// ==========================================

function updatePasswordStrength(password) {

    const strength =
        document.getElementById("passwordStrength");

    if (password === "") {

        strength.textContent = "";

        strength.classList.remove(
            "show",
            "weak",
            "medium",
            "strong"
        );

        return;
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    strength.classList.add("show");

    strength.classList.remove(
        "weak",
        "medium",
        "strong"
    );

    if (score <= 2) {

        strength.textContent = "⚠ Weak Password";
        strength.classList.add("weak");

    } else if (score <= 4) {

        strength.textContent = "⚠ Medium Password";
        strength.classList.add("medium");

    } else {

        strength.textContent = "✓ Strong Password";
        strength.classList.add("strong");
    }
}


// ==========================================
// CONFIRM PASSWORD
// ==========================================

function validateConfirmPassword() {

    const value = confirmPasswordInput.value;

    const error =
        document.getElementById("confirmPasswordError");

    const group =
        confirmPasswordInput.parentElement;

    if (value === "") {

        showError(
            error,
            group,
            "Please confirm your password"
        );

        return false;
    }

    if (value !== passwordInput.value) {

        showError(
            error,
            group,
            "Passwords do not match"
        );

        return false;
    }

    clearError(error, group);

    return true;
}


// ==========================================
// WEBSITE VALIDATION
// ==========================================

function validateWebsite() {

    const value = websiteInput.value.trim();

    const error =
        document.getElementById("websiteError");

    const group =
        websiteInput.parentElement;

    // Website is optional
    if (value === "") {

        clearError(error, group);

        return true;
    }

    try {

        const url = new URL(value);

        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            throw new Error();
        }

    } catch {

        showError(
            error,
            group,
            "Please enter a valid URL starting with http:// or https://"
        );

        return false;
    }

    clearError(error, group);

    return true;
}


// ==========================================
// GENDER VALIDATION
// ==========================================

function validateGender() {

    const error =
        document.getElementById("genderError");

    const genderGroup =
        genderInputs[0].closest(".form-group");

    const selected =
        Array.from(genderInputs).some(
            input => input.checked
        );

    if (!selected) {

        showError(
            error,
            genderGroup,
            "Please select a gender"
        );

        return false;
    }

    clearError(error, genderGroup);

    return true;
}


// ==========================================
// TERMS VALIDATION
// ==========================================

function validateTerms() {

    const error =
        document.getElementById("termsError");

    const group =
        termsCheckbox.closest(".form-group");

    if (!termsCheckbox.checked) {

        showError(
            error,
            group,
            "You must agree to the terms and conditions"
        );

        return false;
    }

    clearError(error, group);

    return true;
}


// ==========================================
// VALIDATE COMPLETE FORM
// ==========================================

function validateForm() {

    const nameValid = validateFullName();
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const ageValid = validateAge();
    const passwordValid = validatePassword();
    const confirmPasswordValid =
        validateConfirmPassword();
    const websiteValid = validateWebsite();
    const genderValid = validateGender();
    const termsValid = validateTerms();

    return (
        nameValid &&
        emailValid &&
        phoneValid &&
        ageValid &&
        passwordValid &&
        confirmPasswordValid &&
        websiteValid &&
        genderValid &&
        termsValid
    );
}


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (validateForm()) {

        form.style.display = "none";

        successMessage.classList.remove("hidden");

        console.log("Form submitted successfully!");

        console.log({
            fullName: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            age: ageInput.value,
            website: websiteInput.value,
            gender: Array.from(genderInputs)
                .find(input => input.checked)?.value,
            newsletter: newsletterCheckbox.checked
        });

        // Reset after 3 seconds
        setTimeout(function() {

            form.reset();

            form.style.display = "flex";

            successMessage.classList.add("hidden");

            document
                .querySelectorAll(".error-message")
                .forEach(function(error) {

                    error.textContent = "";
                    error.classList.remove("show");
                });

            document
                .querySelectorAll(".form-group")
                .forEach(function(group) {

                    group.classList.remove("error");
                });

            document
                .getElementById("passwordStrength")
                .classList.remove(
                    "show",
                    "weak",
                    "medium",
                    "strong"
                );

        }, 3000);
    }
});


// ==========================================
// REAL-TIME VALIDATION
// ==========================================

fullNameInput.addEventListener(
    "input",
    validateFullName
);

emailInput.addEventListener(
    "input",
    validateEmail
);

phoneInput.addEventListener(
    "input",
    validatePhone
);

ageInput.addEventListener(
    "input",
    validateAge
);

passwordInput.addEventListener(
    "input",
    validatePassword
);

confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);

websiteInput.addEventListener(
    "input",
    validateWebsite
);

genderInputs.forEach(function(input) {

    input.addEventListener(
        "change",
        validateGender
    );

});

termsCheckbox.addEventListener(
    "change",
    validateTerms
);


// ==========================================
// RESET FORM
// ==========================================

form.addEventListener("reset", function() {

    setTimeout(function() {

        document
            .querySelectorAll(".error-message")
            .forEach(function(error) {

                error.textContent = "";
                error.classList.remove("show");

            });

        document
            .querySelectorAll(".form-group")
            .forEach(function(group) {

                group.classList.remove("error");

            });

        const strength =
            document.getElementById("passwordStrength");

        strength.textContent = "";

        strength.classList.remove(
            "show",
            "weak",
            "medium",
            "strong"
        );

    }, 0);
});
```
