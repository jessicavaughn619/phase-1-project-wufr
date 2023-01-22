document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
});

const dogUrl = "https://dog.ceo/api/breeds/image/random";

function fetchDogs() {
    fetch(dogUrl)
    .then(res => res.json())
    .then(json => renderDogs(json))
};

function renderDogs(dogs) {
    let allDogs = dogs.message;
    console.log(allDogs)
    const main = document.getElementById("dog-card-container");
    const img = document.createElement("img");
    img.className = "dog-image";
    img.src = allDogs;
    img.style.width = "400px"
    img.style.heigh = "auto";
    main.appendChild(img);
};

// function renderDog(dogs) {
//     const dogArray = dogs.message;
//     const dogCards = document.getElementById("dog-card-container");
//     dogArray.forEach(dog => {
//     const card = document.createElement("div");
//     card.src = dog;
//     card.className = "card";
//     dogCards.appendChild(card);
//     });
// };

