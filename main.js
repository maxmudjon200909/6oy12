const box = document.querySelector("#list");
const pokeForm = document.querySelector("#form");
const pokeSearch = document.querySelector("#input");
const select = document.querySelector("#select");


function renderPokemons(poke) {
  const list = document.getElementById("list");
  list.innerHTML = ""; 
  poke.forEach(item => {
    const newItem = document.createElement("div");
    newItem.className = "bg-[#333333] p-5 w-[300px] rounded flex flex-col items-center justify-center gap-[5px]";

    const title = item.Title || item.title || "No title";
    newItem.innerHTML = `
      <img src="./img/d359170a592b38e2ff57b90e7ea7a66fa32e241a (2).jpg" alt="${title}" class="w-24 h-24 object-cover rounded"/>
      <h2 class="text-lg font-bold text-center text-white">${title}</h2> 
      <span class="text-gray-400">Year: ${item.movie_year || "—"}</span>
      <span class="text-gray-400">Rating: ${item.imdb_rating || "—"}</span>
    `;
    list.append(newItem);
  });
}


if (typeof movies !== "undefined" && Array.isArray(movies)) {
  renderPokemons(movies);
} else {
  console.error("movies massivi topilmadi yoki noto'g'ri formatda. Konsolga movies ni tekshiring.");
}


const error = document.createElement("h1");

pokeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = (pokeSearch.value || "").toLowerCase().trim();


  let filterMovies = (movies || []).filter(item =>
    (item.Title || item.title || "").toString().toLowerCase().includes(inputValue)
  );


  if (select.value === "A-Z") {
    filterMovies.sort((a, b) => ( (a.Title || a.Title || "") .toString().localeCompare((b.Title || b.Title || "").toString()) ));
  } else if (select.value === "Z-A") {
    filterMovies.sort((a, b) => ( (b.Title || b.Title || "") .toString().localeCompare((a.Title || a.Title || "").toString()) ));
  }


  console.log("Qidiruv:", inputValue);
  console.log("Natija soni:", filterMovies.length);

  box.innerHTML = "";
  error.remove();

  if (filterMovies.length === 0) {
    error.textContent = "Unaka filem yo'q mazgi 🤦‍♂️";
    error.className = "text-red-500 text-xl font-bold mt-5";
    document.body.append(error);
  } else {
    renderPokemons(filterMovies);
  }

  pokeSearch.value = "";
});
