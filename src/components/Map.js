import { useState, useEffect } from "react"
import axios from "axios";


const Map=()=>{
      

  


//_______ function to get a recipe from ingredients:_____________

const get_recipe_from_ingredients =  ()=>{

  let ingredientsFromBody='bread,eggs,butter'

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    params: {
      ingredients: ingredientsFromBody,
      number: '5',
      ignorePantry: 'true',
      ranking: '1'
    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

// get_recipe_from_ingredients()
// _______________________________________________________________


//______  Generate meals form a calory count__________________

const get_meals_from_calory=()=>{

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
    params: {targetCalories: '2000', timeFrame: 'day'},
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

// get_meals_from_calory()
// _______________________________________________________________


//____________ GET INGREDIENTS FROM RECIPE:____________________

const [res, setRes] = useState([])

const get_recipe_ingredients = ()=>{

// the recipe can be a variable ofcourse
const recipe = 1487801 

let options = {
  method: 'GET',
  url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe}/ingredientWidget`,
  headers: {
    accept: 'text/html',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  // setRes(response.data)
  
})
.then()
.catch(function (error) {
	console.error(error);
});
}

// get_recipe_ingredients()

// return(
//   <div dangerouslySetInnerHTML={{ __html: res }}></div>
//  )
// _______________________________________________________________


// ___________GET RECIPE FROM NAME____________________________

const get_recipe_from_name=()=>{

  let recipeName=`bucatini all'amatriciana`

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    params: {query: recipeName},
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data.results);
  }).catch(function (error) {
    console.error(error,'recipe not found');
  });
}
// get_recipe_from_name()
// _______________________________________________________________


//__________ GET ALL THE INFORMATIONS FROM A RECIPE ID____________

const all_the_info =()=>{

const id =1487801

const options = {
  method: 'GET',
  url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}

// all_the_info()
// _______________________________________________________________

//________ GET THE NUTRITIONS INFO FROM A RECIPE ID________________

const get_the_nutritions=()=>{

const recipe = 1487801

  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe}/nutritionWidget.json`,
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
});
}

// get_the_nutritions()
// _______________________________________________________________


//_______________ GET RECIPES VIDEOS_____________________________

const get_videos =()=>{

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search',
    params: {
      query: 'salad',
      minLength: '0',
      maxLength: '999',
      number: '10',
      includeingredients: 'chicken',
      excludeingredients: 'mustard',
      offset: '0'
    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data.videos[0].youTubeId);
    setRes(response.data.videos[0].youTubeId)

  }).catch(function (error) {
    console.error(error);
  });
}

// get_videos()

// return(
  
//   <a href={`https://www.youtube.com/watch?v=${res}`} >I'm here!!</a>
// )
// ______________________________________________________________

// _____________CONVERT AMOUNT___________________________________
const convert_amount=()=>{


  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/convert',
    params: {
      ingredientName: 'flour',
      targetUnit: 'grams',
      sourceUnit: 'cups',
      sourceAmount: '2.5'
    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}
// convert_amount=()

// ______________________________________________________________



//____________GET RECIPE FROM THE WEB_______________________

const recipe_from_web =async ()=>{
  let url2 = 'https://www.tasteofhome.com/recipes/the-best-ever-pancakes/'
  const options = {

    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
    params: {url: url2 },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '726fa2a7c2mshe40ce585ef7e075p1df5c9jsn1aac5454b25e'
    }
  };

  await axios.request(options).then(function (response) {
    console.log(response.data);
    setRes(response.data)
  }).catch(function (error) {
    console.error(error);
  });
  }
  // ______________________________________________________________
  // recipe_from_web()
useEffect(()=>{
  recipe_from_web()
},[])
  
//     console.log(res)
return(
    res.extendedIngredients?
    <div >
    <p>{res.instructions}</p>
    <div className="pic" style={{backgroundImage:`url(${res.image})`}}></div>
    {res.extendedIngredients.map((ingredient,i)=>{
      return(
      <div key={i}>
      <p>{ingredient.name}</p>
      <p>{ingredient.amount}</p>
      <p>{ingredient.unit}</p>
      </div>
      )
    })}
    </div>
    :
    <p>loading</p>
)
    
  


}
export default Map

