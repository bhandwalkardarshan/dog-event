const baseUrl = "https://mock-json-server-fjun.onrender.com"
let cardContainer = document.querySelector(".dog-card-container")
let sortInput = document.getElementById("sortSelect")
let genderInput = document.getElementById("genderSelect")
let searchButton = document.getElementById("searchButton")
let searchInput = document.getElementById("searchInput")

fetchDogs()

sortInput.addEventListener("change", (e) => {
    let val = e.target.value
    console.log(val)
    fetch(`${baseUrl}/dogs?_sort=age&_order=${val}`)
    .then((res)=>res.json())
    .then(data => {
        console.log(data)
        renderDogCards(data)
    })
    .catch((err)=>{
        console.log("error", err);  
    })
})

genderInput.addEventListener("change", (e) => {
    let val = e.target.value
    console.log(val)
    fetch(`${baseUrl}/dogs?gender=${val}`)
    .then((res)=>res.json())
    .then(data => {
        console.log(data)
        renderDogCards(data)
    })
    .catch((err)=>{
        console.log("error", err);  
    })
})

searchButton.addEventListener("click",() => {
    const val = searchInput.value.trim()
    
    fetch(`${baseUrl}/dogs?q=${val}`)
    .then((res)=>res.json())
    .then(data => {
        console.log(data)
        renderDogCards(data)
    })
    .catch((err)=>{
        console.log("error", err);  
    })
})

function fetchDogs(){
    fetch(`${baseUrl}/dogs`)
    .then((res)=>res.json())
    .then(data => {
        renderDogCards(data)
    })
    .catch((err)=>{
        console.log("error", err);  
    })
}


function renderDogCards(dogs){
    cardContainer.innerHTML = ''
    for (var i= 0;i< dogs.length ; i++){
        let card = createDogCard(dogs[i])
        cardContainer.appendChild(card)
    }
}

function createDogCard(dog){
// https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    let card = document.createElement("div")
    card.classList.add('dog-card')
    card.innerHTML = `
    <img src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Dog Image">
    <h3>${dog.name}</h3>
    <p>Age: ${dog.age}</p>
    <p>Gender: ${dog.gender}</p>
    <p>Place: ${dog.place}</p>
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;
  
  const editButton = card.querySelector('.edit-button');
  const deleteButton = card.querySelector('.delete-button');
  editButton.addEventListener('click', () => handleEditDog(dog.id));
  deleteButton.addEventListener('click', () => handleDeleteDog(dog.id));
  return card;
}

function handleDeleteDog(id){
    fetch(`${baseUrl}/dogs/${id}`, {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res)=> res.json())
    .then((data) => {
        console.log("Dog Deleted" ,data)
        alert("Dog Deleted Successfully")
        fetchDogs()
    })
    .catch((err)=>{
        console.error(`Error while deleting the Dog ${err}`)
    })
}

function handleEditDog(dogId){
    console.log(dogId)
    window.location=`./edit_dog.html?id=${dogId}`
}