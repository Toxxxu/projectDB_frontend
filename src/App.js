import './App.css';
import { BrowserRouter as Route, Link, Routes } from 'react-router-dom';
import Teachers from './components/teachers/teachers-list';
import Courses from './components/courses/courses-list';
import Students from './components/students/students-list';

function App() {
  return (
    <div>
        <div>
          <nav className='menu-nav'>
            <ul className='menu-ul'>
              <li className='menu-li'>
                <Link to="/">Teachers</Link>
              </li>
              <li className='menu-li'>
                <Link to="/courses">Courses</Link>
              </li>
              <li className='menu-li'>
                <Link to="/students">Students</Link>
              </li>
            </ul>
          </nav>

        <Routes>
          <Route path="/" element={<Teachers />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
        </Routes>
        </div>
    </div>
  );
}

export default App;
