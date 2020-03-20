// const baseEndpoint = 'http://www.recipepuppy.com/api';
// const proxy = `https://cors-anywhere.herokuapp.com/`;
// const form = document.querySelector('form.search');
// const recipesGrid = document.querySelector('.recipes');

// async function fetchRecipes(query) {
//   const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
//   const data = await res.json();
//   return data;
// }

// async function handleSubmit(event) {
//   event.preventDefault();
//   const el = event.currentTarget;
//   console.log(form.query.value);
//   fetchAndDisplay(form.query.value);
// }

// async function fetchAndDisplay(query) {
//   // turn the form off
//   form.submit.disabled = true;
//   // submit the search
//   const recipes = await fetchRecipes(query);
//   console.log(recipes);
//   form.submit.disabled = false;
//   displayRecipes(recipes.results);
// }

// function displayRecipes(recipes) {
//   console.log('Creating HTML');
//   const html = recipes.map(
//     recipe => `<div class="recipe">
//       <h2>${recipe.title}</h2>
//       <p>${recipe.ingredients}</p>
//       ${recipe.thumbnail &&
//         `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
//       <a href="${recipe.href}">View Recipe →</a>
//     </div>`
//   );
//   recipesGrid.innerHTML = html.join('');
// }

// form.addEventListener('submit', handleSubmit);
// // on page load run it with pizza
// fetchAndDisplay('pizza');
const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = 'https://cors-anywhere.herokuapp.com';
const formEl = document.querySelector('form.search');
const recipeEl = document.querySelector('.recipes');
const ingredientEl = document.querySelector('.ingredients');
const allIngredients = ['onions', 'garlic', 'omelet'];
let searchIngre = [];

async function fetchRecipes(query) {
  const response = await fetch(`${proxy}/${baseEndpoint}/?q=${query}`);
  const data = await response.json();
  return data;
}
function displayRecipes(recipes) {
  const html = recipes.map(
    recipe => `<div class='recipe'>
    <h2> ${recipe.title}</h2>
    <p>${recipe.ingredients}</p>
    ${recipe.thumbnail && `<img src=${recipe.thumbnail} alt=${recipe.title}>`}
    <a href="${recipe.href}" target="_blank"> View Recipe </a>
    </div>
    `
  );
  recipeEl.innerHTML = html.join('');
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  if (searchIngre.length > 0) {
    query += `&i=${searchIngre.join(',')}`;
  }
  formEl.submit.disabled = true;
  const recipes = await fetchRecipes(query);
  formEl.submit.disabled = false;
  displayRecipes(recipes.results);

  const singleIngre = document.querySelectorAll('.singleIngre');
  singleIngre.forEach(ingre => {
    ingre.addEventListener('change', e => {
      if (
        e.currentTarget.checked &&
        !searchIngre.includes(e.currentTarget.value)
      ) {
        searchIngre.push(e.currentTarget.value);
      }
      if (!e.currentTarget.checked) {
        searchIngre = searchIngre.filter(
          ingree => ingree !== e.currentTarget.value
        );
      }
      console.log(searchIngre);
    });
  });
}

formEl.addEventListener('submit', handleSubmit);
fetchAndDisplay('pizza');
allIngredients.forEach(ingredient => {
  ingredientEl.insertAdjacentHTML(
    'afterbegin',
    `
<li> <input type="checkbox" value="${ingredient}" name="singleIngre[]" class="singleIngre"> ${ingredient}</li>
`
  );
});
