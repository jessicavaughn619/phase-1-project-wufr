// Sets toggle display to none
let addDog = false;
let allDogs = [];
let dogNum = 0;

document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
    setTimeout(() => {renderDog(allDogs, dogNum)}, 5000);
});

// Initial get request from dog API
const dogUrl = "https://dog.ceo/api/breeds/image/random/10";

function fetchDogs() {
    fetch(dogUrl)
    .then(res => res.json())
    .then(json => makeDogArray(json.message))
};

function makeDogArray(json) {
    for (item of json) {
        allDogs.push(item);
    };
};

function renderDog(dogs, num) {
    const main = document.getElementById("dog-card-container");
    const img = document.createElement("img");
    img.className = "dog-image";
    img.src = dogs[num];
    img.style.width = "auto"
    img.style.height = "400px";
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
function saveDog(favoriteDog){
    console.log(favoriteDog);
    fetch("http://localhost:3000/dogs", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "message": favoriteDog.src,
      "rating": 0
    })
    })
    .then(res => res.json())
    };

// Listen for left or right arrow
document.addEventListener("keydown", function(event) {
    dogEvent(event.key);
});

function dogEvent(key) {
    switch (key) {
            case "ArrowLeft":
                let rejectedDog = document.getElementsByClassName("dog-image")[0];
                if (dogNum < 9) {
                rejectedDog.remove();
                dogNum++;
                renderDog(allDogs, dogNum);
                } else {
                    rejectedDog.remove();
                    fetchDogs();
                    dogNum = 0;
                    setTimeout(() => {renderDog(allDogs, dogNum)}, 5000);
                };
                break;
            case "ArrowRight":
                let favoriteDog = document.getElementsByClassName("dog-image")[0];
                saveDog(favoriteDog);
                break;
            default: console.log();
        };  
};
