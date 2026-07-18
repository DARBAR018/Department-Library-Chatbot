# Firebase Integration & Deployment Guide

This document guides you through setting up a live Firebase backend to replace the local mock database, configuring access rules, and deploying the library portal to production.

---

## Part 1: Firebase Project Setup

1. **Create Firebase Project**:
   - Open the [Firebase Console](https://console.firebase.google.com/).
   - Click **Add Project**, enter a name (e.g., `college-library-chatbot`), and click continue.
   - You can choose to enable or disable Google Analytics.
2. **Register a Web App**:
   - In the Project Overview, click the **Web icon (`</>`)** to register a web app.
   - Enter an app nickname, check **Firebase Hosting** if you plan to deploy directly, and click register.
   - Firebase will generate a config object. Copy this config.
3. **Configure the Project Config**:
   - Open `js/config.js` in your text editor.
   - Replace the values in `FIREBASE_CONFIG` with the generated values:
     ```javascript
     export const FIREBASE_CONFIG = {
         apiKey: "AIzaSy...",
         authDomain: "...",
         projectId: "...",
         storageBucket: "...",
         messagingSenderId: "...",
         appId: "..."
     };
     ```
   - Save the file. When you reload the site, it will automatically detect the populated config and switch from **Demo Mode** to **Firebase Mode**.

---

## Part 2: Backend Authentication & Databases

### 1. Enable Email/Password Auth
- In the Firebase sidebar, go to **Build > Authentication**.
- Click **Get Started**, select **Email/Password** from the sign-in providers, toggle **Enable**, and click save.
- Click on the **Users** tab, click **Add User**, and create the admin account manually:
  - **Email**: `admin@college.edu`
  - **Password**: Choose a secure password (e.g. `admin123`).

### 2. Provision Firestore Database
- In the Firebase sidebar, go to **Build > Firestore Database**.
- Click **Create Database**, select a region close to your users, and start in **Production Mode**.
- Once provisioned, database collections (`books`, `notices`, `faculty`, `papers`, `ebooks`, `faqs`) will automatically be created in Firestore when the admin performs the first write operations.

### 3. Deploy Firestore Security Rules
To prevent unauthorized users from editing library databases while keeping reading open to the public, go to the **Rules** tab in Firestore and replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper to check if request is from the admin account
    function isAdmin() {
      return request.auth != null && request.auth.token.email == 'admin@college.edu';
    }

    // Books, Notices, Faculty, Papers, E-Books, FAQs
    match /books/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /notices/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /faculty/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /papers/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /ebooks/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /faqs/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```
- Click **Publish** to deploy these rules.

---

## Part 3: Deploying the Website

### Option A: Firebase Hosting (Recommended)
1. Install Firebase CLI tools globally in your command prompt:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in using your Google account:
   ```bash
   firebase login
   ```
3. Initialize the project inside the workspace:
   ```bash
   firebase init hosting
   ```
   - Select **Use an existing project** and pick your project.
   - Set the public directory to `.` (the current workspace root).
   - Configure as a single-page app: **No** (we have separate multi-page HTML files).
   - Overwrite existing HTML files: **No** (crucial, do not overwrite).
4. Deploy the site:
   ```bash
   firebase deploy --only hosting
   ```
   - Firebase will return a live web URL (e.g. `https://your-project.web.app`).

### Option B: Netlify / Vercel
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `Department Library Chatbot` root directory directly into Netlify's web dashboard upload box.
3. Your web portal is instantly deployed to a responsive production CDN.
