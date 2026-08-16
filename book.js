const departments = [
  "Computer Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "EC Engineering"
];

const prefixes = {
  "Computer Engineering": "CE",
  "Mechanical Engineering": "ME",
  "Civil Engineering": "CV",
  "Electrical Engineering": "EE",
  "EC Engineering": "EC"
};


const subjects = {

  "Computer Engineering": [
    "Programming in C",
    "C++ Programming",
    "Java Programming",
    "Python Programming",
    "Data Structures",
    "Algorithms",
    "Database Management System",
    "Operating System",
    "Computer Networks",
    "Software Engineering",
    "Web Technology",
    "Artificial Intelligence",
    "Machine Learning",
    "Cyber Security",
    "Computer Graphics",
    "Cloud Computing",
    "Data Science",
    "IoT",
    "Blockchain",
    "Mobile Application Development"
  ],

  "Mechanical Engineering": [
    "Engineering Mechanics",
    "Thermodynamics",
    "Fluid Mechanics",
    "Heat Transfer",
    "Machine Design",
    "Manufacturing Processes",
    "CAD CAM",
    "Automobile Engineering",
    "Production Engineering",
    "Engineering Materials",
    "IC Engines",
    "Refrigeration",
    "Air Conditioning",
    "Robotics",
    "Mechatronics",
    "Metrology",
    "Industrial Engineering",
    "Machine Tools",
    "Mechanical Vibrations",
    "Power Plant Engineering"
  ],

  "Civil Engineering": [
    "Engineering Drawing",
    "Engineering Mechanics",
    "Building Materials",
    "Building Construction",
    "Surveying",
    "Strength of Materials",
    "Structural Analysis",
    "Concrete Technology",
    "RCC Design",
    "Steel Structures",
    "Soil Mechanics",
    "Geotechnical Engineering",
    "Fluid Mechanics",
    "Hydraulics",
    "Transportation Engineering",
    "Environmental Engineering",
    "Estimation and Costing",
    "Highway Engineering",
    "Irrigation Engineering",
    "Water Resources Engineering"
  ],

  "Electrical Engineering": [
    "Basic Electrical Engineering",
    "Circuit Theory",
    "Electrical Machines",
    "Electrical Measurements",
    "Power Systems",
    "Power Electronics",
    "Control Systems",
    "Digital Electronics",
    "Analog Electronics",
    "Electrical Drives",
    "Renewable Energy",
    "High Voltage Engineering",
    "Switchgear",
    "Protection",
    "Industrial Electronics",
    "Power System Analysis",
    "Electrical Instrumentation",
    "Energy Management",
    "Electric Vehicles",
    "Smart Grid"
  ],

  "EC Engineering": [
    "Electronic Devices",
    "Digital Electronics",
    "Analog Electronics",
    "Communication Systems",
    "Microprocessor",
    "Microcontroller",
    "Embedded Systems",
    "VLSI",
    "Signals and Systems",
    "Network Theory",
    "Antenna Engineering",
    "Wireless Communication",
    "Optical Communication",
    "IoT",
    "Robotics",
    "Satellite Communication",
    "Radar Engineering",
    "DSP",
    "RF Engineering",
    "Embedded Design"
  ]

};


const authors = [
  "Engineering Academic Press",
  "Technical Education Publications",
  "KDP Engineering Publications",
  "Professional Engineering Press",
  "Modern Technical Books"
];


const books = [];


// ==============================
// GENERATE 500 BOOKS
// ==============================

departments.forEach(department => {

  const prefix = prefixes[department];

  for (let i = 1; i <= 100; i++) {

    const subjectList =
      subjects[department];

    const subject =
      subjectList[
        (i - 1) % subjectList.length
      ];

    books.push({

      id:
        prefix +
        String(i).padStart(3, "0"),

      title:
        `${subject} - Engineering Reference ${i}`,

      author:
        authors[
          (i - 1) % authors.length
        ],

      department:

        department,

      subject:

        subject,

      isbn:
        "978000000" +
        String(i).padStart(4, "0"),

      edition:
        `${(i % 5) + 1}th Edition`,

      status:
        i % 10 === 0
          ? "Issued"
          : "Available"

    });

  }

});


let filteredBooks = [...books];

let currentPage = 1;

const booksPerPage = 20;


// ==============================
// ELEMENTS
// ==============================

const booksGrid =
  document.getElementById("booksGrid");

const bookCount =
  document.getElementById("bookCount");

const noBooks =
  document.getElementById("noBooks");

const searchInput =
  document.getElementById("bookSearch");

const departmentFilter =
  document.getElementById("departmentFilter");

const statusFilter =
  document.getElementById("statusFilter");

const pagination =
  document.getElementById("pagination");


// ==============================
// RENDER BOOKS
// ==============================

