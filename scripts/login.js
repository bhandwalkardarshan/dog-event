const baseUrl = "https://reqres.in/api/login"
const form = document.getElementById("admin-login")
var token = localStorage.getItem('adminToken')||null;

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    
    fetch(`${baseUrl}`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((data) => {
        localStorage.setItem('adminToken', data.token);
        console.log(data.token)
        token = localStorage.getItem('adminToken')
        window.location.href = "dashboard.html"
    })
    .catch((err)=>{
        console.error(`Error : ${err}`)
    })
})



const dashboardLink = document.querySelector('nav ul li:nth-child(2) a');
const reportsLink = document.querySelector('nav ul li:nth-child(3) a');

// Check if the token exists
if (token) {
  dashboardLink.href = 'dashboard.html'; 
  reportsLink.href = 'reports.html'; 
} else {
  dashboardLink.href = '#'; 
  reportsLink.href = '#'; 
}
