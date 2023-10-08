# backend

## Description

This is a REST API for the DriverLog application. It is built using Node.js, Express.js, and MongoDB. It is hosted on Render. The API is used by the DriverLog application to store and retrieve data. The API is also used by the DriverLog website to retrieve data.

## Endpoints

### Drivers

- GET: /api/drivers - Get all drivers
```bash
# Example of a driver object
{
    "_id": "65087a0d2559ca7742cff7ae",
    "firstName": "John",
    "lastName": "Doe",
    "licenseNumber": 4534655463,
    "nationalId": "123456/78/9",
    "contactNumber": "+260123456789",
    "email": "johndoe@example.com",
    "homeAddress": "Lagos",
    "licenseExpiryDate": "2026-01-01T00:00:00.000Z",
    "role": "driver",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyaXZlck25uaXBhdWwuY29tIiwidXNlcklkIjoiNjUwODdhMGQyNTU5Y2E3NzQyY2ZmN2FlIiwicm9sZSI6ImRyaXZlciIsImlhdCI6MTY5NjY4MjU1NSwiZXhwIjoxNjk5Mjc0NTU1fQ.cTxBDQuzdsXxtUxnyY1dOYWIA-ZfINmgWqZawprc"
}
```
- POST: /api/drivers/signup-driver - Create a new driver
- GET: /api/drivers/me - Get the current driver
- GET: /api/drivers/profile - Get the current driver's profile
- GET/PUT/DELETE: /api/drivers/:id - Get a driver by id / Update a driver by id /Delete a driver by id

### Admin

- GET: /api/admin - Get all admins
```bash
# Example of an admin response object
{
    "_id": "651698c51a7f37714912f4a5",
    "name": "Test Admin",
    "email": "admin@admin.com",
    "contactNo": "+2602188786198",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRvGF1bC5jb20iLCJ1c2VySWQiOiI2NTE2OThjNTFhN2YzNzcxNDkxMmY0YTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTY2ODI5MDQsImV4cCI6MTY5OTkwNH0.Xf9r5gRtrv6mNUnJ0RX_5JdVJ1zbTNxz1xIa6B6hdaQ"
}
```
- POST: /api/admin/create-admin - Create a new admin
```bash
# Example of a create-admin request body
{
  "name": "TEST ADMIN",
  "email": "admin7@admin.com",
  "contactNo": "+26021964298",
  "password": "Qwewesug87624@#"
}
```
- GET: /api/admin/me - Get the current admin
- GET/PUT/DELETE: /api/admin/:id - Get an admin by id / Update an admin by id / Delete an admin by id

### Auth

- POST: /api/auth/signin-admin - Sign in as an admin
```bash
# Example of a driver sigin-admin request body
{
  "email": "admin@admin.com",
  "password": "QWErty123!"
}
```
- POST: /api/auth/signin-driver - Sign in as a driver
```bash
# Example of a driver sigin-driver request body
{
  "email": "johndoe@example.com",
  "password": "QWErty123!"
}
```
- POST: /api/auth/logout - Logout

### DutySatus

- GET/POST: /api/dutystatus - Get all duty statuses / Create a new duty status
- GET/PUT/DELETE: /api/dutystatus/:id - Get a duty status by id / Update a duty status by id / Delete a duty status by id

### TripLogs

- GET/POST: /api/triplogs - Get all log triplogs / Create a new triplog
- GET/PUT/DELETE: /api/triplogs/:id - Get a triplog by id / Update a triplog by id / Delete a triplog by id

```bash
# Example of a triplog object : start trip - POST: /api/triplogs
{
  "originAddress": "San Francisco",
  "startLng": -122.084,
  "startLat": 37.421,
  "purpose": "Meeting with client"
}
```
```bash
# Example of a triplog object : end trip - P0ST: /api/triplogs
{
  "destinationAddress": "New York",
  "endLng": -74.005974,
  "endLat": 40.712776,
  "vehicle": "ABC123",
  "comments": "We successfully attended the meeting."
}
```

### Vehicles

- GET/POST: /api/vehicles - Get all vehicles / Create a new vehicle
- GET/PUT/DELETE: /api/vehicles/:id - Get a vehicle by id / Update a vehicle by id / Delete a vehicle by id
```bash
# Example of a vehicle object
{
        "_id": "6500c30222d4694df31154a5",
        "make": "Toyota",
        "model": "Navara",
        "licensePlate": "ADD1234",
        "createdAt": "2023-09-12T19:58:58.817Z",
        "updatedAt": "2023-09-12T19:58:58.817Z",
        "__v": 0
    }
```

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
RECIPIENT_EMAIL=<your email>
GMAIL_PASSWORD=<your gmail app password>
```

4. Run the application

```bash
cd backend
npm run server
```

## Usage

The API is used by the DriverLog application to store and retrieve data.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Isaac Phiri](https://github.com/IaacPhiri)

## Acknowledgements

- [Holberton School](https://www.holbertonschool.com/)
- [Render](https://render.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)