import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const inputs = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'Please enter a valid email address!',
            label: 'Email',
            required: true,
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: 'Password should be 8-20 characters and include at least 1 lowercase letter, 1 uppercase letter, and 1 number!',
            label: 'Password',
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
            required: true,
        },

    ];

    const handleSubmit = async (event) => {
        try {
            const response = await fetch('https://apitest.reachstar.io/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                setRegistered(true);
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const getValue = (inputName) => {
        if (inputName === 'username') return username;
        if (inputName === 'email') return email;
        if (inputName === 'password') return password;
        return '';
    };

    return (
        <div className="auth-container">
            {registered ? (
                <div>
                    <h2>Registration Successful!</h2>
                    <Link to="/login">Login</Link>
                </div>
            ) : (
                <div>
                    <h2>Register</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form className="register-form" onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <div key={input.id} className="form-group">
                                <label>{input.label}</label>
                                <input
                                    type={input.type}
                                    value={getValue(input.name)}
                                    onChange={(e) => {
                                        if (input.name === 'username') setUsername(e.target.value);
                                        if (input.name === 'email') setEmail(e.target.value);
                                        if (input.name === 'password') setPassword(e.target.value);
                                    }}
                                    placeholder={input.placeholder}
                                    required={input.required}
                                    pattern={input.pattern}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                        <div className="login-container">
                            <p className='account'>Already have an account?</p>
                            <Link style={linkStyle} to="/">Login</Link>
                        </div>
                        <button className="submit" type="submit">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
};
const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    color: 'blue',
};
export default Register;
