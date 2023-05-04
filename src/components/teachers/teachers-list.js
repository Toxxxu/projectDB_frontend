import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
          <div className='main-txt'>
            <h1 className='main'>
              <Badge bg="secondary">Teachers</Badge>
            </h1>
            <h2>
              <Link to="/addTeacher" className='main'>
                <Badge bg="success">Add teacher <FontAwesomeIcon icon="fa-solid fa-user-plus" size="lg" /></Badge>
              </Link>
            </h2>
          </div>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id_teacher} className='show-up'>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{teacher.full_name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>{teacher.email}</Card.Subtitle>
                    <Card.Text>
                      Age: {teacher.age}<br />
                    </Card.Text>
                    <Card.Link href={`/updateTeacher/${teacher.id_teacher}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Card.Link>
                    <Card.Link href='/' onClick={() => handleDelete(teacher.id_teacher)}><FontAwesomeIcon icon="fa-solid fa-trash" /></Card.Link>
                  </Card.Body>
                </Card>
                {/* {teacher.full_name}
                <Link to={`/updateTeacher/${teacher.id_teacher}`}><FontAwesomeIcon icon="fa-solid fa-pen" style={{color: "#1a54b7",}} /></Link>
                <button onClick={() => handleDelete(teacher.id_teacher)} className='btn-trash'><FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#ffffff",}} /></button> */}
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