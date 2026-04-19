/** @format */

import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/student/Home';

function App() {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
