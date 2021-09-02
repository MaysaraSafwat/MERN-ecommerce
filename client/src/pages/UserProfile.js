import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileAction, userDetailsAction } from "../actions/signinAction";
import Loading from "../pages/Loading";
import ErrorMsg from "../pages/ErrorMsg"

export default function UserProfile (){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateUserProfile = useSelector(state=>state.updateUserProfile);
    const {loading : loadingUpdate , error:errorUpdate , success: successUpdate} = updateUserProfile;
    const dispatch = useDispatch();
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state=> state.userDetails);
    const {user, loading , error} =  userDetails;
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
          alert("Confirm passwoed doesn't match Password")
        } else{
          dispatch(updateUserProfileAction({userId: user._id, name, email, password}))
        }
    }
    useEffect(()=>{
       if(!user){
        dispatch(userDetailsAction(userInfo._id))
       } else{
         setName(user.name);
         setEmail(user.email);
       }
    }, [dispatch , userInfo._id, user ])
    return (<div>
       <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <ErrorMsg variant="danger">{error}</ErrorMsg>
        ) : (
          <>
            {loadingUpdate && <Loading></Loading>}
            {errorUpdate && (
              <ErrorMsg variant="danger">{errorUpdate}</ErrorMsg>
            )}
            {successUpdate && (
              <ErrorMsg variant="success">
                Profile Updated Successfully
              </ErrorMsg>
            )}
            
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={e=> setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={e=> setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={e=> setConfirmPassword(e.target.value)}
              ></input>
            </div>
           
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>)
}