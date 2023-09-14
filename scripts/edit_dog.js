const baseUrl = "https://mock-json-server-fjun.onrender.com"

function getQueryParameter(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

// Retrieve the 'id' parameter from the URL
const id = getQueryParameter('id');

if (id !== null) {
    // You can use the 'id' value for further processing
    console.log(`ID from URL: ${id}`);
} else {
    console.error('ID parameter not found in the URL');
}
fetchDogData(id);


function fetchDogData(id) {
    fetch(`${baseUrl}/dogs/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        showDogData(data);
    })
    .catch(error => {
        console.error('Error fetching dog data:', error);
    });
}


function showDogData(dogData) {
    const name = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const genderInput = document.querySelector('input[name="gender"][value="' + dogData.gender + '"]');
    const placeInput = document.getElementById('place');

    // Populate form fields with data from the dogData object
    name.value = dogData.name;
    ageInput.value = dogData.age;
    genderInput.checked = true; 
    placeInput.value = dogData.place;
}

// Function to update dog data
document.getElementById("dog-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);

    const dogData = {};
    formData.forEach((value, key) => {
        dogData[key] = value;
    });

   
    fetch(`${baseUrl}/dogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Dog data has been updated');
        window.location.href = 'dashboard.html';
    });
});



