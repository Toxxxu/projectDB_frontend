import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import TeacherService from '../../services/teachers';
import CourseService from '../../services/courses';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [idTeacher, setIdTeacher] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);

    const courseService = new CourseService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = {
            name: name,
            id_teacher: idTeacher,
            year: year,
            price: price,
        };
        const response = await courseService.create(courseData);
        console.log(response);
        setName('');
        setIdTeacher('');
        setYear('');
        setPrice('');
        navigate('/courses');
    }

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };

        fetchTeachers();
    }, [])

    const handleChange = (event) => {
        setIdTeacher(event.target.value);
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Add Course</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Node.js' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Teacher:</Form.Label>
                        <Form.Select onChange={handleChange}>
                            {teachers.map((teacher) => (
                                <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.full_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control type='number' value={year} onChange={(e) => setYear(e.target.value)} placeholder='2010' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='1000' />
                    </Form.Group>
                    <Button type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/courses' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name}  onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Teacher:
                    <select value={idTeacher} onChange={handleChange}>
                        {teachers.map((teacher) => (
                            <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.full_name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Year:
                    <input type="number" value={year}  onChange={(e) => setYear(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="number" value={price}  onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button type="submit">Add Course</button>
            </form> */}
        </div>
    )
}

export default AddCourse;