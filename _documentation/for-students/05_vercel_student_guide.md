# 🚀 Student Guide: Deploying Your React App to Vercel

This guide is a complete, step-by-step manual for deploying your **Vite + React + Tailwind** project to **Vercel** for free. By the end, you will have a live website with a public URL you can share on your resume, LinkedIn, or with friends.

Vercel is the easiest, fastest, and most beginner-friendly way to deploy a React app — and it's free for personal/student projects.

---

## 🧭 What is Vercel?

* **Vercel** is a cloud hosting platform built specifically for modern frontend frameworks like React, Next.js, Vue, and Svelte.
* It connects directly to your **GitHub repository** and automatically rebuilds and redeploys your site every time you push new code.
* It gives you a **free `.vercel.app` URL** (e.g., `my-portfolio.vercel.app`) and supports custom domains.
* It handles **HTTPS, CDN delivery, environment variables, and previews** — all automatically.

### The Vercel Deployment Flow

```text
   [ Your VS Code Editor ]
            │
            │  git push
            ▼
      [ GitHub Repo ]
            │
            │  Vercel detects the push via webhook
            ▼
   [ Vercel Build Server ]   ──►  Runs `npm install` + `npm run build`
            │
            │  Uploads the built dist/ folder
            ▼
   [ Vercel Global CDN ]
            │
            ▼
   [ your-app.vercel.app ]   ──►  Live for the whole world to see!
```

---

## ✅ Step 0: Prerequisites (Before You Start)

Make sure you have all of these ready. **Do not skip this checklist** — it prevents 90% of beginner deployment errors.

* [ ] You have a working **Vite + React** project that runs locally (`npm run dev` opens without errors).
* [ ] Your project is **pushed to a GitHub repository**. (If not, see the [GitHub Student Guide](./00_github_student_guide.md) first.)
* [ ] Your `package.json` exists at the **root** of the repository (NOT inside a nested subfolder like `my-react-app/`).
* [ ] Your project has a **`.gitignore`** that excludes `node_modules/` and `.env`.
* [ ] You have tested a local production build successfully:
  ```bash
  npm run build
  npm run preview
  ```
  If this fails locally, **it will fail on Vercel too**. Fix all build errors first.

> [!WARNING]
> **The #1 cause of failed Vercel deployments is a nested project folder.**
> If your `package.json` lives at `repo-root/my-react-app/package.json` instead of `repo-root/package.json`, Vercel will not find it. Either move the files to the root, or configure the **Root Directory** in Vercel settings (covered in Step 4).

---

