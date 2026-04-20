/** @format */

import { Route, Routes, useMatch } from 'react-router';

import Home from './pages/student/Home';
import Navbar from './components/student/Navbar';

function App() {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      {/* Render Student Navbar only if not on educator routes */}
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
