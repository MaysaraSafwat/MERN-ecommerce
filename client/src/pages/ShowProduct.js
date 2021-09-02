import React , {useEffect, useState}from "react"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import Rating from "../components/Rating"
import Loading from "./Loading"
import ErrorMsg from "./ErrorMsg"
import {detailsProduct} from "../actions/detailsProduct"



export default function ShowProduct (props){
    const dispatch  = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    useEffect(()=> dispatch(detailsProduct(productId)),[dispatch,productId ])

    const addToCartHandler = ()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    if (!product){
        return <div>Product Not Found!</div>
    }

    return (
        <div>
          
            {loading ? <Loading></Loading> :
          error ? <ErrorMsg variant="danger">{error}</ErrorMsg>:
          <div>
        <Link className="bk-to-shopping"to="/"><i className="fas fa-arrow-circle-left"></i></Link>
        <div className="row top around">
            <div className="col-30">

                <img className="large"  src={product.image} alt={product.name}></img>
            </div>
              
        
            
            <div className="col-30">
                <ul>
                    <li><h2>{product.name}</h2></li>
                    <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                    <li>
                      $ {product.price}
                    </li>
                </ul>

                <div className="card">
                  <div className="card-body">
                      <ul>
                          <li>
                              <div className="row">
                              <div>Price :$ {product.price}</div>
                              </div>
                          </li>
                          <li>
                              <div className="row">
                                  <div>Status : <div>
                                      {product.countInStock>0 ? <span className="success">In Stock</span> : <span className="err">Out Of Stock</span>}</div></div>
                              </div>
                          </li>
                       <li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                            </div>
                            </div> 
                            </li>  
                           
                          <li>
                              <button onClick={addToCartHandler}
                          className="primary block"  > Add to Cart</button>
                          </li>
                  
                          </>)
                        }
                          </li>
                          
                      </ul>

                  </div>
                  </div>
            </div>
           
        

            </div>
        </div>
                                }

</div>
    )
}