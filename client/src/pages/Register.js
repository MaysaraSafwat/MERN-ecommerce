import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RegisterAction } from "../actions/signinAction";

import ErrorMsg from "./ErrorMsg";
import Loading from "./Loading";

const Register = (props)=>{
    const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("") 
   const [confirmPassword, setConfirmPassword] = useState("") 
   const [name, setName] = useState("") 
   const userSignin = useSelector(state => state.userSignin)
   const {userInfo, loading, error} = userSignin;
   const redirect = props.location.search? props.location.search.split("=")[1] : "/";

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(password !== confirmPassword){
          alert("password and confirm password don't match")
      } else{
        dispatch(RegisterAction(name,email, password)) 
      }
      dispatch(RegisterAction(name,email, password))
  }  
  useEffect(()=>{
      if(userInfo){
          props.history.push(redirect)
      }
  },[userInfo, props.history, redirect])

    return (<div>
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <h1>Create an Account</h1>
            </div>
            <div>
            {loading && <Loading></Loading>}
            {error && <ErrorMsg variant="danger">{error.message}</ErrorMsg>}
            </div>
            <div>
                <label htmlFor="name" >Name</label>
                <input type="text" id="name" placeholder="Enter your Name" required 
                onChange={e=> setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email" >Email Address </label>
                <input type="email" id="email" placeholder="Enter your Email" required 
                onChange={e=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password" >Password  </label>
                <input type="password" id="password" placeholder="Enter your Password" required 
                onChange={e=> setPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="confirmPassword" >Confirm Password  </label>
                <input type="password" id="confirmPassword" placeholder="Confirm your Password" required 
                onChange={e=> setConfirmPassword(e.target.value)}/>
            </div>
            <div>
                <label/>
                <button className="primary" type="submit">Create Account</button>
            </div>
            <div><label/>
              <div>Already Have an Account? {" "}
              <Link to={`/signin?redirect=${redirect}`}> Sign In</Link>
              </div>
            </div>
        </form>
    </div>)
}
export default Register;