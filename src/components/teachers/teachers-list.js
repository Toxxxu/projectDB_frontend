import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import TeacherService from '../../services/teachers';
import AddTeacher from './add-teacher';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };

        fetchTeachers();
    }, []);

    // console.log(teachers);

    return (
        <div>
          <h1>Teachers</h1>
          <Link to="/addTeacher">Add teacher</Link>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id_teacher}>{teacher.full_name}</li>
            ))}
          </ul>
          <Routes>
            <Route path="/addTeacher" element={<AddTeacher />} />
          </Routes>
        </div>
    )
}

export default Teachers;