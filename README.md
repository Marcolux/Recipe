# Your_recipes

### Overview

This project is a recipe app that allows the user to look for recipes, save them in weekly meal plans, divide them in categories such as breakfast, lunch, snack, dinner and etc, and eventually get a grocery list based on the list of the ingredients of each meal.


### Wireframe

![Wireframe](./images/BackendDatabaseRecipeApp.png)

![Wireframe](./images/wireframe_frontend.png) 

![Wireframe](./images/Components_chart.png)

### User Stories

-When I first visit the site, I'm on a home page that is just a simple landing page.

-When not logged in, I see links to home, signup & login only, where I can create an account or login. If I were to visit any of these routes manually while logged in, I would get redirected to the home page.


-When logged in, in navigation bar, I see links to User and search for recipe.

-The Navigation Bar will stay the same after the login till I logout

-The user name can be clicked and will open up a menu where I can logout, navigate to the categories or navigate to all the recipes page.

-If I'm in "All the recipe" page I can click on one recipe I will navigate to the single recipe page


-In the User page I can see all the recipes organized by categories.

-In the top right corner in the category section I will have a + button to create a category.

-The category has a + button that will bring me to a page with all the recipes from Where I will be able to add them to the selected  category.

-If I click on the single recipe in the category section or in "all recipes Page", the app will bring me to the single recipe page.

-The single recipe page shows the list of the ingredients, the image and the instructions for the recipe, and the options to add it to a category by selecting it from a drop down menu.

-From the navigation bar I can click the search button.

-The search button opens a search page where I can search a recipe by name by ingredients or I can open a different section, where I can be more specific and filter a particular diet or intollerance .


-The search input will send a call to the api.

-After the call, a list of results(recipes) will be shown in the same page, and the user can decide to add it to one or more categories.

<!-- -When add to category the user will create a row in the recipes table in the backend and an association between the recipes table and categories table.  -->

-Once added to the categories, the recipe will be shown in the user page under the relative category.

-The user can remove it by clicking the remove button.

-From the Navigation Bar I can click add Recipe that will show a drop down menu with two links, 1 to add from website and 1 add by typing in.

### Routes

|Routes                     | HTTP Verb                       | URL                            |
| :----------------------: | ------------------------------- | ------------------------------- |
| userRoute | .post | 'user/' |
| userRoute | .post | 'user/login' |
| userRoute | .get | 'user/verify' |
| recipeRoute | .post | '/recipe/:userId' |
| recipeRoute | .get | '/recipe/all/:userId' |
| recipeRoute | .get | '/recipe/:recipeId' |
| recipeRoute | .put | '/recipe/:recipeId' |
| recipeRoute | .delete | '/recipe/:recipeId' |
| categoryRoute | .get | '/category/:categoryId' |
| categoryRoute | .get | '/category/all/:userId' |
| categoryRoute | .get | '/category/:categoryId/recipes' |
| categoryRoute | .post | '/category/:userId' |
| categoryRoute | .put | '/category/:categoryId/:recipeId' |
| categoryRoute | .delete | '/category/:categoryId/:recipeId' |
| categoryRoute | .delete | '/category/:categoryId' |
___
### MVP

-The site has user authentication functionality. 

-Each user can add and remove recipes by searching them from the api. 

-Each user has recipes saved and organized in categories.

-Each user can add or remove the recipes to categories

-The app has a clean modern style.

### Stretch Goals

-Add the feature of add recipe from a website
-add the feature of add recipe by just typing them in a form
-Create a weekly meal plan
-Create a grocery list based on the weekly plan


### Links

- frontend:

https://github.com/Marcolux/Recipe

- backend:

https://github.com/Marcolux/Recipe_backend


Solo-Project