// Wait till page is fully  loaded
$(document).ready(function () {

    // Click event listener
    $('#imageGenerator').on('click', function () {
        const email = localStorage.getItem('userEmail');
        const query = $('#search').val().trim();

        // If no email stops program
        if (!email) {
            alert("Please submit an email!")
            return;
        }
        // If search query is empty stop program
        if (query === "") {
            alert("Please enter a search!")
            return;
        }

        generateImage(query, email)
    });
});

function generateImage(query, email) {
    const accessKey = 'oPGqjh7ugOIO2BnXu0o0sBnPqvD3sDnviElQBZSOqlI'; // remove in github

    // Using AJAX to request the Unsplash API
    $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        method: 'GET',
        data: {
            query: query,   // Search keyword
            client_id: accessKey
        },

        // If API call is successfull
        success: function(data)  {
            const imageUrl = data.urls.regular; // Extracts image URL
            const photographer  = data.user.name;   // Gets photographer name
            const profileLink = data.user.links.html;   // Gets photographers link

            // Saves user's email and the imageUrl
            saveImage(email, imageUrl);

            $('#image-container').html(`
                <br>
                <img src="${imageUrl}" alt="Unsplash Image">
                <p>
                    Photo by <a href="${profileLink}" target="_blank">
                    ${photographer}</a> on Unsplash
                </p>
                `);
        },
        
        // Runs if API call fails
        error: function () {
            alert('Something failed!')
        }
    })
}