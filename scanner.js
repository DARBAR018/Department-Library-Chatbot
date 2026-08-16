let html5QrCode = null;

let scannerRunning = false;

let scannerMode = "qr";


// ============================
// ELEMENTS
// ============================

const startButton =
  document.getElementById("startScanner");

const stopButton =
  document.getElementById("stopScanner");

const cameraStatus =
  document.getElementById("cameraStatus");

const scannerTitle =
  document.getElementById("scannerTitle");

const scannerDescription =
  document.getElementById(
    "scannerDescription"
  );


// ============================
// SCANNER MODE
// ============================

document
  .querySelectorAll(".scanner-tab")
  .forEach(tab => {

    tab.addEventListener("click", () => {

      document
        .querySelectorAll(".scanner-tab")
        .forEach(item =>
          item.classList.remove("active")
        );


      tab.classList.add("active");


      scannerMode =
        tab.dataset.mode;


      if (scannerMode === "qr") {

        scannerTitle.innerText =
          "QR Code Scanner";

        scannerDescription.innerText =
          "Point your camera at the book QR code.";

      } else {

        scannerTitle.innerText =
          "Barcode Scanner";

        scannerDescription.innerText =
          "Point your camera at the book barcode.";

      }

    });

  });


// ============================
// START CAMERA
// ============================

startButton.addEventListener(
  "click",
  startScanner
);


async function startScanner() {

  if (scannerRunning) return;


  html5QrCode =
    new Html5Qrcode("reader");


  const config = {

    fps: 10,

    qrbox: {
      width: 250,
      height: 180
    }

  };


  try {

    await html5QrCode.start(

      {
        facingMode: "environment"
      },

      config,

      onScanSuccess,

      onScanError

    );


    scannerRunning = true;


    startButton.style.display =
      "none";


    stopButton.style.display =
      "block";


    cameraStatus.innerText =
      "Camera Active";


    cameraStatus.style.background =
      "#dcfce7";


  } catch (error) {

    console.error(error);


    cameraStatus.innerText =
      "Camera Error";


    showScannerMessage(
      "Camera access denied",
      "Please allow camera permission or use Manual Book ID."
    );

  }

}


// ============================
// STOP CAMERA
// ============================

stopButton.addEventListener(
  "click",
  stopScanner
);


async function stopScanner() {

  if (
    html5QrCode &&
    scannerRunning
  ) {

    try {

      await html5QrCode.stop();

      html5QrCode.clear();

    } catch (error) {

      console.log(error);

    }

  }


  scannerRunning = false;


  startButton.style.display =
    "block";


  stopButton.style.display =
    "none";


  cameraStatus.innerText =
    "Camera Ready";

}


// ============================
// SUCCESS
// ============================

function onScanSuccess(decodedText) {

  console.log(
    "Scanned:",
    decodedText
  );


  showScannerMessage(
    "Book detected!",
    decodedText
  );


  stopScanner();


  /*
   QR / Barcode can contain:

   CE001

   OR

   https://darbar018.github.io/
   Department-Library-Chatbot/pages/
   books.html?book=CE001
  */


  let bookId =
    extractBookId(decodedText);


  if (bookId) {

    findScannedBook(bookId);

  }

}


// ============================
// SCAN ERROR
// ============================

function onScanError(error) {

  // Ignore continuous camera scan errors

}


// ============================
// EXTRACT BOOK ID
// ============================

function extractBookId(text) {

  text =
    String(text)
      .trim();


  /*
    Find IDs like:

    CE001
    ME025
    CV100
    EE050
    EC010
  */

  const match =
    text.match(
      /\b(CE|ME|CV|EE|EC)\d{3}\b/i
    );


  if (match) {

    return match[0].toUpperCase();

  }


  return null;

}


// ============================
// FIND BOOK
// ============================

function findScannedBook(bookId) {

  const book =
    books.find(
      item =>
        item.id.toUpperCase() ===
        bookId.toUpperCase()
    );


  if (!book) {

    showScannerMessage(
      "Book not found",
      `No library record found for ${bookId}`
    );

    return;

  }


  showScannerMessage(
    "Book found",
    `${book.id} — ${book.title}`
  );


  setTimeout(() => {

    showBook(book.id);

  }, 500);

}


// ============================
// MANUAL SEARCH
// ============================

const manualInput =
  document.getElementById(
    "manualBookId"
  );


const manualButton =
  document.getElementById(
    "manualSearchButton"
  );


manualButton.addEventListener(
  "click",
  manualSearch
);


manualInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      manualSearch();

    }

  }
);


function manualSearch() {

  const id =
    manualInput.value
      .trim()
      .toUpperCase();


  if (!id) {

    showScannerMessage(
      "Enter Book ID",
      "Example: CE001"
    );

    return;

  }


  findScannedBook(id);

}


// ============================
// MESSAGE
// ============================

function showScannerMessage(
  title,
  message
) {

  const scanMessage =
    document.getElementById(
      "scanMessage"
    );

  const scanSubMessage =
    document.getElementById(
      "scanSubMessage"
    );


  scanMessage.innerText =
    title;


  scanSubMessage.innerText =
    message;

}
