import React, { useState, useEffect } from 'react';
import CourseService from '../../services/courses';
import StudentService from '../../services/students';

const AddStudent = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [idCourse, setIdCourse] = useState('');
    const [age, setAge] = useState('');

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
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" value={fullName}  onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <button type="submit">Add Course</button>
            </form>
        </div>
    )
}

export default AddStudent;