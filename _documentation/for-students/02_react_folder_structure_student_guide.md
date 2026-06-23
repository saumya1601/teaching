# 📁 Student Guide: React Project Folder Structure

This guide outlines a clean, scalable folder structure for React applications. Organizing your files logically makes it easier to build, maintain, and scale your application as it grows.

---

## 🏗️ The Folder Structure at a Glance

Here is a standard layout for a React project. This structure separates code by its role (pages, components, layouts, custom hooks, services, and utilities):

```text
my-react-app/
├── public/                 # Static public assets (favicons, manifest.json, robots.txt)
├── src/
│   ├── assets/             # Media files (images, icons, fonts, logos) processed by Vite
│   │   ├── images/
│   │   └── icons/
│   ├── components/         # Reusable global UI components (stateless or general UI logic)
│   │   ├── common/         # Atomic UI inputs/buttons (Button.jsx, Input.jsx, Card.jsx)
│   │   ├── form/           # Custom form wrapper fields (FormInput.jsx, FormSelect.jsx)
│   │   └── feedback/       # Notifications, status messages (Toast.jsx, LoadingSpinner.jsx)
│   ├── layouts/            # Page templates/structural frames
│   │   ├── MainLayout.jsx  # Layout with global Navigation bar, Footer, and Page contents
│   │   └── AuthLayout.jsx  # Layout for auth pages (e.g. Centered Card layout)
│   ├── pages/              # Page components corresponding directly to website routes
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   └── Register/
│   │       └── Register.jsx
│   ├── api/                # API request functions and Axios configuration (e.g., auth.js, user.js)
│   ├── hooks/              # Custom reusable React hooks (useAuth.js, useFetch.js)
│   ├── context/            # React Context providers for global state (AuthContext.jsx)
│   ├── services/           # Third-party integrations and SDK initializations (emailjs.js, firebase.js)
│   ├── utils/              # Helper functions, validation schemas, and constant definitions
│   │   ├── validation.js   # (e.g., Yup validation schemas)
│   │   ├── formatters.js   # (e.g., currency, date formatters)
│   │   └── constants.js    # (e.g., config defaults, status codes)
│   ├── App.jsx             # Root component that mounts pages and sets up routing
│   ├── index.css           # Main CSS stylesheet with Tailwind directive imports
│   └── main.jsx            # Entry point that mounts the React app to the HTML DOM
├── .env                    # Local environment variables (ignored by Git, holds private API keys)
├── .env.example            # Template for environment variables (pushed to Git as a reference)
├── .gitignore              # Files/folders to ignore in Git (e.g., node_modules, .env)
├── eslint.config.js        # ESLint code styling configurations
├── index.html              # HTML entry template (where Vite injects React code)
├── package.json            # Project dependencies and script runner configurations
├── vite.config.js          # Vite plugin configuration
└── README.md               # Quick setup instructions for the project
```

---

## 📝 Complete Folder & File Explanations

To build React applications effectively, you need to understand the purpose of each folder and file. Below is a detailed breakdown of how they work:

### 🌐 Core Static Folders

* **`public/`**
  * **Purpose**: Holds completely static assets that the build tool (Vite) does not need to process or optimize.
  * **Use Case**: Browser icons (`favicon.ico`), site manifest files (`manifest.json`), `robots.txt`, or third-party libraries that need to be loaded globally without import statements.
  * **Key Concept**: Files here are copied directly to the root of the output directory during build. You reference them with absolute URLs (e.g., `/favicon.ico`).

* **`src/assets/`**
  * **Purpose**: Holds media assets that *are* imported directly into your React component code.
  * **Use Case**: Project logos, custom font files, background images, or icons used inside specific components.
  * **Key Concept**: Vite optimizes, compresses, and hashes these files when you build for production (e.g., `logo.png` might become `logo-A9b8C7.png` to prevent browser caching issues). Always `import` assets from here in your JSX (e.g., `import logo from '../assets/logo.png'`).

---

### 🎨 Visual & Layout Hierarchy

