
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import './style/user-page.css'
import { Context } from "../../context/Context"

import TabCategories from "../../components/TabCategories/TabCategories"
import TabRecepies from "../../components/TabRecepies/TabRecepies"
import TabSearchAPI from "../../components/TabSearchApi/TabSearchApi"

const UserPageLanding = () => {
  const [tabSwitch, setTabSwitch] = useState('categories')

  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within a Provider')

  const { userState } = context
  const [user, setUser] = userState

  const history = useNavigate()

  const renderComponent = () => {
    switch (tabSwitch) {
      case 'categories' :
        return <TabCategories tabSwitch='categories'/>
      case 'recepies' :
        return <TabRecepies tabSwitch='recepies'/>
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
            className={tabSwitch === 'recepies' ? 'active' : ''}
            onClick={(e) => {setTabSwitch('recepies')}}
          >All Your Recepies
          </button>
          
          <button
            className={tabSwitch === 'searchApi' ? 'active' : ''}
            onClick={(e) => {setTabSwitch('searchApi')}}
          > Search From Spoonacular
          </button>
        </div>
      </div>

      <div className="flex hg-100">
        {renderComponent()}
      </div>

    </div>
  )
}

export default UserPageLanding