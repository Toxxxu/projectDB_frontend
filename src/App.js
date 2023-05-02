import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import Teachers from './components/teachers/teachers-list';
import Courses from './components/courses/courses-list';
import Students from './components/students/students-list';
import AddTeacher from './components/teachers/add-teacher';
import AddCourse from './components/courses/add-course';
import AddStudent from './components/students/add-student';

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
          <Route path="/*" element={<Teachers />} />
          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/courses/*" element={<Courses />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/students/*" element={<Students />} />
          <Route path="/addStudent" element={<AddStudent />} />
        </Routes>
        </div>
    </div>
  );
}

export default App;