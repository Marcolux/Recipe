import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { useNavigate} from "react-router-dom"

import axios from 'axios';
import Category from './Category';

const CategoriesInPage=()=>{

    const [categoriesUser, setCategoriesUser] =useState([])
    const [categoryId, setCategoryId] =useState()

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    let history = useNavigate()

    const getCategories=()=>{
    const userId=localStorage.getItem('userId')
    axios.get(`http://localhost:3001/category/all/${userId}`)
    .then((response)=>{setCategoriesUser(response.data)})
    }

    useEffect(getCategories,[])

    return(
        <div className='allTheCategories'>
        {
        categoriesUser.length ?
        categoriesUser.map((category,i)=>{
            return(
            <div className='CategorySection' key={i}>
                <p className='categoryTitle'>{category.name}</p>
                <Category  category={category.id} categoriesUser={categoriesUser} />
                <button onClick={()=>{
                        setCategoryId(category.id)
                        history('/all-the-recipes')
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