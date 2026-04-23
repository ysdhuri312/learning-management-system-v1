/** @format */

import { Route, Routes, useMatch } from 'react-router';
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Home from './pages/student/Home';
import Navbar from './components/student/Navbar';
import CourseDetails from './pages/student/CourseDetails';

function App() {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer>
        {/* Render Student Navbar only if not on educator routes */}
        {!isEducatorRoute && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course/:id' element={<CourseDetails />} />
        </Routes>
      </ToastContainer>
    </div>
  );
}

export default App;
