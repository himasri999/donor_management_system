# Donor Management System

This project is a Donor Management System that allows tracking of donor records, donations, and communication history. It is built using Angular for the frontend, Node.js (Express) for the backend, and PostgreSQL for the database. The application includes JWT-based authentication, logging, and unit testing.

## Features

- **User Authentication**: JWT-based login and logout functionality.
- **CRUD Operations**: Create, Read, Update, and Delete operations for donors, donations, and communications.
- **Filterable Tables**: View and filter donor records, donations, and communication history.
- **Error Handling**: Graceful error handling with user-friendly messages.
- **Form Validation**: Input validation for fields such as email and phone numbers.
- **Logging**: Basic logging of actions and failures using Winston.
- **Unit Testing**: Comprehensive testing using Jasmine/Karma for the frontend and Jest for the backend.

## Technologies Used

- **Frontend**: Angular
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Logging**: Winston
- **Testing**: Jasmine/Karma (Frontend), Jest (Backend)

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Angular CLI

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd donor-management-system
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

4. Set up the PostgreSQL database:
   - Create a new database and run the SQL scripts in `database/migrations/init.sql` to initialize the schema.

5. Configure environment variables for the backend in `backend/src/config/db.ts`.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`.

## Testing

- To run frontend tests:
  ```
  cd frontend
  ng test
  ```

- To run backend tests:
  ```
  cd backend
  npm test
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.