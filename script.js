const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching recipes...";
    const element=document.getElementById("chef");
    element.remove();
  
     try{
         
   
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
 <img src ="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p><span>${meal.strArea} </span> Dish</p>
<p>Belongs to <span>${meal.strCategory}</span> Category</p>
`
const button =document.createElement('button');
button.textContent="View Recipe";
recipediv.appendChild(button);
button.addEventListener('click',()=>{
openRecipePopop(meal);
});
        recipeContainer.appendChild(recipediv);
    });
}
catch (error) {
    recipeContainer.innerHTML = "Error in Fetching recipes...";
}

}
 const fetchIngredient=(meal)=>{
    let ingredientslist="";
     for(let i=1;i<=20;i++){
 const ingredient=meal[`strIngredient${i}`];
 if(ingredient){
const measure = meal[`strMeasure${i}`];
    ingredientslist+=`<li>${measure} ${ingredient}</li>`
 }
 else{
  break;
 }

    }
    return ingredientslist;
 }
const openRecipePopop=(meal)=>{
recipedetailscontent.innerHTML=`
<h2 class="recipeName" >${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul  class="ingredientlist">${fetchIngredient(meal)}</ul>
<div class="recipeInstructions">
    <h3>Instruction:</h3>
        <p  >${meal.strInstructions}</p>

</div>
`




recipedetailscontent.parentElement.style.display="block";
} 
recipeclosebtn.addEventListener('click',()=>{
recipedetailscontent.parentElement.style.display="none";
});
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchinput);

}); 


