# 🚀 Student Guide: Building with Vite, React, and Tailwind CSS v4

Welcome! This guide will walk you through setting up and building modern, high-performance web applications using **Vite**, **React**, and **Tailwind CSS v4**.

Tailwind CSS v4 introduces a brand new **CSS-first configuration** and a lightning-fast Rust-based engine (Oxide), which changes how we install, configure, and customize our styles. This guide explains all these details and gets you up to speed.

---

## 🧭 Why this Tech Stack?

Before we start coding, let's understand the tools we are using:

* **Vite** is a modern frontend build tool. Unlike older tools like Create React App (which use Webpack to bundle your entire application before starting a server), Vite uses native browser ES modules to serve your code instantly. It is incredibly fast.
* **React** is a declarative, component-based library for building user interfaces.
* **Tailwind CSS v4** is a utility-first CSS framework. It reads your React files, finds any utility class names you used (like `bg-blue-500` or `p-4`), and generates only the CSS you actually need.

The flow below shows how these three tools connect during development:

```text
React Components (App.jsx)
        │
        │  Uses utility classes like "bg-blue-500", "p-4"
        ▼
@tailwindcss/vite Plugin ──► Scans your JSX/TSX files for class names
        │
        ▼
Vite Dev Server / Build ──► Generates only the CSS you actually used
        │
        ▼
   Final Output (dist/)
```

---

## 🛠️ Step 1: Create a Vite + React Project

To create a new Vite project directly in your current directory (without creating a subfolder), run the following command in your terminal:

```bash
npm create vite@latest . -- --template react
```

> [!NOTE]
>
> * Using `.` tells Vite to initialize the project in your current workspace directory directly, so you do not need to run `cd` into a new folder afterwards.
> * `-- --template react` tells Vite to skip the interactive prompts and immediately initialize a React application with JavaScript. If you want TypeScript, use `react-ts` instead.
>
> **⚠️ WARNING:** If your current folder already contains files, Vite will display a prompt:
> `? Directory not empty. Remove existing files and continue?`
>
> * Choose **Ignore files and continue** to keep your existing work.
> * Choosing *Remove existing files* will **permanently delete** everything in the current folder!

Once the template is created, install the base dependencies:

```bash
npm install
```

---

## 📦 Step 2: Install Tailwind CSS v4

Unlike version 3, Tailwind CSS v4 integrates directly as a Vite plugin. This eliminates the need for PostCSS and simplifies the build process.

Run this command in your project terminal:

```bash
npm install tailwindcss @tailwindcss/vite
```

This installs:

1. `tailwindcss`: The core compiler and framework.
2. `@tailwindcss/vite`: The official Vite plugin that hooks into Vite's build lifecycle.

---

## ⚙️ Step 3: Configure the Vite Plugin

We must register the Tailwind CSS plugin in the Vite config.

Open the `vite.config.js` file (or `vite.config.ts` if using TypeScript) in the root of your project and update it:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import the Tailwind plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Add tailwindcss() to the plugins array
  ],
})
```

---

## 🧹 Step 4: Clean Up Boilerplate & Import Tailwind

By default, Vite creates some CSS stylesheets with placeholder styles that will conflict with your custom layouts. We need to clear them and import Tailwind.

### 1. Clear `src/App.css`

Open `src/App.css` and delete everything inside it. You can leave it empty or delete the file entirely.

### 2. Remove the `App.css` import from `src/App.jsx`

If you deleted `App.css`, you **must** also remove the import line from `src/App.jsx`. Open `src/App.jsx` and delete this line:

```jsx
import './App.css'  // ← Delete this line
```

If you skipped this step, you will get a build error: `Failed to resolve import './App.css'`.

### 3. Import Tailwind v4

Open `src/index.css`, delete all existing CSS lines, and paste this single line at the very top:

```css
@import "tailwindcss";
```

> [!IMPORTANT]
> **No more `@tailwind base;` directives!**
> In Tailwind v4, we use standard CSS `@import "tailwindcss";` instead of the old v3 style directives. This aligns Tailwind with standard CSS syntax.

---

## 🚀 Step 5: Start the App & Verify Setup

To verify everything is working, open `src/App.jsx`, replace its contents with the code below, and save:

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-slate-900">
      <h1 className="text-4xl font-bold">Hello</h1>
    </div>
  );
}
```

Also verify that your `src/main.jsx` file looks like this (this is the default — do not modify it):

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Now, launch the development server in your terminal:

```bash
npm run dev
```

Hold `Ctrl` and click the local link (usually `http://localhost:5173`) in your terminal to see your fully styled React app!

---

## 📁 Clean Project Folder Structure

After completing the cleanup steps, your project's main files and folders should look like this:

```text
your-project-folder/
├── node_modules/          (Auto-generated dependencies — do not edit)
├── public/                (Static assets like favicon)
├── src/
│   ├── assets/            (Default images like react.svg — can be cleared)
│   ├── App.css            (Clean/empty file, or deleted)
│   ├── App.jsx            (Clean — renders "Hello")
│   ├── index.css          (Contains ONLY @import "tailwindcss";)
│   └── main.jsx           (Imports index.css and mounts the App)
├── eslint.config.js       (ESLint configuration — generated by Vite)
├── index.html             (The HTML entry point)
├── package.json           (Defines dependencies & scripts)
└── vite.config.js         (Vite config with @tailwindcss/vite plugin)
```

---

## 🚨 Troubleshooting & Pitfalls Checklist

If your Tailwind utility styles are not rendering, verify these common setup mistakes:

1. **Checking the standard config?** Make sure you do NOT have a `tailwind.config.js` file in the root folder. In v4, configuration is CSS-first.
2. **Order of `@import` tags:** If you have custom CSS `@import` statements (like Google Fonts or third-party libraries), they **must** be placed above `@import "tailwindcss";` in your main stylesheet.
3. **Vite plugin registered?** Ensure `@tailwindcss/vite` is added inside the `plugins` array of your `vite.config.js`. If you miss this, Tailwind will not scan your `.jsx`/`.tsx` files for classes.
4. **Are you using the right import path?** In React, verify that `src/main.jsx` (or `src/main.tsx`) imports your CSS file correctly: `import './index.css';`.
5. **Restart the Dev Server:** Sometimes Vite caches compiled CSS layers during structural configuration changes. If something looks incorrect after making configuration changes, stop your terminal (`Ctrl + C`) and run `npm run dev` again to rebuild.
