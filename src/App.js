import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './pages/Homepage';
import './App.css';
import Test from './components/Test';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({})





  return (
    <div className="App">
      {/* <Test/> */}
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
        <Route path='/signup' element={<Signup user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
