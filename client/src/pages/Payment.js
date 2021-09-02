import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { paymentAction } from "../actions/cartActions";
import CheckoutSteps from "../components/checkoutSteps";

const Payment = (props) =>{
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal") ;
  
  const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(paymentAction({paymentMethod}))
      props.history.push("/placeorder")

  } 

    return(
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={handleSubmit}>
                <div><h1>Pick a Payment Method</h1></div>
                <div>
                    <div>
                    <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={e=> setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                    <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={e=> setPaymentMethod(e.target.value)}/>
                    <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <div>
                    <input type="radio" id="cash" value="Cash" name="paymentMethod" required onChange={e=> setPaymentMethod(e.target.value)}/>
                    <label htmlFor="cash">Cash on Delivery</label>
                    </div>
                </div>
                <div>
                    <button className="primary">Continue</button>
                </div>
            </form>
        </div>
    )
}
export default Payment;