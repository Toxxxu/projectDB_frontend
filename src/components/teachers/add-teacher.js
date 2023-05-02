import React, { useState } from 'react';
import TeacherService from '../../services/teachers';

const AddTeacher = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

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
    };

    return (
        <div>
            <h1>Add Teacher</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Age:
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <button type="submit">Add Teacher</button>
            </form>
        </div>
    );
};

export default AddTeacher;