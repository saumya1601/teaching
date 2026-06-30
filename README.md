# 🎓 React Forms, Validation, and EmailJS: Student Workspace

Welcome to the course repository! This workspace is designed to help you master modern React forms, client-side schema validation using **Formik & Yup**, and third-party email integration with **EmailJS**.

---

## 🚀 Quick Start Guide

To get started with this project on your local machine, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine (see the [Cloning &amp; Daily Pulls Guide](./_documentation/for-students/06_clone_and_pull_student_guide.md)):

```bash
git clone https://github.com/saumya1601/teaching.git
cd teaching
```

### 2. Install Dependencies

Install all the necessary packages (including Formik, Yup, and EmailJS) configured in `package.json`:

```bash
npm install
```

### 3. Start the Development Server

Launch the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application running.

---

## 📁 Repository Structure

Understanding the layout of this repository will help you navigate and find where to code:

```text
Teaching/
├── _documentation/          # Comprehensive learning guides
│   ├── for-students/        # Your step-by-step guides (00 to 06)
│   └── for-developer/       # Teacher-facing lesson plans and references
├── _requirement/            # Assignment requirements
│   └── requirement.txt      # Details on how to submit your work
├── src/                     # Source code directory
│   ├── App.jsx              # Main application entry point
│   ├── index.css            # Global CSS (imports Tailwind CSS v4)
│   ├── Intern-Work/         # Workspace folder (copy files from here if needed)
│   ├── email-js/            # Pre-configured examples of EmailJS
│   └── formik-yup-validation/ # Pre-configured examples of Formik and Yup
├── package.json             # Project dependencies and script runner configurations
└── vite.config.js           # Vite configuration (integrates @tailwindcss/vite)
```

---

## 🧭 Your Learning Path

We have prepared comprehensive step-by-step guides to take you from setting up Git to deploying a fully validated web application. Open and follow these markdown files in order:

1. **[`00_github_student_guide.md`](./_documentation/for-students/00_github_student_guide.md)**
   * Learn the difference between Git & GitHub, perform the one-time setup, and connect VS Code.
2. **[`06_clone_and_pull_student_guide.md`](./_documentation/for-students/06_clone_and_pull_student_guide.md)**
   * **(Important!)** Learn how to clone this repository directly and pull updates/lessons from the teacher daily.
3. **[`01_vite_react_tailwindcss4_student_guide.md`](./_documentation/for-students/01_vite_react_tailwindcss4_student_guide.md)**
   * Understand the modern frontend stack (Vite + React + Tailwind CSS v4) and how files compile.
4. **[`02_react_folder_structure_student_guide.md`](./_documentation/for-students/02_react_folder_structure_student_guide.md)**
   * Learn standard naming conventions, file roles, and clean code layout principles.
5. **[`03_formik_yup_student_guide.md`](./_documentation/for-students/03_formik_yup_student_guide.md)**
   * Understand declarative form-handling components, states (`touched`, `errors`), and Yup validation schemas.
6. **[`04_emailjs_student_guide.md`](./_documentation/for-students/04_emailjs_student_guide.md)**
   * Configure a service, template, and API keys with EmailJS to send email directly from React.
7. **[`05_vercel_student_guide.md`](./_documentation/for-students/05_vercel_student_guide.md)**
   * Deploy your final project to Vercel for free and manage environment variables securely.

---

## 🛠️ How to Work on Your Assignment

1. **Create Your Own Repository**: Follow the Git setup guides to initialize your own personal, brand-new repository for your homework.
2. **Use as a Reference**: Keep this `teaching` repository folder intact and run `git pull` daily to receive code templates and exercises.
3. **Copy Code Templates**: When working on assignments, copy code files from this repository (such as the exercises or templates in `src/formik-yup-validation/` or `src/email-js/`) into your personal project folder to build upon them.

---

## ✅ Submission Requirements

When you are ready to submit, make sure you follow the instructions in **[`_requirement/requirement.txt`](./_requirement/requirement.txt)**:

1. **Push your code** to a public GitHub repository.
2. **Deploy the application** to Vercel (following the [Vercel Student Guide](./_documentation/for-students/05_vercel_student_guide.md)).
3. **Submit the two links**:
   * Your public GitHub repository link.
   * Your live, working Vercel deployment URL.

---

💡 *Happy Coding! If you encounter any bugs, reference the troubleshooting checklists at the end of each guide.*
