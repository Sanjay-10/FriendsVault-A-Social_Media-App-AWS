# FriendsVault - A Social Media Platform

Welcome to **FriendsVault**, a dynamic and engaging social media platform where users can share memories through photos, GIFs, and posts. The platform allows users to like and comment on others' content, fostering connections and building communities.

### 🔗 [Live Demo](https://friendsvault.vercel.app/)

## 🚀 Features
- **Sign Up / Log In**: Users can create accounts and log in securely using JWT authentication.
- **Post Creation**: Users can post images, GIFs, or text content.
- **Friends Interaction**: Users can add friends and view their profile pages.
- **Likes and Comments**: Users can like posts and leave comments to engage with the community.
- **Profile Pages**: View friends' posts and activities.
- **Responsive Design**: Built with modern design practices, ensuring a great user experience across all devices.

## 🛠️ Tech Stack

### **Frontend**
- **React.js**: For building interactive user interfaces and handling component-based development.
- **Material UI**: To create a clean, responsive, and visually appealing design.
- **Formik**: Used for form validation and management, providing smooth user interactions.
- **Redux Toolkit**: Manages the global state, ensuring an efficient data flow across the application.
- **Vercel**: Hosting the frontend for a fast and scalable user experience.

### **Backend**
- **Node.js**: JavaScript runtime to handle backend operations.
- **Express.js**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Multer**: Middleware to handle media uploads like images and GIFs.
- **JWT (JSON Web Token)**: Authentication system to securely manage user sessions.

### **Cloud Services**
- **AWS S3**: Used for storing user-uploaded images and GIFs, providing fast and reliable file storage.
- **AWS EC2**: The platform backend is hosted on EC2 instances for scalable and reliable performance.

## ⚙️ Key Functionality
1. **User Authentication**: Secure sign-up, login, and session management using JWT.
2. **Media Uploads**: Images and GIFs are uploaded via Multer and stored securely in AWS S3.
3. **Global State Management**: Efficient data flow across components and improved performance using Redux Toolkit.
4. **Comments & Likes**: Enables user interaction through liking posts and leaving comments.
5. **Responsive Design**: The platform is fully responsive, ensuring smooth user experience on mobile, tablet, and desktop devices.

## 🔧 Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjay-10/FriendsVault-A-Social_Media-App-AWS.git
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Create a `.env` file in the server folder and add the following:
   ```
   MONGODB_URI=your_mongodb_uri
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   cd server
   npm start
   ```

5. Start the frontend client:
   ```bash
   cd client
   npm start
   ```

6. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

## 📂 Folder Structure

```bash
|-- client          # React frontend code
    |-- public      # Static assets
    |-- src         # React components and pages
|-- server          # Node.js/Express backend code
    |-- controllers # Backend logic and API routes
    |-- models      # MongoDB models for users and posts
    |-- routes      # API endpoints
|-- README.md       # Project documentation
```

## 📝 Future Enhancements
- **Real-time Notifications**: Implement WebSocket for real-time updates on likes and comments.
- **Image Filters**: Add editing and filtering features for uploaded images.
- **Content Moderation**: Improve content moderation using AI-based tools (e.g., AWS Rekognition) for filtering inappropriate media.

## 🤝 Contributing
We welcome contributions to improve FriendsVault. Feel free to fork the repository and submit pull requests!

## 📜 License
You are free to use, modify, and distribute this project for any personal or commercial use. However, please provide appropriate credit to the original author, Sanjay Suthar.
