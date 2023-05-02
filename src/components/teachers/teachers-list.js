import React, { useState, useEffect } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import TeacherService from '../../services/teachers';
import AddTeacher from './add-teacher';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    const teacherService = new TeacherService();

    useEffect(() => {
        const fetchTeachers = async () => {
            const data = await teacherService.getAll();
            setTeachers(data.data);
        };
        fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <Route path="/addTeacher" element={<AddTeacher />} />
        </div>
    )
}

export default Teachers;