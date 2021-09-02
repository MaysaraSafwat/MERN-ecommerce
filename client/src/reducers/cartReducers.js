
import { ADD_ITEM, REMOVE_ITEM, SAVE_PAYMENT_INFO, SAVE_SHIPPING_INFO,CLEAN_CART } from "../actionTypes/cartActionTypes";



export const cartReducer = (state = { cartItems: []} , action) =>{
switch (action.type){

    case ADD_ITEM : const item = action.payload;
                    const existingItem = state.cartItems.find(x=> x.product === item.product );
                    if (existingItem) {
                            return {
                              ...state,
                              error: '',
                              cartItems: state.cartItems.map((x) =>
                                x.product === existingItem.product ? item : x
                              ),
                            };
                          } else {
                            return { ...state, error: '', cartItems: [...state.cartItems, item] };
                          }
    
    case REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

     case SAVE_SHIPPING_INFO : return {...state, shippingInfo : action.payload}
     case SAVE_PAYMENT_INFO : return {...state, paymentMethod: action.payload}
     case CLEAN_CART : return  {...state , cartItems : []}
    default : return state;
    }
}