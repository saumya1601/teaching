# 🚀 Student Guide: Mastering Git and GitHub

This guide is a comprehensive, step-by-step manual to using **Git** (local version control) and **GitHub** (cloud collaboration host). Whether you are starting a new project, working with branches, or collaborating via Pull Requests (PRs), this guide covers everything you need to know.

---

## 🧭 Git vs. GitHub: What's the Difference?

* **Git** is a command-line tool that runs locally on your computer. It tracks the history of your files, allowing you to save snapshots of your progress.
* **GitHub** is an online platform that hosts Git repositories in the cloud. It provides a visual interface for collaboration, code reviews, and project management.

### The Git Lifecycle Diagram

```text
       [ Working Directory ]  <─── (Your actual files in VS Code)
                 │
                 │  git add <file>
                 ▼
          [ Staging Area ]     <─── (Draft area of changes ready to be saved)
                 │
                 │  git commit -m "..."
                 ▼
         [ Local Repository ]  <─── (Saved history inside the hidden .git/ folder)
                 │
                 │  git push origin <branch>
                 ▼
        [ Remote Repository ]  <─── (Uploaded code hosted on GitHub.com)
```

---

## 🧰 Step 0: Install Git & Create a GitHub Account

Before anything else, you need two things: **Git installed on your computer** and a **free GitHub account**.

### 1. Install Git

