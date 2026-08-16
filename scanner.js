"use strict";

/*
============================================================
 DEPARTMENT LIBRARY CHATBOT
 QR + BARCODE BOOK SCANNER
============================================================

 Features:
 1. QR Code Scanner
 2. Barcode Scanner
 3. Camera Start / Stop
 4. Front / Back Camera Support
 5. Camera Permission Error Handling
 6. Duplicate Scan Protection
 7. Book ID Extraction
 8. URL Book ID Extraction
 9. Manual Book ID Search
10. Enter Key Search
11. Scanner Status
12. Scanner Messages
13. Book Validation
14. Automatic Book Details Opening
15. Camera Switching
16. Safe DOM Handling
17. Error Handling
18. Mobile Friendly Camera Settings
19. Scan Cooldown
20. Prevent Multiple Scanner Instances
============================================================
*/


// ==========================================================
// GLOBAL VARIABLES
// ==========================================================

let html5QrCode = null;

let scannerRunning = false;

let scannerStarting = false;

let scannerStopping = false;

let scannerMode = "qr";

let currentCameraId = null;

let availableCameras = [];

let lastScannedCode = "";

let lastScanTime = 0;

let scanCooldown = 2500;

let scannerInitialized = false;


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const startButton =
    document.getElementById("startScanner");

const stopButton =
    document.getElementById("stopScanner");

const cameraStatus =
    document.getElementById("cameraStatus");

const scannerTitle =
    document.getElementById("scannerTitle");

const scannerDescription =
    document.getElementById("scannerDescription");

const manualInput =
    document.getElementById("manualBookId");

const manualButton =
    document.getElementById("manualSearchButton");

const readerElement =
    document.getElementById("reader");

const scanMessage =
    document.getElementById("scanMessage");

const scanSubMessage =
    document.getElementById("scanSubMessage");


// ==========================================================
// OPTIONAL ELEMENTS
// ==========================================================

const switchCameraButton =
    document.getElementById("switchCamera");

const clearManualButton =
    document.getElementById("clearManualBookId");

const scannerTabs =
    document.querySelectorAll(".scanner-tab");


// ==========================================================
// INITIALIZATION
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeScanner
);


function initializeScanner() {

    if (scannerInitialized) {
        return;
    }

    scannerInitialized = true;


    // ------------------------------------------
    // Check HTML5 QR Code Library
    // ------------------------------------------

    if (
        typeof Html5Qrcode ===
        "undefined"
    ) {

        console.error(
            "Html5Qrcode library is not loaded."
        );


        updateCameraStatus(
            "Scanner Library Missing",
            "error"
        );


        showScannerMessage(
            "Scanner unavailable",
            "Please load the html5-qrcode library."
        );


        return;
    }


    // ------------------------------------------
    // Start Button
    // ------------------------------------------

    if (startButton) {

        startButton.addEventListener(
            "click",
            startScanner
        );

    }


    // ------------------------------------------
    // Stop Button
    // ------------------------------------------

    if (stopButton) {

        stopButton.addEventListener(
            "click",
            stopScanner
        );

    }


    // ------------------------------------------
    // Manual Search Button
    // ------------------------------------------

    if (manualButton) {

        manualButton.addEventListener(
            "click",
            manualSearch
        );

    }


    // ------------------------------------------
    // Manual Search Enter
    // ------------------------------------------

    if (manualInput) {

        manualInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    manualSearch();

                }

            }
        );

    }


    // ------------------------------------------
    // Clear Manual Input
    // ------------------------------------------

    if (clearManualButton) {

        clearManualButton.addEventListener(
            "click",
            clearManualInput
        );

    }


    // ------------------------------------------
    // Camera Switch
    // ------------------------------------------

    if (switchCameraButton) {

        switchCameraButton.addEventListener(
            "click",
            switchCamera
        );

    }


    // ------------------------------------------
    // Scanner Tabs
    // ------------------------------------------

    scannerTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    changeScannerMode(
                        tab.dataset.mode
                    );

                }
            );

        }
    );


    // ------------------------------------------
    // Initial UI
    // ------------------------------------------

    updateScannerUI();

    updateCameraStatus(
        "Camera Ready",
        "ready"
    );


    showScannerMessage(
        "Ready to scan",
        "Start the camera and point it at a book QR code or barcode."
    );


    console.log(
        "Library Scanner initialized."
    );

}


// ==========================================================
// CHANGE SCANNER MODE
// ==========================================================

