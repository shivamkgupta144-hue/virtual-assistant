# Virtual Assistant

Virtual Assistant is a full-stack AI-powered web application that allows users to interact with a voice-enabled assistant. It can answer questions, search on Google and YouTube, open useful websites, and respond using voice.

**Live Demo:**
https://virtual-assistant-gamma-rust.vercel.app

---

## Overview

This project was built to understand how AI assistants work in real-world applications. It combines speech recognition, text-to-speech, authentication, database integration, and AI APIs into a single application.

Users can create their own assistant, customize its appearance, interact through voice commands, and view their conversation history.

---

## Features

* User authentication (JWT-based login and signup)
* Voice recognition using Web Speech API
* AI-powered conversation using Gemini API
* Google Search
* YouTube Search & Play
* Weather search
* Open Calculator
* Open Instagram & Facebook
* Assistant customization (name and image)
* Conversation history stored in database
* Responsive user interface

---

## Tech Stack

### Frontend

* React.js
* Context API
* Tailwind CSS
* Axios
* Web Speech API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Services

* Gemini API
* Cloudinary

---

## Setup

### Clone the repository

```bash
git clone https://github.com/ritikrajput12/virtual-assistant.git
cd virtual-assistant
```

---

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:

```env
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
GEMINI_API_URL=your_model_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```bash
npm start
```

---

### Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## Project Structure

```
virtual-assistant/
├── frontend/
├── backend/
└── README.md
```

---

## How it works

1. User signs in using JWT authentication.
2. Voice input is captured using the Web Speech API.
3. The frontend sends the command to the backend.
4. Backend processes the request using the Gemini API.
5. The assistant returns a response along with the required action.
6. The frontend performs actions like Google Search, YouTube Search, opening websites, or speaking the response aloud.

---

## Future Improvements

* Support for multiple AI providers
* Smarter voice command handling
* More built-in commands
* Better conversation memory
* Mobile application support

---

## Author

**Ritik Rajput**

GitHub:
https://github.com/ritikrajput12
