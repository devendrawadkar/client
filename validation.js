const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const website = document.getElementById("website");

const successMessage = document.getElementById("successMessage");

function error(id, message) {
    const element = document.getElementById(id);
    element.textContent = message;
    element.classList.add("show");
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(function (element) {
        element.textContent = "";
        element.classList.remove("show");
    });

    document.querySelectorAll(".form-group").forEach(function (group) {
        group.classList.remove("error");
    });
}

function validateForm() {

    clearErrors();

    let valid = true;

    // Full Name
    if (fullName.value.trim().length < 3) {
        error("fullNameError", "Please enter a valid name.");
        fullName.parentElement.classList.add("error");
        valid = false;
    }

    // Email
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        error("emailError", "Please enter a valid email address.");
        email.parentElement.classList.add("error");
        valid = false;
    }

    // Phone
    const phonePattern = /^[0-9]{10,15}$/;

    if (!phonePattern.test(phone.value.replace(/\D/g, ""))) {
        error("phoneError", "Please enter a valid phone number.");
        phone.parentElement.classList.add("error");
        valid = false;
    }

    // Age
    if (age.value < 18 || age.value > 100) {
        error("ageError", "Age must be between 18 and 100.");
        age.parentElement.classList.add("error");
        valid = false;
    }

    // Password
    if (password.value.length < 8) {
        error(
            "passwordError",
            "Password must contain at least 8 characters."
        );

        password.parentElement.classList.add("error");

        valid = false;
    }

    // Confirm Password
    if (confirmPassword.value !== password.value) {
        error(
            "confirmPasswordError",
            "Passwords do not match."
        );

        confirmPassword.parentElement.classList.add("error");

        valid = false;
    }

    // Website
    if (website.value.trim() !== "") {
        try {
            new URL(website.value);
        } catch {
            error(
                "websiteError",
                "Please enter a valid website URL."
            );

            website.parentElement.classList.add("error");

            valid = false;
        }
    }

    // Gender
    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    if (!gender) {
        error(
            "genderError",
            "Please select your gender."
        );

        valid = false;
    }

    // Terms
    const terms =
        document.getElementById("terms");

    if (!terms.checked) {
        error(
            "termsError",
            "You must accept the Terms and Conditions."
        );

        valid = false;
    }

    return valid;
}


// Submit

form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (validateForm()) {

        form.style.display = "none";

        successMessage.classList.remove("hidden");

    }
});


// Password strength

password.addEventListener("input", function () {

    const strength =
        document.getElementById("passwordStrength");

    const value = password.value;

    strength.classList.remove(
        "show",
        "weak",
        "medium",
        "strong"
    );

    if (value.length === 0) {
        return;
    }

    strength.classList.add("show");

    if (value.length < 8) {

        strength.textContent = "Weak Password";
        strength.classList.add("weak");

    } else if (value.length < 12) {

        strength.textContent = "Medium Password";
        strength.classList.add("medium");

    } else {

        strength.textContent = "Strong Password";
        strength.classList.add("strong");
    }
});


// Reset

form.addEventListener("reset", function () {

    setTimeout(function () {

        clearErrors();

        form.style.display = "flex";

        successMessage.classList.add("hidden");

        document.getElementById(
            "passwordStrength"
        ).className = "password-strength";

    }, 10);
});
