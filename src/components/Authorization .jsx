import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MyAuthorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://apitest.reachstar.io/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        setLoggedIn(true);
        localStorage.setItem('success', true);
        navigate('/news', { state: { email: username } });
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'blue',
    marginLeft: '5px', 
    fontSize: '16px' 
  };

  return (
    <div className="auth-container">
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id}>
                <label>{input.label}</label><br />
                <input
                  type={input.type}
                  value={input.name === 'username' ? username : password}
                  onChange={(e) => (input.name === 'username' ? setUsername(e.target.value) : setPassword(e.target.value))}
                  placeholder={input.placeholder}
                  required={input.required}
                  pattern={input.pattern}
                  style={{ width: '100%' }} 
                />
                <br />
              </div>
            ))}

            <button className="submit" type="submit">Login</button>
            <div className="register-container">
              <p className='account'>Don't have an account?</p>
              <Link style={linkStyle} to="/register">Register</Link>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default MyAuthorization;
