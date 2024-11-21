import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { FaLock, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../Components/transperantlogo.png";
import { useParams } from "react-router-dom";


const LoginRegister = () => {
    const URL = "https://game-sphere-backend.vercel.app";

    // Toggle between login and registration mode
    const [action, setAction] = useState('');

    //   const {gmail} = useParams(email);
    //   const {pass} = useParams(password);

    // Form fields
    const registerLink = () => {
        setAction(' active');
    }

    const loginLink = () => {
        setAction('');
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     if (!user) {
    //         window.location.href = `/`;
    //     }
    // }, []);


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            toast.error("All fields are required for registration!");
            return;
        }

        try {
            const res = await axios.post(`${URL}/createUser`, {
                username,
                email,
                password,
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            toast.success("Registration successful!");
            window.location.href = `/mainContent/${res.data._id}`;
        } catch (err) {
            toast.error("Registration failed. Please try again.");
            console.error(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required for login!");
            return;
        }


        axios.get(`${URL}/loginUser/${email}/${password}`)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                toast.success("Login successful!")
                console.log(res)
                window.location.href = `/mainContent/${res.data._id}`;
            })
            .catch(err => toast.error("Login failed. Please try again.",err))
        //   if (res.data.length > 0) {

        //   } else {
        //     toast.error("Invalid email or password!");
        //   }
    };


    return (
        <>
            <nav className="navbar fixed-top bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        Game Sphere
                    </a>
                </div>
            </nav>
            <div className="form-body">
                <div className={`wrapper${action}`}>
                    <div className='form-box login'>
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <IoIosMail className='icon' />
                            </div>
                            <div className="input-box">
                                <input type='Password' placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />
                                <FaLock className='icon' />
                            </div>

                        

                            <button type='submit'>Login</button>

                            <div className="register-link">
                                <p>New User?         <a href='#' onClick={registerLink}>Register</a></p>
                            </div>
                        </form>
                    </div>

                    <div className='form-box register'>
                        <form onSubmit={handleRegister}>
                            <h1>Registration</h1>
                            <div className="input-box">
                                <input type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <FaUser className='icon' />
                            </div>
                            <div className="input-box">
                                <input type='email' placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} required />
                                <IoIosMail className='icon' />
                            </div>
                            <div className="input-box">
                                <input type='Password' placeholder='Enter Password' value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />
                                <FaLock className='icon' />
                            </div>

                            {/* <div className="remember-forgot">
                                <lable><input type="checkbox" />I agree to the terms & conditions</lable>

                            </div> */}

                            <button type='submit'>Register</button>

                            <div className="register-link">
                                <p>Already have an account? <a href='#' onClick={loginLink}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginRegister;
