# Donor Management System Backend

This is the backend for the Donor Management System application, built using Node.js with Express and PostgreSQL. The backend provides RESTful APIs for managing donor records, donations, and communication history, along with user authentication using JWT.

## Features

- **User Authentication**: JWT-based login and logout functionality.
- **CRUD Operations**: Create, Read, Update, and Delete operations for donors, donations, and communications.
- **Error Handling**: Graceful error handling with appropriate messages.
- **Logging**: Basic logging of actions and failures using Winston.
- **Form Validation**: Input validation for email and phone numbers.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building APIs.
- **PostgreSQL**: Relational database for storing data.
- **JWT**: For secure user authentication.
- **Winston**: For logging actions and errors.
- **TypeScript**: For type safety and better development experience.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- PostgreSQL installed and running.
- A PostgreSQL database created for the application.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd donor-management-system/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/config/db.ts`.

4. Run database migrations (if applicable).

### Running the Application

To start the backend server, run:
```
npm start
```

The server will be running on `http://localhost:3000`.

### Testing

To run unit tests, use:
```
npm test
```

## API Documentation

Refer to the individual controller files for detailed API endpoints and usage.

## License

This project is licensed under the MIT License. See the LICENSE file for details.