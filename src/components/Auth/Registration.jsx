import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import AuthContext from './AuthContext';
import AxiosPublic from './AxiosPublic';


const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const formData = e.target;

    const firstName = formData.firstName.value;
    const lastName = formData.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    const email = formData.email.value;
    const password = formData.password.value;
    const photoURL = formData.photoURL.value;
    const phone = formData.phone.value;
    const address = formData.address.value;
    const institution = formData.institution.value;
    const department = formData.department.value;
    const session = formData.session.value;

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: fullName,
          photoURL: photoURL,
        });
      })
      .then(() => {
        console.log("User profile updated successfully");
        alert("Registration Successful!");
        navigate('/');
         const userInfo={
             name : fullName,
             email : email
          }
          //save user info to db
          AxiosPublic().post('/users',userInfo)
          .then(res=>{
            if (res.data.insertedId) {
              alert("Registration Successful!");
              navigate('/'); // Redirect to home
            }
          })
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="px-10 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label"><span className="label-text">First Name</span></label>
              <input type="text" name="firstName" placeholder="First name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Last Name</span></label>
              <input type="text" name="lastName" placeholder="Last name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email (Gmail)</span></label>
              <input type="email" name="email" placeholder="Your email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="Your password" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input type="url" name="photoURL" placeholder="Profile photo URL" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Phone Number</span></label>
              <input type="tel" name="phone" placeholder="Phone number" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Address</span></label>
              <input type="text" name="address" placeholder="Your address" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">School/College/University</span></label>
              <input type="text" name="institution" placeholder="Institution name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Group/Department</span></label>
              <input type="text" name="department" placeholder="Your department" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Class/Session</span></label>
              <input type="text" name="session" placeholder="Your session" className="input input-bordered" required />
            </div>

            <div className="form-control mt-6 flex flex-col items-center">
              <button className="btn btn-primary btn-wide">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
