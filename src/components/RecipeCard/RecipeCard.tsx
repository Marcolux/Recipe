import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

interface RecipeCardProps {
    id: number,
    image: string,
    title: string
}

const RecipeCard = (props: RecipeCardProps) => {
    const context = useContext(Context)
    if (!context) throw new Error('useContext must be used within a Provider')
  
    const { recipeIdState } = context
    const [recipeId, setRecipeId] = recipeIdState
    
    return (
        <div className="singleResult">
            <div className="imgCont">
                <img src={`${props.image}`} alt="" />
            </div>
            <Link 
                to={`/recipe/${props.id}`}
                onClick={()=>{
                    setRecipeId(props.id)
                }}>
                {props.title}
            </Link>
        </div>
    )

}  

export default RecipeCard