import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import TeacherService from '../../services/teachers';

const UpdateTeacher = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({
        full_name: "",
        email: "",
        age: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const teacherService = new TeacherService();

        const fetchTeacher = async () => {
            const data = await teacherService.get(id);
            setTeacher(data.data);
        }

        fetchTeacher();
    }, [id]);

    const onChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        const teacherService = new TeacherService();
        e.preventDefault();
        const teacherData = {
            full_name: teacher.full_name,
            email: teacher.email,
            age: teacher.age,
        }
        const response = await teacherService.update(id, teacherData);
        console.log(response);
        setTeacher({
            full_name: '',
            email: '',
            age: '',
        });
        navigate('/');
    }

    return (
        <div>
            <h1>Update Teacher</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={teacher.full_name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={teacher.email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={teacher.age}
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Update Teacher</button>
            </form>
        </div>
    )

}

export default UpdateTeacher;