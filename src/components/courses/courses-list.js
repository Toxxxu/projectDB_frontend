import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import CourseService from '../../services/courses';
import AddCourse from './add-course';
import UpdateCourse from './update-course';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        const courseService = new CourseService();
  
        const confirmDelete = window.confirm('Are you sure you want to delete this course?');
  
        if (confirmDelete) {
          await courseService.delete(id);
          setCourses((prevCourses) => prevCourses.filter((course) => course.id_course !== id));
          navigate('/courses');
        }
    }

    return (
        <div>
            <h1>Courses</h1>
            <Link to="/addCourse">Add Course</Link>
            <ul>
                {courses.map((course) => (
                    <li key={course.id_course}>
                        <Link to={`/updateCourse/${course.id_course}`}>{course.name}</Link>
                        <button onClick={() => handleDelete(course.id_course)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Routes>
                <Route path="/addCourse" element={<AddCourse />} />
                <Route path="/updateCourse/:id" element={<UpdateCourse />} />
            </Routes>
        </div>
    )
}

export default Courses;