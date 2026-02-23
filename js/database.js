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
        showMessage("Email saved successfully!", "success")
        displaySavedImages(email);

    });
});

$('#save-image').on('click', function () {
    const email = localStorage.getItem('userEmail');

    if (!email) {
        showMessage("Please submit an email first!", "error")
        return
    }
    if (!currentImageUrl) {
        showMessage("Please generate an image first!", "error");
        return;
    }

    const alreadySaved = saveImage(email, currentImageUrl, currentImageId);

    if (alreadySaved) {
        showMessage("Image saved successfully", "success")
    }

    displaySavedImages(email)
})

function saveImage(email, imageUrl, imageId) {
    
    // Gets images from localStorage
    const images = JSON.parse(localStorage.getItem('images')) || [];

    // Stops duplicate images from generating
    const exists = images.some(img => img.email === email && img.imageId === imageId);
    if (exists) {
        showMessage("You have already saved this image!", "error");
        return false;
    }

    // Adds new image
    images.push({
        email: email,   
        imageUrl: imageUrl, 
        imageId: imageId,
        savedAt: new Date().toISOString() // Saves time when image was saved
    });

    
    localStorage.setItem('images', JSON.stringify(images));

    console.log("Image saved for:", email);

    return true;
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