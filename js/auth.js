/**
 * Department Library AI Chatbot
 * Authentication Controller (Firebase Auth / LocalStorage Session Manager)
 */

import { FIREBASE_CONFIG, APP_MODE } from "./config.js";

let auth = null;

// Initialize Firebase Auth if configured
if (APP_MODE === "firebase") {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js");
        const { getAuth } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
        const app = initializeApp(FIREBASE_CONFIG);
        auth = getAuth(app);
        console.log("[Auth] Firebase Authentication initialized.");
    } catch (e) {
        console.error("[Auth] Firebase Auth initialization failed, using LocalStorage session:", e);
    }
}

// Storage keys for Demo Auth
const SESSION_KEY = "lib_current_session";
const USERS_KEY = "lib_registered_users";

// Seed default accounts in Demo Mode
function seedDemoUsers() {
    if (!localStorage.getItem(USERS_KEY)) {
        const defaultUsers = [
            {
                email: "admin@college.edu",
                password: "admin123",
                name: "System Administrator",
                role: "admin",
                verified: true
            },
            {
                email: "student@college.edu",
                password: "student123",
                name: "John Doe",
                role: "student",
                verified: true
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
        console.log("[Auth] Seeded default credentials: admin@college.edu (admin123) & student@college.edu (student123)");
    }
}
seedDemoUsers();

/* ==========================================
   AUTHENTICATION API ROUTER
   ========================================== */

/**
 * Register a new user account
 */
export async function register(email, password, displayName, role = "student") {
    if (APP_MODE === "firebase" && auth) {
        try {
            const { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } = 
                await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
            
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credential.user, { displayName });
            await sendEmailVerification(credential.user);
            
            // Note: Firestore custom user claims can store roles, 
            // but for simplicity we save the metadata in Firestore or infer student
            return {
                email: credential.user.email,
                name: displayName,
                role: role,
                verified: false
            };
        } catch (e) {
            throw new Error(e.message);
        }
    } else {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error("Email address already registered.");
        }
        
        const newUser = {
            email: email.toLowerCase(),
            password, // In a real app, hash this! This is for mock sandbox.
            name: displayName,
            role,
            verified: false // Requires simulated verification
        };
        
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    }
}

/**
 * Log in a user
 */
export async function login(email, password) {
    if (APP_MODE === "firebase" && auth) {
        try {
            const { signInWithEmailAndPassword } = 
                await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
            
            const credential = await signInWithEmailAndPassword(auth, email, password);
            
            const userObj = {
                email: credential.user.email,
                name: credential.user.displayName || credential.user.email.split('@')[0],
                role: credential.user.email.toLowerCase() === "admin@college.edu" ? "admin" : "student",
                verified: credential.user.emailVerified
            };
            
            // Set session token
            localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
            return userObj;
        } catch (e) {
            throw new Error(e.message);
        }
    } else {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (!user) {
            throw new Error("Invalid email or password.");
        }
        
        const userObj = {
            email: user.email,
            name: user.name,
            role: user.role,
            verified: user.verified
        };
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
        return userObj;
    }
}

/**
 * Reset password via email
 */
export async function resetPassword(email) {
    if (APP_MODE === "firebase" && auth) {
        try {
            const { sendPasswordResetEmail } = 
                await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    } else {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (!userExists) {
            throw new Error("Email address not found in system.");
        }
        console.log(`[Simulated Email] Password reset link sent to ${email}`);
        return true;
    }
}

/**
 * Log out current session
 */
export async function logout() {
    if (APP_MODE === "firebase" && auth) {
        try {
            const { signOut } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
            await signOut(auth);
        } catch (e) {
            console.error("Firebase SignOut error:", e);
        }
    }
    localStorage.removeItem(SESSION_KEY);
    return true;
}

/**
 * Get current active user object from session cache
 */
export function getCurrentUser() {
    try {
        const session = localStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Simulates Verification in Demo Mode
 */
export async function verifyUserEmail(email) {
    if (APP_MODE === "firebase") {
        // Firebase verification handles this natively by link
        return true;
    } else {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        if (idx !== -1) {
            users[idx].verified = true;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            
            // Update active session if verified user is logged in
            const current = getCurrentUser();
            if (current && current.email.toLowerCase() === email.toLowerCase()) {
                current.verified = true;
                localStorage.setItem(SESSION_KEY, JSON.stringify(current));
            }
            return true;
        }
        return false;
    }
}

/**
 * Auth state listener to hook into page scripts
 */
export function setupAuthListener(callback) {
    if (APP_MODE === "firebase" && auth) {
        import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js").then(({ onAuthStateChanged }) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userObj = {
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0],
                        role: user.email.toLowerCase() === "admin@college.edu" ? "admin" : "student",
                        verified: user.emailVerified
                    };
                    localStorage.setItem(SESSION_KEY, JSON.stringify(userObj));
                    callback(userObj);
                } else {
                    localStorage.removeItem(SESSION_KEY);
                    callback(null);
                }
            });
        });
    } else {
        // Trigger callback with current localStorage state immediately
        callback(getCurrentUser());
    }
}

/**
 * Helper to restrict routes based on roles
 */
export function enforceProtectedRoute(requiredRole = null) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "login.php?redirect=" + encodeURIComponent(window.location.pathname);
        return false;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        // Redirect standard user away from admin dashboard
        if (requiredRole === "admin") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "index.html";
        }
        return false;
    }
    return true;
}
