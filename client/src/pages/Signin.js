import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SigninAction } from "../actions/signinAction";
import ErrorMsg from "./ErrorMsg";
import Loading from "./Loading";

const Signin = (props)=>{
    const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("") 
   const userSignin = useSelector(state => state.userSignin)
   const {userInfo, loading, error} = userSignin;
   const redirect = props.location.search? props.location.search.split("=")[1] : "/";

  const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(SigninAction(email, password))
  }  
  useEffect(()=>{
      if(userInfo){
          props.history.push(redirect)
      }
  },[userInfo, props.history, redirect])

    return (<div>
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <h1>Sign In</h1>
            </div>
            <div>
            {loading && <Loading></Loading>}
            {error && <ErrorMsg variant="danger"> Invalid Password {error.message}</ErrorMsg>}
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
                <label/>
                <button className="primary" type="submit">Sign in</button>
            </div>
            <div><label/>
              <div>New Customer? {" "}
              <Link to={`/register?redirect=${redirect}`}> Create an Account</Link>
              </div>
            </div>
        </form>
    </div>)
}
export default Signin;