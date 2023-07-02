import { Product } from "./product.model"

export interface MyOrder{
  cartId:string
  orderId:string
  productId:string
  userId:string
  product:Product
  productQuantity:number
  productAmount:number
  totalAmount:number
  orderDate:Date
}
