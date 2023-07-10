import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate = useNavigate();
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
            
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);//Storing the auth token to local storage
            navigate("/");
          }
          else{
            alert("Invalid credentials");
          }
        
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })  //jo bhi value is note object k andar h wo rhe par jo properties age likhe ja rhe h wo add ya overwrite kar de
      }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" value={credentials.password} name='password' />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
