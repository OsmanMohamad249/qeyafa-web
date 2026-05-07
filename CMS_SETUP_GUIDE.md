# Qeyafa CMS Setup Guide

Follow these steps to launch your Sanity Admin Portal and connect it to the Qeyafa frontend.

## 1. Initialization

Since the code is already scaffolded in the `sanity/` folder, you just need to install the dependencies.

**Run this command in your terminal:**
```bash
cd sanity && npm install
```

## 2. Environment Variables & Project ID

You need a Sanity Project ID to connect your studio to the cloud.

### Option A: Create New Project via CLI (Recommended)
1.  Inside the `sanity` folder, run:
    ```bash
    npx sanity init --reconfigure
    ```
2.  Choose **"Create new project"**.
3.  Name it `qeyafa-cms`.
4.  Choose dataset configuration **"production"** (default).
5.  **Important:** When asked about output path or schemas, choose **"No"** to overriding or using TypeScript if you want to keep the current setup, but since `package.json` exists, it might just update the configuration `sanity.cli.js` with your new ID.
6.  **Copy the "Project ID"** it generates.

### Option B: Manual Setup
1.  Go to [https://www.sanity.io/manage](https://www.sanity.io/manage) and create a new project.
2.  Copy your **Project ID**.
3.  Create a file named `.env` inside the `sanity/` folder.
    ```env
    SANITY_STUDIO_PROJECT_ID=your_project_id_here
    SANITY_STUDIO_DATASET=production
    ```
4.  Also paste this Project ID into your **Frontend** `.env` file (in the project root):
    ```env
    VITE_SANITY_PROJECT_ID=your_project_id_here
    VITE_SANITY_DATASET=production
    ```

## 3. Running the Studio

Start the Admin Dashboard locally:

```bash
# Inside the sanity/ folder
npm run dev
```

Your Studio will launch at [http://localhost:3333](http://localhost:3333).

## 4. CORS Settings (Critical)

For your React frontend ([http://localhost:5173](http://localhost:5173)) to fetch data from Sanity, you must allow it.

1.  Go to [https://www.sanity.io/manage](https://www.sanity.io/manage).
2.  Select your project -> **API** tab.
3.  Scroll to **CORS Origins**.
4.  Click **Add CORS Origin**.
5.  Enter: `http://localhost:5173`
6.  Check **Allow credentials**.
7.  Save.

---

## 5. Uploading Content

1.  Open the Studio ([http://localhost:3333](http://localhost:3333)).
2.  **Partners:** Create "Partner" documents. Upload logos (transparent PNGs work best).
3.  **Promo Slides:** Create a "Promo Slide". Check "Is Active". Add Title (EN/AR) and Image/Video.
4.  **Journey Steps:** Add 3 steps. Number them 1, 2, 3.

*Refresh your frontend to see the changes!*

