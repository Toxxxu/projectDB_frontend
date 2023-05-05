import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Routes } from 'react-router-dom';
import TeacherService from '../../services/teachers';
import CourseService from '../../services/courses';
import { useParams } from "react-router-dom";
import AddTeacher from './add-teacher';
import UpdateTeacher from './update-teacher';

const Teacher = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({
        full_name: "",
        email: "",
        age: "",
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeacher = async () => {
            const data = await teacherService.get(id);
            // console.log(data.data);
            setTeacher(data.data);
        }

        fetchTeacher();
    }, [id]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getByTeacherId(id);
            setCourses(data.data);
        };
        
        fetchCourses();
    }, [id]);

    const handleDelete = async (id) => {
        const teacherService = new TeacherService();
  
        const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
  
        if (confirmDelete) {
            await teacherService.delete(id);
            setTeacher((prevTeachers) => prevTeachers.filter((teacher) => teacher.id_teacher !== id));
        }
    }

    return (
        <div>
            <div className='main-txt'>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>{teacher.full_name}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>{teacher.email}</Card.Subtitle>
                        <Card.Text>
                            Age: {teacher.age}<br />
                        </Card.Text>
                        <Card.Link href={`/updateTeacher/${teacher.id_teacher}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                        <Card.Link href='/' onClick={() => handleDelete(teacher.id_teacher)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                    </Card.Body>
                </Card>
            </div>
            <br />
            <div className='main-txt'>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id_course}>
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <Card.Title>{course.name}</Card.Title>
                                    <Card.Text>
                                        Year: {course.year}<br />
                                        Price: {course.price}<br />
                                    </Card.Text>
                                    <Card.Link href={`/updateCourse/${course.id_course}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                                    <Card.Link href='/' onClick={() => handleDelete(course.id_teacher)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                                </Card.Body>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            <Routes>
                <Route path="/addTeacher" element={<AddTeacher />} />
                <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
          </Routes>
        </div>
    )
}

export default Teacher;