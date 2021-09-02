import Axios from "axios"
import { ADD_ITEM, REMOVE_ITEM, SAVE_PAYMENT_INFO, SAVE_SHIPPING_INFO} from "../actionTypes/cartActionTypes"


export const addToCart = (productId, qty) => async (dispatch, getState) =>{

    const {data} = await Axios.get(`/api/products/${productId}`)

    dispatch ({type : ADD_ITEM , payload : {
        name : data.name,
        image : data.image,
        price : data.price,
        countInStock : data.countInStock,
        product : data._id,
        qty
    }})

    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
}



export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const shippingAction = (data)=>(dispatch)=>{
    dispatch({type: SAVE_SHIPPING_INFO , payload : data});
    localStorage.setItem('shippingInfo', JSON.stringify(data));
}  

export const paymentAction = (data)=>(dispatch)=>{
    dispatch({type: SAVE_PAYMENT_INFO, payload : data});
    
} 