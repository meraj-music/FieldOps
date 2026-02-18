# FieldOps — Project/Initiative Tracker

A full-stack web application designed to streamline project management, track key initiatives, and manage partner relationships in a single, unified platform. This application provides a centralized hub for collaboration and monitoring. (Screenshots below)

## Key Features

- **Initiative Management:** Create, update, and delete project initiatives with status tracking (e.g., Planning, Active, Completed).
- **Partner & Vendor Hub:** A centralized place to manage partner information and link them to specific projects.
- **Goal & KPI Tracking:** Define and monitor SMART goals with percentage-based progress tracking.
- **Secure Authentication:** A robust login system to protect application data.

## Technology Stack

This project is built with a modern, containerized architecture:

- **Frontend:** React 18 (with Hooks), React Router for navigation, Standard CSS3 for styling
- **Backend:** Node.js with Express.js, PostgreSQL for the database, JWT (JSON Web Tokens) for secure authentication
- **Deployment:** Docker & Docker Compose for containerization

## Getting Started

To run this application on your local machine, you will need to have Docker and Docker Compose installed.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/meraj-music/FieldOps.git
   cd FieldOps
   ```

2. **Create the environment file:**

   In the project's root directory, create a file named `.env` and copy the following (this file holds the database credentials):

   ```bash
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=yoursecurepassword
   POSTGRES_DB=FieldOpsDB
   DATABASE_URL=postgres://admin:yoursecurepassword@db:5432/FieldOpsDB
   JWT_SECRET=thisisareallystrongsecretkeyforjwt
   ```
   
4. **Build and run the application:**

   Use Docker Compose to build the images and start the containers:

   ```bash
   docker-compose up --build
   ```

5. **Access the application:**

   - The Frontend Web App will be available at [http://localhost:3000](http://localhost:3000).
   - The Backend API will be running at [http://localhost:5000](http://localhost:5000).

## Create Your First User

Since the database starts empty, you must register the first user by making a POST request to the API. Using a tool like Postman or `curl`, send a request to:

```
http://localhost:5000/api/auth/register
```

with the required JSON body (e.g., username, password). Using Postman:

<img width="444" height="396" alt="image" src="https://github.com/user-attachments/assets/285497ce-63a7-4c0c-9f42-95b3b617e540" />


---

Feel free to reach out or open an issue for support or contributions!

Screenshots:

![Alt text](screenshots/Login page.png)
![Alt text](screenshots/Initiatives page.png)
![Alt text](screenshots/Initiatives add form.png)
![Alt text](screenshots/Initiatives add form 2.png)
![Alt text](screenshots/Goals & KPI page.png)
![Alt text](screenshots/Goals & KPI add new goal form.png)
![Alt text](screenshots/Partners page.png)
![Alt text](screenshots/Search entry.png)

<img width="644" height="596" alt="Image" src="https://github.com/user-attachments/assets/22bb304c-dd83-49fb-babe-cc5ef33772d6" />
<img width="281" height="637" alt="Image" src="https://github.com/user-attachments/assets/1351ec1c-04b4-46ca-a642-114fe56910be" />
<img width="292" height="619" alt="Image" src="https://github.com/user-attachments/assets/76f27f7e-863e-4383-a33c-caf0d3d1ea71" />
<img width="860" height="706" alt="Image" src="https://github.com/user-attachments/assets/444528ad-ca4d-4de1-82b8-1ef1a9aaaae7" />
<img width="1919" height="991" alt="Image" src="https://github.com/user-attachments/assets/063c048e-8ce6-4bbd-879d-9dacb2eb7aa0" />
<img width="933" height="665" alt="Image" src="https://github.com/user-attachments/assets/92523b06-495d-4a48-a73f-6c5e8d9fcce6" />
<img width="822" height="635" alt="Image" src="https://github.com/user-attachments/assets/137d67a7-e2bd-41fa-805c-716f359fc094" />
<img width="1919" height="994" alt="Image" src="https://github.com/user-attachments/assets/3de397e2-c699-499b-ada1-c5becae1852d" />
<img width="1919" height="988" alt="Image" src="https://github.com/user-attachments/assets/9c6d9031-dbd0-4331-af25-f3ea72524756" />
<img width="1919" height="993" alt="Image" src="https://github.com/user-attachments/assets/f2d079f7-232b-4328-a5a0-59476fe248f5" />
<img width="953" height="607" alt="Image" src="https://github.com/user-attachments/assets/5e72b7aa-9928-40e0-bf6f-06c2a5c32171" />
<img width="1919" height="990" alt="Image" src="https://github.com/user-attachments/assets/1309cb74-a49b-4fb8-b1dd-b8c579920f34" />
<img width="1919" height="983" alt="Image" src="https://github.com/user-attachments/assets/f59bcefa-f910-4577-afdb-e7d8c184b540" />
<img width="1917" height="989" alt="Image" src="https://github.com/user-attachments/assets/85c6a8af-944a-4642-8366-105ca4e357d3" />
<img width="1918" height="986" alt="Image" src="https://github.com/user-attachments/assets/eda810d5-da2a-4e3d-94e8-dd7fe614f9f2" />
