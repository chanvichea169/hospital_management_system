# Hospital Management System Frontend

## Description
This is the frontend application for the Hospital Management System, built with React and TypeScript. It provides a user interface for interacting with the backend services, managing hospital operations, and displaying relevant information.

## Features
- **User Authentication**: Secure login, registration, and OTP verification processes.
- **Admin Dashboard**: A dedicated section for administrative tasks and overview.
- **User Settings**: Functionality for users to manage their profiles and preferences.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive user experience.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Node.js**: JavaScript runtime environment for running development tools.
- **npm (or Yarn)**: Package managers for JavaScript.

## Setup and Installation

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js**: It is highly recommended to use the latest LTS (Long Term Support) version of Node.js. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node Package Manager, which comes bundled with Node.js.
- **Git**: For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).

### Installation Steps
Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository**:
    Open your terminal or command prompt and run the following command to clone the project from its Git repository. Replace `<repository-url>` with the actual URL of your repository.
    ```bash
    git clone <repository-url>
    cd hospital-management-system
    ```

2.  **Install dependencies**:
    Navigate into the cloned project directory and install all the necessary project dependencies. This command reads the `package.json` file and downloads all required packages.
    ```bash
    npm install
    # If you prefer using Yarn, you can use:
    # yarn install
    ```

### Environment Variables
This project uses environment variables for sensitive information or configuration that might change between environments (e.g., API endpoints).
Create a `.env` file in the root directory of the project (if one doesn't already exist) and add the necessary variables. A common variable might be:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```
*Note: Do not commit your `.env` file to version control.*

## Running the Application

To start the development server and view the application in your browser:

```bash
npm start
# Or if you use Yarn:
# yarn start
```
This command:
- Starts the development server.
- Opens the application in your default web browser at `http://localhost:3000`.
- Enables hot-reloading, meaning any changes you make to the code will automatically refresh the browser.

## Project Structure

A brief overview of the project's directory structure:

-   `public/`: Contains static assets like `index.html`, `favicon.ico`, and other images (`avatar.png`, `bg.png`, `logo.png`). These files are served directly by the web server.
-   `src/`: This is where the main application source code resides.
    -   `api/`: Contains modules for interacting with the backend API, such as `api.js`. This centralizes API calls for better maintainability.
    -   `components/`: Houses reusable UI components like `Random.tsx`, `SettingsButton.tsx`, `Header/` (containing `Header.tsx`, `ProfileMenu.tsx`), and `SideBar/` (containing `SideBar.tsx`).
    -   `layouts/`: Defines the overall structure and common UI elements for different sections of the application, e.g., `AdminDashboard.tsx`, `SettingPage.jsx`.
    -   `pages/`: Contains the main page components of the application, such as `LoginPage.tsx`, `RegisterPage.tsx`, `ResendOtpPage.jsx`, and `VerifyOtpPage.tsx`.
    -   `routes/`: Manages the application's routing configuration, typically defining which component renders for which URL path (e.g., `AppRoutes.tsx`).
    -   `theme/`: Stores theme-related configurations, primarily for Tailwind CSS customization (e.g., `theme.tsx`).
    -   `App.tsx`, `index.tsx`: Main application entry points and root components.
    -   `App.css`, `index.css`: Global CSS styles.
    -   `App.test.tsx`, `setupTests.ts`: Files related to testing the application.
    -   `react-app-env.d.ts`: TypeScript declaration file for create-react-app environment.
    -   `reportWebVitals.ts`: For measuring performance in your app.

## Available Scripts

In the project directory, you can run the following npm scripts:

-   `npm start`: Runs the app in development mode. This is what you'll use most often during development.
-   `npm test`: Launches the test runner in interactive watch mode. This is useful for running unit and integration tests.
-   `npm run build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!
-   `npm run eject`: **(Use with caution)** This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project. This gives you full control over them, but you lose the ability to update the Create React App tooling automatically. You usually don't need to use this unless you're an advanced user and want to customize build processes.

## Contributing

We welcome contributions to this project! If you have suggestions for improvements, bug fixes, or new features, please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more details.
