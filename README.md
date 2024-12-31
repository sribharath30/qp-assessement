# Grocery Booking System

This project is a backend application built with Node.js, TypeScript, Sequelize, and PostgreSQL. It includes Docker configuration for containerization and running the application in a containerized environment.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   **Docker**: For building and running containers.
-   **Node.js**: For running the application.
-   **npm**: For managing dependencies.
-   **PostgreSQL**: Either installed locally or through Docker.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-repository/qp-assessement-updated.git
cd qp-assessement
```

### 2. Install dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of your project and add your environment variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_DATABASE=postgres
DB_DIALECT=postgres
API_KEY=your_api_key
JWT_SECRET=SECRET
PORT=3000
```

### 4. Docker setup (Optional)

If you want to run the application with Docker, you need to build the Docker containers.

-**Build Docker containers**:

    ```bash
    npm run docker-build
    ```

-**Run Docker containers**:

    Start the application and the PostgreSQL database using Docker Compose:

    ```bash
    npm run docker-up
    ```

-**Stop and remove Docker containers**:

    ```bash
    npm run docker-down
    ```

-**Rebuild and restart Docker containers**:

    ```bash
    npm run docker-rebuild
    ```

-**View Docker logs**:

    To view the logs of your running containers:

    ```bash
    npm run docker-logs
    ```

## Running the Application Locally

To run the application locally without Docker, you can use the following command:

```bash
npm run dev
```

This will start the application in development mode using `ts-node-dev`, which will automatically reload on code changes.

## Migrations and Seeding

If you need to run migrations or seed the database:

-**Run migrations**:

    ```bash
    npm run migrate
    ```

-**Seed the database**:

    ```bash
    npm run seed
    ```

## API Documentation

The backend service exposes APIs for various functionality. You can extend this section based on your API routes.

Example:

## API Endpoints
### Admin Endpoints
- `POST /admin/grocery-items` - Add a new grocery item
- `GET /admin/grocery-items` - View all grocery items
- `DELETE /admin/grocery-items/:id` - Remove a grocery item
- `PUT /admin/grocery-items/:id` - Update a grocery item
- `PATCH /admin/grocery-items/:id/inventory` - Manage inventory levels

### User Endpoints
- `GET /user/grocery-items` - View available grocery items
- `POST /user/book` - Book multiple grocery items


## Testing

To run tests for the application:

```bash
npm test
```

Ensure that you have Jest configured in your project for the tests to run successfully.

## Troubleshooting

-   **Port conflicts**: If the `docker-compose` fails due to port conflicts (e.g., port 5432), make sure that no other services are running on the same port.
-   **Database connection issues**: If the application cannot connect to the database, double-check the `.env` file settings and ensure that the database is running.

