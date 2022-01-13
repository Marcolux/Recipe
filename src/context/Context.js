import { useState, createContext } from "react";

const Context = createContext();

const Provider = ({children}) => {
    
    const [ user, setUser ] = useState({});
    const [recipeId, setUserId] = useState()
    const [recipeImage, setRecipeImage] = useState('')

    const state = {
        userState: [ user, setUser ],
        recipeIdState:[recipeId, setUserId],
        recipeImageState:[recipeImage, setRecipeImage]
    }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }