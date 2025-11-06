let authorLinks = document.querySelectorAll(".authors");
for (authorLink of authorLinks) {
    authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo() {
    var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
    myModal.show();
    let url = `/api/authors/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data); 
    let authorInfo = document.querySelector("#authorInfo");
    authorInfo.innerHTML = `<h1> ${data[0].firstName} ${data[0].lastName} </h1>`;
    authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"><br>`;
    authorInfo.innerHTML += `${data[0].biography}<br><br>`;
    authorInfo.innerHTML += `<strong>Country:</strong> ${data[0].country}<br>`;
    let dob = new Date(data[0].dob);
    let dod = new Date(data[0].dod);
    authorInfo.innerHTML += `<strong>Date of Birth:</strong> ${dob.toDateString()}<br>`;
    authorInfo.innerHTML += `<strong>Date of Death:</strong> ${dod.toDateString()}<br>`;
    authorInfo.innerHTML += `<strong>Profession:</strong> ${data[0].profession}<br>`;
    authorInfo.innerHTML += `<strong>Sex:</strong> ${data[0].sex}<br>`;
}