import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import CourseService from '../../services/courses';
import AddCourse from './add-course';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Courses</h1>
            <Link to="/addCourse">Add Course</Link>
            <ul>
                {courses.map((course) => (
                    <li key={course.id_course}>{course.name}</li>
                ))}
            </ul>
            <Routes>
                <Route path="/addCourse" element={<AddCourse />} />
            </Routes>
        </div>
    )
}

export default Courses;