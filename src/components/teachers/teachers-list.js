import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import TeacherService from '../../services/teachers';
import AddTeacher from './add-teacher';
import UpdateTeacher from './update-teacher';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };

        fetchTeachers();
    }, []);

    const handleDelete = async (id) => {
      const teacherService = new TeacherService();

      const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');

      if (confirmDelete) {
        await teacherService.delete(id);
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id_teacher !== id));
        navigate('/');
      }
    }

    return (
        <div>
          <h1>Teachers</h1>
          <Link to="/addTeacher">Add teacher</Link>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id_teacher}>
                <Link to={`/updateTeacher/${teacher.id_teacher}`}>{teacher.full_name}</Link>
                <button onClick={() => handleDelete(teacher.id_teacher)}>Delete</button>
              </li>
            ))}
          </ul>
          <Routes>
            <Route path="/addTeacher" element={<AddTeacher />} />
            <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
          </Routes>
        </div>
    )
}

export default Teachers;