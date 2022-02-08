//using context to pass the user informations between components
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

import NavigationBar from "../components/NavigationBar"
import AddCategory from '../components/AddCategory';
import CategoriesInPage from '../components/CategoriesInPage';


const UserPage = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    const [createCategory, setCreateCategory] = useState(false)

    console.log(user)
    // useEffect(setCreateCategory,[])
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
            <CategoriesInPage/>
        </div>
    </div>
    )
}

export default UserPage