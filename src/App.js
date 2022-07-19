import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Fav from './Components/Fav';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={[<Banner/>,<Movies/>]} />
      <Route path='/Fav' element={<Fav/>} />
      </Routes>
    </Router>
  );
}

export default App;
