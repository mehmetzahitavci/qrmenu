# QR Menu - Frontend

This is the frontend application for a QR code-based menu viewing system designed for restaurants and cafes.

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **UI Library** | Material UI (MUI) 7 |
| **Routing** | React Router DOM 7 |
| **Styling** | Emotion (CSS-in-JS) |
| **IDE** | VS Code |

## Requirements

- Node.js (v18+)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
frontend/
|-- public/              # Static files
|-- src/
|   |-- components/      # Reusable React components
|   |-- context/         # React Context (state management)
|   |-- pages/           # Page components
|   |-- services/        # API service modules
|   |-- theme/           # MUI theme configuration
|   |-- App.js           # Main application component
|   +-- index.js         # Application entry point
|-- package.json
+-- README.md
```

## Backend Connection

The frontend connects to a Spring Boot-based backend API. Make sure the backend is running at `http://localhost:8080` by default.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds for production with optimizations |

## Notes

- This project was bootstrapped with [Create React App](https://create-react-app.dev/).
- It is recommended to run the backend project with IntelliJ IDEA.
