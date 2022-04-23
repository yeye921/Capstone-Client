import './App.css';
import Post from './pages/Post';
import Main from './pages/Main';
import Menu from './pages/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/post" element={<Post />}/>
            <Route path="/menu" element={<Menu />}/>
        </Routes>
    </Router>
  );
}

export default App;
