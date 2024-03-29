import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from "react-router-dom";
import CourseService from '../../services/courses';
import TeacherService from '../../services/teachers';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({
        name: "",
        id_teacher: "",
        year: "",
        price: "",
    });
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourse = async () => {
            const data = await courseService.get(id);
            setCourse(data.data);
        };
        
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

    const onChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        const courseService = new CourseService();
        e.preventDefault();
        const courseData = {
            name: course.name,
            id_teacher: course.id_teacher,
            year: course.year,
            price: course.price,
        }
        const response = await courseService.update(id, courseData);
        console.log(response);
        setCourse({
            name: "",
            id_teacher: "",
            year: "",
            price: "",
        });
        navigate('/courses');
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Update Course</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type='text' name='name' value={course.name} onChange={onChange} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Teacher:</Form.Label>
                        <Form.Select value={course.id_teacher} name="id_teacher" onChange={onChange}>
                            {teachers.map((teacher) => (
                                <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.full_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control type='number' name='year' value={course.year} onChange={onChange} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type='number' name='price' value={course.price} onChange={onChange} />
                    </Form.Group>
                    <Button href='/courses' type='submit' variant="primary" style={{ alignContent: 'center' }}>Update</Button>
                    <Button href='/courses' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
            {/* <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={onChange}
                        />
                </div>
                <div>
                    <label>Teacher</label>
                    <select value={course.id_teacher} name="id_teacher" onChange={onChange}>
                        {teachers.map((teacher) => (
                            <option key={teacher.id_teacher} value={teacher.id_teacher}>{teacher.full_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Year</label>
                        <input
                            type="number"
                            name="year"
                            value={course.year}
                            onChange={onChange}
                        />
                </div>
                <div>
                    <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            value={course.price}
                            onChange={onChange}
                        />
                </div>
                <button type="submit">Update Course</button>
            </form> */}
        </div>
    )
}

export default UpdateCourse;