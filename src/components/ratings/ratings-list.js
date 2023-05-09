import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Link, Routes } from 'react-router-dom';
import CourseRatingService from '../../services/courseratings';
import StudentService from '../../services/students';
import CourseService from '../../services/courses';
import AddRating from './add-rating';
import UpdateRating from './update-rating';

const Ratings = () => {
    const [ratings, setRatings] = useState([]);

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const courseratingService = new CourseRatingService();

        const fetchRatings = async () => {
            const data = await courseratingService.getAll();
            setRatings(data.data);
        }

        fetchRatings();
    }, []);

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

    const handleDelete = async (id) => {
        const courseratingService = new CourseRatingService();

        const confirmDelete = window.confirm('Are you sure you want to delete this rating?');

        if (confirmDelete) {
            await courseratingService.delete(id);
            setRatings((prevRating) => prevRating.filter((rating) => rating.id !== id));
        }
    }

    return (
        <div>
            <div className='main-txt'>
                <h1 className='main'>
                    <Badge bg="secondary">Ratings</Badge>
                </h1>
                <h2>
                    <Link to="/addRating">
                        <Badge bg="success">Add Ratings <FontAwesomeIcon icon="fa-solid fa-square-plus" size="lg" /></Badge>
                    </Link>
                </h2>
            </div>
            <ul>
                {ratings.map((rating) => (
                    <li key={rating.id}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>{students.map((student) => (rating.student_id === student.id_student ? student.full_name : ""))}</Card.Title>
                                <Card.Subtitle>{courses.map((course) => (rating.course_id === course.id_course ? course.name : ""))}</Card.Subtitle>
                                <Card.Text>
                                    Comment: {rating.comment} <br />
                                    Rating: {rating.rating} <br />
                                </Card.Text>
                                {/* <Card.Link href={`/rating/${rating.id}`}><FontAwesomeIcon icon="fa-solid fa-eye" /></Card.Link> */}
                                <Card.Link href={`/updateRating/${rating.id}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                                <Card.Link href='/ratings' onClick={() => handleDelete(rating.id)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ul>
            <Routes>
                {/* <Route path="/rating/:id" /> */}
                <Route path="/addRating" element={<AddRating />} />
                <Route path="/updateRating/:id" element={<UpdateRating />} />
            </Routes>
        </div>
    )
}

export default Ratings;