// Waits till page is fully loaded
$(document).ready(function () {
    $('form[name="emailForm"]').on('submit', function (e) {
        e.preventDefault();

        // if false stops function
        if (!validateForm()) {
            return;
        }

        // Grabs email and removes any extra spaces
        let email = document.forms["emailForm"]["email"].value.trim();

        // Saves email in the browser
        localStorage.setItem('userEmail', email)

        console.log("Email has been saved: ", email);
        alert("Email saved successfully")
    });
});

function saveImage(email, imageUrl) {
    
    // Gets images from localStorage
    const images = JSON.parse(localStorage.getItem('images')) || [];

    // Adds new image
    images.push({
        email: email,   
        imageUrl: imageUrl, 
        savedAt: new Date().toISOString() // Saves time when image was saved
    });

    
    localStorage.setItem('images', JSON.stringify(images));

    console.log("Image saved for:", email);
}