import React, { useState, useEffect } from 'react';
import CourseService from '../../services/courses';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const courseService = new CourseService();

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Courses</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id_course}>{course.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Courses;