function validateForm() {
    let email = document.forms["emailForm"]["email"].value.trim();

    // Empty check
    if (email == "") {
        showMessage("Please fill out the email", "error");
        return false;
    }

    // Email format check
    // Regular expression
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Tests email against regex pattern
    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email!", "error")
        return false;
    }

    return true;
}