# backend

## Description

This is a REST API for the DriverLog application. It is built using Node.js, Express.js, and MongoDB. It is hosted on Render. The API is used by the DriverLog application to store and retrieve data. The API is also used by the DriverLog website to retrieve data.

## Endpoints

### Drivers

- GET: /api/drivers - Get all drivers
- POST: /api/drivers/signup-driver - Create a new driver
- GET: /api/drivers/me - Get the current driver
- GET: /api/drivers/profile - Get the current driver's profile
- GET/PUT/DELETE: /api/drivers/:id - Get a driver by id / Update a driver by id /Delete a driver by id

### Admin

- GET: /api/admin - Get all admins
- POST: /api/admin/create-admin - Create a new admin
- GET: /api/admin/me - Get the current admin
- GET/PUT/DELETE: /api/admin/:id - Get an admin by id / Update an admin by id / Delete an admin by id

### Auth

- POST: /api/auth/signin-admin - Sign in as an admin
- POST: /api/auth/signin-driver - Sign in as a driver
- POST: /api/auth/logout - Logout

### DutySatus

- GET/POST: /api/dutystatus - Get all duty statuses / Create a new duty status
- GET/PUT/DELETE: /api/dutystatus/:id - Get a duty status by id / Update a duty status by id / Delete a duty status by id

### TripLogs

- GET/POST: /api/triplogs - Get all log triplogs / Create a new triplog
- GET/PUT/DELETE: /api/triplogs/:id - Get a triplog by id / Update a triplog by id / Delete a triplog by id

### Vehicles

- GET/POST: /api/vehicles - Get all vehicles / Create a new vehicle
- GET/PUT/DELETE: /api/vehicles/:id - Get a vehicle by id / Update a vehicle by id / Delete a vehicle by id

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables

```bash
PORT=3000
MONGODB_URI=<your mongodb uri>
NODE_ENV=development
TOKEN_SECRET=<your token secret>
```

4. Run the application

```bash
npm run server
```

## Usage

The API is used by the DriverLog application to store and retrieve data. The API is also used by the DriverLog website to retrieve data.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Isaac Phiri](https://github.com/IaacPhiri)

## Acknowledgements

- [Holberton School](https://www.holbertonschool.com/)
- [DriverLog](