function changeScannerMode(mode) {

    if (
        mode !== "qr" &&
        mode !== "barcode"
    ) {

        mode = "qr";

    }


    scannerMode = mode;


    // ------------------------------------------
    // Active Tab
    // ------------------------------------------

    scannerTabs.forEach(
        function (tab) {

            tab.classList.remove(
                "active"
            );


            if (
                tab.dataset.mode ===
                scannerMode
            ) {

                tab.classList.add(
                    "active"
                );

            }

        }
    );


    // ------------------------------------------
    // QR Mode
    // ------------------------------------------

    if (
        scannerMode ===
        "qr"
    ) {

        if (scannerTitle) {

            scannerTitle.innerText =
                "QR Code Scanner";

        }


        if (scannerDescription) {

            scannerDescription.innerText =
                "Point your camera at the book QR code.";

        }


        showScannerMessage(
            "QR Scanner",
            "Ready to scan a library book QR code."
        );

    }


    // ------------------------------------------
    // Barcode Mode
    // ------------------------------------------

    else {

        if (scannerTitle) {

            scannerTitle.innerText =
                "Barcode Scanner";

        }


        if (scannerDescription) {

            scannerDescription.innerText =
                "Point your camera at the book barcode.";

        }


        showScannerMessage(
            "Barcode Scanner",
            "Ready to scan a library book barcode."
        );

    }


    /*
    IMPORTANT:

    If scanner is already running,
    restart it so the scanning configuration
    can change.
    */

    if (scannerRunning) {

        restartScanner();

    }

}


// ==========================================================
// START SCANNER
// ==========================================================

async function startScanner() {

    // ------------------------------------------
    // Prevent duplicate start
    // ------------------------------------------

    if (
        scannerRunning ||
        scannerStarting
    ) {

        return;

    }


    scannerStarting = true;


    updateCameraStatus(
        "Starting Camera...",
        "loading"
    );


    showScannerMessage(
        "Starting camera",
        "Please allow camera permission if your browser asks."
    );


    try {

        // --------------------------------------
        // Check secure context
        // --------------------------------------

        if (
            !isCameraEnvironmentSupported()
        ) {

            throw new Error(
                "Camera requires HTTPS or localhost."
            );

        }


        // --------------------------------------
        // Get cameras
        // --------------------------------------

        availableCameras =
            await getAvailableCameras();


        if (
            !availableCameras ||
            availableCameras.length === 0
        ) {

            throw new Error(
                "No camera was detected."
            );

        }


        // --------------------------------------
        // Select camera
        // --------------------------------------

        currentCameraId =
            selectBestCamera(
                availableCameras
            );


        // --------------------------------------
        // Create scanner
        // --------------------------------------

        if (!html5QrCode) {

            html5QrCode =
                new Html5Qrcode(
                    "reader"
                );

        }


        // --------------------------------------
        // Build scanner config
        // --------------------------------------

        const config =
            createScannerConfig();


        // --------------------------------------
        // Start camera
        // --------------------------------------

        await html5QrCode.start(

            currentCameraId,

            config,

            onScanSuccess,

            onScanError

        );


        scannerRunning = true;

        scannerStarting = false;


        // --------------------------------------
        // UI
        // --------------------------------------

        updateScannerUI();

        updateCameraStatus(
            "Camera Active",
            "active"
        );


        showScannerMessage(
            "Scanner active",
            scannerMode === "qr"
                ? "Point the camera at a QR code."
                : "Point the camera at a barcode."
        );


        console.log(
            "Scanner started."
        );

        console.log(
            "Camera:",
            currentCameraId
        );

    }


    catch (error) {

        console.error(
            "Scanner start error:",
            error
        );


        scannerRunning = false;

        scannerStarting = false;


        updateScannerUI();


        handleCameraError(
            error
        );

    }

}


// ==========================================================
// CREATE SCANNER CONFIG
// ==========================================================

function createScannerConfig() {

    /*
    FPS:
    Higher = faster detection
    Lower = less CPU usage
    */

    const config = {

        fps: 10,

        qrbox: function (
            viewfinderWidth,
            viewfinderHeight
        ) {

            let width =
                Math.floor(
                    viewfinderWidth * 0.75
                );


            let height =
                Math.floor(
                    viewfinderHeight * 0.45
                );


            width =
                Math.max(
                    220,
                    Math.min(
                        width,
                        350
                    )
                );


            height =
                Math.max(
                    150,
                    Math.min(
                        height,
                        280
                    )
                );


            return {
                width: width,
                height: height
            };

        },

        aspectRatio:
            1.7777778,

        disableFlip:
            false

    };


    return config;

}


// ==========================================================
// GET CAMERAS
// ==========================================================

async function getAvailableCameras() {

    try {

        const cameras =
            await Html5Qrcode.getCameras();


        if (
            !Array.isArray(cameras)
        ) {

            return [];

        }


        return cameras;

    }


    catch (error) {

        console.error(
            "Unable to get cameras:",
            error
        );


        return [];

    }

}


// ==========================================================
// SELECT BEST CAMERA
// ==========================================================

