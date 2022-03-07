//using context to pass the user informations between components
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import env from 'react-dotenv';

import NavigationBar from "../components/NavigationBar"
import AddCategory from '../components/AddCategory';
// import CategoriesInPage from '../components/CategoriesInPage';
import Category from '../components/Category';

const UserPage = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    // useState to create a category
    const [createCategory, setCreateCategory] = useState(false)
    const [categoriesUser, setCategoriesUser] =useState([])
    // console.log(user)
    // useEffect(setCreateCategory,[])

    // backend call to get the user's categories 
    const getCategories=()=>{
        const userId=localStorage.getItem('userId')
    
        axios.get(`${env.BACKEND_URL}/category/all/${userId}`)
        .then((response)=>{
            // after we have the response we set a state to store them
            setCategoriesUser(response.data)})
    }
    
    useEffect(getCategories,[createCategory])

    return(
    <div className="UserPage">
        <NavigationBar/>
            <div className='allCatBanner'></div>
                <div className='Addcategory'>
                    {createCategory===true?
                        <AddCategory setCreateCategory={setCreateCategory}/>
                        :
                        <div>
                            <p>Add a New Category</p>
                            {/* once we push add we switch state to createCategory and an addCategory component is going to show */}
                            <button className='addFromBackend' onClick={()=>{
                                setCreateCategory(true)}
                            } >ok</button>
                        </div>
                    }
                </div>
            <div >
                {categoriesUser?
                     <div className='allCategories'>
                        <div className='CategorySection' >
                            {/* ???? used to check if the categoriesUser is loaded  */}
                            {categoriesUser?.map((category,i)=>{
                                return(
                                    <div className="allTheCategories" key={i}>
                                        <button className='deleteCat' onClick={()=>{
                                            // axios call to backend to delete category and the relations with all the recipes
                                            axios.delete(`${env.BACKEND_URL}/category/${category.id}`)
                                            // then we update the page
                                            categoriesUser.splice(i,1)
                                            // let array = categoriesUser
                                            // setCategoriesUser(array)
                                            setCategoriesUser([...categoriesUser])
                                            }
                                        }>Remove</button>
                                        <Category key={i} className='categorySingle'  category={category} categoriesUser={categoriesUser} setCategoriesUser={setCategoriesUser} />
                                        
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :
                <div className='spin'></div>
                }
            </div>
    </div>
    )
}

export default UserPage