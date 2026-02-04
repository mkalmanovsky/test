# AGENTS.md

## Project Overview
This project is a dedicated Sign-Up/Login React application using TypeScript. It allows users to authenticate using a username-based mock authentication system.

## Tech Stack & Dependencies
*   **Framework:** React 19 (Create React App)
*   **Language:** TypeScript
*   **Styling:** Bootstrap 5
*   **Forms:** React Hook Form
*   **Testing:** React Testing Library, Jest

### Key Dependencies (from `package.json`)
*   `bootstrap`
*   `react`
*   `react-dom`
*   `react-hook-form`
*   `react-scripts`
*   `typescript`
*   `web-vitals`

## Project Structure
The project is located in the `hello-world` directory.

```
hello-world/
├── src/
│   ├── components/      # Reusable React components
│   │   └── AuthForm.tsx # Main login form with logic
│   ├── styles/          # Global styles
│   │   └── global.css
│   ├── App.tsx          # Main entry component
│   └── index.tsx        # Application entry point
├── public/              # Static assets
└── package.json         # Project configuration
```

## Setup & Running
1.  Navigate to the project directory: `cd hello-world`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start` (Runs on Port 4200 via `.env`)
4.  Run tests: `npm test`

## Business Logic
The application implements specific mock authentication logic in `AuthForm.tsx`:

*   **User "Alex"**: Triggers a **Success** modal (Green, "Access Granted").
*   **User "Anton"**: Triggers an **Error** modal (Red, "Access Denied").
*   **Other Users**: Default to **Error** ("Access Denied").

## Verification
*   Tests are located in `src/App.test.tsx` covering the render and both logic cases.
*   Modals are implemented using Bootstrap classes.
