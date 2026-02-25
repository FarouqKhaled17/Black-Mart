# 📦 Black‑Mart Backend – API Documentation

> **Stack:** Node 16+, Express, MongoDB (mongoose), dotenv, JWT  
> **Entry point:** `index.js`  
> `src/modules/index.routes.js` wires all routers under `/api/v1/...` and applies a global error handler.

---

## 📁 Project structure

```
/database                      # mongoose models + connection
  └─ models
       brand.model.js
       cart.model.js
       category.model.js
       coupon.model.js
       order.model.js
       product.model.js
       review.model.js
       subCategory.model.js
       testimonial.model.js
       user.model.js
  dbConnection.js

/src
  middleware                  # shared middleware
    catchError.js            # async wrapper
    emailExist.js
    globalError.js           # final error handler
    numberExist.js
    validation.js            # joi wrapper

  modules                    # each feature organized in a folder
    auth, users, products, …
      *.routes.js            # express router
      *.controller.js        # request handlers
      *.validation.js        # Joi schemas
  services/fileUploads       # multer helpers
  utils
    appError.js              # custom Error class
    roles.js
    statusCode.js

index.js                     # server bootstrap
package.json, README, vercel.json…
```

---

## 🧩 Core behaviour

- **Authentication**
  - JWT in `Authorization: Bearer <token>` header.
  - `protectedRoutes` middleware decodes token and attaches `req.user`.
  - `allowedTo(...)` restricts by role (`user` or `admin`).

- **Validation**
  - Each route passes through `validation(schema)` which rejects bad bodies/params.

- **File uploads**
  - `uploadSingleFile('field')` / `uploadFields([...])` use multer; resulting filenames are stored in the DB.

- **Error handling**
  - Controllers wrapped in `catchError` to catch rejected promises.
  - `globalError` sends JSON `{message, ...}` with appropriate `statusCode`.

---

## 🗃️ Database models synopsis

**user**  
Fields: `username, email, Gmail?, password, mobileNumber, role(user|admin), isBlocked, status, avatar, wishlist:[productId], address:[{street,city,country,phone}] …`

**product**  
`name, slug, price, quantity, description, size[], color[], style?, typeof?, discount, imgCover, images[], priceAfterDiscount, sold, ratingsAvg, rateCount, category, subCategory, brand (string), createdBy(userId)`  
Virtual `myreviews` populated automatically.

**category / subCategory**  
`name, slug, image` with parent relationship.

**brand**  
`name, slug, img`

**review**  
`title, comment, rating, product(productId), user(userId)`.

**testimonial**  
`name, email, message, status(pending/accepted/rejected)`.

**cart**  
`user(userId), products[{product, count, price}], cartPrice`.

**order**  
`user, cart, totalOrderPrice, paymentMethod, isPaid, paidAt, shippingAddress …`  
Supports Stripe checkout session + cash order.

**coupon**  
`code, discount, maxUsage, expireAt, usedUsers[]`.

(Other models are self‑explanatory.)

---

## 📡 API endpoints

> **Base path:** `/api/v1`

### 🔐 Authentication

| Path                   | Method | Auth | Description                                                    |
| ---------------------- | ------ | ---- | -------------------------------------------------------------- |
| `/auth/signup`         | POST   | No   | register new user. body: `username,email,password` (or Gmail). |
| `/auth/login`          | POST   | No   | returns JWT. body: `email,password`                            |
| `/auth/changePassword` | PATCH  | yes  | body: `oldPassword,newPassword`                                |

---

### 👤 Users

- **Admin only** unless noted.

| Path                | Method | Auth  | Body/Params                             |
| ------------------- | ------ | ----- | --------------------------------------- |
| `/user`             | POST   | admin | create user                             |
| `/user`             | GET    | admin | list all users                          |
| `/user/:id`         | GET    | admin | fetch single                            |
| `/user/:i`          | PUT    | admin | update (validation via `updateUserVal`) |
| `/user/:id`         | DELETE | admin | remove                                  |
| `/user/block/:id`   | PATCH  | admin | set `isBlocked`                         |
| `/user/unblock/:id` | PATCH  | admin | unset                                   |

_(Regular users manage themselves via auth routes / profile, not shown.)_

---

### 📦 Products

| Path           | Method | Auth       | Notes                                     |
| -------------- | ------ | ---------- | ----------------------------------------- |
| `/product`     | GET    | public     | list all                                  |
| `/product`     | POST   | admin      | upload `imgCover, images`; validated body |
| `/product/:id` | GET    | user/admin | get detail                                |
| `/product/:i`  | PUT    | admin      | partial update, file fields optional      |
| `/product/:id` | DELETE | admin      |

---

### 🗂 Categories

| Path              | Method | Auth       | Notes             |
| ----------------- | ------ | ---------- | ----------------- |
| `/categories`     | GET    | public     |                   |
| `/categories`     | POST   | admin      | upload `img`      |
| `/categories/:id` | GET    | user/admin |                   |
| `/categories/:i`  | PUT    | admin      |                   |
| `/categories/:id` | DELETE | user/admin | (no restriction?) |

