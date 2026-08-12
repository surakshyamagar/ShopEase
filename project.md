# E-Commerce Project
1. Tech stack
> Frontend
    React + Vite
    Tailwind CSS

> Backend
    Node.js
    Express.js

> Database
    MongoDB
    Mongoose

> Authentication
    JWT
    bcrypt
    HTTP-only cookies

> Validation
    Zod

2. Users 👤
> User collection
| Field       | Type     | Purpose         |
| ----------- | -------- | --------------- |
| `_id`       | ObjectId | User ID         |
| `name`      | String   | User name       |
| `email`     | String   | Unique email    |
| `password`  | String   | Hashed password |
| `role`      | String   | USER / ADMIN    |
| `createdAt` | Date     | Created time    |
| `updatedAt` | Date     | Updated time    |

> User relationships

A user can:
User
 ├── have ONE Cart
 ├── create MANY Orders
 └── write MANY Reviews

So:
User 1 ─────── 1 Cart
User 1 ─────── * Orders
User 1 ─────── * Reviews

3. Categories 📂

Products need categories.

Example:
Electronics
Clothing
Shoes
Books

Category

Category
 ├── _id
 ├── name
 └── description

Relationship:

Category 1 ─────── * Products

Meaning:

One category can contain many products.

Example:

Electronics
   │
   ├── iPhone
   ├── Laptop
   └── Headphones

4. Products 🛍️

This is our next major feature.

Simple Product model:

Product
 ├── _id
 ├── name
 ├── description
 ├── price
 ├── image
 ├── stock
 ├── category
 ├── createdAt
 └── updatedAt


Relationship:
Category
   ↓
Product

The product's category will store the Category ObjectId.

With Mongoose:

category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category"
}

So MongoDB knows:

This product belongs to this category.

4. Cart 🛒

A logged-in user can add products to their cart.

Cart
Cart
 ├── _id
 ├── user
 └── items
       ├── product
       └── quantity

For example:

Cart
 │
 ├── user → Ram
 │
 └── items
      ├── iPhone → quantity 1
      ├── Shoes  → quantity 2
      └── Book   → quantity 1

Relationship:

User 1 ───── 1 Cart

Cart 1 ───── * Products

Technically the Cart stores product references inside its items.

5. Orders 📦

When the user checks out:

Cart
 ↓
Checkout
 ↓
Order
Order

Keep it simple:

Order
 ├── _id
 ├── user
 ├── items
 ├── totalAmount
 ├── status
 ├── shippingAddress
 ├── paymentMethod
 ├── createdAt
 └── updatedAt

Order status:

PENDING
CONFIRMED
SHIPPED
DELIVERED
CANCELLED

We don't need real payment integration for this project.

Payment method can simply be:

COD

or:

CARD

as stored information.

6. Reviews ⭐

Users can review products.

Review
Review
 ├── _id
 ├── user
 ├── product
 ├── rating
 ├── comment
 ├── createdAt
 └── updatedAt

Relationships:

User 1 ─────── * Reviews

Product 1 ──── * Reviews

Example:

Product: iPhone

9. 👤 USER = normal customer

The person who comes to the website to buy products.

They can:
    Register
    Login
    View products
    Search/filter products
    Add products to cart
    Update/remove cart items
    Place orders
    View their own orders
    Write reviews

10. 👑 ADMIN = store staff/owner

Yes — for our project, think of ADMIN as the person managing the store, such as the store owner or staff with administrative access.

They can:
    Add products
    Edit products
    Delete products
    Add/edit/delete categories
    View all orders
    Change order status
    Manage the store

# ✅ Register
✅ Login
✅ AuthContext
      ↓
🔜 1. Store JWT securely
🔜 2. Create authMiddleware in backend
🔜 3. Create GET /auth/profile
🔜 4. Restore user when React loads
🔜 5. Create logout
🔜 6. Protect private routes
🔜 7. Admin authorization
      ↓
📂 Categories: name, desc
      ↓
🛍️ Products
      ↓
🛒 Cart
      ↓
📦 Orders
      ↓
⭐ Reviews


Login = establishes authentication
Cookie = keeps authentication
/auth/profile = tells frontend who is authenticated
AuthContext = keeps that user information available throughout React