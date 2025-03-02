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

Before running the backend, a new database must be created, and the `ddl.sql` file should be injected into it. This file also includes mock data for initial setup.

## Setting Up the Frontend

To start the frontend application, run the following command:

```sh
cd ./client && npm run dev
```

Once both services are running, the project will be fully operational.
