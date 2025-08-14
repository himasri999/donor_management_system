# Donor Management System Database Setup

This document provides an overview of the database setup for the Donor Management System application.

## Database Technology

The application uses PostgreSQL as the database management system. PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language.

## Database Initialization

The database schema can be initialized using the SQL script located in the `migrations` directory. The `init.sql` file contains the necessary SQL commands to create the required tables and relationships for the application.

### Running the Initialization Script

To set up the database, follow these steps:

1. Ensure that PostgreSQL is installed and running on your machine.
2. Create a new database for the Donor Management System.
3. Run the `init.sql` script against the newly created database using a PostgreSQL client or command line.

Example command to run the script using `psql`:

```bash
psql -U your_username -d your_database -f migrations/init.sql
```

Replace `your_username` and `your_database` with your PostgreSQL username and the name of the database you created.

## Database Structure

The database includes the following main entities:

- **Donors**: Stores information about donors, including personal details and contact information.
- **Donations**: Records details of donations made by donors, including amounts and dates.
- **Communications**: Tracks communication history with donors, including messages and follow-ups.

## Additional Information

For further details on the database schema and relationships, please refer to the comments within the `init.sql` file or consult the backend codebase where the models are defined.

This README will be updated as the database schema evolves with the application.