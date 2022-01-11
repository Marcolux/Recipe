//using context to pass the user informations between components
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

import NavigationBar from "../components/NavigationBar"
import AddCategory from '../components/AddCategory';


const UserPage = ()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState
    const [createCategory, setCreateCategory] = useState(false)

    console.log(user)
    // useEffect(setCreateCategory,[])
    return(
    <div className="UserPage">
        <NavigationBar/>
        <h1>This is the user Page</h1>
        <div className='Addcategory'>
        {createCategory===true?
            <div>
                <p>ready to create a new one</p>
                <button className='addFromBackend' onClick={()=>{
                    setCreateCategory(false)
                }} >ok</button>
            </div>
            :
            <AddCategory setCreateCategory={setCreateCategory}/>
        }
        </div>
    </div>
    )
}

export default UserPage