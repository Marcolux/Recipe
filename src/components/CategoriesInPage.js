import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { useNavigate} from "react-router-dom"

import axios from 'axios';
import Category from './Category';

const CategoriesInPage=()=>{

    const [categoriesUser, setCategoriesUser] =useState([])

    const { categIdState } = useContext(Context);
    const [categId,setCategId] = categIdState

    const { categoryNameState } = useContext(Context);
    const [categoryName,setCategoryName] = categoryNameState

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    let history = useNavigate()

    const getCategories=()=>{
    const userId=localStorage.getItem('userId')
    axios.get(`http://localhost:3001/category/all/${userId}`)
    // axios.get(`https://my-recipes-backen.herokuapp.com/category/all/${userId}`)
    .then((response)=>{setCategoriesUser(response.data)})
    }

    useEffect(getCategories,[])

    const deleteCategory= (i)=>{

        categoriesUser.splice(i,1)
        let array = categoriesUser
        setCategoriesUser(array)
      }

    return(
        <div className='allTheCategories'>
        {
        categoriesUser.length ?
        categoriesUser.map((category,i)=>{
            return(
            <div className='CategorySection' key={i}>
                <p className='categoryTitle'>{category.name}</p>
                <button onClick={()=>{
                    axios.delete(`http://localhost:3001/category/${category.id}`)
                    deleteCategory(i)
                    setCategoriesUser([...categoriesUser])
                }
                }>x</button>
                <Category  category={category.id} categoriesUser={categoriesUser} />
                <button onClick={()=>{
                        setCategId(category.id)
                        history('/all-the-recipes')
                        setCategoryName(category.name)
                        }
                        }>+</button>
            </div>
            )
        })
        :
        <p>...loading</p>
        }
        </div>
       
    )
}

export default CategoriesInPage