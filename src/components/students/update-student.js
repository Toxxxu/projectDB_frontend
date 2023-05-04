import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from "react-router-dom";
import CourseService from '../../services/courses';
import StudentService from '../../services/students';

const UpdateStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({
        full_name: "",
        email: "",
        id_course: "",
        age: "",
    });
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudent = async () => {
            const data = await studentService.get(id);
            setStudent(data.data);
        }

        fetchStudent();
    }, [id]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourse = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        };
        
        fetchCourse();
    }, []);

    const onChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        const studentService = new StudentService();
        e.preventDefault();
        const studentData = {
            full_name: student.full_name,
            email: student.email,
            id_course: student.id_course,
            age: student.age,
        }
        const response = await studentService.update(id, studentData);
        console.log(response);
        setStudent({
            full_name: "",
            email: "",
            id_course: "",
            age: "",
        });
        navigate('/students');
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Update Student</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type='text' name='full_name' value={student.full_name} onChange={onChange} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' name='email' value={student.email} onChange={onChange} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Course:</Form.Label>
                        <Form.Select value={student.id_course} name="id_course" onChange={onChange}>
                            {courses.map((course) => (
                                <option key={course.id_course} value={course.id_course}>{course.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Age:</Form.Label>
                        <Form.Control type='number' name='age' value={student.age} onChange={onChange} />
                    </Form.Group>
                    <Button type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/students' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
            {/* <form onSubmit={onSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={student.full_name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Course</label>
                    <select value={student.id_course} name="id_course" onChange={onChange}>
                        {courses.map((course) => (
                            <option key={course.id_course} value={course.id_course}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Update Student</button>
            </form> */}
        </div>
    )
}

export default UpdateStudent;