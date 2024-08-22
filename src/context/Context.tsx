import React, { useState, createContext, ReactNode } from "react"

interface MyContextType {
    userState: [Record<string, any>, React.Dispatch<React.SetStateAction<string>>];
    loginSignupState:[string, React.Dispatch<React.SetStateAction<string>>];
    recipeIdState: [string, React.Dispatch<React.SetStateAction<string>>];
    recipeImageState: [string, React.Dispatch<React.SetStateAction<string>>];
    SingleRecipePageState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    recipeDetailsState: [Record<string, any>, React.Dispatch<React.SetStateAction<Record<string, any>>>];
    categIdState: [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>];
    resultsState: [any[], React.Dispatch<React.SetStateAction<any[]>>];
    categoryNameState: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
    allRecipesState: [any[], React.Dispatch<React.SetStateAction<any[]>>];
    alertState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Context = createContext<MyContextType | undefined>(undefined);

const Provider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [user, setUser] = useState({})
  const [loginSignup, setLoginSignup] = useState('')
  const [recipeId, setUserId] = useState("")
  const [recipeImage, setRecipeImage] = useState("")
  const [SingleRecipePage, setSingleRecipePage] = useState(false)
  const [recipeDetails, setRecipeDetails] = useState({})
  const [categId, setCategId] = useState<number | undefined>(undefined)
  const [results, setResults] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState<string | undefined>(undefined)
  const [allRecipes, setAllRecipes] = useState<any[]>([])
  const [alert, setAlert] = useState(false)

  const state: MyContextType = {
    userState: [user, setUser],
    loginSignupState: [loginSignup, setLoginSignup],
    recipeIdState: [recipeId, setUserId],
    recipeImageState: [recipeImage, setRecipeImage],
    SingleRecipePageState: [SingleRecipePage, setSingleRecipePage],
    recipeDetailsState: [recipeDetails, setRecipeDetails],
    categIdState: [categId, setCategId],
    resultsState: [results, setResults],
    categoryNameState: [categoryName, setCategoryName],
    allRecipesState: [allRecipes, setAllRecipes],
    alertState: [alert, setAlert],
  }

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
