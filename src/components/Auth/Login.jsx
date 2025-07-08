import React, { useContext } from 'react';
import AuthContext from './AuthContext';

import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
  const {loginUser}=useContext(AuthContext)
  const location = useLocation();
  const navigate= useNavigate();
  const from =location.state|| '/';
  const handleLogIn = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email,password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('log in',user);
      navigate(from);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });

  }

    return (
        <div className="hero bg-base-200 min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <div><h1 className="text-5xl font-bold flex items-center gap-2">Login now! </h1>
  
      </div>
      
    
      <img src="https://i.ibb.co.com/dgY6rcV/computer.png" alt="" />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleLogIn}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6 flex flex-col items-center">
          <button className="btn btn-primary w-full max-w-xs">Login</button>
          
        </div>
       
      </form>
     
    </div>
  </div>
</div>
    );
};

export default Login;