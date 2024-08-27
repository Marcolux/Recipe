
import React, { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './style/user-page.css'
import { Context } from "../../context/Context"

import TabCategories from "../../components/TabCategories/TabCategories"
import TabRecipies from "../../components/TabRecepies/TabRecipies"
import TabSearchAPI from "../../components/TabSearchApi/TabSearchApi"

const UserPageLanding = () => {

  // ++++ Getting the tab from the url link ++++ to prevent the default categories
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tabFromUrl = searchParams.get('tab')
  
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')
    
  const { userState } = context
  const [user, setUser] = userState
  const [tabSwitch, setTabSwitch] = useState(tabFromUrl || 'categories')
    
  const history = useNavigate()

  const renderComponent = () => {
    switch (tabSwitch) {
      case 'categories' :
        return <TabCategories tabSwitch='categories'/>
      case 'recipies' :
        return <TabRecipies tabSwitch='recipies'/>
      case 'searchApi' :
        return <TabSearchAPI tabSwitch='searchApi'/>
      default:
        return <TabCategories tabSwitch='categories'/>
    }
  }

  return (
    <div className="userPageLanding">


      <div className="navTabs">
        <div className="headerUserPage">
          <h1 className="">{user.name} Cookbook</h1>
          <button 
            className="button light small mg-r-Lg text-bold"
            onClick={() => {
              localStorage.removeItem("userId")
              history("/")
              setUser("")
            }}
            >Logout</button>
        </div>

        <div className="flex">
          <button
            className={tabSwitch === 'categories' ? ' active' : ''}
            onClick={(e) => {setTabSwitch('categories')}}
          > Categories
          </button>
          
          <button
            className={tabSwitch === 'recipies' ? 'active' : ''}
            onClick={(e) => {setTabSwitch('recipies')}}
          >All Your Recipies
          </button>
          
          <button
            className={tabSwitch === 'searchApi' ? 'active' : ''}
            onClick={(e) => {setTabSwitch('searchApi')}}
          > Search From Spoonacular
          </button>
        </div>
      </div>

        {renderComponent()}

    </div>
  )
}

export default UserPageLanding