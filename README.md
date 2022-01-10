# Plant_Shop_Front_End

### Overview

This project is a recipe app, once the user login or signup from the home page will be able to look for recipes, save them in weekly meal plans, divide them in categories such as breakfast, lunch, snack, dinner and etc, and get a grocery list based on the list of the ingredients of each meal.


### Wireframe

![Wireframe](./Photos/DB_Map.png)

![Wireframe](./images/wireframe_frontend.png) 

![Wireframe](./Photos/Components_chart.png)

### User Stories

-When I first visit the site, I'm on a home page that just has a simple description of the app.

-When not logged in, I see links to home, signup & login only. If I were to visit any of these routes manually while logged in, I would get redirected to the home page.

-I can create an account or log in.

-When logged in, in navigation bar, I see links to User,search for recipe, add recipe, and weekly plan. If I'm visiting any of these routes manually while logged out, I would get redirected to the home page.

-The Navigation Bar will stay the same after the login till I logout

-The user name can be clicked and will open up a menu where I can logout, navigate to the categories or navigate to all the recipes page.

-If I click on one recipe from All the recipe page I will navigate to the single recipe page


-In the User page I can see all the categories that the user has created with the title and the image of the recipes.

-In the top right corner in the category section I will have a + button to create a category.

-The category has a + button that will bring me to a page with all the recipes from Where I will be able to add them to the selected  category

-If I click on the single recipe the app will bring me to the single recipe page.

-The single recipe page shows the list of the ingredients, the image and the instructions for the recipe.

-From the navigation bar I can click the search button.

-The search button opens a drop down menu with links to 3 different type of search, by name by ingredients and by calories.

-All the links brings to 3 different pages built in the same way with just the search input different.

-The search input will send a call to the api.

-After the call a list of results(recipes) will be shown in the same page, and the user can decide to add it to one or more categories.

-When add to category the user will create a row in the recipes table in the backend and an association between the recipes table and categories table. 

-Once added to the categories, the recipe will be shown in the user page under the relative category.

-The user can remove it by clicking the remove button. That will destroy the entry in the backend

-From the Navigation Bar I can click add Recipe that will show a drop down menu with two links, 1 to add from website and 1 add by typing in.

-If I click add from website I will navigate to a different page where I can see an input and an button. After I paste the link into the input and I click search, I will make an Api call and the api will try to read the info from the website.

-If I have a successful call I will see picture, ingredients and instructions for the recipe

-The user can modify the informations by clicking, modify.

-If I decide that I like it I can select the category and I can click add and I will create a recipe in the database.

-If I choose to add a recipe manually, I will navigate to a page where I can type the different ingredients and the instructions. Once I think I like it I can added to the a category.

### Routes

|Routes                     | HTTP Verb                       | URL                            |
| :----------------------: | ------------------------------- | ------------------------------- |
| userRoute | .post | '/' |
| userRoute | .post | '/login' |
| userRoute | .get | 'verify' |
| recipeRoute | .post | '/recipe/' |
| recipeRoute | .get | '/recipe/all' |
| recipeRoute | .get | '/recipe/:recipeId' |
| recipeRoute | .put | '/recipe/:recipeId' |
| categoryRoute | .get | '/category/' |
| categoryRoute | .get | '/category/:categoryId' |
| categoryRoute | .post | '/category/' |
| categoryRoute | .put | '/category/:recipeId' |
___
### MVP

-The site has user authentication functionality. 

-Each user has recipes saved and organized in categories.

-Each user can add and remove recipes, from websites or by searching them from the api or by just typing them in. 

-Each user can add or remove the recipes to categories

### Stretch Goals

-Create a weekly meal plan
-Create a grocery list based on the weekly plan


Unit 4 Solo-Project