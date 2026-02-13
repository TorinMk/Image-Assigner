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
        displaySavedImages(email);

    });
});

$('#save-image').on('click', function () {
    const email = localStorage.getItem('userEmail');

    if (!email) {
        alert("Please submit an email first!")
        return
    }
    if (!currentImageUrl) {
        alert("Please generate an image first!");
        return;
    }

    saveImage(email, currentImageUrl);
    alert("Image saved");

    displaySavedImages(email)
})

function saveImage(email, imageUrl) {
    
    // Gets images from localStorage
    const images = JSON.parse(localStorage.getItem('images')) || [];

    // Stops duplicate images from generating
    const exists = images.some(img => img.email === email && img.imageUrl === imageUrl);
    if (exists) return;

    // Adds new image
    images.push({
        email: email,   
        imageUrl: imageUrl, 
        savedAt: new Date().toISOString() // Saves time when image was saved
    });

    
    localStorage.setItem('images', JSON.stringify(images));

    console.log("Image saved for:", email);
}

function displaySavedImages(email) {
    const container = $('#image-list');
    container.html("")
    
    const images = JSON.parse(localStorage.getItem('images')) || [];

    const filtered = images.filter(img => img.email === email);

    if (filtered.length === 0) {
        container.html(`<p>You have no saved images at the moment!</p>`);
        return
    }

    filtered.forEach(img => {
        container.append(`
            <img src="${img.imageUrl}" width="200">
            `);
    });
}