## 🛠️ Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**.
2. Choose **Continue with GitHub** (this is the easiest path — it links your accounts automatically).
3. Authorize Vercel to access your GitHub account.
4. When asked about a plan, choose the **Hobby** plan (it's **free forever** for personal projects).
5. You can skip any team/organization setup prompts during signup.

---

## 📦 Step 2: Import Your GitHub Repository

1. On your Vercel dashboard, click the **Add New...** button in the top-right, then choose **Project**.
2. You will see a list of your GitHub repositories under **Import Git Repository**.
3. If you don't see your repository:
   * Click **Adjust GitHub App Permissions**.
   * Either grant access to **All repositories** or select the specific repository you want to deploy.
   * Click **Save**, then return to Vercel.
4. Find your repository in the list and click the **Import** button next to it.

---

## ⚙️ Step 3: Configure Your Project

Vercel is smart — it usually auto-detects that you are using **Vite** and fills in everything for you. You should see:

| Setting | Auto-Detected Value (for Vite) |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` (or `vite build`) |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Development Command** | `npm run dev` |

> [!TIP]
> **If "Framework Preset" shows `Other` instead of `Vite`**, click the dropdown and manually select **Vite**. This ensures Vercel uses the correct build settings.

### Project Name

Vercel will suggest a project name based on your repo (e.g., `my-portfolio`). This name becomes your URL: `my-portfolio.vercel.app`. You can change it now or later.

---

## 🔐 Step 4: Add Environment Variables (If Your App Uses Them)

If your app uses any `.env` variables (like EmailJS keys, Firebase config, or API tokens), you **must** add them to Vercel — your `.env` file is **not** uploaded because it's in `.gitignore`.

### How to Add Them

1. On the **Configure Project** screen, expand the **Environment Variables** section.
2. For each variable in your local `.env` file:
   * **Key**: the variable name (e.g., `VITE_EMAILJS_PUBLIC_KEY`)
   * **Value**: paste the actual secret value
   * Click **Add**.
3. Repeat for every variable your app needs.

> [!IMPORTANT]
> **Vite requires the `VITE_` prefix.** Only environment variables that start with `VITE_` are exposed to your React code. So if your local `.env` has `VITE_EMAILJS_SERVICE_ID=xxx`, you must add it to Vercel with the **exact same name**, prefix included.

### Where to Find Your Local Variables

Open your local `.env` file:
```bash
# Example .env file
VITE_EMAILJS_PUBLIC_KEY=abc123xyz
VITE_EMAILJS_SERVICE_ID=service_456
VITE_EMAILJS_TEMPLATE_ID=template_789
```
Copy each `KEY=value` pair into Vercel's Environment Variables section.

### Setting the Root Directory (for nested projects)

If (and only if) your `package.json` lives inside a subfolder of your repo:

1. Expand the **Root Directory** section.
2. Click **Edit** and select the subfolder containing `package.json` (e.g., `my-react-app`).
3. Click **Continue**.

---

## 🚀 Step 5: Deploy!

1. Click the big **Deploy** button at the bottom.
2. Vercel will:
   * Clone your repository
   * Run `npm install`
   * Run `npm run build`
   * Upload the `dist/` folder to its global CDN
3. Watch the build logs scroll by in real-time. This usually takes **30 seconds to 2 minutes**.
4. When you see **🎉 Congratulations!** with confetti, your site is **LIVE**!
5. Click the screenshot preview or the URL to visit your deployed app.

---

## 🔄 Step 6: Continuous Deployment (The Magic!)

Here's the best part: **you never have to manually deploy again.**

From now on, every time you `git push` to your `main` branch, Vercel will automatically:

1. Detect the push.
2. Run a fresh build.
3. Deploy the new version to your production URL.

### The Workflow

```bash
# 1. Make changes in VS Code
# 2. Stage, commit, and push
git add .
git commit -m "feat: add new hero section"
git push

# 3. Vercel automatically deploys within ~1 minute. Done!
```

You can watch the deployment progress in real-time on your Vercel dashboard under the **Deployments** tab.

### Preview Deployments for Branches

When you push a **feature branch** (e.g., `feature/new-form`) or open a **Pull Request**, Vercel creates a **unique preview URL** just for that branch (e.g., `my-app-git-feature-new-form-username.vercel.app`).

This is incredibly powerful because:
* You can test new features on a real URL **before** merging to `main`.
* You can share the preview link with friends/teachers for feedback without breaking your live site.
* Each PR on GitHub automatically gets a comment from Vercel with the preview link.

---

## 🌐 Step 7: Add a Custom Domain (Optional)

Want `myname.com` instead of `my-app.vercel.app`?

1. Buy a domain from any registrar (e.g., [Namecheap](https://www.namecheap.com), [Porkbun](https://porkbun.com), [Cloudflare](https://www.cloudflare.com/products/registrar/)).
2. In your Vercel project, go to **Settings** → **Domains**.
3. Type your domain and click **Add**.
4. Vercel will give you DNS records (either an `A` record or `CNAME` record).
5. Go to your domain registrar and paste those DNS records into your domain's DNS settings.
6. Wait 5–60 minutes for DNS to propagate. Vercel will automatically provision a free SSL certificate (HTTPS).

> [!TIP]
> Students can get a **free `.me` domain for 1 year** through the [GitHub Student Developer Pack](https://education.github.com/pack) (via Namecheap). Perfect for portfolios!

---

## 🛠️ Step 8: Managing Your Project (Post-Deployment)

### Vercel Dashboard Overview

Your project page on Vercel has these key tabs:

| Tab | What It Does |
| :--- | :--- |
| **Overview** | Latest deployment, production URL, recent commits |
| **Deployments** | History of every deployment (with build logs) |
| **Analytics** | Traffic stats (free tier includes basic analytics) |
| **Logs** | Runtime logs from your app |
| **Settings** | Environment variables, domains, build config, Git integration |

### Updating Environment Variables Later

1. Go to **Settings** → **Environment Variables**.
2. Edit, add, or delete variables as needed.
3. **Important**: After changing env variables, you must **redeploy** for changes to take effect:
   * Go to **Deployments** tab → click the **`⋯`** menu on the latest deployment → **Redeploy**.

### Rolling Back a Bad Deployment

If you push broken code and the live site is down:

1. Go to the **Deployments** tab.
2. Find the last working deployment (usually with a green checkmark).
3. Click the **`⋯`** menu → **Promote to Production**.

Your live site instantly switches back to the working version. Fix your code, then push again.

---

## 🆘 Troubleshooting: Common Deployment Errors

### ❌ "No Output Directory named 'dist' found"

**Cause**: Your build failed, or your output directory is named something else (e.g., `build`).
**Fix**:
* Check the build logs for errors at the top.
* In **Settings → Build & Development**, verify **Output Directory** is set to `dist` (for Vite) or `build` (for Create React App).

### ❌ "Command 'npm run build' exited with 1"

**Cause**: There's an error in your code that breaks the build (often a missing import, typo, or unused variable with strict linting).
**Fix**:
1. Run `npm run build` **locally** in your terminal.
2. Read the error message carefully — it points to the exact file and line.
3. Fix the error, commit, and push again.

### ❌ App deploys but shows a blank white page

**Cause**: Usually a JavaScript runtime error (often an undefined `process.env.X` or wrong path).
**Fix**:
1. Open the deployed site in your browser.
2. Press `F12` to open DevTools → **Console** tab.
3. Read the red error messages — they tell you exactly what's broken.
4. Common culprits:
   * Forgot to add an environment variable on Vercel.
   * Used `process.env.X` instead of `import.meta.env.VITE_X` (Vite uses the latter!).
   * Hardcoded `localhost:3000` URLs in your code.

### ❌ Environment variables are `undefined` in production

**Cause**: Missing `VITE_` prefix or you forgot to redeploy after adding them.
**Fix**:
* Make sure every env variable in Vite starts with `VITE_`.
* After adding/changing env vars on Vercel, **redeploy** manually (see Step 8 above).
* In your React code, read them as: `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`.

### ❌ Page refresh shows 404 on routes (e.g., `/about`, `/contact`)

**Cause**: React Router uses client-side routing, but Vercel doesn't know that `/about` should serve `index.html`.
**Fix**: Create a `vercel.json` file at the **root** of your project:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
Commit and push. Vercel will pick it up on the next deploy.

### ❌ "The Root Directory ... does not contain a package.json file"

**Cause**: Your `package.json` is in a nested folder, or you set the wrong Root Directory.
**Fix**:
* Go to **Settings → General → Root Directory**.
* Set it to the folder containing `package.json` (e.g., `my-react-app`), or leave blank if it's at the root.
* Redeploy.

### ❌ Build succeeds but my images / fonts don't load

**Cause**: Wrong asset paths or case-sensitivity issues (Vercel's Linux servers are case-sensitive; Windows is not).
**Fix**:
* Make sure imports match file names **exactly** (e.g., `import logo from './Logo.png'` won't find `logo.png`).
* Place static assets in the `public/` folder and reference them with absolute paths: `/myimage.png`.

---

## 🔐 Security Best Practices

* ✅ **Never commit `.env` files.** Always use Vercel's Environment Variables UI for secrets.
* ✅ **Only `VITE_` variables are public.** Any variable prefixed with `VITE_` is **bundled into your JavaScript and visible to anyone**. Do NOT put truly secret keys (like database passwords or admin tokens) in `VITE_` variables. Use a backend (Vercel Serverless Functions) for those.
* ✅ **Rotate leaked keys immediately.** If you accidentally pushed an API key to GitHub, regenerate it on the service provider's dashboard — don't just delete the commit.
* ✅ **Use Vercel's Production / Preview / Development scopes** for env variables if you want different values per environment.

---

## 📊 Free Tier Limits (Hobby Plan)

Vercel's free Hobby plan is generous, but be aware of the limits (approximate — always check [vercel.com/pricing](https://vercel.com/pricing) for current numbers):

| Resource | Free Hobby Limit |
| :--- | :--- |
| **Bandwidth** | ~100 GB/month |
| **Build Execution** | ~6,000 minutes/month |
| **Deployments** | Unlimited |
| **Commercial Use** | Not allowed (personal projects only) |

For 99% of student/portfolio projects, you will never hit these limits.

> [!NOTE]
> Vercel periodically updates its pricing structure. If you build something that gets real traffic, double-check the current limits before relying on them.

---

## 🚨 Vercel Deployment Best Practices Checklist

* [ ] Test `npm run build` and `npm run preview` **locally** before pushing.
* [ ] Make sure `package.json` is at the **root** of your repo (or configure Root Directory).
* [ ] Add all `VITE_` environment variables to Vercel before deploying.
* [ ] Use **preview deployments** for feature branches — don't test in production.
* [ ] Add a `vercel.json` if you use **React Router**.
* [ ] Watch the **build logs** for warnings, not just errors — they often hint at future problems.
* [ ] Pin your **Node version** in `package.json` if your build behaves differently locally vs. Vercel:
  ```json
  "engines": {
    "node": "20.x"
  }
  ```
* [ ] After each deploy, **visit your live URL** and open the browser console to check for runtime errors.
* [ ] Add a custom favicon, meta tags, and Open Graph image so your site looks professional when shared.

---

## 🎓 Next Steps

Now that your app is live:

1. **Share the URL** on LinkedIn, your resume, and your GitHub profile README.
2. **Add a custom domain** to make it look professional.
3. Explore **[Vercel Analytics](https://vercel.com/analytics)** to see how many people visit.
4. Learn about **[Vercel Serverless Functions](https://vercel.com/docs/functions)** to add a backend (e.g., contact form handler, database queries) without setting up a separate server.
5. Try deploying a **Next.js** project next — it's made by the same company as Vercel and unlocks even more features (SSR, ISR, API routes).

---

**Congratulations 🎉 — you now have a real, live, production website that the whole world can visit!**
