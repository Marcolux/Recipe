import { Link } from "react-router-dom"
import React, { useContext } from "react"
import { Context } from "../context/Context"

const UserInNavBar = () => {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context
  const [user, setUser] = userState

  const { categIdState } = context
  const [categId, setCategId] = categIdState

  // const { categoryNameState } = context
  // const [categoryName, setCategoryName] = categoryNameState

  return (
    <div className="menuBar">
      <p>{user.name}</p>
      <div className="menuLinks">
        
        <Link className="links" to="/user-page"> Categories </Link>
        {
          !categId ? 
          (
            <Link className="links" to="/all-the-recipes"> Recipes </Link>
          ) 
          : null
        }
      </div>
    </div>
  )
}

export default UserInNavBar
