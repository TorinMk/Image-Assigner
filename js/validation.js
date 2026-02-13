function validateForm() {
    let email = document.forms["emailForm"]["email"].value.trim();

    // Empty check
    if (email == "") {
        alert("Please fill out the form");
        return false;
    }

    // Email format check
    // Regular expression
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Tests email against regex pattern
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return false;
    }

    return true;
}