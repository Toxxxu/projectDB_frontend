import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Routes } from 'react-router-dom';
import CourseService from '../../services/courses';
import TeacherService from '../../services/teachers';
import StudentService from '../../services/students';
import { useParams } from "react-router-dom";
import AddCourse from './add-course';
import UpdateCourse from './update-course';

const Course = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({
        name: "",
        id_teacher: "",
        year: "",
        price: "",
    });

    const [students, setStudents] = useState([]);

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourse = async () => {
            const data = await courseService.get(id);
            setCourse(data.data);
        }

        fetchCourse();
    }, [id]);

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudents = async () => {
            const data = await studentService.getByCourseId(id);
            setStudents(data.data);
        };

        fetchStudents();
    }, [id]);

    const handleDelete = async (id) => {
        const courseService = new CourseService();

        const confirmDelete = window.confirm('Are you sure you want to delete this course?');

        if (confirmDelete) {
            await courseService.delete(id);
            setCourse((prevCourses) => prevCourses.filter((course) => course.id_course !== id));
        }
    }

    return (
        <div>
            <div className='main-txt'>
                <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>{course.name}</Card.Title>
                        <Card.Text>
                            Teacher: {teachers.map((teacher) => (course.id_teacher === teacher.id_teacher ? teacher.full_name : ""))} <br />
                            Year: {course.year}<br />
                            Price: {course.price}<br />
                        </Card.Text>
                        <Card.Link href={`/updateCourse/${course.id_course}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                        <Card.Link href='/courses' onClick={() => handleDelete(course.id_course)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                    </Card.Body>
                </Card>
            </div>
            <br />
            <div className='main-txt'>
                <ul>
                    {students.map((student) => (
                        <li key={student.id_student}>
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <Card.Title>{student.full_name}</Card.Title>
                                    <Card.Subtitle className='mb-2 text-muted'>{student.email}</Card.Subtitle>
                                    <Card.Text>
                                        Age: {student.age}<br />
                                    </Card.Text>
                                    <Card.Link href={`/updateStudent/${student.id_student}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                                    <Card.Link href='/students' onClick={() => handleDelete(student.id_student)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                                </Card.Body>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            <Routes>
                <Route path="/addCourse" element={<AddCourse />} />
                <Route path="/updateCourse/:id" element={<UpdateCourse />} />
            </Routes>
        </div>
    )
}

export default Course;