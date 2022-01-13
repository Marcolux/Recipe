import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';


//using context to pass the user informations between components
import { useContext,useEffect } from 'react';
import { Context } from './context/Context';

import axios from 'axios';

import Homepage from './pages/Homepage';
import Test from './components/Test';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import SearchFromApi from './pages/SearchFromApi';
import SingleRecipePage from './pages/SingleRecipePage';
import AllTheRecipes from './pages/AllTheRecipes';


function App() {

  const { userState } = useContext(Context);
  const [user, setUser] = userState
  console.log(user)

  useEffect(()=>{
    const fetchUser = () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
       
      axios.get(`http://localhost:3001/user/verify`, {
        headers: {
          Authorization: userId
        }
      })
      .then((response) => {
        
        setUser(response.data.user)
      })
    }
  }
  fetchUser()
}, [user.id])



  return (
    <div className="App">
      {/* <Test/> */}
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={
          localStorage.userId ? <Navigate to='/user-page'/>:<Login />}/>
        <Route path='/signup' element={
          localStorage.userId ? <Navigate to='/user-page'/>:<Signup/>
          }/>
        <Route path='/user-page' element={
        localStorage.userId ?<UserPage/>:<Navigate to='/'/>}/>

        <Route path='/search-recipe' element={
        localStorage.userId ?<SearchFromApi/>:<Navigate to='/'/>}/>
        <Route path='/:recipe.id' element={
          localStorage.userId ?<SingleRecipePage/>:<Navigate to='/'/>}/>
        <Route path='/all-the-recipes' element={
          localStorage.userId ?<AllTheRecipes/>:<Navigate to='/'/>}/>


      </Routes>
    </div>
  );
}

export default App;
