# Project Setup

## Requirements

This project requires different Node.js versions for the backend and frontend:

- **Backend**: Requires **Node.js 18+** due to Express v5.
- **Frontend**: Requires **Node.js 18.18+** due to Next.js v15.

Ensure you have the correct version of Node.js installed before proceeding.

## Setting Up the Backend

To start the backend server, run the following command:

```sh
cd ./api && npm run dev
```

### Database Setup

Before running the backend, you need to create a new database and inject the SQL schema from the `ddl.sql` file located in the `api` directory. This file also seeds mock data.

### Environment Variables

Since the backend uses **Prisma ORM**, you must provide a database connection URL in the `.env` file located in the root of the `api` directory. You can refer to the official Prisma documentation for more details: [Prisma Connection URLs](https://www.prisma.io/docs/orm/reference/connection-urls).

For example, if using **PostgreSQL**, your `.env` file should contain:

```sh
DATABASE_URL="postgresql://username:password@localhost:5432/database-name?schema=public"
```

## Frontend Setup

To start the frontend application, run the following command:

```sh
cd ./client && npm run dev
```

Once both services are running, the project will be fully operational.
