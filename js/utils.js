function getUserEmail() {
    const email = localStorage.getItem('userEmail');

    if (!email) {
        showMessage("Please enter and submit your email first!", "error");
        return null;
    }

    return email;
}