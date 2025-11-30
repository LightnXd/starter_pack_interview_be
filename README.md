
# Interview Task: Login API and CRUD Service

👋 Hello, welcome to our interview task.

This project is designed as an interview task, where the goal is to build a **Login API** and a basic **CRUD service**. It uses **Vite - Node.js** for frontend and can be run with **Yarn** or **npm**.

Please follow the instructions below to set up the project.

Frontend: https://github.com/ptpl-source/starter-pack-interview-fe

Backend: https://github.com/ptpl-source/starter-pack-interview-be

> For backend API, you can explore using **Golang, NodeJS or Python**. Feel free to use and explore using those Backend Language.

---

# Important:

**Time Acknowledge**: After cloning the repository, you must send an email after 3 days for both FE & BE repo from your github link to the following recipients: kuncoro.baroto@pertamina.com, ahmad.saparhadi@pertamina.com
and sopian.iskandar@pertamina.com

---

Here is a summary of the steps the candidate must follow to complete the task:

## Task Summary

You are required to create a **backend API** using either **Golang** or **Node.js**. This API will handle **login** authentication and a **CRUD service**. The provided project contains only the **frontend**, which will interact with your backend API.

### Step 1: Clone and Setup the Frontend

1. **Clone this repository** clone it locally.
2. **Install dependencies** using your preferable language either, golang, python or nodejs.

### Step 2: Build the Backend API

You will need to build a separate backend API using **Golang** or **Node.js**.

1. **Create a Login API**:
   - Implement a `POST /login` route to handle user authentication.
   - Use **JWT** for authentication.
   - Upon successful login, return a JWT token.

2. **Create a CRUD Service**:
   - Implement a basic CRUD service to manage resources (e.g., `Tasks`, `Products`, or `Notes`).
   - CRUD routes example:
     - `GET /items`: Retrieve all items.
     - `POST /items`: Create a new item.
     - `PUT /items/:id`: Update an existing item.
     - `DELETE /items/:id`: Delete an item by ID.
   - Secure these routes with JWT to allow only authenticated users to perform CRUD operations.

3. **Deploy your backend API** (optional but recommended) using a service like Heroku, Vercel, or any cloud provider.

### Step 3: Connect Frontend to Backend API

1. Update this **frontend** to interact with your backend API for the login and CRUD services.
2. Use the backend API’s **JWT** token to protect the CRUD routes on the frontend.

### Step 4: Documentation

1. Provide basic **API documentation** (either using Postman, Swagger, or a simple Markdown file).
2. Include instructions on how to run the backend locally and how to test the login and CRUD endpoints.

---

This summary outlines the key tasks, including backend API creation, securing routes with JWT, and integrating the frontend with the backend API.
