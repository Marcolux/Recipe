import { Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import './App.css';
import Test from './components/Test';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {





  return (
    <div className="App">
      {/* <Test/> */}
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
