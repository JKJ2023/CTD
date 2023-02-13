let buttons = document.getElementsByTagName("button");
let url = "";

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
        console.log(e.target.id)
        switch (e.target.id) {
            case "peopleButton":
                getapi('https://swapi.dev/api/people/');
                break;
            default: "filmButton"
                getapi('https://swapi.dev/api/films/');
        }
    })
}

// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    //  Storing data in form of JSON
    var data = await response.json();
    //  console.log('data:', data);
    if (url.includes('people')) {
        showPeople(data);
    }

}

// Function to define innerHTML for HTML Unordered list
function showPeople(data) {
    let tab = `<ul></ul>`;
    // Loop thru array of objects to format specific data into the list
    for (let i = 0; i < data.results.length; i++) {
        // logic to label empty arrays as "Unknown" rather than undefined

        // for(let i = 0; i < (r.films).length; i++){
        //     console.log(r.films[i].title);
        // }
        tab += `
            <li>Name: ${data.results[i].name}</li>
            <li>Hair Color: ${data.results[i].hair_color}</li> 
            <li>Eye Color: ${data.results[i].eye_color}</li> 
            <li>DOB: ${data.results[i].birth_year}</li>`
    if (data.results[i].films.length > 0){
        for(let i = 0; i < data.results[i].length; i++){
            tab += `<li>${data.results[i].title}`
        
        }
    }
            <li>Films: ${data.results[i].films} </li>
            <hr>

    }
    // Setting innerHTML as tab variable
    document.getElementById("people").innerHTML = tab;
}  