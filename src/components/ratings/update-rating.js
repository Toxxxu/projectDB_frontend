import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import CourseRatingService from '../../services/courseratings';
import StudentService from '../../services/students';
import CourseService from '../../services/courses';

const UpdateRating = () => {
    const { id } = useParams();
    const [rate, setRate] = useState({
        student_id: "",
        course_id: "",
        comment: "",
        rating: "",
    });

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const courseratingService = new CourseRatingService();

        const fetchRatings = async () => {
            const data = await courseratingService.get(id);
            setRate(data.data);
        };

        fetchRatings();
    }, [id]);

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
        }
        fetchCourses();
    }, []);

    const onChange = (e) => {
        setRate({ ...rate, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        const courseratingService = new CourseRatingService();
        e.preventDefault();
        const rateData = {
            student_id: rate.student_id,
            course_id: rate.course_id,
            comment: rate.comment,
            rating: rate.rating,
        }
        const response = await courseratingService.update(id, rateData);
        console.log(response);
        setRate({
            student_id: "",
            course_id: "",
            comment: "",
            rating: "",
        });
    }

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Update Rating</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Student:</Form.Label>
                        <Form.Select value={rate.student_id} name="student_id" onChange={onChange}>
                            {students.map((student) => (
                                <option key={student.id_student} value={student.id_student}>{student.full_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Course:</Form.Label>
                        <Form.Select value={rate.course_id} name="course_id" onChange={onChange}>
                            {courses.map((course) => (
                                <option key={course.id_course} value={course.id_course}>{course.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={rate.comment} name="comment" onChange={onChange} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Rate:</Form.Label>
                        <Form.Control type='number' name='rating' value={rate.rating} onChange={onChange} />
                    </Form.Group>
                    <Button href='/ratings' type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/ratings' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
        </div>
    )
}

export default UpdateRating;