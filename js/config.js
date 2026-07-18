/**
 * Department Library AI Chatbot
 * Firebase and Application Configuration
 */

// Custom Firebase Project credentials (replace with your actual Firebase project config)
export const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

/**
 * Checks if the Firebase configurations are populated with valid user keys.
 * If not, the application automatically falls back to offline "Demo Mode"
 * storing and reading all data from localStorage.
 */
export function isFirebaseConfigured() {
    const defaultPlaceholderKeys = [
        "YOUR_API_KEY",
        "YOUR_PROJECT_ID",
        "YOUR_MESSAGING_SENDER_ID",
        "YOUR_APP_ID"
    ];
    
    return FIREBASE_CONFIG.apiKey && 
           !defaultPlaceholderKeys.includes(FIREBASE_CONFIG.apiKey) && 
           FIREBASE_CONFIG.projectId && 
           !defaultPlaceholderKeys.includes(FIREBASE_CONFIG.projectId);
}

/**
 * Configures the current execution mode
 */
export const APP_MODE = isFirebaseConfigured() ? "firebase" : "demo";

console.log(`[Library Chatbot Config] Initialized in "${APP_MODE.toUpperCase()}" mode.`);
