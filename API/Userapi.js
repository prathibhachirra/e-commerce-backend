// import express and UserModel  
import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { ProductModel } from '../models/ProductModel.js'
import { hash, compare } from 'bcryptjs'

const UserRoute = exp.Router()
export default UserRoute

//--------------------------------------------------------
// read all users
UserRoute.get("/users", async (req, res) => {
  let usersList = await UserModel.find()
  res.status(200).json(usersList)
})

//--------------------------------------------------------
//read user by id
UserRoute.get('/users/:id', async (req, res) => {
  try {
    let userId = req.params.id
    let user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

//--------------------------------------------------------
// add new user by hashing passwords
UserRoute.post("/users", async (req, res) => {
  try {
    let newUser = req.body

    await new UserModel(newUser).validate()

    let hasedPassword = await hash(newUser.password, 10)
    newUser.password = hasedPassword

    let userDocument = new UserModel(newUser)
    await userDocument.save()

    res.status(200).json(userDocument)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

//--------------------------------------------------------
// add product to cart
UserRoute.put("/user-cart/user-id/:uid/product-id/:pid", async (req, res) => {

  let { uid, pid } = req.params

  //check user
  let users = await UserModel.findById(uid)
  if (!users) {
    return res.status(404).json({ message: "user not found" })
  }

  //check product
  let product = await ProductModel.findById(pid)
  if (!product) {
    return res.status(404).json({ message: "product not found" })
  }

//heck whether in cart or not
  let found = false

  for (let i = 0; i < users.cart.length; i++) {

    if (users.cart[i] && users.cart[i].product.toString() === pid) {
      users.cart[i].quantity += 1
      users.cart[i].totalprice = users.cart[i].quantity * product.price
      found = true
      break
    }
  }

  if (!found) {
    users.cart.push({ product: pid, quantity: 1 })
  }

  await users.save()

  res.status(200).json({
    message: "successful",
    payload: users
  })
})