* **Windows**: Download from [git-scm.com/downloads](https://git-scm.com/downloads) and run the installer. Accept all default options (just keep clicking **Next**).
* **macOS**: Open Terminal and run `git --version`. If Git is not installed, macOS will prompt you to install the Xcode Command Line Tools — click **Install**.
* **Linux**: Run `sudo apt install git` (Debian/Ubuntu) or `sudo dnf install git` (Fedora).

### 2. Verify the Installation

Open a **new** terminal window (or PowerShell on Windows) and run:

```bash
git --version
```

You should see something like `git version 2.45.1`. If you get an error like *"git is not recognized"*, close all terminals, reopen them, and try again. If it still fails, reinstall Git.

### 3. Create a GitHub Account

1. Go to [github.com](https://github.com) and click **Sign up**.
2. Use a professional email address — this is the same email you will configure in Git below.
3. Pick a clean username (you may share it on a resume one day).
4. Verify your email when GitHub sends the confirmation.

---

## 🛠️ Step 1: One-Time Git Setup

Before you start using Git, configure your identity. Git attaches these credentials to every snapshot you save.

Open your terminal and run:

```bash
# Set your global username
git config --global user.name "Your Name"

# Set your email address (use the same email you registered on GitHub)
git config --global user.email "your.email@example.com"

# Set the default branch name to 'main' for all new repositories
git config --global init.defaultBranch main
```

To verify your configuration:

```bash
git config --list
```

### 🔐 Authenticate with GitHub (Important!)

GitHub **no longer accepts your account password** when pushing code from the terminal. You need to authenticate using one of these methods. **Pick ONE — the first option is the easiest for beginners.**

#### Option A: Sign in via VS Code (Easiest — Recommended)

1. Open VS Code.
2. Click the **Accounts** icon in the bottom-left corner (looks like a person silhouette).
3. Click **Sign in with GitHub to use GitHub Pull Requests**.
4. A browser window will open — log in and click **Authorize Visual-Studio-Code**.
5. Done! VS Code will now handle authentication for `git push` and `git pull` automatically.

#### Option B: GitHub CLI (`gh`)

1. Install from [cli.github.com](https://cli.github.com/).
2. Run `gh auth login` and follow the prompts (choose **HTTPS** and **Login with a web browser**).

#### Option C: Personal Access Token (PAT)

Use this if Options A and B don't work for you.

1. On GitHub, click your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Give it a name (e.g., `vscode-laptop`), set expiration (e.g., 90 days), and check the **`repo`** scope.
4. Click **Generate token** and **copy the token immediately** — you will not see it again.
5. The first time you `git push`, paste this token when prompted for a password.

> [!WARNING]
> **Never share your Personal Access Token!** Treat it like a password. If it leaks, revoke it immediately on GitHub.

---

## 📦 Step 2: Creating a GitHub Repository

You can start a Git project in two ways: creating a brand-new repository on GitHub, or initializing a local folder and linking it online.

### Option A: Create on GitHub and Clone (Recommended for new projects)

1. Go to [GitHub.com](https://github.com) and click the green **New** button (or the **+** icon in the top right).
2. **Repository name**: Give your project a clear name (e.g., `my-first-react-app`).
3. **Visibility**: Select **Public** (visible to everyone) or **Private** (visible only to you and chosen collaborators).
4. **Initialization**: Check **Add a README file** and **Add .gitignore** (select the template for `Node` if building a React/Vite project).
5. Click **Create repository**.
6. On the new repository page, click the green **Code** button and copy the HTTPS URL (e.g., `https://github.com/username/repo.git`).
7. Open your local terminal, navigate to the folder where you want to keep your project, and run:

   ```bash
   git clone https://github.com/username/repo.git
   ```

8. Open the newly created cloned folder in VS Code to start coding!

### Option B: Link an Existing Local Folder to GitHub

If you already created a folder locally (like a Vite React app) and want to upload it:

1. Create a blank repository on GitHub (do **NOT** check "Add a README" or "Add .gitignore" during creation).
2. Open your terminal in the root of your local folder and initialize Git:

   ```bash
   git init
   ```

3. Set your main branch name to `main`:

   ```bash
   git branch -M main
   ```

4. Connect your local folder to your remote GitHub repository:

   ```bash
   git remote add origin https://github.com/username/repo.git
   ```

5. Stage all files, commit them, and push:

   ```bash
   git add .
   git commit -m "initial commit"
   git push -u origin main
   ```

   *(The `-u` flag links your local `main` branch directly to the remote `main` branch so you can just run `git push` next time).*

---

## 📝 Understanding `.gitignore` (Critical!)

A `.gitignore` file is a plain text file that lives in the **root of your project**. It tells Git: *"Hey, ignore these files and folders — don't track them, don't stage them, don't push them to GitHub."*

### Why It Matters

* **`node_modules/`** contains thousands of dependency files (often 100+ MB). Pushing it will break your repository and make it unusable.
* **`.env`** contains secret API keys, passwords, and tokens. Pushing it can leak your credentials publicly.
* **`dist/`** or **`build/`** are auto-generated production files. They change constantly and should be rebuilt, not stored.

### Example `.gitignore` for a Vite + React Project

Create a file named `.gitignore` (note the leading dot!) in the root of your project with this content:

```text
# Dependencies
node_modules/

# Production build
dist/
build/

# Environment variables (secrets!)
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor & OS files
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
Thumbs.db
```

> [!TIP]
> If you accidentally committed a file you should have ignored (e.g., `.env`), add it to `.gitignore`, then run:
> ```bash
> git rm --cached .env
> git commit -m "chore: stop tracking .env file"
> git push
> ```
> **Important**: If real secrets were pushed, you must immediately rotate/regenerate those API keys — they are now public forever in your Git history.

### Sharing Environment Variables Safely with `.env.example`

Since `.env` is ignored, your teammates won't know which variables are needed. Create a `.env.example` file (this one **IS** pushed) with placeholder values:

```text
# .env.example — Copy this file to .env and fill in real values
VITE_API_URL=https://api.example.com
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
```

---

## 🔍 Checklist: What Your React Project Folder Should Look Like Before Pushing

Before running `git add .` and pushing your code to GitHub, ensure your project directory is clean and properly ignored. Pushing massive dependency folders or private credentials will break your repository.

Here is what your project folder should look like in your file explorer (with key notes on what gets pushed vs. what gets ignored):

```text
repository-root-folder/  (This should be your root directory, NOT a nested subfolder)
├── node_modules/         🚫 IGNORED (Never push! Git automatically ignores this via .gitignore)
├── public/               ✅ Pushed (Contains public icons, static assets)
├── src/                  ✅ Pushed (Your main React components, hooks, assets, pages)
├── dist/                 🚫 IGNORED (Production build folder - automatically ignored)
├── .env                  🚫 IGNORED (Contains actual private API keys - NEVER push this!)
├── .env.example          ✅ Pushed (Contains placeholder keys as a setup guide)
├── .gitignore            ✅ Pushed (Tells Git which files and folders to ignore)
├── eslint.config.js      ✅ Pushed (Code linter settings)
├── index.html            ✅ Pushed (Browser entry point)
├── package-lock.json     ✅ Pushed (Locks package dependency versions)
├── package.json          ✅ Pushed (Lists metadata, scripts, and dependencies)
└── vite.config.js        ✅ Pushed (Vite configuration file)
```

> [!WARNING]
> **Do NOT push a nested `my-react-app/` folder!**
> A very common mistake is running `npm create vite@latest my-react-app` inside your repository folder. This creates a nested subfolder named `my-react-app/` containing your actual project files.
>
> * **Never push a nested `my-react-app/` folder to GitHub.**
> * All React configuration files (like `package.json`, `vite.config.js`) and the `src/` folder **must sit directly at the root** of your repository. If they are nested, hosting platforms like Vercel will fail to build your application.
>
> **Checking what Git is tracking**
> Run `git status` before running `git add .`. If you see `node_modules/` or `.env` listed under **Untracked files**, **STOP immediately**. It means your `.gitignore` file is missing or incorrectly configured. Do not push until you fix `.gitignore`!

---

## 🔄 Step 3: The Daily Development Workflow

When working on code, repeat this cycle continuously to save your progress.

### 1. Check Status

See what files you've modified, deleted, or created:

```bash
git status
```

### 2. Stage Changes

Select which changes you want to include in your next save state (Staging Area):

```bash
# Stage a single file
git add src/App.jsx

# Stage all changes in the project
git add .
```

### 3. Commit Changes

Create a permanent local snapshot with a descriptive message explaining *why* the change was made:

```bash
git commit -m "feat: add validation to login form inputs"
```

> [!TIP]
> **Write Meaningful Commit Messages**
> A good commit message uses the imperative mood: *"fix: resolve email validation bug"* instead of *"fixed the bug"* or *"added code"*.

### 4. Push to GitHub

Upload your local commits to GitHub:

```bash
git push
```

---

## 🖱️ Using Git Inside VS Code (No Terminal Needed!)

If you prefer clicking buttons over typing commands, VS Code has a built-in **Source Control** panel that does everything for you.

### Opening Source Control

* Click the **branch icon** on the left sidebar (third icon from the top), OR
* Press `Ctrl+Shift+G` (Windows/Linux) or `Cmd+Shift+G` (Mac).

### The Workflow in VS Code

1. **See your changes**: Modified files appear under **Changes** with colored letters:
   * `M` = Modified
   * `U` = Untracked (new file)
   * `D` = Deleted
2. **Stage a file**: Hover over a file and click the **`+`** icon (this is `git add`).
3. **Stage all files**: Click the **`+`** next to the **Changes** header.
4. **Commit**: Type a message in the box at the top and press `Ctrl+Enter` (or click the **✓ Commit** button).
5. **Push**: Click the **`...`** menu → **Push**, OR click the **sync icon** at the bottom-left status bar.

### Helpful VS Code Extensions

* **GitLens** — Shows who wrote each line, when, and why. Incredibly helpful for understanding code history.
* **GitHub Pull Requests and Issues** — Review and create PRs without leaving VS Code.

---

## 🌿 Step 4: Branching

Branches allow you to work on new features, bug fixes, or experiments safely without breaking the stable main production code (`main`).

```text
main branch:   ●─────────────────────────────────────────────● (Merged!)
                \                                           /
                 \ git switch -c feature                   / Merge PR
feature branch:   ●──────────────●──────────────●─────────●
                       Commit 1       Commit 2    (PR Created)
```

### 1. Create and Switch to a New Branch

Before making changes for a new task, create a separate branch. Name it descriptively (e.g., `feature/contact-form`, `bugfix/nav-styling`):

```bash
# Create and switch to a new branch in one command
git checkout -b feature/contact-form

# Modern alternative command:
git switch -c feature/contact-form
```

### 2. Check Which Branch You Are On

```bash
git branch
```

The active branch will have an asterisk (`*`) and be highlighted in green.

### 3. Work and Save

Add, edit, and delete files. Stage and commit your changes locally:

```bash
git add .
git commit -m "feat: create contact form inputs and setup layout"
```

### 4. Push Your Branch to GitHub

Because this branch is new and only exists on your computer, you must tell Git to create it on GitHub:

```bash
git push -u origin feature/contact-form
```

*(Once done once, you can just run `git push` for subsequent updates on this branch).*

---

## 🔀 Step 5: Creating and Merging Pull Requests (PRs)

A **Pull Request (PR)** is a request to merge the changes from your feature branch into the stable `main` branch. It acts as a workspace for code review, comments, and security checks.

### 1. Open the Pull Request on GitHub

1. Go to your repository on [GitHub.com](https://github.com).
2. GitHub will show a yellow banner: **"Your-branch had recent pushes..."** with a green button: **Compare & pull request**. Click it.
3. If the banner is not there: Click the **Pull requests** tab, and click the green **New pull request** button. Select `main` as the base branch and `feature/contact-form` as the compare branch.
4. Add a title and description detailing:
   * What features you added.
   * Any bugs you fixed.
   * Screenshots of any UI changes.
5. Click **Create pull request**.

### 2. Address Feedback & Make Edits

If a teammate (or your teacher) reviews your PR and requests changes:

1. Open VS Code on your computer.
2. Ensure you are on your feature branch: `git switch feature/contact-form`.
3. Make the requested code changes.
4. Stage, commit, and push your changes:

   ```bash
   git add .
   git commit -m "refactor: adjust validation rules based on review feedback"
   git push
   ```

5. **The Pull Request on GitHub will automatically update** with your new commits. You do not need to create a new PR!

### 3. Merging the PR

Once the code is approved and passes checks:

1. Click the green **Merge pull request** button on GitHub.
2. Click **Confirm merge**.
3. Once merged, click the **Delete branch** button to clean up the remote repository.

### 4. Syncing Your Local Repository

After merging online, sync your local computer:

```bash
# 1. Switch back to the main branch locally
git switch main

# 2. Download the merged changes from GitHub
git pull

# 3. Clean up the local feature branch (optional)
git branch -d feature/contact-form
```

---

## 🔄 Step 6: Syncing & Resolving Conflicts

When collaborating, another developer might edit the same lines of code as you. When you try to merge or pull, Git will stop and alert you of a **Merge Conflict**.

### How to Handle Conflicts

1. Pull the latest code:

   ```bash
   git pull origin main
   ```

2. Git will pause and output:
   `CONFLICT (content): Merge conflict in src/App.jsx. Automatic merge failed; fix conflicts and then commit the result.`

3. Open the conflicting file in VS Code. Conflicts will be marked by Git markers:

   ```javascript
   <<<<<<< HEAD
   <h1>Welcome User</h1>  // Your local change
   =======
   <h1>Welcome, Guest!</h1>  // The incoming change from GitHub
   >>>>>>> main
   ```

4. Choose a resolution:
   * Keep your changes (Accept Current Change)
   * Keep their changes (Accept Incoming Change)
   * Keep both changes
   * Write a manual compromise combining both inputs.

5. Delete the helper markers (`<<<<<<<`, `=======`, `>>>>>>>`).

6. Save the file, stage, and commit the resolved conflict:

   ```bash
   git add src/App.jsx
   git commit -m "merge: resolve conflict in App.jsx greeting header"
   git push
   ```

---
## ⏪ Step 7: Undoing Mistakes

Everyone makes mistakes — Git is great at fixing them. Here are the most common "oops" situations beginners run into.

### Unstage a File (you ran `git add` by accident)

```bash
# Remove a single file from the staging area (keeps your changes!)
git restore --staged src/App.jsx

# Unstage everything
git restore --staged .
```

### Discard Local Changes (throw away unsaved edits)

> [!WARNING]
> This permanently deletes your uncommitted changes — there is **no undo**.

```bash
# Discard changes in one file
git restore src/App.jsx

# Discard ALL local changes
git restore .
```

### Fix the Last Commit Message (typo or wrong message)

```bash
git commit --amend -m "feat: corrected commit message here"
```

> [!CAUTION]
> Only amend commits you have **NOT** pushed yet. Amending a pushed commit rewrites history and breaks things for your teammates.

### Add a Forgotten File to the Last Commit

```bash
git add forgotten-file.jsx
git commit --amend --no-edit
```

### Undo a Commit That Was Already Pushed

Use `git revert` — it creates a **new commit** that undoes the bad one (safe for shared branches):

```bash
# Find the commit you want to undo
git log --oneline

# Revert it (use the commit hash from above)
git revert abc1234
git push
```

### View Your Project History

```bash
# Compact one-line view of all commits
git log --oneline

# Visual graph showing branches and merges
git log --graph --oneline --all

# Press 'q' to exit the log view
```

### Temporarily Save Work Without Committing (Stashing)

Use this when you need to switch branches but aren't ready to commit:

```bash
# Save your work in progress
git stash

# Switch branches, do other stuff, then come back...

# Bring your stashed work back
git stash pop

# See all your stashes
git stash list
```

---

## ✍️ Commit Message Conventions (Conventional Commits)

Use a prefix to describe **what type of change** you made. This keeps your history clean and easy to scan.

| Prefix | When to Use | Example |
| :--- | :--- | :--- |
| `feat:` | A new feature | `feat: add dark mode toggle` |
| `fix:` | A bug fix | `fix: prevent crash on empty form submit` |
| `docs:` | Documentation only | `docs: update README install steps` |
| `style:` | Formatting (no code change) | `style: format App.jsx with prettier` |
| `refactor:` | Code restructure (no behavior change) | `refactor: extract Button into component` |
| `test:` | Adding or fixing tests | `test: add unit tests for login form` |
| `chore:` | Maintenance, deps, configs | `chore: update vite to v5.2` |

---

## 🆘 Troubleshooting: Common Errors & Fixes

### ❌ `fatal: not a git repository`

**Cause**: You're in a folder that doesn't have Git initialized.
**Fix**: `cd` into the correct project folder, or run `git init` if this is a brand-new project.

### ❌ `Updates were rejected because the remote contains work that you do not have locally` (non-fast-forward)

**Cause**: Someone (or you on another machine) pushed changes to GitHub that you don't have locally.
**Fix**:
```bash
git pull --rebase
git push
```

### ❌ `Please tell me who you are` / `Author identity unknown`

**Cause**: You skipped the `git config` step.
**Fix**: Run the two `git config --global` commands from **Step 1** above.

### ❌ `Permission denied (publickey)` or `Authentication failed`

**Cause**: GitHub doesn't recognize you.
**Fix**: Re-do the authentication steps in **Step 1** (sign in via VS Code or create a new PAT).

### ❌ Accidentally pushed `.env` or `node_modules/`

**Fix**:
```bash
# Stop tracking the file/folder (keeps the local copy)
git rm -r --cached node_modules
git rm --cached .env

# Make sure .gitignore is set up correctly first!
git commit -m "chore: remove ignored files from tracking"
git push
```
If real secrets leaked in `.env`, **rotate those keys immediately** on the service that issued them (EmailJS, Firebase, etc.).

### ❌ `error: pathspec 'main' did not match any file(s) known to git`

**Cause**: Your local default branch is named `master`, not `main`.
**Fix**:
```bash
git branch -M main
```

### ❌ I committed to the wrong branch!

**Fix** (if you haven't pushed yet):
```bash
# Create a new branch from your current state
git branch correct-branch-name

# Reset the wrong branch back one commit
git reset --hard HEAD~1

# Switch to the new branch — your commit is safely here
git switch correct-branch-name
```

---

## 🍴 Bonus: Forking vs. Cloning

| | **Clone** | **Fork** |
| :--- | :--- | :--- |
| **What** | Downloads a copy to your computer | Creates a copy on **your GitHub account** |
| **When** | You own the repo or are a collaborator | You want to contribute to someone else's project |
| **Push access** | Yes (if you have permission) | Yes (it's your fork!) |
| **Workflow** | Clone → branch → PR | Fork → clone your fork → branch → PR back to original |

**How to fork**: On any GitHub repository, click the **Fork** button in the top-right corner. Then clone *your fork* (not the original) to your computer.

---

## 📄 Don't Forget the README!

Every good repository has a `README.md` file at the root. This is the first thing visitors (and recruiters!) see. Include:

* **Project title** and a one-sentence description
* **Live demo link** (if deployed on Vercel/Netlify)
* **Screenshots** of your app
* **Tech stack** (React, Tailwind, Vite, etc.)
* **How to install and run locally**:
  ```bash
  git clone https://github.com/username/repo.git
  cd repo
  npm install
  npm run dev
  ```
* **Environment variables needed** (point to `.env.example`)

---
## 🚨 Git Best Practices Checklist

* [ ] **Configure `.gitignore` before you start**: Never commit `node_modules/`, `.env`, or build outputs (`dist/`) to GitHub. If committed accidentally, delete them with `git rm -r --cached <dir>`.
* [ ] **Commit small, commit often**: Don't build a whole app in one commit. Make a commit for every small functional addition (e.g., adding styling, setting up routing, creating a form).
* [ ] **Pull before you push**: Always run `git pull` before starting a coding session to ensure you have the latest updates from your teammates.
* [ ] **Never work directly on the `main` branch**: Always create a feature branch for your code changes, and merge it via a Pull Request.
