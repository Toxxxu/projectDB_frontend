import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Teachers from './components/teachers/teachers-list';
import Courses from './components/courses/courses-list';
import Students from './components/students/students-list';
import AddTeacher from './components/teachers/add-teacher';
import AddCourse from './components/courses/add-course';
import AddStudent from './components/students/add-student';
import UpdateTeacher from './components/teachers/update-teacher';
import UpdateCourse from './components/courses/update-course';
import UpdateStudent from './components/students/update-student';
import Teacher from './components/teachers/teacher-page';
import Course from './components/courses/course-page';
import Ratings from './components/ratings/ratings-list';
import AddRating from './components/ratings/add-rating';
import UpdateRating from './components/ratings/update-rating';

library.add(fas);

function App() {
  return (
    <div>
        <div>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Info courses</Navbar.Brand>
              <Nav className='me-auto'>
                <Nav.Link href='/'>Teachers</Nav.Link>
                <Nav.Link href='/courses'>Courses</Nav.Link>
                <Nav.Link href='/students'>Students</Nav.Link>
                <Nav.Link href='/ratings'>Ratings</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          {/* <nav className='menu-nav'>
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
          </nav> */}

          <Routes>
            <Route path="/*" element={<Teachers />} />
            <Route path="/teacher/:id/*" element={<Teacher />} />
            <Route path="/addTeacher" element={<AddTeacher />} />
            <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
            <Route path="/courses/*" element={<Courses />} />
            <Route path="/course/:id/*" element={<Course />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/updateCourse/:id" element={<UpdateCourse />} />
            <Route path="/students/*" element={<Students />} />
            <Route path="/addStudent" element={<AddStudent />} />
            <Route path="updateStudent/:id" element={<UpdateStudent />} />
            <Route path="/ratings/*" element={<Ratings />} />
            <Route path="/addRating" element={<AddRating />} />
            <Route path="/updateRating/:id" element={<UpdateRating />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;