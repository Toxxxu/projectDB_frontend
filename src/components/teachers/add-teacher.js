import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import TeacherService from '../../services/teachers';

const AddTeacher = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const teacherService = new TeacherService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teacherData = {
            full_name: fullName,
            email: email,
            age: age,
        };
        const response = await teacherService.create(teacherData);
        console.log(response);
        setFullName('');
        setEmail('');
        setAge('');
        navigate('/');
    };

    return (
        <div>
            <div className='main-txt'>
                <h1>
                    <Badge bg="secondary">Add Teacher</Badge>
                </h1>
            </div>
            <div className='main-txt'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='John Doe' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@example.com' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                        <Form.Label>Age:</Form.Label>
                        <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='30' />
                    </Form.Group>
                    <Button href='/' type='submit' variant="primary" style={{ alignContent: 'center' }}>Add</Button>
                    <Button href='/' type='reset' variant="danger" style={{ alignContent: 'center' }}>Cancel</Button>
                </Form>
            </div>
            {/* <h1>Add Teacher</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <button type="submit">Add Teacher</button>
            </form> */}
        </div>
    );
};

export default AddTeacher;