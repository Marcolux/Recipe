import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import env from 'react-dotenv';

const AddCategory=(props)=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    const[categoryName, setCategoryName] = useState('')

    // console.log(user.id)

    const createTheCategory= ()=>{
        
        axios.post(`${env.BACKEND_URL}/category/${user.id}`, {categoryName})
        props.setCreateCategory(true)
    }
    return(
        <div className='Addcategory'>
            <form onSubmit={createTheCategory}>
                <label htmlFor="name">Enter The Category name</label>
                <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </form>
        </div>
    )
    

}

export default AddCategory