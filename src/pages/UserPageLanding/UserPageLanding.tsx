
import React, { useState } from "react"
import './style/user-page.css'

import TabCategories from "../../components/TabCategories/TabCategories"
import TabRecepies from "../../components/TabRecepies/TabRecepies"
import TabSearchAPI from "../../components/TabSearchApi/TabSearchApi"

const UserPageLanding = () => {
  const [tabSwitch, setTabSwitch] = useState('categories')

  const renderComponent = () => {
    switch (tabSwitch) {
      case 'categories' :
        return <TabCategories/>;
      case 'recepies' :
        return <TabRecepies/>;
      case 'searchApi' :
        return <TabSearchAPI/>;
      default:
        return <TabCategories/>;
    }
  }


  return (
    <div className="userPageLanding">
      <div className="navTabs">

        <button
          className="tabsUserLanding"
          onClick={(e) => {setTabSwitch('categories')}}
        > Categories
        </button>
        
        <button
          className="tabsUserLanding"
          onClick={(e) => {setTabSwitch('recepies')}}
        >All Your Recepies
        </button>
        
        <button
          className="tabsUserLanding"
          onClick={(e) => {setTabSwitch('searchApi')}}
        > Search From Spoonacular
        </button>
      </div>

      <div className="flex hg-100">
        {renderComponent()}
      </div>

    </div>
  )
}

export default UserPageLanding