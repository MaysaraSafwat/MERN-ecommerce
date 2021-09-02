import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../actionTypes/productActionTypes"
import Axios from "axios";



export const detailsProduct= (productId)=> async (dispatch)=>{
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})

    try {
        const {data} = await Axios.get (`/api/products/${productId}`)
        dispatch({type : PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    catch (error){
        dispatch({type: PRODUCT_DETAILS_FAIL, 
            payload : error.response && error.response.data.message? error.response.data.message : error.message})
    }
}