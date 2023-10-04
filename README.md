# Phonebook-backend
FULLSTACKOPEN PART-3 PHONEBOOK BACKEND

This is the backend for a phonebook application. It is built with Node.js and Express, utilizing a MongoDB database through Mongoose to store information about contacts in the phonebook.

## Prerequisites
Make sure you have the following installed in your development environment:
- Node.js
- npm (Node.js package manager)
- MongoDB

## Setup
Clone this repository to your local machine:

git clone https://github.com/your_username/phonebook-backend.git
cd phonebook-backend
Install the necessary dependencies using pnpm:


pnpm install
Create a .env file in the root of the project and configure the necessary environment variables. You can base it on the .env.example file.

Usage
To run the server, use the following command:
pnpm dev

The server will be available at http://localhost:3001 (or the port you have configured).

API Endpoints
GET /api/persons: Get the list of contacts in the phonebook.
GET /api/persons/{id}: Get information about a specific contact by their ID.
POST /api/persons: Create a new entry in the phonebook.
DELETE /api/persons/{id}: Delete a contact from the phonebook.
Contributions
If you want to contribute to this project, you're welcome to do so! If you have suggestions or find issues, create an issue or send a pull request.


