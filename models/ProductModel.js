import { Schema,model } from 'mongoose'

const productSchema=new Schema({
    productname:{
        type:String,
        required:[true," productname is required"],
        },
        price:{
            type:Number,
            required:[true,"  productprice is required"],
        }, 
        brand:{
            type:String,
            required:[true," product brand is required"],
        },
    })
    export const ProductModel=model("product",productSchema)
   