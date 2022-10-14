//using context to pass the user informations between components
import { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

import NavigationBar from "../components/NavigationBar";
import  AlertMessage  from "../components/AlertMessage"
import AddCategory from "../components/AddCategory";
import AddCategoryInitialState from "../components/AddCategoryInitialState"
// import CategoriesInPage from '../components/CategoriesInPage';
import Category from "../components/Category";

const UserPage = () => {
  // const { userState } = useContext(Context);
  // const [user, setUser] = userState;
  // useState to create a category
  const [createCategory, setCreateCategory] = useState(false);
  const [categoriesUser, setCategoriesUser] = useState([]);
  // console.log(user)
  // useEffect(setCreateCategory,[])

  // backend call to get the user's categories
  const getCategories = () => {
    const userId = localStorage.getItem("userId");

    axios.get(`${env.BACKEND_URL}/category/all/${userId}`).then((response) => {
      // after we have the response we set a state to store them
      setCategoriesUser(response.data);
    });
  };

  useEffect(getCategories, [createCategory]);

  return (
    <div className="UserPage">
      <NavigationBar />
      <div className="allCatBanner"></div>
      <div>
        <AlertMessage />
        {createCategory ? 
          <AddCategory setCreateCategory={setCreateCategory} />
        : 
        
          <AddCategoryInitialState setCreateCategory={setCreateCategory}/>
        }
      </div>
      <div>
        {categoriesUser ? ( 
          <div className="allCategories">
            <div className="CategorySection">
             
              {categoriesUser?.map((category, i) => {
                return (
                  <div className="allTheCategories" key={i}>
                    <button
                      className="deleteCat"
                      onClick={() => {
                        // axios call to backend to delete category and the relations with all the recipes
                        axios.delete(
                          `${env.BACKEND_URL}/category/${category.id}`
                        );
                        // then we update the page
                        categoriesUser.splice(i, 1);
                        setCategoriesUser([...categoriesUser]);
                      }}
                    >
                      Remove
                    </button>
                    <Category
                      key={i}
                      className="categorySingle"
                      category={category}
                      categoriesUser={categoriesUser}
                      setCategoriesUser={categoriesUser}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="spin"></div>
        )
}
      </div>
    </div>
  );
};

export default UserPage;
