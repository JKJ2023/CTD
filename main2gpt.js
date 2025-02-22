(() => {
  const buttons = document.getElementsByTagName("button");

  Array.from(buttons).forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

  async function handleButtonClick(event) {
    const buttonId = event.target.id;
    console.log(buttonId);

    let url = '';
    switch (buttonId) {
      case "peopleButton":
        url = 'https://swapi.dev/api/people/';
        break;
      case "filmButton":
        url = 'https://swapi.dev/api/films/';
        break;
      default:
        console.error("Unknown button ID");
        return;
    }

    try {
      await getapi(url);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  async function getapi(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (url.includes('people')) {
        showPeople(data);
      } else {
        showFilms(data); // Assuming you have a similar function for films
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function showPeople(data) {
    let tab = `<ul>`;
    data.results.forEach(person => {
      tab += `
        <li>Name: ${person.name}</li>
        <li>Hair Color: ${person.hair_color}</li>
        <li>Eye Color: ${person.eye_color}</li>
        <li>DOB: ${person.birth_year}</li>
        <li>Films: ${person.films.length > 0 ? person.films.map(film => `<span>${film}</span>`).join(', ') : 'None'}</li>
        <hr>
      `;
    });
    tab += `</ul>`;
    document.getElementById("people").innerHTML = tab;
  }
})();
