import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import StudentService from '../../services/students';
import AddStudent from './add-student';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudents = async () => {
            const data = await studentService.getAll();
            setStudents(data.data);
        }

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Students</h1>
            <Link to="/addStudent">Add student</Link>
            <ul>
                {students.map((student) => (
                    <li key={student.id_student}>{student.full_name}</li>
                ))}
            </ul>
            <Routes>
                <Route path="/addStudent" element={<AddStudent />} />
            </Routes>
        </div>
    )
}

export default Students;