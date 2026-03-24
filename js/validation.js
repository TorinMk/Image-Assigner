function validateForm() {
    let email = document.forms["emailForm"]["email"].value.trim();

    if (email === "") {
        showMessage("Please enter your email address", "error");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address (e.g. name@example.com)", "error");
        return false;
    }

    return true;
}