function renderBooks() {

  const start =
    (currentPage - 1) *
    booksPerPage;

  const end =
    start + booksPerPage;

  const pageBooks =
    filteredBooks.slice(start, end);


  booksGrid.innerHTML = "";


  if (pageBooks.length === 0) {

    noBooks.style.display = "block";

    pagination.innerHTML = "";

    bookCount.innerText = "0";

    return;

  }


  noBooks.style.display = "none";


  pageBooks.forEach(book => {

    const card =
      document.createElement("article");

    card.className = "book-card";


    card.innerHTML = `

      <div class="book-cover">

        <span class="book-id">
          ${book.id}
        </span>

        <span class="book-status ${book.status.toLowerCase()}">
          ${book.status}
        </span>

        <i class="fa-solid fa-book"></i>

      </div>


      <div class="book-body">

        <div class="book-department">
          ${book.department}
        </div>

        <h3 class="book-title">
          ${book.title}
        </h3>

        <p class="book-author">
          <i class="fa-solid fa-user-pen"></i>
          ${book.author}
        </p>

        <p class="book-subject">
          Subject: ${book.subject}
        </p>


        <div class="book-footer">

          <button
            class="book-view"
            onclick="showBook(${book.id})">

            View Details

          </button>

          <i class="fa-solid fa-bookmark book-icon"></i>

        </div>

      </div>

    `;


    booksGrid.appendChild(card);

  });


  bookCount.innerText =
    filteredBooks.length;


  renderPagination();

}


// ==============================
// SEARCH + FILTER
// ==============================

function applyFilters() {

  const search =
    searchInput.value
      .trim()
      .toLowerCase();


  const department =
    departmentFilter.value;


  const status =
    statusFilter.value;


  filteredBooks =
    books.filter(book => {

      const matchesSearch =

        !search ||

        book.id
          .toLowerCase()
          .includes(search) ||

        book.title
          .toLowerCase()
          .includes(search) ||

        book.author
          .toLowerCase()
          .includes(search) ||

        book.subject
          .toLowerCase()
          .includes(search) ||

        book.isbn
          .toLowerCase()
          .includes(search);


      const matchesDepartment =

        department === "all" ||

        book.department === department;


      const matchesStatus =

        status === "all" ||

        book.status === status;


      return (

        matchesSearch &&
        matchesDepartment &&
        matchesStatus

      );

    });


  currentPage = 1;

  renderBooks();

}


searchInput.addEventListener(
  "input",
  applyFilters
);


departmentFilter.addEventListener(
  "change",
  applyFilters
);


statusFilter.addEventListener(
  "change",
  applyFilters
);


// ==============================
// QUICK FILTERS
// ==============================

document
  .querySelectorAll(".filter-chip")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter-chip")
          .forEach(btn =>
            btn.classList.remove("active")
          );


        button.classList.add("active");


        const department =
          button.dataset.department;


        departmentFilter.value =
          department;


        applyFilters();

      }
    );

  });


// ==============================
// URL DEPARTMENT FILTER
// ==============================

const params =
  new URLSearchParams(
    window.location.search
  );


const urlDepartment =
  params.get("department");


if (urlDepartment) {

  departmentFilter.value =
    urlDepartment;

  document
    .querySelectorAll(".filter-chip")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.department ===
        urlDepartment
      );

    });

  applyFilters();

}


// ==============================
// PAGINATION
// ==============================

function renderPagination() {

  pagination.innerHTML = "";


  const totalPages =
    Math.ceil(
      filteredBooks.length /
      booksPerPage
    );


  if (totalPages <= 1) return;


  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {

    const button =
      document.createElement("button");


    button.className =
      "page-button" +
      (
        i === currentPage
          ? " active"
          : ""
      );


    button.innerText = i;


    button.onclick = () => {

      currentPage = i;

      renderBooks();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


    pagination.appendChild(button);

  }

}


// ==============================
// BOOK DETAILS
// ==============================

function showBook(id) {

  const book =
    books.find(
      item => item.id === id
    );


  if (!book) return;


  const modal =
    document.getElementById(
      "bookModal"
    );


  const content =
    document.getElementById(
      "modalBookContent"
    );


  content.innerHTML = `

    <div class="modal-book">

      <div class="modal-cover">
        <i class="fa-solid fa-book-open"></i>
      </div>


      <div class="modal-info">

        <div class="book-department">
          ${book.department}
        </div>

        <h2>
          ${book.title}
        </h2>

        <p>
          <strong>Book ID:</strong>
          ${book.id}
        </p>

        <p>
          <strong>Author:</strong>
          ${book.author}
        </p>

        <p>
          <strong>Subject:</strong>
          ${book.subject}
        </p>

        <p>
          <strong>ISBN:</strong>
          ${book.isbn}
        </p>

        <p>
          <strong>Edition:</strong>
          ${book.edition}
        </p>

        <p>
          <strong>Status:</strong>
          ${book.status}
        </p>

      </div>

    </div>

  `;


  modal.classList.add("show");

}


// ==============================
// CLOSE MODAL
// ==============================

document
  .getElementById("modalClose")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("bookModal")
        .classList.remove("show");

    }
  );


document
  .getElementById("bookModal")
  .addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "bookModal"
      ) {

        event.currentTarget
          .classList.remove("show");

      }

    }
  );


// ==============================
// INITIAL LOAD
// ==============================

renderBooks();
