//using context to pass the user informations between components
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import env from 'react-dotenv';

import NavigationBar from "../components/NavigationBar"
import AddCategory from '../components/AddCategory';
import CategoriesInPage from '../components/CategoriesInPage';
import Category from '../components/Category';

const UserPage = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    const [createCategory, setCreateCategory] = useState(false)
    const [categoriesUser, setCategoriesUser] =useState([])
    console.log(user)
    // useEffect(setCreateCategory,[])

    const getCategories=()=>{
        const userId=localStorage.getItem('userId')
    
        axios.get(`${env.BACKEND_URL}/category/all/${userId}`)
        .then((response)=>{setCategoriesUser(response.data)})
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
                            {categoriesUser?.map((category,i)=>{
                                return(
                                    <div className="allTheCategories" key={i}>
                                        <button className='deleteCat' onClick={()=>{
                                            axios.delete(`${env.BACKEND_URL}/category/${category.id}`)
                                            categoriesUser.splice(i,1)
                                            let array = categoriesUser
                                            setCategoriesUser(array)
                                        
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