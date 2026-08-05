
export const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


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


export const APP_MODE = isFirebaseConfigured() ? "firebase" : "demo";

console.log(`[Library Chatbot Config] Initialized in "${APP_MODE.toUpperCase()}" mode.`);


export const GEMINI_CONFIG = {

    ENABLE_AI : true,

    PROVIDER : "GOOGLE_GEMINI",

    MODEL : "gemini-2.5-flash",

    API_ENDPOINT :
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",

    API_KEY :
    "PASTE_YOUR_NEW_GEMINI_API_KEY_HERE",

    MAX_OUTPUT_TOKENS : 2048,

    TEMPERATURE : 0.7,

    TOP_P : 0.9,

    TOP_K : 40,

    ENABLE_CHAT_HISTORY : true,

    ENABLE_VOICE_INPUT : true,

    ENABLE_VOICE_OUTPUT : false,

    ENABLE_TYPING_EFFECT : true,

    ENABLE_SMART_SEARCH : true,

    ENABLE_BOOK_SEARCH : true,

    ENABLE_NOTICE_SEARCH : true,

    ENABLE_FACULTY_SEARCH : true,

    ENABLE_PREVIOUS_PAPER_SEARCH : true,

    ENABLE_FAQ : true,

    CHATBOT_NAME :
    "Department Library AI Assistant",

    BOT_AVATAR :
    "🤖",

    USER_AVATAR :
    "👨‍🎓"

};

export const LIBRARY_INFORMATION = {

    LIBRARY_NAME :
    "Department Library",

    COLLEGE_NAME :
    "K.D. Polytechnic Patan",

    DEPARTMENT :
    "Computer Engineering",

    VERSION :
    "2.0",

    DEVELOPER :
    "Vipul Thakor",

    SUPPORT_EMAIL :
    "library@example.com"

};

console.log("Gemini AI Configuration Loaded Successfully");

console.log(GEMINI_CONFIG);

console.log(LIBRARY_INFORMATION);
