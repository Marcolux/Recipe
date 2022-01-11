import { Navigate, Route, Routes } from 'react-router-dom';
//using context to pass the user informations between components
import { useContext } from 'react';
import { Context } from './context/Context';

import Homepage from './pages/Homepage';
import './App.css';
import Test from './components/Test';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserPage from './pages/UserPage';

function App() {

  const { userState } = useContext(Context);
  const [user, setUser] = userState
  console.log(user)



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
        <UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
