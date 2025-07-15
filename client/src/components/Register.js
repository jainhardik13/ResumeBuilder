import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', form);
            alert(res.data.message);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Name' onChange={handleChange} />
            <input type='email' name='email' placeholder='Email' onChange={handleChange} />
            <input type='password' name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;