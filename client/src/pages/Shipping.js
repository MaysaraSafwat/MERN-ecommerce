import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shippingAction } from "../actions/cartActions";

import CheckoutSteps from "../components/checkoutSteps";

const Shipping = (props)=>{
    const userSignin = useSelector( state=> state.userSignin)
    const {userInfo} = userSignin;

  if (!userInfo){
        props.history.push('/signin')
  }  
  const cart= useSelector( state=> state.cart)
  const {shippingInfo} = cart;
   const [fullName, setFullname]= useState(shippingInfo.fullName) 
   const [address, setAddress]= useState(shippingInfo.address) 
   const [postalCode, setPostalcode]= useState(shippingInfo.postalCode) 
   const [city, setCity]= useState(shippingInfo.city) 
   const [country, setCountry]= useState(shippingInfo.country) 
   const dispatch = useDispatch();
   const handleSubmit = (e)=>{
       e.preventDefault();
       dispatch(shippingAction({fullName, address,postalCode,city,country}))
       props.history.push("/payment")
   }
     
   return (
       <div>
           <CheckoutSteps step1 step2></CheckoutSteps>

           <form className="form" onSubmit={handleSubmit}>
               <div>
                   <h1>Shipping</h1>
                   </div>
                   <div>
                       <label htmlFor="fullName">Full Name</label>
                       <input tye="text" id="fullName" placeholder="Enter Full Name" onChange={e=> setFullname(e.target.value)}></input>
                   </div>
                   <div>
                       <label htmlFor="address"> Address</label>
                       <input tye="text" id="address" placeholder="Enter Address" onChange={e=> setAddress(e.target.value)}></input>
                   </div>
                   <div>
                       <label htmlFor="postalCode"> Postal Code</label>
                       <input tye="text" id="postalCode" placeholder="Enter City" onChange={e=> setPostalcode(e.target.value)}></input>
                   </div>
                   <div>
                       <label htmlFor="city"> City</label>
                       <input tye="text" id="city" placeholder="Enter City" onChange={e=> setCity(e.target.value)}></input>
                   </div>
                   <div>
                       <label htmlFor="country"> Country</label>
                       <input tye="text" id="country" placeholder="Enter City" onChange={e=> setCountry(e.target.value)}></input>
                   </div>
                   <div>
                      <label />
                      <button className="primary" type="submit">
                        Continue
                     </button>
        </div>
           </form>
       </div>
   ) 
}
export default Shipping