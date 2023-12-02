import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './views/signup';
import Login from './views/login';
import List from './views/list';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="list" element={<List />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
