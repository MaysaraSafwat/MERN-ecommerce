import Axios from "axios";
import {CLEAN_CART} from "../actionTypes/cartActionTypes"
import {CREATE_ORDER_REQUEST, 
        CREATE_ORDER_SUCCESS ,
       CREATE_ORDER_FAIL, 
       ORDER_DETAILS_REQUEST,
       ORDER_DETAILS_SUCCESS,
       ORDER_DETAILS_FAIL,
       PAY_ORDER_REQUEST,
       PAY_ORDER_SUCCESS,
       PAY_ORDER_FAIL,
       MY_ORDERS_REQUEST,
       MY_ORDERS_SUCCESS,
       MY_ORDERS_FAIL} from "../actionTypes/orderActionTypes"

/*export const createOrderAction =(order)=>async(dispatch, getState)=>{
    dispatch({type : CREATE_ORDER_REQUEST , payload : order})
    try{
        const {userSignin : {userInfo}} = getState()
        const {data}=  await Axios.post("/api/orders" , order , {
            headers :{authorization : `Bearer ${userInfo.token}`}
        })
        dispatch({type : CREATE_ORDER_SUCCESS ,payload : data.order})  
        dispatch({type : CLEAN_CART})  
        localStorage.removeItem("cartItems")
    }catch (error){
        dispatch({type : CREATE_ORDER_FAIL , payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})
    }
}*/


export const createOrderAction = (order) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post('/api/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
      dispatch({ type: CLEAN_CART});
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const orderDetailsAction =(orderId)=> async (dispatch, getState)=>{
    dispatch({type : ORDER_DETAILS_REQUEST , payload: orderId});
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const {data} = await Axios.get(`/api/orders/${orderId}`, 
      {headers : {Authorization : `Bearer ${userInfo.token}`}});
      dispatch({type: ORDER_DETAILS_SUCCESS , payload : data})
    } catch(error){
      dispatch({type : ORDER_DETAILS_FAIL , payload : error.response && error.response.data.message
        ? error.response.data.message
        : error.message,})
    }
  }

  export const payOrderAction = (order, paymentResult)=> async(dispatch, getState)=>{
    dispatch({type : PAY_ORDER_REQUEST , payload : {order , paymentResult}})
    const {userSignin:{userInfo}}= getState();
    
    try {
      const {data} = await Axios.get(`/api/orders/${order._id}/pay`, paymentResult, {headers : {
        Authorization : `Bearer ${userInfo.token}`
      }})
      dispatch({type: PAY_ORDER_SUCCESS, payload: data})
    } catch(error){
      dispatch({type : PAY_ORDER_FAIL , payload : error.response && error.response.data.message
        ? error.response.data.message
        : error.message,})
    }
    }

 export const myOrdersAction = ()=> async(dispatch,getState)=>{
   dispatch({type:MY_ORDERS_REQUEST});
   const {userSignin : {userInfo}}= getState();
   try{
     const {data} = await Axios.get('/api/orders/myorders' , {headers : {
       Authorization :  `Bearer ${userInfo.token}`
     }});
     dispatch({type : MY_ORDERS_SUCCESS , payload :data});
   } catch(error) {
     dispatch({type:MY_ORDERS_FAIL, payload :error.response && error.response.data.message
      ? error.response.data.message
      : error.message })
   }
 }   
  