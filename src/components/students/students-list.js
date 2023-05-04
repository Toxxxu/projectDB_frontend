import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import StudentService from '../../services/students';
import AddStudent from './add-student';
import UpdateStudent from './update-student';
import CourseService from '../../services/courses';

const Students = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudents = async () => {
            const data = await studentService.getAll();
            setStudents(data.data);
        }

        fetchStudents();
    }, []);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        const studentService = new StudentService();
  
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
  
        if (confirmDelete) {
          await studentService.delete(id);
          setStudents((prevStudents) => prevStudents.filter((student) => student.id_student !== id));
          navigate('/students');
        }
    }

    return (
        <div>
            <div className='main-txt'>
                <h1 className='main'>
                    <Badge bg="secondary">Students</Badge>
                </h1>
                <h2>
                    <Link to="/addStudent">
                        <Badge bg="success">Add student <FontAwesomeIcon icon="fa-solid fa-user-plus" size="lg" /></Badge>
                    </Link>
                </h2>
            </div>
            <ul>
                {students.map((student) => (
                    <li key={student.id_student} className='show-up'>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{student.full_name}</Card.Title>
                                <Card.Subtitle className='mb-2 text-muted'>{student.email}</Card.Subtitle>
                                <Card.Text>
                                    Age: {student.age}<br />
                                    Course: {courses.map((course) => (student.id_course === course.id_course ? course.name : ""
                                        // <li key={course.id_course}>
                                                // { student.id_course === course.id_course ? course.name : "" }
                                        // </li>
                                    ))}<br />
                                </Card.Text>
                                <Card.Link href={`/updateStudent/${student.id_student}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                                <Card.Link href='/students' onClick={() => handleDelete(student.id_student)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                            </Card.Body>
                        </Card>
                        {/* {student.full_name}
                        <Link to={`/updateStudent/${student.id_student}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Link>
                        <button onClick={() => handleDelete(student.id_student)} className='btn-trash'><FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#ffffff",}} /></button> */}
                    </li>
                ))}
            </ul>
            <Routes>
                <Route path="/addStudent" element={<AddStudent />} />
                <Route path="updateStudent/:id" element={<UpdateStudent />} />
            </Routes>
        </div>
    )
}

export default Students;