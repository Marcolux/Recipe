import { useState, createContext } from "react";

const Context = createContext();

const Provider = ({children}) => {
    
    const [ user, setUser ] = useState({});
    const [recipeId, setUserId] = useState()
    const [recipeImage, setRecipeImage] = useState('')
    const [SingleRecipePage, setSingleRecipePage]= useState(false)
    const [recipeDetails,setRecipeDetails] = useState({})
    const [categId,setCategId] = useState()
    const [results, setResults] = useState([])
    const [categoryName,setCategoryName] = useState()
    const [allRecipes, setAllRecipes] = useState([])

    const state = {
        userState: [ user, setUser ],
        recipeIdState:[recipeId, setUserId],
        recipeImageState:[recipeImage, setRecipeImage],
        SingleRecipePageState:[SingleRecipePage, setSingleRecipePage],
        recipeDetailsState:[ recipeDetails,setRecipeDetails],
        categIdState:[categId,setCategId],
        resultsState:[results, setResults],
        categoryNameState:[categoryName,setCategoryName],
        allRecipesState:[allRecipes, setAllRecipes]
    }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }