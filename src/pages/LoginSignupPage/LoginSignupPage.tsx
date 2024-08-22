
import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import env from "react-dotenv";

import './style/loginSignup.css'
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

import Signup from "../../components/SignupForm/Signup";
import Login from "../../components/LoginForm/Login"

const LoginSignupPage = () => {
    const context = useContext(Context)
    if (!context) throw new Error('useContext must be used within a Provider')

    const { loginSignupState } = context;
    const [loginSignup, setLoginSignup] = loginSignupState;
    console.log(loginSignup)
    return (

        <div className="loginSignupPage">
            {
                loginSignup === 'signup' 
                ?
                <Signup/> 
                :
                <Login/>
            }           
        </div>
    )

}

export default LoginSignupPage