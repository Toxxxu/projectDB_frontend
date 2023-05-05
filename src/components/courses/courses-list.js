import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import CourseService from '../../services/courses';
import TeacherService from '../../services/teachers';
import Course from './course-page';
import AddCourse from './add-course';
import UpdateCourse from './update-course';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourses();
    }, []);

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };

        fetchTeachers();
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
            <div className='main-txt'>
                <h1 className='main'>
                    <Badge bg="secondary">Courses</Badge>
                </h1>
                <h2>
                    <Link to="/addCourse">
                        <Badge bg="success">Add Course <FontAwesomeIcon icon="fa-solid fa-square-plus" size="lg" /></Badge>
                    </Link>
                </h2>
            </div>
            <ul>
                {courses.map((course) => (
                    <li key={course.id_course}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>{course.name}</Card.Title>
                                <Card.Text>
                                    Teacher: {teachers.map((teacher) => (course.id_teacher === teacher.id_teacher ? teacher.full_name : ""))} <br />
                                    Year: {course.year}<br />
                                    Price: {course.price}<br />
                                </Card.Text>
                                <Card.Link href={`/course/${course.id_course}`}><FontAwesomeIcon icon="fa-solid fa-eye" /></Card.Link>
                                <Card.Link href={`/updateCourse/${course.id_course}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                                <Card.Link href='/courses' onClick={() => handleDelete(course.id_course)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                            </Card.Body>
                        </Card>
                        {/* {course.name}
                        <Link to={`/updateCourse/${course.id_course}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Link>
                        <button onClick={() => handleDelete(course.id_course)} className='btn-trash'><FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#ffffff",}} /></button> */}
                    </li>
                ))}
            </ul>
            <Routes>
                <Route path="/course/:id" element={<Course />} />
                <Route path="/addCourse" element={<AddCourse />} />
                <Route path="/updateCourse/:id" element={<UpdateCourse />} />
            </Routes>
        </div>
    )
}

export default Courses;