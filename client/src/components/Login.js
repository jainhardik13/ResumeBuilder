import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: ''});

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            localStorage.setItem('userId', res.data.user._id);
            alert("Welcome " + res.data.user.name);

            window.location.href = "/resume";
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='Email' onChange={handleChange} />
            <input type='password' name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;