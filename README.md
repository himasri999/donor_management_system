# Donor Management System

## Overview
The Donor Management System is a web application designed to track donor records, manage donations, and maintain communication history. It provides a user-friendly interface for managing donor information and donations, ensuring efficient communication and record-keeping.

## Technologies Used
- **Frontend**: Angular
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Authentication**: JWT-based login
- **Logging**: Winston or console logging
- **Testing**: Jasmine/Karma (Angular), Jest (Node.js)

## Features
- **User Authentication**: Secure login/logout functionality using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete operations for donors, donations, and communications.
- **Filterable Tables**: Easily view and filter data in tables for better management.
- **Error Handling**: Graceful error handling with user-friendly messages.
- **Form Validation**: Input validation for fields such as email and phone numbers.
- **Logging**: Basic logging of actions and failures for monitoring and debugging.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Angular CLI

### Installation

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd donor-management-system
   ```

2. **Setup the Backend**:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Configure the database connection in `src/config/db.ts`.
   - Run the server:
     ```
     npm start
     ```

3. **Setup the Frontend**:
   - Navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Run the Angular application:
     ```
     ng serve
     ```

### Running Tests
- **Frontend Tests**:
  ```
  cd frontend
  ng test
  ```

- **Backend Tests**:
  ```
  cd backend
  npm test
  ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.