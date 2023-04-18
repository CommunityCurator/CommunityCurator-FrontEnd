import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    const url = 'http://localhost:8000/api/users/';
    const data = {
      first_name: first,
      last_name: last,
      user_name: username,
      email: email,
      password: password,
      city: city,
      state: state,
      zip: zip,
      bio: '',
      created_at: '',
      image: '',
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        if (data.user.id) {
          localStorage.setItem('currentUser', data.user.id);
          let url = `/user/${data.user.id}/interests`;
          navigate(url);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('HERE');
      });
  }

  return (
    <div align="center">
      <form
        className="m-2 py-8 px-8 w-full max-w-lg"
        onSubmit={handleSignup}
      >
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          id="grid-first-name"
          placeholder="First Name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          id="grid-last-name"
          placeholder="Last Name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          id="grid-user-name"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          id="grid-email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          id="grid-password"
          type="password"
          placeholder="******************"
          value={password}
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-gray-600 text-xs italic md:text-left">
          At least 8 characters
        </p>
        <TextField
          fullWidth
          margin="normal"
          label="City"
          id="grid-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="State"
          id="grid-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Zip"
          id="grid-zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
