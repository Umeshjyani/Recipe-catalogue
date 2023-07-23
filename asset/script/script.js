const recipes = [{
    "name": "Veggie Delight",
    "imageSrc": "https://source.unsplash.com/random?veggies",
    "time": "30 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.2
},
{
    "name": "Chicken Grill",
    "imageSrc": "https://source.unsplash.com/random?chicken",
    "time": "45 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.5
},
{
    "name": "Cheese Pizza",
    "imageSrc": "https://source.unsplash.com/random?pizza",
    "time": "40 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.1
},
{
    "name": "Steak",
    "imageSrc": "https://source.unsplash.com/random?steak",
    "time": "60 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.7
},
{
    "name": "Grilled Salmon",
    "imageSrc": "https://source.unsplash.com/random?salmon",
    "time": "50 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.6
},
{
    "name": "Tomato Pasta",
    "imageSrc": "https://source.unsplash.com/random?pasta",
    "time": "35 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.0
},
{
    "name": "Vegan Salad",
    "imageSrc": "https://source.unsplash.com/random?salad",
    "time": "20 min",
    "type": "veg",
    "isLiked": false,
    "rating": 3.9
},
{
    "name": "Fried Chicken",
    "imageSrc": "https://source.unsplash.com/random?friedChicken",
    "time": "55 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.3
},
{
    "name": "Mushroom Risotto",
    "imageSrc": "https://source.unsplash.com/random?risotto",
    "time": "45 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.5
},
{
    "name": "Burger",
    "imageSrc": "https://source.unsplash.com/random?burger",
    "time": "30 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.2
},
{
    "name": "Paneer Tikka",
    "imageSrc": "https://source.unsplash.com/random?paneerTikka",
    "time": "40 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.4
},
{
    "name": "BBQ Ribs",
    "imageSrc": "https://source.unsplash.com/random?ribs",
    "time": "70 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.6
},
{
    "name": "Caesar Salad",
    "imageSrc": "https://source.unsplash.com/random?caesarSalad",
    "time": "25 min",
    "type": "veg",
    "isLiked": false,
    "rating": 3.8
},
{
    "name": "Fish Tacos",
    "imageSrc": "https://source.unsplash.com/random?fishTacos",
    "time": "35 min",
    "type": "non-veg",
    "isLiked": false,
    "rating": 4.3
},
{
    "name": "Chocolate Cake",
    "imageSrc": "https://source.unsplash.com/random?chocolateCake",
    "time": "90 min",
    "type": "veg",
    "isLiked": false,
    "rating": 4.9
}
];
const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');
const showAllBtn = document.getElementById('showAllBtn');
const showVegBtn = document.getElementById('showVegBtn');
const showNonVegBtn = document.getElementById('showNonVegBtn');
const ratingFilterInputs = document.querySelectorAll('input[name="ratingFilter"]');

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
// Add event listener to the hamburger icon
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navbar.classList.toggle('active');
});

function displayRecipes(recipesToShow) {
    recipeContainer.innerHTML = '';
    recipesToShow.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
          <img src="${recipe.imageSrc}" alt="${recipe.name}">
          <h2>${recipe.name}</h2>
          <p>Type: ${recipe.type}</p>
          <p>Time: ${recipe.time}</p>
          <p>Rating: ${recipe.rating}</p>
          <button class="like-btn ${recipe.isLiked ? 'liked' : ''}" data-recipe-id="${recipe.id}">${recipe.isLiked ? '<i class="fas fa-heart"></i> Liked' : '<i class="far fa-heart"></i> Like'}</button>
        `;
        recipeContainer.appendChild(recipeCard);
    });

    // Add event listener to the like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', handleLikeButtonClick);
    });
}

function handleLikeButtonClick(event) {
    const button = event.target;
    const recipeId = button.getAttribute('data-recipe-id');
    // Toggle the 'liked' class on the button and update JSON array
    const isLiked = button.classList.toggle('liked');
    const recipeToUpdate = recipes.find(recipe => recipe.id === recipeId);
    if (recipeToUpdate) {
        recipeToUpdate.isLiked = isLiked;
    }
}




searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
    displayRecipes(filteredRecipes);
});

showAllBtn.addEventListener('click', () => {
    displayRecipes(recipes);
    showAllBtn.classList.add('active');
    showVegBtn.classList.remove('active');
    showNonVegBtn.classList.remove('active');
});

showVegBtn.addEventListener('click', () => {
    const vegRecipes = recipes.filter(recipe => recipe.type === 'veg');
    displayRecipes(vegRecipes);
    showAllBtn.classList.remove('active');
    showVegBtn.classList.add('active');
    showNonVegBtn.classList.remove('active');
});

showNonVegBtn.addEventListener('click', () => {
    const nonVegRecipes = recipes.filter(recipe => recipe.type === 'non-veg');
    displayRecipes(nonVegRecipes);
    showAllBtn.classList.remove('active');
    showVegBtn.classList.remove('active');
    showNonVegBtn.classList.add('active');
});

ratingFilterInputs.forEach(input => {
    input.addEventListener('change', () => {
        const ratingFilter = input.value;
        if (ratingFilter === 'above') {
            const highRatedRecipes = recipes.filter(recipe => recipe.rating > 4.5);
            displayRecipes(highRatedRecipes);
        } else {
            const lowRatedRecipes = recipes.filter(recipe => recipe.rating < 4.0);
            displayRecipes(lowRatedRecipes);
        }
    });
});

displayRecipes(recipes);
