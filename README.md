# API-Assignment-2

A Shoppingcart api created with NodeJS, Express and MongoDB. You can create a shoppingcart, add/remove and decrease quantity of an item in the shoppingcart.
You can also remove the cart.

## Technologies

- REST API
- NodeJS
- MongoDB
- ExpressJS

## Shoppingcart-routes

### Create a shoppingcart

POST - /api/v1/shoppingcarts/
Just run it.

### Add an item to shoppingcart

POST - /api/v1/shoppingcarts/:cartId/items

Use body to add something to cart.
If you dont type quantity in body, it will automaticlly be 1
ex;
{
"productId": "63eca744360361eed9769150",
"quantity": 3
}

### Get shoppingcart by ID

GET - /api/v1/shoppingcarts/:cartId
Use param to find shoppingcart

### Remove item from shoppingcart

PUT - /api/v1/shoppingcarts/:cartId/items/:productId

You can choose how many you want to remove by adding body
If you dont type anything in body, it will automaticlly be 1
{
"quantity": number
}

### Remove shoppingcart

DELETE - /api/v1/shoppingcarts/:cartId
Use param to delete shoppingcart

## Product-routes

### Get all products

GET - /api/v1/products/
You can also use limit and offset.
ex;
?limit=5&offset=1

### Get product by ID

/api/v1/products/:productId
Use param to find product
