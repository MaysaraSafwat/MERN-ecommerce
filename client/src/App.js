
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter , Link, Route} from "react-router-dom"
import { SignoutAction } from "./actions/signinAction";
import Cart from "./pages/Cart";
import HomeScreen from "./pages/HomeScreen"
import OrderDetails from "./pages/OrderDetails";
import OrderHistory from "./pages/OrderHistory";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import ShowProduct from "./pages/ShowProduct"
import Signin from "./pages/Signin";
import UserProfile from "./pages/UserProfile";

function App() {
  const dispatch = useDispatch(); 
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin;
  const cart = useSelector( state => state.cart);
  const {cartItems} = cart;
  
  const handleSignout = ()=>{
    dispatch(SignoutAction());
  }
  return (
   
    <BrowserRouter>
    <div>
       <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">GTS STORES</Link> 
        </div>
        <div className="row">
        <Link className="row" to="/cart">
    <div>
    <span className="icon" ><i className="fas fa-shopping-cart "></i> </span> Cart {cartItems.length > 0 && (
    <span className="badge"> {cartItems.length}</span>
  )}
    </div>
</Link>
<div>
{
    userInfo ? <div className="dropdown"><Link to="#"> <i  className="fas fa-user"></i> {userInfo.name}
    <i className="fa fa-caret-down" ></i>
    </Link>
    <ul className="dropdown-content">
     <li><Link to="#" onClick={handleSignout}>Sign Out</Link></li> 
     <li><Link to="/profile">Profile</Link></li>
     <li><Link to="/ordershistory">Order History</Link></li> 
    </ul>
    </div>
    
    :  <Link to="/signin"><i  className="fas fa-user"></i>Sign In</Link>

  }
</div>
  
        </div>
        {/* <div className="row">
          <Link className="row" to="/cart"> <span className="icon" ><i className="fas fa-shopping-cart "></i> </span> Cart {cartItems.length > 0 && (
            <span className="badge"> {cartItems.length}</span>
          )}</Link>
          {
            userInfo ? <div className="dropdown"><Link to="#">{userInfo.name}
            <i className="fa fa-caret-down" ></i>
            </Link>
            <ul className="dropdown-content">
             <li><Link to="#" onClick={handleSignout}>Sign Out</Link></li> 
             <li><Link to="/profile">Profile</Link></li>
             <li><Link to="/ordershistory">Order History</Link></li> 
            </ul>
            </div>
            
            :  <Link to="/signin"><i  className="fas fa-user"></i>Sign In</Link>

          }
         
        </div> */}
      </header>
      <main>
        <Route path="/cart/:id?" component={Cart}></Route>
      <Route path="/product/:id" component={ShowProduct}></Route>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/signin" component={Signin} ></Route>
      <Route path="/shipping" component={Shipping} ></Route>
      <Route path="/payment" component={Payment} ></Route>
      <Route path="/placeorder" component={PlaceOrder} ></Route>
      <Route path="/order/:id" component={OrderDetails} ></Route>
      <Route path="/ordershistory" component={OrderHistory} ></Route>
      <Route path="/profile" component={UserProfile} ></Route>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