* **`src/components/`**
  * **Purpose**: Holds atomic, highly reusable UI components that can be used across multiple pages of your application.
  * **Subfolders**:
    * `common/`: Simple, stateless, building blocks like buttons (`Button.jsx`), inputs (`Input.jsx`), modals (`Modal.jsx`), or cards (`Card.jsx`).
    * `form/`: Reusable inputs wrapped with form logic (like Formik/Yup inputs).
    * `feedback/`: Feedback messages like notifications, spinners, or alert banners.
  * **Key Concept**: Keep components in this folder generic. They should rely on React **props** to customize their text, style, and click behavior rather than holding global application state.

* **`src/layouts/`**
  * **Purpose**: Defines structural frames/shells for your pages.
  * **Use Case**:
    * `MainLayout.jsx`: Includes a persistent Header, Sidebar Navigation, and Footer.
    * `AuthLayout.jsx`: A simple centered card template used for login, register, and password-reset screens.
  * **Key Concept**: Layouts contain elements that stay the same as users navigate between pages, rendering the page component dynamically in a slot using React children or `<Outlet />` (from React Router).

* **`src/pages/`**
  * **Purpose**: Represents the full views/routes of your web application.
  * **Use Case**: Creating distinct views like `Home.jsx` (`/`), `Login.jsx` (`/login`), and `Dashboard.jsx` (`/dashboard`).
  * **Key Concept**: Pages are composed of reusable elements from `components/` and wrapped inside templates from `layouts/`. A page is usually where you load data, fetch APIs, and coordinate page-specific state.

---

### 🧠 Logic, State & Integration

* **`src/api/`**
  * **Purpose**: Centralizes Axios/Fetch setup and API request functions.
  * **Use Case**: `src/api/axiosClient.js` (for configuring headers, base URLs, and interceptors) and request files like `src/api/authApi.js` (containing functions like `loginUser(credentials)`).
  * **Key Concept**: Keeps your components clean by avoiding raw `fetch()` or `axios()` URL strings inside components.

* **`src/hooks/`**
  * **Purpose**: Custom, reusable React hooks that contain stateful logic.
  * **Use Case**: `useAuth()` (to check if a user is logged in), `useFetch()` (to handle API loading/error states automatically), or `useLocalStorage()` (to sync component state with browser storage).
  * **Key Concept**: Custom hooks always start with the word `use`. They let you reuse React logic (like `useState` and `useEffect`) across different components without copying code.

* **`src/context/`**
  * **Purpose**: Houses React Context Providers to share global state without prop-drilling (passing props down 5 levels).
  * **Use Case**: `AuthContext.jsx` (stores user login details globally) or `ThemeContext.jsx` (tracks light/dark mode settings).
  * **Key Concept**: Use Context sparingly for truly global data that many different components need access to.

* **`src/services/`**
  * **Purpose**: Integrates external third-party SDKs and configuration setups.
  * **Use Case**: Initializing Firebase client SDKs, configuring EmailJS templates, or configuring Stripe payment libraries.
  * **Key Concept**: Keeps API configurations separated from local database API calls.

* **`src/utils/`**
  * **Purpose**: Pure utility helper functions that contain zero React code or state.
  * **Use Case**: `formatters.js` (converting numbers to currency, formatting dates), `validators.js` (custom regex schemas), or `constants.js` (storing standard color hex codes or API error codes).

---

### ⚙️ Key Root Files

* **`App.jsx`**: The entry point component of your application's React structure. It usually wraps the application in Providers (Auth Context, Theme Providers) and sets up page routing.
* **`index.html`**: The single HTML page loaded by the browser. It contains a `<div id="root"></div>` where Vite injects your compiled React code.
* **`main.jsx`**: The critical connection script. It grabs the `#root` element in the HTML and runs `createRoot` to render your `App.jsx` component inside it.
* **`.env` vs `.env.example`**:
  * `.env`: Holds actual private API keys and tokens (e.g., `VITE_API_KEY=12345`). **Never commit this file to Git.**
  * `.env.example`: A template showing what environment variables are required (e.g., `VITE_API_KEY=your_key_here`). Committed to Git so other developers know what variables to configure.
* **`vite.config.js`**: The configuration file for Vite. Here you register Vite plugins (like React and Tailwind) and customize proxy servers or build settings.
