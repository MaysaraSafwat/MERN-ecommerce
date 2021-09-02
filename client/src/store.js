import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers.js";
import { createOrderReducer, myOrdersReducer, orderDetailsReducer, payOrderReducer } from "./reducers/orderReducers.js";
import { productListReducer, productDetailsReducer} from "./reducers/productListReducer.js";
import {updateUserProfileReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, } from "./reducers/signinReducers.js";

const initialState = { 
    userSignin:  {userInfo :localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem('userInfo')): null},
    cart :
    {cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem('cartItems')): [] ,
   shippingInfo:localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem('shippingInfo')): [],
   paymentMethod : "PayPal"
}}
   
    const reducers = combineReducers({
    productsList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    createOrder : createOrderReducer,
    orderDetails : orderDetailsReducer,
    payOrder : payOrderReducer,
    myOrders : myOrdersReducer,
    userDetails : userDetailsReducer,
    updateUserProfile : updateUserProfileReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers , initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;