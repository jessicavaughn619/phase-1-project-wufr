// Sets toggle display to none
let addDog = false;

document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
});

// Initial get request from dog API
const dogUrl = "https://dog.ceo/api/breeds/image/random/50";

function fetchDogs() {
    fetch(dogUrl)
    .then(res => res.json())
    .then(json => renderDog(json))
};

function renderDog(dogs) {
    let allDogs = dogs.message;
    const main = document.getElementById("dog-card-container");
    const img = document.createElement("img");
    img.className = "dog-image";
    img.src = allDogs[0];
    img.style.width = "400px"
    img.style.heigh = "auto";
    main.appendChild(img);
};

// Toggle favorites container
const favoritesBtn = document.getElementById("favorite-dog-button");
const dogFavoritesContainer = document.getElementById("dog-favorites-container");
  favoritesBtn.addEventListener("click", () => {
    addDog = !addDog;
    if (addDog) {
      dogFavoritesContainer.style.display = "block";
    } else {
      dogFavoritesContainer.style.display = "none";
    }
  });

// Post request
function saveDog() {

};

// Listen for left or right arrow
$(dogCardContainer).on("swipeleft", function() {
    console.log("Next dog please")
});

$(dogCardContainer).on("swiperight", function() {
    console.log("Save this dog")
});

// function dogEvent(key) {
//     switch (key) {
//             case "ArrowLeft":
//                 console.log("Pressed left arrow!")
//                 break;
            
//             case "ArrowRight":
//                 console.log("Pressed right arrow!")
//                 saveDog();
//                 break;

//             default: console.log();
//         }  
// }
