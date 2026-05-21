# E-Commerce Backend

A simple Node.js, Express, and MongoDB backend for an e-commerce application. This project currently supports user creation, reading users, product creation, and adding products to a user's cart.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

## Features

- Connects to a local MongoDB database
- Creates users with hashed passwords
- Reads all users
- Reads a single user by ID
- Creates products
- Adds products to a user's cart
- Increases cart quantity when the same product is added again

## Project Structure

```text
e-commerce/
|-- API/
|   |-- Productapi.js
|   `-- Userapi.js
|-- models/
|   |-- ProductModel.js
|   `-- UserModel.js
|-- package.json
|-- req.http
|-- readme.md
`-- server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/prathibhachirra/e-commerce-backend.git
```

2. Go to the project folder:

```bash
cd e-commerce-backend
```

3. Install dependencies:

```bash
npm install
```

4. Make sure MongoDB is running locally.

The application connects to:

```text
mongodb://localhost:27017/ecommercedb
```

5. Start the server:

```bash
npm start
```

The server will run at:

```text
http://localhost:2000
```

## API Routes

### User Routes

Base URL:

```text
http://localhost:2000/user-api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get one user by MongoDB ObjectId |
| POST | `/users` | Create a new user |
| PUT | `/user-cart/user-id/:uid/product-id/:pid` | Add a product to a user's cart |

### Product Routes

Base URL:

```text
http://localhost:2000/product-api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/products` | Create a new product |

## Request Examples

### Create Product

```http
POST http://localhost:2000/product-api/products
Content-Type: application/json

{
  "productname": "Smartphone",
  "price": 7000,
  "brand": "moto"
}
```

Success response:

```json
{
  "message": "product created successfully",
  "payload": {
    "_id": "product_id",
    "productname": "Smartphone",
    "price": 7000,
    "brand": "moto"
  }
}
```

### Create User

```http
POST http://localhost:2000/user-api/users
Content-Type: application/json

{
  "name": "prathibha",
  "email": "prathibha@example.com",
  "password": "password123",
  "cart": []
}
```

The password is hashed before the user is saved in MongoDB.

### Get All Users

```http
GET http://localhost:2000/user-api/users
```

### Get User By ID

```http
GET http://localhost:2000/user-api/users/user_id
```

### Add Product To Cart

```http
PUT http://localhost:2000/user-api/user-cart/user-id/user_id/product-id/product_id
```

If the product is already present in the cart, its quantity is increased by `1` and the `totalprice` is updated.

## Data Models

### User Model

```js
{
  name: String,
  email: String,
  password: String,
  cart: [
    {
      product: ObjectId,
      quantity: Number,
      totalprice: Number
    }
  ]
}
```

### Product Model

```js
{
  productname: String,
  price: Number,
  brand: String
}
```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the backend server using `node server.js` |
| `npm test` | Placeholder test script |

## Notes

- MongoDB must be running before starting the server.
- The MongoDB connection string is currently written directly in `server.js`.
- The backend currently does not include login, JWT authentication, product listing, product update, product delete, or order management.
