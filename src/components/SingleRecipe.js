import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

//using context to pass the user informations between components
import { Context } from "../context/Context"

import env from "react-dotenv"

const SingleRecipe = (props) => {
  const { recipeIdState } = useContext(Context)
  const [recipeId, setRecipeId] = recipeIdState

  const { categIdState } = useContext(Context)
  const [categId, setCategId] = categIdState

  const { categoryNameState } = useContext(Context)
  const [categoryName, setCategoryName] = categoryNameState

  const [animations, setAnimations] = useState()
  const [borders, setBorders] = useState()
  const [buttonFunction, setButtonFunction] = useState(true)

  // const [allRecipes, setAllRecipes] = useState([])

  let history = useNavigate()
  // let userId = localStorage.getItem('userId')
  // console.log(props.recipe.picture)
  return (
    <div className="singleResult">
      <img
        className="resultPic"
        src={props.recipe.picture?.split("(")[1].split(")", 1)}
        style={{
          // backgroundImage:props.recipe.picture,
          animation: animations,
          border: borders,
        }}
      />
      <div className="resultPicSection">
        <p
          className="linksRecipe"
          onClick={() => {
            history("/saved-recipe")
            setRecipeId(props.recipe.id)
          }}
        > {props.recipe.name} </p>

        {categoryName ? (
          <>
            {buttonFunction === true ? 
              (
                <button
                  onClick={() => {
                    setAnimations("rotation .4s")
                    setBorders("4px solid red")
                    buttonFunction ? setButtonFunction(false) : setButtonFunction(true)

                    axios.put(
                      `${env.BACKEND_URL}/category/${categId}/${props.recipe.id}`
                    )
                  }}
                > Add to {categoryName} </button>
              ) 
              : 
              (
                <button
                  onClick={() => {
                    setButtonFunction(true)
                    setAnimations("rotationInv .4s")
                    setBorders("1px solid black")

                    axios.delete(
                      `${env.BACKEND_URL}/category/${categId}/${props.recipe.id}`
                    )
                  }}
                > Remove </button>
              )
            }
          </>
        ) : null}
      </div>
    </div>
  )
}

export default SingleRecipe
