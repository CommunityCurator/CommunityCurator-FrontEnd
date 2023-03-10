import React, { useState } from 'react'
import '../App.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(e){
    e.preventDefault();
    const url = 'http://localhost:8000/api/token/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });
  }

  return(
    <>
    <div align="center">
      <form className="m-2 py-8 px-8 w-full max-w-sm" id="user" onSubmit={login}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              defaultValue={email} 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
              id="email" 
              type="text" 
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
              defaultValue={password} 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
              id="password" 
              type="password" 
              placeholder="******************"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox"/>
                <span className="text-sm">
                  Stay signed in
                </span>
            </label>
          </div>
        <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              Log in
            </button>
          </div>
        </div>

        <div className=" block mx-auto md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
              <p className="text-sm">
                Don't have an account? <a href='/signup'><u> Register</u></a>
              </p>
          </label>
        </div>
    </form>
  </div>
    </>
  );

}