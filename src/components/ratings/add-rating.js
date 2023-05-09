import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import CourseRatingService from '../../services/courseratings';
import StudentService from '../../services/students';
import CourseService from '../../services/courses';

const AddRating = () => {
    const [idStudent, setIdStudent] = useState('');
    const [idCourse, setIdCourse] = useState('');
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState('');

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const courseratingService = new CourseRatingService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ratingData = {
            student_id: idStudent,
            course_id: idCourse,
            comment: comment,
            rating: rate,
        };
        const response = await courseratingService.create(ratingData);
        console.log(response);
        setIdStudent('');
        setIdCourse('');
        setComment('');
        setRate('');
    }

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudents = async () => {
            const data = await studentService.getAll();
            setStudents(data.data);
        }

        fetchStudents();
    }, [])

    useEffect(() => {
        const courseService = new CourseService();

        const fetchCourses = async () => {
            const data = await courseService.getAll();
            setCourses(data.data);
        }
        fetchCourses();
    }, [])

    const handleChangeStudent = (event) => {
        setIdStudent(event.target.value);
    }
    
    const handleChangeCourse = (event) => {
        setIdCourse(event.target.value);
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg='secondary'>Add Rating</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Student:</Form.Label>
                        <Form.Select onChange={handleChangeStudent}>
                            {students.map((student) => (
                                <option key={student.id_student} value={student.id_student}>{student.full_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Course:</Form.Label>
                        <Form.Select onChange={handleChangeCourse}>
                            {courses.map((course) => (
                                <option key={course.id_course} value={course.id_course}>{course.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Rate:</Form.Label>
                        <Form.Control type='number' value={rate} onChange={(e) => setRate(e.target.value)} placeholder='1-5' />
                    </Form.Group>
                    <Button href='/ratings' type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/ratings' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddRating;