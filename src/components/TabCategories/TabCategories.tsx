import React, {useState, useEffect} from "react"
import env from "react-dotenv"
import axios from "axios"
import './style/tab-categories.css'

import CategoryButton from "./components/category-button/CategoryButton"
import RemoveCategoryButton from "./components/remove-category/RemoveCategoryButton"

interface Category {
    id: number;
    name: string;
    userId: number
}

const TabCategories = ({tabSwitch}: {tabSwitch:string} ): React.JSX.Element => {
    
    const [createCategory, setCreateCategory] = useState(false)
    const [newCategoryName, setnewCategoryName] = useState("")
    const [categoriesUser, setCategoriesUser] = useState<Category[]>([])
    const [categorySelected, setCategorySelected] = useState<Category>()

    const userId = localStorage.getItem("userId")

    const getCategories = () => {
  
      axios
        .get(`${env.BACKEND_URL}/category/all/${userId}`)
        .then((response) => {
            setCategoriesUser(response.data)
        })
    } 
    useEffect(getCategories, [createCategory])
    const rederAllTheCategoryBtns = () => {
        if (categoriesUser.length > 0) {
            if (!categorySelected) {setCategorySelected(categoriesUser[0])}

            return categoriesUser.map(cat => {
                const catName = cat.name as string
                if (cat) {
                    return (
                        < CategoryButton 
                            key={catName}
                            className={`categoryButton ${categorySelected?.name === catName ? 'active' : ''}`} 
                            categoryName={catName} 
                            onClick={ () => {setCategorySelected(cat)}}
                        />
                    )
                }
            })
        }
        return null
    }
    const createNewCategory = () => {
        if (newCategoryName !== '') {
            console.log(newCategoryName)
            axios.post(`${env.BACKEND_URL}/category/${userId}`, { categoryName: newCategoryName })
            setCreateCategory(false)
            setnewCategoryName("")

        } else { alert('New category cannot be empty') }
    }
    const removeCategory = () => {
        axios
        .delete(`${env.BACKEND_URL}/category/${categorySelected?.id}`)
        .then( () => {
            getCategories()
            setCategorySelected(categoriesUser[0])
        })
    }
    const showRecipesInCat = () => {
        let catName = categorySelected ? categorySelected.name : ''

        return (
            <div className="recipeInCat">
                <div className="categoryHeader">
                    <p>{catName}</p>
                    <RemoveCategoryButton 
                        id="" 
                        categoryName={catName} 
                        className="button dark" 
                        onClick={removeCategory}
                    />
                </div>
                <div className="allRecipes"></div>
            </div>
        )
    }

    return (
        <div className={tabSwitch === 'categories' ? 'pageContent categories active' : 'pageContent categories'}>

            <div className="flex hg-100">
                <div className="leftTabCat"> 
                    {rederAllTheCategoryBtns()}
                </div>
                <div className="recipesCont">
                    {showRecipesInCat()}
                </div>
            </div>

            <div className="addCategorySec">
                {
                    !createCategory ?

                    <button 
                        className={ "button dark small mg-y-Lg"}
                        onClick={() => {
                            setCreateCategory(true)
                            setnewCategoryName("")
                        }}
                    > Add Category</button>

                    :

                    <div className="inputCategory flex mg-y-Sm">
                        <input 
                            type="text" 
                            value={newCategoryName}
                            onChange={(e) => {setnewCategoryName(e.target.value)}}
                        />
                        <button 
                            className={"button dark small mg-x-Sm"}
                            onClick={createNewCategory}
                        >Add</button>
                        <p onClick={() => {setCreateCategory(false)}}>
                            Cancel
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default TabCategories