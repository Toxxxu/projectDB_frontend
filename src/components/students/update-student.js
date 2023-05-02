import React, { useState, useEffect } from 'react';
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
            <h1>Update Student</h1>
            <form onSubmit={onSubmit}>
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
            </form>
        </div>
    )
}

export default UpdateStudent;