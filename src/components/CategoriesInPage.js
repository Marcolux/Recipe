import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

import axios from 'axios';
import Category from './Category';

const CategoriesInPage=()=>{

    const [categoriesUser, setCategoriesUser] =useState([])

    const { userState } = useContext(Context);
    const [user, setUser] = userState

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