function selectBestCamera(
    cameras
) {

    if (
        !cameras ||
        cameras.length === 0
    ) {

        return null;

    }


    /*
    Prefer rear/back/environment camera
    */

    const backCamera =
        cameras.find(
            function (camera) {

                const label =
                    String(
                        camera.label || ""
                    ).toLowerCase();


                return (
                    label.includes("back") ||
                    label.includes("rear") ||
                    label.includes("environment") ||
                    label.includes("world")
                );

            }
        );


    if (backCamera) {

        return backCamera.id;

    }


    /*
    Otherwise use first available camera.
    */

    return cameras[0].id;

}


// ==========================================================
// STOP SCANNER
// ==========================================================

async function stopScanner() {

    if (
        scannerStopping
    ) {

        return;

    }


    scannerStopping = true;


    try {

        if (
            html5QrCode &&
            scannerRunning
        ) {

            await html5QrCode.stop();


            try {

                html5QrCode.clear();

            }

            catch (clearError) {

                console.warn(
                    "Scanner clear warning:",
                    clearError
                );

            }

        }

    }


    catch (error) {

        console.error(
            "Scanner stop error:",
            error
        );

    }


    finally {

        scannerRunning = false;

        scannerStarting = false;

        scannerStopping = false;


        updateScannerUI();


        updateCameraStatus(
            "Camera Ready",
            "ready"
        );


        showScannerMessage(
            "Scanner stopped",
            "Press Start Camera to scan another book."
        );

    }

}


// ==========================================================
// RESTART SCANNER
// ==========================================================

async function restartScanner() {

    if (
        scannerStarting ||
        scannerStopping
    ) {

        return;

    }


    if (scannerRunning) {

        await stopScanner();

    }


    setTimeout(
        function () {

            startScanner();

        },
        300
    );

}


// ==========================================================
// SWITCH CAMERA
// ==========================================================

async function switchCamera() {

    if (
        !scannerRunning
    ) {

        showScannerMessage(
            "Camera not active",
            "Start the scanner before switching cameras."
        );

        return;

    }


    try {

        updateCameraStatus(
            "Switching Camera...",
            "loading"
        );


        availableCameras =
            await getAvailableCameras();


        if (
            availableCameras.length <
            2
        ) {

            showScannerMessage(
                "Only one camera found",
                "Your device does not appear to have another camera."
            );


            updateCameraStatus(
                "Camera Active",
                "active"
            );


            return;

        }


        const currentIndex =
            availableCameras.findIndex(
                function (camera) {

                    return (
                        camera.id ===
                        currentCameraId
                    );

                }
            );


        let nextIndex =
            currentIndex + 1;


        if (
            nextIndex >=
            availableCameras.length
        ) {

            nextIndex = 0;

        }


        const nextCamera =
            availableCameras[
                nextIndex
            ];


        await html5QrCode.stop();


        currentCameraId =
            nextCamera.id;


        const config =
            createScannerConfig();


        await html5QrCode.start(

            currentCameraId,

            config,

            onScanSuccess,

            onScanError

        );


        scannerRunning = true;


        updateCameraStatus(
            "Camera Active",
            "active"
        );


        showScannerMessage(
            "Camera switched",
            nextCamera.label ||
            "Camera changed successfully."
        );

    }


    catch (error) {

        console.error(
            "Camera switch error:",
            error
        );


        updateCameraStatus(
            "Camera Error",
            "error"
        );


        showScannerMessage(
            "Camera switch failed",
            "Unable to switch camera. Please try again."
        );

    }

}


// ==========================================================
// SCAN SUCCESS
// ==========================================================

function onScanSuccess(
    decodedText,
    decodedResult
) {

    if (
        !decodedText
    ) {

        return;

    }


    const now =
        Date.now();


    /*
    Prevent duplicate scans.

    Mobile cameras often detect the
    same QR/barcode many times per second.
    */

    if (
        decodedText ===
        lastScannedCode &&
        (
            now -
            lastScanTime
        ) <
        scanCooldown
    ) {

        return;

    }


    lastScannedCode =
        decodedText;


    lastScanTime =
        now;


    console.log(
        "Scanned value:",
        decodedText
    );


    console.log(
        "Scan result:",
        decodedResult
    );


    // ------------------------------------------
    // Show success
    // ------------------------------------------

    showScannerMessage(
        "Book detected!",
        decodedText
    );


    updateCameraStatus(
        "Book Detected",
        "success"
    );


    // ------------------------------------------
    // Extract Book ID
    // ------------------------------------------

    const bookId =
        extractBookId(
            decodedText
        );


    if (!bookId) {

        showScannerMessage(
            "Code detected",
            "The QR/barcode was scanned, but no valid Book ID was found."
        );


        return;

    }


    console.log(
        "Book ID:",
        bookId
    );


    // ------------------------------------------
    // Stop camera
    // ------------------------------------------

    stopScanner();


    // ------------------------------------------
    // Find book
    // ------------------------------------------

    setTimeout(
        function () {

            findScannedBook(
                bookId
            );

        },
        300
    );

}


// ====================
