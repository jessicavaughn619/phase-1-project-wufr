// Sets toggle display to none
let addDog = false;

let allDogs = [];
let dogNum = 0;
let allFavoriteDogs = [];

document.addEventListener("DOMContentLoaded", function() {
    fetchDogs(dogUrl, allDogs);
    fetchDogs(favoriteDogUrl, allFavoriteDogs);
    setTimeout(() => {
        renderDog(allDogs, dogNum);
        renderFavoriteDogs(allFavoriteDogs)
    }, 5000)
});

// Initial get requests from dog API & db.json favorite dogs
const dogUrl = "https://dog.ceo/api/breeds/image/random/10";
const favoriteDogUrl = "http://localhost:3000/dogs";

function fetchDogs(url, arr) {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        let data;
        if (json.message === undefined) {
            data = json;
        } else {
            data = json.message;
        }
        makeDogArray(data, arr)
    })
    .catch(error => console.error(error))
};

function makeDogArray(json, arr) {
    for (item of json) {
        arr.push(item);
    };
};

function renderDog(dogs, num) {
    const main = document.getElementById("dog-card-container");
    const img = document.createElement("img");
    img.className = "dog-image";
    img.src = dogs[num];
    main.appendChild(img);
};

// Toggle favorites container
const favoritesBtn = document.getElementById("favorite-dog-button");
const dogFavoritesContainer = document.getElementById("dog-favorites-container");
    favoritesBtn.addEventListener("click", () => {
    addDog = !addDog;
    if (addDog) {
      dogFavoritesContainer.style.display = "block";
      favoritesBtn.innerHTML = "Hide Favorite Dogs";
    } else {
      dogFavoritesContainer.style.display = "none";
      favoritesBtn.innerHTML = "See Favorite Dogs";
    }
  });

// Post dog to favorite dogs
function saveDog(dog){
    fetch("http://localhost:3000/dogs", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "message": dog.src
    })
    })
    .then(res => res.json())
    .then(json => {
        allFavoriteDogs.push(json)
        renderFavoriteDogs(allFavoriteDogs)
    });
};

// Render favorite dogs in favorites container
function renderFavoriteDogs(dogs) {
    const favoriteDogContainer = document.getElementById("dog-favorites-container");
    dogs.forEach(dog => {
        const favoriteImg = document.createElement("img");
        favoriteImg.className = "favorite-dog-image";
        favoriteImg.id = `${dog.id}`;
        favoriteImg.src = dog.message;
        favoriteImg.addEventListener("click", removeDog);
        favoriteDogContainer.appendChild(favoriteImg); 
    });
};

// Listen for left or right arrow
document.addEventListener("keydown", function(event) {
    dogEvent(event.key);
});

function handleDogSwipe() {
    let selectedDog = document.getElementsByClassName("dog-image")[0];
    if (dogNum < 9) {
        selectedDog.remove();
        dogNum++;
        renderDog(allDogs, dogNum);
    } else {
        selectedDog.remove();
        fetchDogs();
        dogNum = 0;
        setTimeout(() => {renderDog(allDogs, dogNum)}, 2000);
    };
};

function dogEvent(key) {
    let selectedDog = document.getElementsByClassName("dog-image")[0];
    switch (key) {
        case "ArrowLeft":
            handleDogSwipe();
            break;
        case "ArrowRight":
            saveDog(selectedDog);
            allFavoriteDogs = [];
            handleDogSwipe();
            { addDog ? null : favoritesBtn.click()};
            break;
        default: console.log();
    };  
};

// Delete dog from favorites
function removeDog(event) {
    let rejectedDog = document.getElementById(event.target.id);
    fetch(`http://localhost:3000/dogs/${event.target.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json());
    rejectedDog.remove();
};

