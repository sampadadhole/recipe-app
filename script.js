// const recipeName = document.querySelector(".search-control");
const srchbtn = document.getElementById("search-btn");
const mealList = document.querySelector("#meal");
const recipeModalButton = document.querySelector(".recipe-modal-button");
const closeBtn = document.getElementById("recipe-close-btn");
const getRecipebtn = document.querySelector(".Get-recipe-btn");
const recipeDetail = document.querySelector(".meal-details-content");

srchbtn.addEventListener("click", handleClick);

function handleClick() {
  let searchtxt = document.getElementById("search-input").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (searchtxt) {
        html += `<h7>Your search Results:</h7>`;
      }

      //  console.log(data.meals);
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          
          <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food" />
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href=" " class="Get-recipe-btn">Get Recipe</a>
              </div>
            </div>`;
        });
      } else {
        html = `<h8>No recipe found</h8>`;
      }
      mealList.innerHTML = html;


    });
}

mealList.addEventListener("click", getMealRecipe);

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("Get-recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;

    
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {

        const mealData = data.meals[0];
        let html = `
        <h2>${mealData.strMeal}</h2>
        <p class="recipe-category"> ${mealData.strCategory}</p>
        <div class="recipe-instruct">
          <h5>Instructions</h5>
          <p>${mealData.strInstructions}</p>
        </div>
          <img class="recipe-meal-img" src="${mealData.strMealThumb}" />
        <div class="recipe-link">
          <a href="${mealData.strYoutube}" target="_blank">Watch Video</a>
        </div>
      </div>`;
        recipeDetail.innerHTML = html;
        console.log('here');
        recipeDetail.parentElement.style.display='block';

      });
  }
}

  closeBtn.addEventListener("click", () => {

    recipeDetail.parentElement.style.display='none';
  });


