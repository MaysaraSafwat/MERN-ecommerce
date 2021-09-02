import Axios from "axios"
import { UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST,
    USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS } from "../actionTypes/signinActionTypes"

export const SigninAction = (email, password)=> async(dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST, payload : {email,password}})

    try {
        const {data}= await Axios.post("/api/users/signin", {email, password})
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }catch (error){
        dispatch({type:USER_SIGNIN_FAIL, payload :  error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}

export const RegisterAction = (name , email, password) => async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST, payload : {email,password}})

    try {
        const {data}= await Axios.post("/api/users/register", {name,email, password})
        dispatch({type:USER_REGISTER_SUCCESS, payload: data})
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }catch (error){
        dispatch({type:USER_REGISTER_FAIL, payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,})
    }
}


export const SignoutAction = ()=> (dispatch)=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    dispatch({type: USER_SIGNIN_SIGNOUT});
}

export const userDetailsAction = (userId)=> async (dispatch, getState)=>{
    dispatch({type : USER_DETAILS_REQUEST , payload : userId});
    const {userSignin : {userInfo}} = getState();
    try {
        const {data} = await Axios.get(`/api/users/${userId}` , {headers : {
            Authorization :  `Bearer ${userInfo.token}`
        }});
        dispatch({type : USER_DETAILS_SUCCESS , payload :data})
    } catch(error){
        dispatch({type : USER_DETAILS_FAIL , payload :error.response && error.response.data.message
            ? error.response.data.message
            : error.message })
    }
}

export const updateUserProfileAction = (user)=> async(dispatch, getState)=>{
   dispatch({type : UPDATE_USER_PROFILE_REQUEST , payload : user})
   const {userSignin : {userInfo}} = getState();
   try{
       const {data} = await Axios.put('/api/users/profile', user , {headers : {
           Authorization :   `Bearer ${userInfo.token}`
       }})
       dispatch({type : USER_DETAILS_SUCCESS, payload : data});
       dispatch({type : USER_SIGNIN_SUCCESS , payload : data});
       localStorage.setItem("userInfo", JSON.stringify(data))
   }catch(error){
    dispatch({type : UPDATE_USER_PROFILE_FAIL , payload :error.response && error.response.data.message
        ? error.response.data.message
        : error.message })
   }
}