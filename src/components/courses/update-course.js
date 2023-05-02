import React, { useState, useEffect } from 'react';
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
            <h1>Update Course</h1>
            <form onSubmit={onSubmit}>
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
            </form>
        </div>
    )
}

export default UpdateCourse;