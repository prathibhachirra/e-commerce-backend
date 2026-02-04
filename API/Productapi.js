import exp from 'express'
const ProductRoute=exp.Router()
export default ProductRoute
import { ProductModel } from '../models/ProductModel.js'
ProductRoute.post('/products',async(req,res)=>{
    let newProduct=req.body;
    let newProductDoc=new ProductModel(newProduct)
    await newProductDoc.save()
    res.status(201).json({message:"product created successfully",payload:newProductDoc})
})