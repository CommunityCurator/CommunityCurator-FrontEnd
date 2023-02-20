import React, { useState } from 'react'
import '../App.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
    }
  
    return(
    <>
    <div align="center">
        <form className="m-2 py-8 px-8 w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full px-3">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="password">
                        Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="firstname">
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="lasttname">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="password">
                        Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                     <p className="text-gray-600 text-xs italic md:text-left">At least 8 characters</p>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="password">
                        Re-enter Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="city">
                        City
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="City" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="state">
                        State
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" placeholder="State" />
                </div>
                 <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="zip">
                        Zip
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Zip code"/>
                </div>
            </div>

            <div className="py-3 px-3 md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-1/3">
                    <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Register
                    </button>
                </div>
            </div>
            <div className=" block mx-auto md:flex md:items-center mb-6">
                <div className="md:w-1/3 "></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                    <p className="text-sm">
                        Already have an account? <a href='/login'><u>Log in</u></a>
                    </p>
                </label>
             </div>
             
        </form>
    </div>

</>
);
}