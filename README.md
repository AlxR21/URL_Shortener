Scalable URL Shortener Service
This project is a high-performance, scalable URL shortener service built with a modern backend stack. It provides a robust and secure solution for creating shortened links, complete with user authentication and authorization. The entire application is designed to be portable and easy to set up using containerization.

Features
Custom URL Shortening: Converts long URLs into manageable, short links.

User Authentication & Authorization: Secure user sign-up and login system to manage links.

Scalable Architecture: Built to handle a high volume of requests efficiently.

Robust API: A well-defined and reliable API for interacting with the service.

Type-Safe Database Operations: Enhanced data integrity and developer experience with an ORM.

Containerized Environment: Uses Docker for a consistent and isolated development and deployment environment.

Tech Stack
Backend: Node.js, Express.js

Database: PostgreSQL

Containerization: Docker

ORM: Drizzle ORM for type-safe database queries.

Validation: Zod for rigorous request validation.

Package Manager: PNPM

API Testing: Postman for route verification and testing.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js

PNPM

Docker and Docker Compose

Installation
Clone the repository:

git clone <your-repository-url>
cd <repository-name>

Install dependencies using PNPM:

pnpm install

Set up environment variables:
Create a .env file in the root directory and add the necessary environment variables.

DATABASE_URL="postgresql://user:password@localhost:5432/url_shortener_db"
PORT=3000
JWT_SECRET="your_jwt_secret"
# Add other variables as needed

Run the application with Docker:
This command will start the PostgreSQL database container.

docker-compose up -d

Start the server:

pnpm start

The server should now be running on http://localhost:3000.

API Endpoints
The API routes were thoroughly tested using Postman. Below is a summary of the available endpoints.

POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in an existing user.

POST /api/shorten - Create a new shortened URL (requires authentication).

GET /:shortId - Redirect to the original URL.

GET /api/urls - Get all URLs for the authenticated user.

For detailed request/response schemas, please refer to the Postman collection or the API documentation within the source code.
