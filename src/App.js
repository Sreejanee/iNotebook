
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
function App() {
  return (
    <>

      {/* NoteState k andar jo bhi state variables h  pura application k andar mein jitne sare components h unke andar uplabdh ho jaye*/}
      <NoteState>

        <BrowserRouter >
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
