
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>

      {/* NoteState k andar jo bhi state variables h  pura application k andar mein jitne sare components h unke andar uplabdh ho jaye*/}
      <NoteState>

        <BrowserRouter >
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
