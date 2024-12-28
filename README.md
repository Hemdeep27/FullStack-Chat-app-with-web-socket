# MERN Chat Application

## Overview
This is a real-time chat application built with the MERN stack (MongoDB, Express, React, and Node.js) and WebSocket technology using Socket.IO. The app allows users to communicate in real time with a clean and intuitive interface. It is deployed on Render.

## Features
- **Real-time messaging** using Socket.IO
- **User authentication** with JWT
- **MongoDB** for storing user and chat data
- **Responsive UI** built with React
- **RESTful API** for user and chat management
- **Deployed** on Render

## Technologies Used
- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB (Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render

## Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm or yarn
- MongoDB Atlas or a local MongoDB server
- Render account for deployment

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mern-chat-app
   ```

2. Install dependencies:
   ```bash
   # For the server
   cd server
   npm install

   # For the client
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=<Your MongoDB connection string>
     JWT_SECRET=<Your JWT secret>
     CLIENT_URL=<URL of your React app>
     PORT=5000
     ```
   - Create a `.env` file in the `client` directory with the following:
     ```env
     REACT_APP_SERVER_URL=<URL of your Node.js server>
     ```

## Deployment on Render

### Server Deployment
1. Push your code to a GitHub repository.
2. Log in to Render and create a new Web Service.
3. Connect your repository and set the build command to:
   ```bash
   npm install && npm run build
   ```
4. Add the environment variables listed above for the server.
5. Deploy the service.

### Client Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder on Render using their static site hosting option.

## Usage
1. Register or log in to the application.
2. Start a conversation by selecting a user or group.
3. Send and receive messages in real time.


## Future Enhancements
- Implement typing indicators
- Add notifications for new messages


Try Our App
👉 https://my-chat-iwby.onrender.com