### ⛓ Subcategories

Same pattern as categories under `/subcategory`.

---

### 🏷 Brands

`/brand` routes mirror products, but `img` is single file.  
GET list is public; GET/:id validated.

---

### 📝 Reviews

| Path          | Method | Auth       | Body                       |
| ------------- | ------ | ---------- | -------------------------- |
| `/review`     | POST   | user/admin | rating + comment + product |
| `/review`     | GET    | user/admin | all reviews                |
| `/review/log` | GET    | user/admin | reviews by logged‑in user  |
| `/review/:id` | PUT    | user/admin | update own review          |
| `/review/:id` | DELETE | user/admin | delete own                 |

---

### 💬 Testimonials

| Path               | Method | Auth       | Body                         |
| ------------------ | ------ | ---------- | ---------------------------- |
| `/testimonial`     | POST   | user/admin | submit testimonial           |
| `/testimonial`     | GET    | user/admin | list all                     |
| `/testimonial/:id` | PUT    | user/admin | edit                         |
| `/testimonial/:i`  | DELETE | user/admin | remove                       |
| `/testimonial/:id` | PATCH  | user/admin | accept/reject (status field) |

---

### 🛒 Cart

| Path           | Method | Auth       | Purpose            |
| -------------- | ------ | ---------- | ------------------ |
| `/cart`        | POST   | user/admin | add product(s)     |
| `/cart`        | DELETE | user/admin | clear cart         |
| `/cart/log`    | GET    | user/admin | fetch own cart     |
| `/cart/:id`    | DELETE | user/admin | remove single item |
| `/cart/:id`    | PATCH  | user/admin | update quantity    |
| `/cart/coupon` | POST   | user/admin | apply coupon code  |

---

### 🎁 Coupons

| Path          | Method | Auth       | Notes                          |
| ------------- | ------ | ---------- | ------------------------------ |
| `/coupon`     | POST   | admin      | create coupon                  |
| `/coupon`     | GET    | admin      | list all                       |
| `/coupon/log` | GET    | user/admin | coupons used by logged‑in user |
| `/coupon/:id` | PUT    | admin      | update                         |
| `/coupon/:id` | DELETE | admin      | remove                         |

---

### 🏠 Addresses

| Path           | Method | Auth       | Notes                          |
| -------------- | ------ | ---------- | ------------------------------ |
| `/address`     | GET    | user/admin | all addresses (admin sees all) |
| `/address`     | PATCH  | user/admin | add address to logged user     |
| `/address/log` | GET    | user/admin | own addresses                  |
| `/address/:id` | DELETE | user/admin | remove address                 |

---

### 🧾 Orders

| Path                  | Method | Auth       | Description                                                        |
| --------------------- | ------ | ---------- | ------------------------------------------------------------------ |
| `/order`              | GET    | user/admin | get user's most recent order? (controller uses `getSpecificOrder`) |
| `/order/allorder`     | GET    | admin      | all orders                                                         |
| `/order/:id`          | POST   | user/admin | create cash order from cart id                                     |
| `/order/checkout/:id` | POST   | user/admin | Stripe checkout session (cart id passed)                           |

_(Request bodies validated with `createCashOrderVal`)._

---

### 🤍 Wishlist

| Path            | Method | Auth       | Purpose                   |
| --------------- | ------ | ---------- | ------------------------- |
| `/wishlist`     | GET    | user/admin | all wishlists             |
| `/wishlist`     | PATCH  | user/admin | add to wish list          |
| `/wishlist/log` | GET    | user/admin | logged‑in user's wishlist |
| `/wishlist/:id` | DELETE | user/admin | remove item               |

---

## 🔧 Additional notes

- **Validation schemas** are defined in each module's `*.validation.js` file. They use `joi` and cover required fields, types and custom messages.
- **File uploads** are saved to `/uploads`; models prepend `process.env.BASE_URL` when documents are initialized.
- **Roles** are simple strings; new roles can be added in `utils/roles.js`.
- **Utilities**: `statusCode.js` exports HTTP status constants used in controllers.
- **Environment variables**: database URI, JWT secret, Stripe keys, `BASE_URL` etc. are read with `dotenv` via `config()` in routers.

---

## 🚀 Running the app

1. `npm install`
2. create `.env` (see `.env.example` if present) with `DB_URI`, `JWT_SECRET`, `BASE_URL`, `STRIPE_SECRET_KEY`, etc.
3. `npm run dev` (uses nodemon if configured)

---

## 🧠 Tips for frontend dev

- Bear in mind that many GETs require authentication.
- Use the **login** route to fetch token and include it in all subsequent requests.
- For file uploads send `multipart/form-data`.
- Validate responses by checking `message` and relevant payloads like `product`, `user` etc.
- Error responses come in JSON with `statusCode` and `message` from `appError`.

---

Feel free to expand this document with examples (curl/Postman) or add a swagger file if needed – the above gives the frontend developer everything they need to start working.
