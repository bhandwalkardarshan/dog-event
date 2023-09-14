const baseUrl = "https://mock-json-server-fjun.onrender.com"
const form = document.getElementById("dog-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const dogData = {
        name: document.getElementById("breed").value,
        age: document.getElementById("age").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        place: document.getElementById("place").value,
    }
    
    fetch(`${baseUrl}/dogs`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogData)
    })
    .then((res)=> res.json())
    .then((data) => {
        console.log("Dog registered" ,data)
        alert("Dog registered Successfully")
        form.reset()
    })
    .catch((err)=>{
        console.error(`Error while registering the Dog ${err}`)
    })
})