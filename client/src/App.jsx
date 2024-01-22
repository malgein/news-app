import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Detail from './components/pages/Detail';
import './App.css'
import AddPost from './components/pages/AddPost';
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Detail/>}/>
        <Route path='/form' element={<AddPost />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
