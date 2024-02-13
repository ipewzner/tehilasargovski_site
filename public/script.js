const submitForm = () => {
    // Get input values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Prepare data for API request
    const data = new FormData();
    data.append('lastname', name);
    data.append('mobile', phone);
    data.append('email', email);
    //data.append('publicid', process.env.PUBLIC_ID); // Add publicid to form data

    // Create fetch options
    const options = {
        method: 'POST',
        body: data
    };

    // Simulate API request (replace with actual API call)
    console.log("-> Sending data to API: ");
    for (let entry of data.entries()) {
        console.log(entry[0] + ': ' + entry[1]);
    }
    console.log("---------");

    sendData(options)
    // Reset form after submission (optional)
    //document.getElementById('myForm').reset();
    //window.location.href = "https://www.cnn.com";
    openPopup()

}

function receiveData(indata) {

    console.log("Recived data from API:", indata);

    const data = new FormData();
    data.append('lastname', 'name');
    data.append('mobile', 'phone');
    data.append('email', 'email');
    data.append('publicid', process.env.PUBLIC_ID); // Add publicid to form data


    // Create fetch options
    const options = {
        method: 'POST',
        body: data
    };

    console.log("Sending data to API:");
    for (let entry of data.entries()) {
        console.log(entry[0] + ': ' + entry[1]);
    }
    console.log("---------");

    sendData(options)

}

// Enable submit button only if all fields are not empty
/*
function updateSubmitButton() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !(name && phone && email);
}
*/
function updateSubmitButton() { }


// Attach the updateSubmitButton function to input events
document.getElementById('name').addEventListener('input', updateSubmitButton);
document.getElementById('phone').addEventListener('input', updateSubmitButton);
document.getElementById('email').addEventListener('input', updateSubmitButton);

const menuList = document.getElementById('menuList');
menuList.style.maxWidth = "0px"; // Change from "maxHeight" to "maxWidth"


function sendData(options) {
    //fetch('https://netanel2.scallacrm.co.il/modules/Webforms/capture.php', options)
    // fetch('http://localhost:3000', options) 
    fetch('https://www.tehilasargovski.com/', options)
        .then(response => {
            console.log('s1');
            if (!response.ok) { throw new Error('Network response was not ok'); }
            console.log('s2');
            return response.json();
            console.log('s3');
        })
        .then(data => {
            console.log('s4');
            console.log('Data sent successfully:', data);
            // If you need to reset the form after submission, you can uncomment the following line
            // document.getElementById('myForm').reset();
            // If you need to redirect after submission, you can use window.location.href
            // window.location.href = "https://www.cnn.com";
            openPopup();
        })
        .catch(error => {
            console.log('s5');
            console.error('Error sending data:', error);
            console.log('s6');
        });
}

function togglemenu() {
    if (menuList.style.maxWidth == "0px") { // Change from "maxHeight" to "maxWidth"
        menuList.style.maxWidth = "200px"; // Change from "maxHeight" to "maxWidth"
    } else {
        menuList.style.maxWidth = "0px"; // Change from "maxHeight" to "maxWidth"
    }
}

function openPopup() {
    document.getElementById('popup-container').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}