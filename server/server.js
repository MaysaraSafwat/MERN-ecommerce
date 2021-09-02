import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.connect(process.env.PORT || "mongodb://localhost/gts", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex: true
})

/*app.get("/api/products", (req,res)=>{
    res.send(data.products)
})*/
app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
/*app.get ("/api/products/:id", (req, res) =>{
    const product = data.products.find( x => x._id === req.params.id);
    if(product){
        res.send(product)
    }else {
        res.status(404)({message : "Product not Found"});
    }
})*/
app.get("/", (req,res)=>{
    res.send("Server is ready")
})

app.use((err, req,res, next)=>{
    res.status(500).send({message:err.message})
})
const port = process.env.PORT || 5001;
app.listen(port , ()=>{
    console.log(`server at http://localhost:${port}`)
})