import React, { useState } from 'react'
import '../../App.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return(
    <>
    <div align="center">
      <form>
        <label for="email">email</label>
        <input defaultValue={email} type="email" placeholder='youremail@email.com' id="email" name="email"/>

        <label for="password">passwordl</label>
        <input  defaultValue={password} type="password" placeholder='***********' id="password" name="password"/>
        <button type="submit">Login</button>
      </form>
      <button>Don't have an account? Register here.</button>
      </div>
    </>
  );

}