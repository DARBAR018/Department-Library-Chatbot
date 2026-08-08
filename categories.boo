<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Department Library - Book Categories</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f4f7fb;
            color: #222;
        }

        header {
            background: #243b55;
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            margin-bottom: 8px;
        }

        .container {
            max-width: 1100px;
            margin: 30px auto;
            padding: 20px;
        }

        .search-box {
            text-align: center;
            margin-bottom: 25px;
        }

        .search-box input {
            width: 90%;
            max-width: 500px;
            padding: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
        }

        .categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
        }

        .category {
            background: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: 0.3s;
        }

        .category:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.18);
        }

        .category .icon {
            font-size: 45px;
            margin-bottom: 12px;
        }

        .category h2 {
            margin-bottom: 8px;
            color: #243b55;
        }

        .category p {
            color: #666;
        }

        .books {
            display: none;
            margin-top: 30px;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .books h2 {
            color: #243b55;
            margin-bottom: 15px;
        }

        .book {
            padding: 15px;
            margin: 10px 0;
            background: #f1f5f9;
            border-radius: 8px;
        }

        .book strong {
            color: #243b55;
        }

        .no-result {
            display: none;
            text-align: center;
            color: red;
            margin-top: 20px;
        }

        footer {
            margin-top: 40px;
            background: #243b55;
            color: white;
            text-align: center;
            padding: 15px;
        }
    </style>
</head>

<body>

<header>
    <h1>📚 Department Library</h1>
    <p>Book Categories</p>
</header>

<div class="container">

    <div class="search-box">
        <input
            type="text"
            id="searchInput"
            placeholder="🔍 Search book category..."
            onkeyup="searchCategory()"
        >
    </div>

    <div class="categories" id="categoryList">

        <div class="category" onclick="showBooks('Programming')">
            <div class="icon">💻</div>
            <h2>Programming</h2>
            <p>Java, Python, C, C++ and more</p>
        </div>

        <div class="category" onclick="showBooks('Database')">
            <div class="icon">🗄️</div>
            <h2>Database</h2>
            <p>MySQL, SQL, DBMS and more</p>
        </div>

        <div class="category" onclick="showBooks('Networking')">
            <div class="icon">🌐</div>
            <h2>Networking</h2>
            <p>Computer Networks and Internet</p>
        </div>

        <div class="category" onclick="showBooks('Web Development')">
            <div class="icon">🖥️</div>
            <h2>Web Development</h2>
            <p>HTML, CSS, JavaScript and PHP</p>
        </div>

        <div class="category" onclick="showBooks('Artificial Intelligence')">
            <div class="icon">🤖</div>
            <h2>Artificial Intelligence</h2>
            <p>AI, ML and Deep Learning</p>
        </div>

        <div class="category" onclick="showBooks('Cyber Security')">
            <div class="icon">🔐</div>
            <h2>Cyber Security</h2>
            <p>Security, Cryptography and Ethical Hacking</p>
        </div>

        <div class="category" onclick="showBooks('Operating System')">
            <div class="icon">⚙️</div>
            <h2>Operating System</h2>
            <p>Windows, Linux and OS concepts</p>
        </div>

        <div class="category" onclick="showBooks('Software Engineering')">
            <div class="icon">🛠️</div>
            <h2>Software Engineering</h2>
            <p>SDLC, Testing and Software Design</p>
        </div>

    </div>

    <p class="no-result" id="noResult">
        No category found.
    </p>

    <div class="books" id="booksSection">
        <h2 id="bookTitle"></h2>
        <div id="bookList"></div>
    </div>

</div>

<footer>
    <p>© 2026 Department Library Chatbot</p>
</footer>

<script>

    const books = {

        "Programming": [
            "Java Programming",
            "Python Programming",
            "C Programming",
            "C++ Programming"
        ],

        "Database": [
            "Database Management System",
            "MySQL",
            "SQL Fundamentals"
        ],

        "Networking": [
            "Computer Networks",
            "Data Communication",
            "Internet Technologies"
        ],

        "Web Development": [
            "HTML & CSS",
            "JavaScript",
            "PHP Web Development"
        ],

        "Artificial Intelligence": [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning"
        ],

        "Cyber Security": [
            "Cyber Security",
            "Cryptography",
            "Ethical Hacking"
        ],

        "Operating System": [
            "Operating System Concepts",
            "Linux Administration",
            "Windows Operating System"
        ],

        "Software Engineering": [
            "Software Engineering",
            "Software Testing",
            "Software Design"
        ]
    };


    function showBooks(category) {

        const section = document.getElementById("booksSection");
        const title = document.getElementById("bookTitle");
        const list = document.getElementById("bookList");

        title.innerHTML = "📚 " + category + " Books";

        list.innerHTML = "";

        books[category].forEach(function(book) {

            const div = document.createElement("div");

            div.className = "book";

            div.innerHTML =
                "<strong>📖 " + book + "</strong>" +
                "<br><small>Available in Department Library</small>";

            list.appendChild(div);
        });

        section.style.display = "block";

        section.scrollIntoView({
            behavior: "smooth"
        });
    }


    function searchCategory() {

        const input =
            document.getElementById("searchInput")
            .value
            .toLowerCase();

        const categories =
            document.querySelectorAll(".category");

        let found = false;

        categories.forEach(function(category) {

            const text =
                category.innerText.toLowerCase();

            if (text.includes(input)) {
                category.style.display = "block";
                found = true;
            } else {
                category.style.display = "none";
            }

        });

        document.getElementById("noResult").style.display =
            found ? "none" : "block";
    }

</script>

</body>
</html>
