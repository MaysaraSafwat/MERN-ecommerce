import Axios from "axios";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from "react-router-dom";
import {orderDetailsAction, payOrderAction} from "../actions/orderActions"
import Loading from "../pages/Loading";
import ErrorMsg from "../pages/ErrorMsg";
import { PAY_ORDER_RESET } from "../actionTypes/orderActionTypes";

const OrderDetails=(props)=>{
  
    const dispatch =useDispatch();
    const orderId = props.match.params.id 
    const orderDetails = useSelector(state=>state.orderDetails);
    const {order , loading, error} = orderDetails;
    const [sdkReady , setSdkReady] = useState(false)
    const payOrder = useSelector((state) => state.payOrder);
    const {
      loading: loadingPay,
      error: errorPay,
      success: successPay,
      } = payOrder;

 
   
    useEffect( ()=> {
         const addPayPalScript = async ()=>{
            const {data} = await Axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
              setSdkReady(true);
            };
            document.body.appendChild(script);
          };
       

          if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({type: PAY_ORDER_RESET})
            dispatch(orderDetailsAction(orderId))
           }else {
               if(!order.isPaid){
                if (!window.paypal) {
                    addPayPalScript(); 
               } else {
                setSdkReady(true);
              }
           }
          } }, [ dispatch, orderId, order, setSdkReady, successPay ])

 const handleSuccessPayment =(paymentResult)=>{
     dispatch(payOrderAction(order, paymentResult))
    } 

    return loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMsg variant="danger">{error}</ErrorMsg>
      ) : (
        <div>
                <h1>Order {order._id}</h1>

            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong> {order.shippingInfo.fullName} <br/>
                                    <strong>Address</strong> {order.shippingInfo.address}, {order.shippingInfo.city}, 
                                    {order.shippingInfo.country}, {order.shippingInfo.postalCode}
                                </p>
                                {order.isDelivered ? (
                  <ErrorMsg variant="success">
                    Delivered at {order.deliveredAt}
                  </ErrorMsg>
                ) : (
                  <ErrorMsg variant="danger">Not Delivered</ErrorMsg>
                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method : </strong> {order.paymentMethod.paymentMethod}
                                </p>
                                
                {order.isPaid ? (
                  <ErrorMsg variant="success">
                    Paid at {order.paidAt}
                  </ErrorMsg >
                ) : (
                  <ErrorMsg  variant="danger">Not Paid</ErrorMsg >
                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Ordered Items</h2>
                                <ul>
                {order.orderItems.map(item => (
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
                                    <div>${order.priceOfItems}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping : </div>
                                    <div>${order.shippingPrice}</div>
                                </div>
                              
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax : </div>
                                    <div>${order.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total : </strong>  </div>
                                    <div><strong>${order.totalPrice}</strong></div>
                                </div>
                            </li>
                            
                            
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <Loading></Loading>
                  ) : (
                    <>
                      {errorPay && (
                        <ErrorMsg variant="danger">{errorPay}</ErrorMsg>
                      )}
                      {loadingPay && <Loading></Loading>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={handleSuccessPayment}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderDetails;