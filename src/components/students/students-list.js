import React, { useState, useEffect } from 'react';
import StudentService from '../../services/students';

const Students = () => {
    const [students, setStudents] = useState([]);

    const studentService = new StudentService();

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await studentService.getAll();
            setStudents(data.data);
        }
        fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id_student}>{student.full_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Students;