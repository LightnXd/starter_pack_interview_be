# Backend Local Setup Guide & API Documentation

## Local Setup Guide

### 1. Clone the Repository
```
git clone https://github.com/ptpl-source/starter-pack-interview-be.git
```

### 2. Install Dependencies
```
npm install
# or
yarn install
```

### 3. Configure Environment Variables
- Create a `.env` file in the backend directory and add the following:

```env
DATABASE_URL=your_postgres_/_prisma_url
JWT_SECRET=your_jwt_secret
PORT=3000

```


### 4. Run Database Migrations
```
npx prisma migrate dev
# or
npx prisma db push
```

### 5. Seed the Database (Optional)
```
node prisma/product_seed.js
```

### 6. Start the Server
```
npm run dev
# or
node app.js
```

---

## API Documentation

### Authentication

#### POST `/api/auth/sign-in` 
- **Body:** `{ email, password }`
- **Response:** `{ accessToken }`
- Used when a user try to login to their account

**Example:**
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@minimals.cc","password":"@demo1"}'
```

#### POST `/api/auth/sign-up`
- **Body:** `{ email, password, firstName, lastName }`
- **Response:** `{ accessToken }`
- Used when a user try to create new account

**Example:**
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
```

#### GET `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ user }`
- Used for retrieving user's information

**Example:**
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

---

### Product CRUD (All require JWT in `Authorization` header)
Replace <token> with the JWT received from sign-in.

#### GET `/api/product/list`
- **Response:** `[{ id, name, price }]`
- Used for listing all products available

**Example:**
```bash
curl http://localhost:3000/api/product/list \
  -H "Authorization: Bearer <token>"
```

#### GET `/api/product/details?id=<id>`
- **Response:** `{ id, name, price, quantity }`
- Used for listing details of specific product

**Example:**
```bash
curl "http://localhost:3000/api/product/details?id=1" \
  -H "Authorization: Bearer <token>"
```

#### GET `/api/product/search?q=<query>`
- **Response:** `[{ id, name, price }]`
- Used for searching product by name

**Example:**
```bash
curl "http://localhost:3000/api/product/search?q=phone" \
  -H "Authorization: Bearer <token>"
```

#### POST `/api/product/add`
- **Body:** `{ name, price, quantity }`
- **Response:** `{ id, name, price, quantity }`
- Used for adding new product

**Example:**
```bash
curl -X POST http://localhost:3000/api/product/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"iPhone 15","price":999,"quantity":10}'
```

#### POST `/api/product/update`
- **Body:** `{ id, name, price, quantity }`
- **Response:** `{ id, name, price, quantity }`
- Used for updating product's details

**Example:**
```bash
curl -X POST http://localhost:3000/api/product/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"id":1,"name":"iPhone 15 Pro","price":1099,"quantity":8}'
```

#### POST `/api/product/delete`
- **Body:** `{ id }`
- **Response:** `{ success: true }`
- Used for deleting the product

**Example:**
```bash
curl -X POST http://localhost:3000/api/product/delete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"id":1}'
```

---


