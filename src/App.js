import './App.css';
import Post from './pages/Post';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/post" element={<Post />}/>
        </Routes>
    </Router>
  );
}

export default App;
