import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

import { useContext } from 'react';
import { Context } from '../context/Context';

const UserInNavBar=()=>{

    const { userState } = useContext(Context);
    const [user, setUser] = userState

    let history = useNavigate()

    return(
        <div className="menuBar">
                <p>{user.name}</p>
                <div className="menuLinks">
                    <p onClick={()=>{
                            localStorage.removeItem('userId')
                            history("/")
                            setUser({})
                    }}>logout</p>
                    <Link className="links"  to='/user-page'>Categories</Link>
                    <Link className="links" to='/all-the-recipes'>Recipes</Link>
                </div>
            </div>
    )
}


export default UserInNavBar