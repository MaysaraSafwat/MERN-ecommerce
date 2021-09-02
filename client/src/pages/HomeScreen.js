import React, { useEffect} from "react";
import Product from "../components/Product";
import HeroSection from "../components/Hero";
import Loading from "./Loading"
import ErrorMsg from "./ErrorMsg"
import {productList} from "../actions/productList"
import { useDispatch, useSelector } from "react-redux";



export default function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.productsList)
  const {loading, error, products} = productsList

  useEffect(()=>{
     dispatch(productList())
  }, [dispatch ],);
    return (

      <div><HeroSection></HeroSection>
       <div className="heading">
         <h1>Shop Here</h1>
       </div>
        <div>
          {loading ? <Loading></Loading> :
          error ? <ErrorMsg variant="danger">{error}</ErrorMsg>:
          <div className="row center">
          {products.map(product =>{ return  ( 
           <Product key={product._id} product={product} />
          )})}
           
         </div>
          }
         
        </div>

        </div>
   
    )
    
}