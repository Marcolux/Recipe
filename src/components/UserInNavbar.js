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
                    <Link  to='/user-page'>All the Categories</Link>
                    <Link  to='/all-the-recipes'>My recipes</Link>
                </div>
            </div>
    )
}


export default UserInNavBar