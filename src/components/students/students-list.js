import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import StudentService from '../../services/students';
import AddStudent from './add-student';
import UpdateStudent from './update-student';

const Students = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const studentService = new StudentService();

        const fetchStudents = async () => {
            const data = await studentService.getAll();
            setStudents(data.data);
        }

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        const studentService = new StudentService();
  
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
  
        if (confirmDelete) {
          await studentService.delete(id);
          setStudents((prevStudents) => prevStudents.filter((student) => student.id_student !== id));
          navigate('/students');
        }
    }

    return (
        <div>
            <h1>Students</h1>
            <Link to="/addStudent">Add student <FontAwesomeIcon icon="fa-solid fa-user-plus" size="lg" /></Link>
            <ul>
                {students.map((student) => (
                    <li key={student.id_student}>
                        {student.full_name}
                        <Link to={`/updateStudent/${student.id_student}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Link>
                        <button onClick={() => handleDelete(student.id_student)} className='btn-trash'><FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#ffffff",}} /></button>
                    </li>
                ))}
            </ul>
            <Routes>
                <Route path="/addStudent" element={<AddStudent />} />
                <Route path="updateStudent/:id" element={<UpdateStudent />} />
            </Routes>
        </div>
    )
}

export default Students;