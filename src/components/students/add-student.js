import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CourseService from '../../services/courses';
import StudentService from '../../services/students';

const AddStudent = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [idCourse, setIdCourse] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const studentService = new StudentService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = {
            full_name: fullName,
            email: email,
            id_course: idCourse,
            age: age,
        };
        const response = await studentService.create(studentData);
        console.log(response);
        setFullName('');
        setEmail('');
        setIdCourse('');
        setAge('');
        navigate('/students');
    }

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourses();
    }, []);

    const handleChange = (event) => {
        setIdCourse(event.target.value);
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Add Student</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='John Doe' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@example.com' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Course:</Form.Label>
                        <Form.Select onChange={handleChange}>
                            {courses.map((course) => (
                                <option key={course.id_course} value={course.id_course}>{course.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Age:</Form.Label>
                        <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='30' />
                    </Form.Group>
                    <Button type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/students' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" value={fullName}  onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Course:
                    <select value={idCourse} onChange={handleChange}>
                        {courses.map((course) => (
                            <option key={course.id_course} value={course.id_course}>{course.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <button type="submit">Add Student</button>
            </form> */}
        </div>
    )
}

export default AddStudent;