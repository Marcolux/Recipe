import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import env from "react-dotenv";
import RecipeCard from "../RecipeCard/RecipeCard";
import './style/tab-recepies.css';

interface RecipeFromDB {
    apiId: string
    ingredients: string
    instructions: string
    picture: string
    name: string
    diets: string
}

const TabRecipies = ({ tabSwitch }: { tabSwitch: string }): React.JSX.Element => {
    const context = useContext(Context);
    if (!context) throw new Error('useContext must be used within a Provider')

    const [allRecipes, setAllRecipes] = useState<RecipeFromDB[]>([])
    const { userState } = context
    const [user] = userState

    useEffect(() => {
        if (tabSwitch === 'recipies') {
            axios.get(`${env.BACKEND_URL}/recipe/all/${user.id}`).then((response)=>{
                setAllRecipes(response.data)
            })
        }
    }, [tabSwitch]) 

    const showAllRecipes = () => {

        if (allRecipes.length > 0) {
            return allRecipes.map((recipe: RecipeFromDB) => (
                <RecipeCard
                    key={recipe.apiId}
                    id={Number(recipe.apiId)}
                    image={recipe.picture}
                    title={recipe.name}
                />
            ))
        } else {
            return <div>No recipes found.</div>
        }
    }

    return (
        <div className={tabSwitch === 'recipies' ? 'pageContent recipies active' : 'pageContent recipies'}>
            <div>Recipies</div>
            <div className="recipiesContainer">
                {tabSwitch === 'recipies' ? showAllRecipes() : null}
            </div>
        </div>
    )
}

export default TabRecipies
