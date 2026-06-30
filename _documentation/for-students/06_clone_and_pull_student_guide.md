# 📥 Student Guide: Direct Cloning and Daily Updates

This repository is a read-only resource containing lecture guides, code templates, and exercises. You do not need to write your assignments here or push code to this repository. Instead, you will clone it to your computer once, and pull down fresh updates and guides from the instructor every day.

---

## 🚀 Step 1: Clone the Repository

To download this repository to your local machine:

**Step 1:** Open your terminal or command prompt.

**Step 2:** Navigate to the folder where you keep your projects (e.g., `cd Documents/Projects`).

**Step 3:** Run the clone command:

```bash
git clone https://github.com/saumya1601/teaching.git
```

**Step 4:** Navigate into the cloned folder:

```bash
cd teaching
```

**Step 5:** Install the project dependencies:

```bash
npm install
```

**Step 6:** Open the project in VS Code:

```bash
code .
```

---

## 🔄 Step 2: The Daily Pull Workflow

Every day before class, the instructor may upload new guides, files, or templates. To download the latest changes:

**Step 1:** Open your terminal inside the `teaching` project directory.

**Step 2:** Run the pull command:

```bash
git pull
```

Since you are not editing the files inside this repository directly, `git pull` will instantly download the latest materials with no conflicts.

---

## ⚡ How to Run the App and Explore Examples

To launch the Vite development server and view the examples locally:

**Step 1:** Run the development server in your terminal:

```bash
npm run dev
```

**Step 2:** Hold `Ctrl` (or `Cmd` on Mac) and click the link in the terminal (usually `http://localhost:5173`) to view the application in your browser.

---

## ⚠️ Important: Keeping Your Repository Synced

Because you will be pulling updates regularly, any local edits you make to the files in this folder can cause **merge conflicts** and block future `git pull` updates.

To prevent this:

* **Do not write your own homework or code directly inside this directory.** If you want to modify or practice with the example files, copy them to a separate folder/project on your computer.
* If you accidentally edit a file and `git pull` fails, you can discard all local changes and pull fresh updates by running:

```bash
# Discard all local changes
git restore .

# Pull the fresh updates from the instructor
git pull
```
