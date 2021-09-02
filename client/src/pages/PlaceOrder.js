import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrderAction } from "../actions/orderActions";
import { CREATE_ORDER_RESET } from "../actionTypes/orderActionTypes";
import CheckoutSteps from "../components/checkoutSteps";
import Loading from "../pages/Loading";
import ErrorMsg from "../pages/ErrorMsg";

const PlaceOrder =(props)=>{
    
    const cart = useSelector(state=> state.cart);
    
    if (!cart.paymentMethod){
        props.history.push("/payment")
    }
    const dispatch =useDispatch();
    const toPrice = (num) => Number(num.toFixed(2));
    cart.priceOfItems = toPrice(cart.cartItems.reduce((a,c)=> a + c.qty * c.price, 0));
    cart.shippingPrice =  cart.priceOfItems > 100 ? toPrice(0) : toPrice(10) ;
    cart.taxPrice = toPrice(0.15 * cart.priceOfItems)   ;
    cart.totalPrice = cart.priceOfItems + cart.shippingPrice + cart.taxPrice 
    

    const createOrder =useSelector ( state=> state.createOrder)
    const {order , loading ,success ,error} = createOrder;
   
    const handlePlaceorder = () =>{
        dispatch(createOrderAction({...cart, orderItems: cart.cartItems}));
    }


    useEffect( ()=> {
     if(success){
         props.history.push(`/order/${order._id}`)
        dispatch({type : CREATE_ORDER_RESET}) 
     }
    }, [success, dispatch, props.history, order])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong> {cart.shippingInfo.fullName} <br/>
                                    <strong>Address</strong> {cart.shippingInfo.address}, {cart.shippingInfo.city}, 
                                    {cart.shippingInfo.country}, {cart.shippingInfo.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong> {cart.paymentMethod.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Ordered Items</h2>
                                <ul>
                {cart.cartItems.map(item => (
                    <li key={item.product}>
                        <div className="row">
                            <div>
                                <img className="small" src={item.image} alt={item.name}/>
                                <div className= "min-30">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>
                            </div>
                           
                            <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                            
                        </div>
                    </li>
                ))}
            </ul>
            </div>
         </li>
        </ul>
                </div>
                <div className="col-1">
                    <div className="card  card-body">
                        <ul>
                            <li>
                                <h2>Order Summery</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items : </div>
                                    <div>${cart.priceOfItems}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping : </div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                              
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax : </div>
                                    <div>${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total : </strong>  </div>
                                    <div><strong>${cart.totalPrice}</strong></div>
                                </div>
                            </li>
                            <li><button type="button" className="primary block" onClick={handlePlaceorder}
                            disabled={cart.cartItems.length === 0}
                            >
                               Place Order </button></li>

                               {loading && <Loading></Loading>}
                               {error && <ErrorMsg variant="danger"></ErrorMsg>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlaceOrder;