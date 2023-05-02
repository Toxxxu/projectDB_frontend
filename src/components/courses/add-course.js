import React, { useState, useEffect } from 'react';
import TeacherService from '../../services/teachers';
import CourseService from '../../services/courses';

const AddCourse = () => {
    const [name, setName] = useState('');
    const [idTeacher, setIdTeacher] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');

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
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit}>
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
                    <input type="text" value={year}  onChange={(e) => setYear(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="text" value={price}  onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button type="submit">Add Course</button>
            </form>
        </div>
    )
}

export default AddCourse;