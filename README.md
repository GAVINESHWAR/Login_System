# Car Management Application

This project is a full-stack application that allows users to create, view, edit, and delete car entries. Users can log in to manage their cars, upload images, and search for specific cars using keywords.

---

## Features

1. User Authentication:
   - Users can register and log in to manage their car listings.
2. Car Management:
   - Add, update, delete, and view car entries.
   - Attach up to 10 images for each car.
3. Search Functionality:
   - Search cars by title, description, or tags.

---

## Tech Stack

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB

---

## Setup Instructions

### Backend
1. Navigate to the backend directory:
2. Install dependencies:
3. Create a `.env` file and add the following:
4. Start the backend server:

### Frontend
1. Navigate to the frontend directory:
2. Install dependencies:
3. Start the frontend server:

---

## API Endpoints

### User Management
- **Register User**: `POST /api/auth/register`
- **Login User**: `POST /api/auth/login`

### Car Management
- **Add Car**: `POST /api/cars`
- **View Cars**: `GET /api/cars`
- **Update Car**: `PUT /api/cars/:id`
- **Delete Car**: `DELETE /api/cars/:id`

---

## Challenges and Solutions

1. **Dependency Conflicts**:
- Resolved React 18 and Material-UI issues by replacing `@mui/styles` with `sx` props.

2. **Duplicate Emails**:
- Added a unique index in MongoDB for email validation and displayed error messages in the frontend.

3. **Deployment Issues**:
- Properly configured environment variables and ensured compatibility during deployment.

---

## References

- [Material-UI Documentation](https://mui.com)
- [React Documentation](https://reactjs.org)
- [MongoDB Documentation](https://www.mongodb.com/docs)

---

Feel free to reach out for any questions or issues!

##Supporting Images
![image](https://github.com/user-attachments/assets/75dcbafd-2a50-43e3-9e05-17843246e010)
![image](https://github.com/user-attachments/assets/e0c61341-4d16-4f06-8a68-eb80f713a875)
![image](https://github.com/user-attachments/assets/a7c6bdfa-6cfa-42f4-bbf3-c8579e30e834)

