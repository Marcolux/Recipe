import { useState, createContext } from "react";

const Context = createContext();

const Provider = ({children}) => {
    
    const [ user, setUser ] = useState({});
    const [recipeId, setUserId] = useState()
    const [recipeImage, setRecipeImage] = useState('')
    const [SingleRecipePage, setSingleRecipePage]= useState(false)
    const [recipeDetails,setRecipeDetails] = useState({})
    const [categoryId,setCategoryId] = useState()
    const [results, setResults] = useState([])

    const state = {
        userState: [ user, setUser ],
        recipeIdState:[recipeId, setUserId],
        recipeImageState:[recipeImage, setRecipeImage],
        SingleRecipePageState:[SingleRecipePage, setSingleRecipePage],
        recipeDetailsState:[ recipeDetails,setRecipeDetails],
        categoryIdState:[categoryId,setCategoryId],
        resultsState:[results, setResults]
    }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }