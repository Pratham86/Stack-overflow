import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import icon from "../../assets/icon.png";
import AboutAuth from './AboutAuth';
import { signup , login } from '../../actions/auth';
import "./Auth.css"

const Auth = () => {
    const [isSignup , setIsSignup] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const handleSwitch = () =>{
        setIsSignup(value => !value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!email || !password){
            alert("Enter e-mail and password")
        }

        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch( signup({name , email , password} , navigate));
        }
        else{
            dispatch(login({ email , password} , navigate))
        }
        
        
    }

    return (
        <section className='auth-section'>
            {isSignup && <AboutAuth />}

            <div className = 'auth-container-2'>
                {!isSignup && <img src = {icon} alt = 'stack overflow' className='login-logo'/> }
                <form onSubmit={(e) => handleSubmit(e)}>
                    {isSignup && 
                        (<label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type = "text" id = "name" onChange = {(e) => setName(e.target.value)}/>
                        </label>)
                    }

                    <label htmlFor='email'>
                        <h4>Email</h4>
                        <input type = "email" name = "email" id = "email" onChange = {(e) => setEmail(e.target.value)}/>
                    </label>

                     
                    <label htmlFor='password'>
                        <div style = {{display : "flex" , justifyContent : "space-between"}}>
                            <h4>Password</h4>
                            {!isSignup && <p style = {{color : "#007ac6" , fontSize : "13px"}}>Forgot Password</p>}
                        </div>
                        <input type = "password" name = "password" id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                    </label>


                    {isSignup && <p style = {{color : "#666767" , fontSize : "13px"}}>Password must contain atleast 8 <br/> characters , including atleast one letter <br/> and one number </p>}

                    {isSignup && (
                        <label htmlFor='check' className='checkbox' style = {{display : "flex"}}>
                            <input type= "checkbox" id = "check" style={{height : "13px" , width : "15%" , margin : "10px 1px" }}/>
                            <p style = {{fontSize : "13px"}}>Opt-in to receive occassional,<br/>product updates,user research invitations,<br/> company announcements and digests.</p>

                        </label>
                    )}
                    

                    <button type = 'submit' className='auth-btn' >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>

                    {isSignup && <p style = {{color : "#666767" , fontSize : "13px"}}>By clicking "Sign Up", you agree to our 
                        <span style = {{color : "#007ac6"}}> terms of <br/> services</span>, <span style = {{color : "#007ac6"}}> privacy policy </span> and <span style = {{color : "#007ac6"}}> cookie policy </span> </p>}
                </form>

                <div className='switching-area'>

                    <p>
                        {isSignup ? "Already have an account ?" : "Don't have an account?"}
                    </p>
                    <button type = 'button' className='handle-switch-btn'
                    onClick={handleSwitch}
                    >
                        {isSignup ? "Login" : "Sign up"}
                    </button>

                </div>
            </div>
        </section>
        
    )
}

export default Auth;