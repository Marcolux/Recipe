// heroku address fot .env file
//  https://my-recipes-backen.herokuapp.com
// http://localhost:3001

import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'




import env from "react-dotenv";

//using context to pass the user informations between components
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";

// axios for the call to the beckend
import axios from "axios";

// all the components I need for the routes setup
import Homepage from "./pages/HomePage/Homepage";
import LoginSignupPage from "./pages/LoginSignupPage/LoginSignupPage"
import UserPageLanding from "./pages/UserPageLanding/UserPageLanding"
// import Test from './components/Test';
import SearchFromApi from "./pages/SearchFromApi";
import AllTheRecipes from "./pages/AllTheRecipes";
import SingleRecipePage from "./pages/SingleRecipePage/SingleRecipePage";
import SinglePageFromBackend from "./pages/SinglePageFromBackend";

library.add(fab, faCheckSquare, faCoffee)
function App() {
  const { userState } = useContext(Context);
  const [user, setUser] = userState;
  // create a function to verify a user from the backend and store it in useContext
  useEffect(() => {
    const fetchUser = () => {
      const userId = localStorage.getItem("userId")
      if (userId) {
        axios
          .get(`${env.BACKEND_URL}/user/verify`, {
            headers: {
              authorization: userId,
            },
          })
          .then((response) => {
            setUser(response.data.user);
          });
      }
    };
    fetchUser();
  }, [user.id]);

  return (
    <div className="App">
      {/* set all the routes the app uses */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/loginSignupPage"
          element={
            localStorage.userId ? <Navigate to="/user-page" /> : <LoginSignupPage/>
          }
        />

        <Route
          path="/user-page"
          element={localStorage.userId ? <UserPageLanding /> : <Navigate to="/" />}
        />
        <Route
          path="/search-recipe"
          element={
            localStorage.userId ? <SearchFromApi /> : <Navigate to="/" />
          }
        />
        <Route
          path="/recipe/:recipeId"
          element={
            localStorage.userId ? <SingleRecipePage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/all-the-recipes"
          element={
            localStorage.userId ? <AllTheRecipes /> : <Navigate to="/" />
          }
        />
        <Route
          path="/saved-recipe"
          element={
            localStorage.userId ? (
              <SinglePageFromBackend />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
