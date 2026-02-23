function showMessage(message, type = "success") {
    const box = $('#message-box');
    box.text(message);

    if (type === "success"){
        box.css ({
            'background-color': '#2E8B57',
            'color': 'white'
        });
    }
    else if(type === "error"){
        box.css ({
            'background-color': '#DC143C',
            'color': 'white'
        });
    }

    box.show();    

    setTimeout(() => box.fadeOut(), 10000)
}