document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const dob = document.getElementById('dob');

    const errorMessages = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
        confirmPassword: document.getElementById('confirmPasswordError'),
        dob: document.getElementById('dobError'),
    };

    function validateFirstName() {
        if (firstName.value.trim() === '') {
            firstName.classList.add('is-invalid');
            errorMessages.firstName.textContent = 'First name is required.';
        } else {
            firstName.classList.remove('is-invalid');
            firstName.classList.add('is-valid');
            errorMessages.firstName.textContent = '';
        }
    }

    function validateLastName() {
        if (lastName.value.trim() === '') {
            lastName.classList.add('is-invalid');
            errorMessages.lastName.textContent = 'Last name is required.';
        } else {
            lastName.classList.remove('is-invalid');
            lastName.classList.add('is-valid');
            errorMessages.lastName.textContent = '';
        }
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            email.classList.add('is-invalid');
            errorMessages.email.textContent = 'Invalid email format.';
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            errorMessages.email.textContent = '';
        }
    }

    function validatePassword() {
        if (password.value.length < 8) {
            password.classList.add('is-invalid');
            errorMessages.password.textContent = 'Password must be at least 8 characters long.';
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
            errorMessages.password.textContent = '';
        }
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value) {
            confirmPassword.classList.add('is-invalid');
            errorMessages.confirmPassword.textContent = 'Passwords do not match.';
        } else {
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid');
            errorMessages.confirmPassword.textContent = '';
        }
    }

    function validateDob() {
        const dobValue = new Date(dob.value);
        const today = new Date();
        let age = today.getFullYear() - dobValue.getFullYear();
        const m = today.getMonth() - dobValue.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dobValue.getDate())) {
            age--;
        }

        if (age < 18) {
            dob.classList.add('is-invalid');
            errorMessages.dob.textContent = 'You must be at least 18 years old.';
            submitBtn.disabled = true;
        } else {
            dob.classList.remove('is-invalid');
            dob.classList.add('is-valid');
            errorMessages.dob.textContent = '';
            submitBtn.disabled = false;
        }
    }

    function validateForm() {
        validateFirstName();
        validateLastName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateDob();
    }

    firstName.addEventListener('input', validateFirstName);
    lastName.addEventListener('input', validateLastName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', () => {
        validatePassword();
        validateConfirmPassword();
    });
    confirmPassword.addEventListener('input', validateConfirmPassword);
    dob.addEventListener('change', validateDob);

    form.addEventListener('submit', (e) => {
        validateForm();
        alert("form submitted");
        if (!form.checkValidity() || submitBtn.disabled) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add('was-validated');
        }
    });
});