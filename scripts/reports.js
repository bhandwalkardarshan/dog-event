const baseUrl = "https://mock-json-server-fjun.onrender.com"

const reportTable = document.getElementById("reportTable")
let totalDogs = 0
let maleDogs = 0
let femaleDogs = 0
let avgAgeDogs = 0

fetch(`${baseUrl}/dogs`)
.then((res)=>res.json())
.then(data => {
    console.log(data)
    calculations(data)
})
.catch((err)=>{
    console.log("error", err);  
})

function calculations(data){
    totalDogs = data.length
    femaleDogs = data.filter((dog) => dog.gender === "Female").length
    maleDogs = data.filter((dog) => dog.gender === "Male").length

    let totalage=0
    for(let i=0;i<data.length;i++){
        totalage += +data[i].age
        // console.log(data[i].age,totalage)
    }

    avgAgeDogs = totalage/totalDogs

    displayReport(totalDogs,femaleDogs,maleDogs,avgAgeDogs)
}

function displayReport(totalDogs,femaleDogs,maleDogs,avgAgeDogs){
    const reportRow = document.createElement("tr")
    reportRow.innerHTML = `
        <td>${totalDogs}</td>
        <td>${femaleDogs}</td>
        <td>${maleDogs}</td>
        <td>${avgAgeDogs.toFixed(2)}</td>
    `
    reportTable.appendChild(reportRow);
}

