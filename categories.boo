<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="Department Library - Browse Computer Engineering Book Categories"
    >

    <meta
        name="theme-color"
        content="#2563eb"
    >

    <title>
        Book Categories | Department Library
    </title>


    <!-- =========================================
         GOOGLE FONT
    ========================================== -->

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    >


    <!-- =========================================
         FONT AWESOME
    ========================================== -->

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    >


    <style>

        /* =====================================================
           GLOBAL RESET
        ===================================================== */

        * {

            margin: 0;
            padding: 0;

            box-sizing: border-box;

        }


        html {

            scroll-behavior: smooth;

        }


        body {

            min-height: 100vh;

            font-family:
                "Inter",
                Arial,
                sans-serif;

            color: #0f172a;

            background:
                radial-gradient(
                    circle at top left,
                    rgba(37, 99, 235, 0.08),
                    transparent 32%
                ),
                #f8fafc;

            line-height: 1.5;

        }


        button,
        input {

            font-family: inherit;

        }


        /* =====================================================
           HEADER
        ===================================================== */

        .header {

            position: relative;

            overflow: hidden;

            color: #ffffff;

            background:
                linear-gradient(
                    135deg,
                    #0f172a,
                    #1e3a8a,
                    #2563eb
                );

            padding:
                42px 20px 55px;

        }


        .header::before {

            content: "";

            position: absolute;

            width: 300px;
            height: 300px;

            right: -100px;
            top: -160px;

            border-radius: 50%;

            background:
                rgba(255, 255, 255, 0.08);

        }


        .header::after {

            content: "";

            position: absolute;

            width: 220px;
            height: 220px;

            left: -100px;
            bottom: -150px;

            border-radius: 50%;

            background:
                rgba(255, 255, 255, 0.06);

        }


        .header-content {

            position: relative;

            z-index: 2;

            max-width: 1100px;

            margin: auto;

            text-align: center;

        }


        .header-icon {

            width: 64px;
            height: 64px;

            display: flex;

            align-items: center;
            justify-content: center;

            margin:
                0 auto 18px;

            background:
                rgba(255, 255, 255, 0.12);

            border:
                1px solid
                rgba(255, 255, 255, 0.20);

            border-radius: 18px;

            backdrop-filter:
                blur(10px);

        }


        .header-icon i {

            font-size: 28px;

        }


        .header h1 {

            font-size: 30px;

            font-weight: 800;

            letter-spacing: -0.5px;

            margin-bottom: 7px;

        }


        .header p {

            color:
                rgba(255, 255, 255, 0.78);

            font-size: 13px;

        }


        /* =====================================================
           MAIN CONTAINER
        ===================================================== */

        .container {

            width: 100%;

            max-width: 1100px;

            margin:
                -25px auto 0;

            padding:
                0 20px 40px;

            position: relative;

            z-index: 3;

        }


        /* =====================================================
           SEARCH PANEL
        ===================================================== */

        .search-panel {

            background: #ffffff;

            padding: 18px;

            border:
                1px solid
                #e2e8f0;

            border-radius: 18px;

            box-shadow:
                0 10px 30px
                rgba(15, 23, 42, 0.08);

            display: flex;

            align-items: center;

            gap: 12px;

            margin-bottom: 30px;

        }


        .search-wrapper {

            position: relative;

            flex: 1;

        }


        .search-icon {

            position: absolute;

            left: 15px;

            top: 50%;

            transform:
                translateY(-50%);

            color: #94a3b8;

            pointer-events: none;

        }


        #searchInput {

            width: 100%;

            height: 48px;

            padding:
                0 45px 0 43px;

            color: #0f172a;

            background: #f8fafc;

            border:
                1px solid
                #e2e8f0;

            border-radius: 11px;

            outline: none;

            font-size: 13px;

            transition:
                0.2s ease;

        }


        #searchInput:focus {

            background: #ffffff;

            border-color: #2563eb;

            box-shadow:
                0 0 0 4px
                rgba(37, 99, 235, 0.10);

        }


        #clearSearch {

            position: absolute;

            right: 8px;

            top: 50%;

            transform:
                translateY(-50%);

            width: 32px;
            height: 32px;

            display: none;

            align-items: center;
            justify-content: center;

            color: #64748b;

            background: transparent;

            border: none;

            border-radius: 8px;

            cursor: pointer;

        }


        #clearSearch:hover {

            color: #2563eb;

            background: #eff6ff;

        }


        .category-count {

            flex-shrink: 0;

            padding:
                10px 13px;

            color: #1d4ed8;

            background: #eff6ff;

            border:
                1px solid
                #bfdbfe;

            border-radius: 10px;

            font-size: 11px;

            font-weight: 700;

            white-space: nowrap;

        }


        /* =====================================================
           SECTION HEADER
        ===================================================== */

        .section-header {

            display: flex;

            align-items: flex-end;

            justify-content: space-between;

            gap: 15px;

            margin-bottom: 18px;

        }


        .section-title {

            color: #0f172a;

            font-size: 21px;

            font-weight: 800;

        }


        .section-subtitle {

            margin-top: 3px;

            color: #64748b;

            font-size: 11px;

        }


        /* =====================================================
           CATEGORY GRID
        ===================================================== */

        .categories {

            display: grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(220px, 1fr)
                );

            gap: 17px;

        }


        /* =====================================================
           CATEGORY CARD
        ===================================================== */

        .category {

            position: relative;

            display: flex;

            flex-direction: column;

            min-height: 205px;

            padding: 22px;

            color: #0f172a;

            background: #ffffff;

            border:
                1px solid
                #e2e8f0;

            border-radius: 17px;

            cursor: pointer;

            overflow: hidden;

            transition:
                transform 0.25s ease,
                box-shadow 0.25s ease,
                border-color 0.25s ease;

        }


        .category::after {

            content: "";

            position: absolute;

            width: 90px;
            height: 90px;

            right: -35px;
            bottom: -35px;

            border-radius: 50%;

            background:
                #eff6ff;

            transition:
                transform 0.25s ease;

        }


        .category:hover {

            transform:
                translateY(-5px);

            border-color:
                #bfdbfe;

            box-shadow:
                0 14px 30px
                rgba(15, 23, 42, 0.09);

        }


        .category:hover::after {

            transform:
                scale(1.5);

        }


        /* =====================================================
           CATEGORY ICON
        ===================================================== */

        .category-icon {

            position: relative;

            z-index: 2;

            width: 50px;
            height: 50px;

            display: flex;

            align-items: center;
            justify-content: center;

            margin-bottom: 17px;

            color: #2563eb;

            background:
                linear-gradient(
                    135deg,
                    #eff6ff,
                    #dbeafe
                );

            border-radius: 14px;

            transition:
                0.25s ease;

        }


        .category:hover
        .category-icon {

            color: #ffffff;

            background:
                linear-gradient(
                    135deg,
                    #2563eb,
                    #1d4ed8
                );

            transform:
                scale(1.05);

        }


        .category-icon i {

            font-size: 21px;

        }


        /* =====================================================
           CATEGORY TEXT
        ===================================================== */

        .category h2 {

            position: relative;

            z-index: 2;

            color: #0f172a;

            font-size: 16px;

            font-weight: 700;

            margin-bottom: 6px;

        }


        .category p {

            position: relative;

            z-index: 2;

            color: #64748b;

            font-size: 11px;

            line-height: 1.6;

        }


        /* =====================================================
           CATEGORY FOOTER
        ===================================================== */

        .category-footer {

            position: relative;

            z-index: 2;

            display: flex;

            align-items: center;

            justify-content: space-between;

            margin-top: auto;

            padding-top: 18px;

        }


        .book-count {

            color: #64748b;

            font-size: 10px;

            font-weight: 600;

        }


        .view-button {

            display: flex;

            align-items: center;

            gap: 5px;

            color: #2563eb;

            font-size: 10px;

            font-weight: 700;

        }


        .view-button i {

            font-size: 9px;

            transition:
                transform 0.2s ease;

        }


        .category:hover
        .view-button i {

            transform:
                translateX(3px);

        }


        /* =====================================================
           NO RESULT
        ===================================================== */

        .no-result {

            display: none;

            padding: 45px 20px;

            text-align: center;

            background: #ffffff;

            border:
                1px solid
                #e2e8f0;

            border-radius: 16px;

        }


        .no-result-icon {

            width: 55px;
            height: 55px;

            display: flex;

            align-items: center;
            justify-content: center;

            margin:
                0 auto 12px;

            color: #64748b;

            background: #f1f5f9;

            border-radius: 50%;

        }


        .no-result h3 {

            color: #334155;

            font-size: 15px;

            margin-bottom: 5px;

        }


        .no-result p {

            color: #94a3b8;

            font-size: 11px;

        }


        /* =====================================================
           BOOKS SECTION
        ===================================================== */

        .books {

            display: none;

            margin-top: 32px;

            background: #ffffff;

            border:
                1px solid
                #e2e8f0;

            border-radius: 18px;

            overflow: hidden;

            box-shadow:
                0 10px 25px
                rgba(15, 23, 42, 0.06);

        }


        .books-header {

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding:
                20px 22px;

            background:
                linear-gradient(
                    135deg,
                    #f8fafc,
                    #eff6ff
                );

            border-bottom:
                1px solid
                #e2e8f0;

        }


        .books-title-wrapper {

            display: flex;

            align-items: center;

            gap: 12px;

        }


        .books-title-icon {

            width: 40px;
            height: 40px;

            display: flex;

            align-items: center;
            justify-content: center;

            color: #2563eb;

            background: #ffffff;

            border:
                1px solid
                #bfdbfe;

            border-radius: 11px;

        }


        .books h2 {

            color: #0f172a;

            font-size: 17px;

            font-weight: 800;

        }


        .books-count {

            margin-top: 2px;

            color: #64748b;

            font-size: 10px;

        }


        .close-books {

            width: 34px;
            height: 34px;

            display: flex;

            align-items: center;
            justify-content: center;

            color: #64748b;

            background: #ffffff;

            border:
                1px solid
                #e2e8f0;

            border-radius: 9px;

            cursor: pointer;

            transition:
                0.2s ease;

        }


        .close-books:hover {

            color: #dc2626;

            background: #fef2f2;

            border-color: #fecaca;

        }


        /* =====================================================
           BOOK LIST
        ===================================================== */

        #bookList {

            padding: 20px;

            display: grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(250px, 1fr)
                );

            gap: 13px;

        }


        /* =====================================================
           BOOK CARD
        ===================================================== */

        .book {

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 15px;

            background: #f8fafc;

            border:
                1px solid
                #e2e8f0;

            border-radius: 12px;

            transition:
                0.2s ease;

        }


        .book:hover {

            background: #eff6ff;

            border-color:
                #bfdbfe;

            transform:
                translateY(-2px);

        }


        .book-icon {

            width: 40px;
            height: 40px;

            flex-shrink: 0;

            display: flex;

            align-items: center;
            justify-content: center;

            color: #2563eb;

            background: #ffffff;

            border-radius: 10px;

            box-shadow:
                0 3px 8px
                rgba(15, 23, 42, 0.05);

        }


        .book-info {

            min-width: 0;

            flex: 1;

        }


        .book-info strong {

            display: block;

            color: #1e293b;

            font-size: 12px;

            font-weight: 700;

            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;

        }


        .book-info small {

            display: block;

            margin-top: 3px;

            color: #64748b;

            font-size: 9px;

        }


        .availability {

            flex-shrink: 0;

            padding:
                4px 7px;

            color: #15803d;

            background: #dcfce7;

            border-radius: 20px;

            font-size: 8px;

            font-weight: 700;

        }


        /* =====================================================
           FOOTER
        ===================================================== */

        footer {

            margin-top: 20px;

            padding:
                25px 20px;

            color: #64748b;

            background: #ffffff;

            border-top:
                1px solid
                #e2e8f0;

            text-align: center;

        }


        footer .footer-brand {

            color: #334155;

            font-size: 12px;

            font-weight: 700;

        }


        footer p {

            margin-top: 5px;

            font-size: 10px;

        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 700px) {

            .header {

                padding:
                    32px 15px 48px;

            }


            .header h1 {

                font-size: 24px;

            }


            .container {

                padding:
                    0 14px 30px;

            }


            .search-panel {

                padding: 12px;

            }


            .category-count {

                display: none;

            }


            .categories {

                grid-template-columns:
                    repeat(
                        2,
                        minmax(0, 1fr)
                    );

                gap: 12px;

            }


            .category {

                min-height: 190px;

                padding: 17px;

            }


            .category h2 {

                font-size: 14px;

            }


            .category p {

                font-size: 10px;

            }


            #bookList {

                grid-template-columns: 1fr;

            }

        }


        @media (max-width: 450px) {

            .categories {

                grid-template-columns: 1fr;

            }


            .category {

                min-height: 160px;

            }


            .section-header {

                align-items: flex-start;

                flex-direction: column;

            }


            .books-header {

                padding:
                    16px;

            }


            #bookList {

                padding: 14px;

            }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

            html {

                scroll-behavior: auto;

            }


            *,
            *::before,
            *::after {

                transition: none !important;

                animation: none !important;

            }

        }

    </style>

</head>


<body>


    <!-- =====================================================
         HEADER
    ===================================================== -->

    <header class="header">

        <div class="header-content">

            <div class="header-icon">

                <i
                    class="fa-solid fa-book-open"
                    aria-hidden="true"
                ></i>

            </div>


            <h1>
                Department Library
            </h1>


            <p>
                Explore books by category
            </p>

        </div>

    </header>



    <!-- =====================================================
         MAIN
    ===================================================== -->

    <main class="container">


        <!-- =================================================
             SEARCH
        ================================================== -->

        <div class="search-panel">

            <div class="search-wrapper">

                <i
                    class="fa-solid fa-magnifying-glass search-icon"
                    aria-hidden="true"
                ></i>


                <input
                    type="search"
                    id="searchInput"
                    placeholder="Search book category..."
                    autocomplete="off"
                    aria-label="Search book categories"
                >


                <button
                    type="button"
                    id="clearSearch"
                    aria-label="Clear search"
                    title="Clear search"
                >

                    <i
                        class="fa-solid fa-xmark"
                        aria-hidden="true"
                    ></i>

                </button>

            </div>


            <div
                class="category-count"
                id="categoryCount"
            >
                8 Categories
            </div>

        </div>



        <!-- =================================================
             CATEGORY HEADER
        ================================================== -->

        <div class="section-header">

            <div>

                <h2 class="section-title">
                    Browse Categories
                </h2>

                <p class="section-subtitle">
                    Select a category to explore available books.
                </p>

            </div>

        </div>



        <!-- =================================================
             CATEGORY GRID
        ================================================== -->

        <section
            class="categories"
            id="categoryList"
        >


            <!-- Programming -->

            <article
                class="category"
                data-category="Programming"
                onclick="showBooks('Programming')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-code"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Programming
                </h2>


                <p>
                    Java, Python, C, C++ and programming fundamentals.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        4 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Database -->

            <article
                class="category"
                data-category="Database"
                onclick="showBooks('Database')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-database"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Database
                </h2>


                <p>
                    MySQL, SQL, DBMS and database management concepts.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Networking -->

            <article
                class="category"
                data-category="Networking"
                onclick="showBooks('Networking')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-network-wired"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Networking
                </h2>


                <p>
                    Computer networks, data communication and internet.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Web Development -->

            <article
                class="category"
                data-category="Web Development"
                onclick="showBooks('Web Development')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-globe"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Web Development
                </h2>


                <p>
                    HTML, CSS, JavaScript, PHP and modern web technologies.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- AI -->

            <article
                class="category"
                data-category="Artificial Intelligence"
                onclick="showBooks('Artificial Intelligence')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-robot"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Artificial Intelligence
                </h2>


                <p>
                    AI, Machine Learning and Deep Learning concepts.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Cyber Security -->

            <article
                class="category"
                data-category="Cyber Security"
                onclick="showBooks('Cyber Security')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-shield-halved"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Cyber Security
                </h2>


                <p>
                    Security, cryptography and ethical hacking fundamentals.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Operating System -->

            <article
                class="category"
                data-category="Operating System"
                onclick="showBooks('Operating System')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-microchip"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Operating System
                </h2>


                <p>
                    Windows, Linux and operating system concepts.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>



            <!-- Software Engineering -->

            <article
                class="category"
                data-category="Software Engineering"
                onclick="showBooks('Software Engineering')"
                tabindex="0"
                role="button"
            >

                <div class="category-icon">

                    <i
                        class="fa-solid fa-screwdriver-wrench"
                        aria-hidden="true"
                    ></i>

                </div>


                <h2>
                    Software Engineering
                </h2>


                <p>
                    SDLC, testing, software design and development.
                </p>


                <div class="category-footer">

                    <span class="book-count">
                        3 Books
                    </span>

                    <span class="view-button">
                        Explore
                        <i
                            class="fa-solid fa-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </span>

                </div>

            </article>


        </section>



        <!-- =================================================
             NO RESULT
        ================================================== -->

        <div
            class="no-result"
            id="noResult"
        >

            <div class="no-result-icon">

                <i
                    class="fa-solid fa-magnifying-glass"
                    aria-hidden="true"
                ></i>

            </div>


            <h3>
                No category found
            </h3>


            <p>
                Try searching with a different keyword.
            </p>

        </div>



        <!-- =================================================
             BOOKS
        ================================================== -->

        <section
            class="books"
            id="booksSection"
        >


            <div class="books-header">

                <div class="books-title-wrapper">

                    <div class="books-title-icon">

                        <i
                            class="fa-solid fa-book"
                            aria-hidden="true"
                        ></i>

                    </div>


                    <div>

                        <h2 id="bookTitle">
                            Books
                        </h2>

                        <div
                            class="books-count"
                            id="booksCount"
                        >
                            Available books
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="close-books"
                    onclick="closeBooks()"
                    aria-label="Close books"
                    title="Close"
                >

                    <i
                        class="fa-solid fa-xmark"
                        aria-hidden="true"
                    ></i>

                </button>

            </div>


            <div id="bookList"></div>


        </section>


    </main>



    <!-- =====================================================
         FOOTER
    ===================================================== -->

    <footer>

        <div class="footer-brand">

            <i
                class="fa-solid fa-book-open"
                aria-hidden="true"
            ></i>

            Department Library

        </div>


        <p>
            © 2026 Department Library Chatbot
        </p>

    </footer>



    <!-- =====================================================
         JAVASCRIPT
    ===================================================== -->

    <script>

        "use strict";


        /* =================================================
           BOOK DATABASE
        ================================================= */

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


        /* =================================================
           ELEMENTS
        ================================================= */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const clearSearch =
            document.getElementById(
                "clearSearch"
            );


        const categoryList =
            document.getElementById(
                "categoryList"
            );


        const categories =
            document.querySelectorAll(
                ".category"
            );


        const noResult =
            document.getElementById(
                "noResult"
            );


        const categoryCount =
            document.getElementById(
                "categoryCount"
            );


        const booksSection =
            document.getElementById(
                "booksSection"
            );


        const bookTitle =
            document.getElementById(
                "bookTitle"
            );


        const booksCount =
            document.getElementById(
                "booksCount"
            );


        const bookList =
            document.getElementById(
                "bookList"
            );



        /* =================================================
           SHOW BOOKS
        ================================================= */

        function showBooks(category) {

            if (!books[category]) {

                return;

            }


            bookTitle.textContent =
                category + " Books";


            booksCount.textContent =
                books[category].length +
                " books available";


            bookList.innerHTML = "";


            books[category].forEach(
                function(book, index) {

                    const bookCard =
                        document.createElement(
                            "div"
                        );


                    bookCard.className =
                        "book";


                    bookCard.innerHTML = `

                        <div class="book-icon">

                            <i
                                class="fa-solid fa-book"
                                aria-hidden="true"
                            ></i>

                        </div>


                        <div class="book-info">

                            <strong>
                                ${escapeHTML(book)}
                            </strong>

                            <small>
                                Department Library • Book ${index + 1}
                            </small>

                        </div>


                        <span class="availability">

                            Available

                        </span>

                    `;


                    bookList.appendChild(
                        bookCard
                    );

                }
            );


            booksSection.style.display =
                "block";


            booksSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }



        /* =================================================
           CLOSE BOOKS
        ================================================= */

        function closeBooks() {

            booksSection.style.display =
                "none";

        }



        /* =================================================
           SEARCH CATEGORY
        ================================================= */

        function searchCategory() {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            let found = 0;


            categories.forEach(
                function(category) {

                    const text =
                        category.innerText
                            .toLowerCase();


                    if (
                        text.includes(query)
                    ) {

                        category.style.display =
                            "";

                        found++;

                    } else {

                        category.style.display =
                            "none";

                    }

                }
            );


            /* -----------------------------------------
               UPDATE COUNT
            ------------------------------------------ */

            categoryCount.textContent =
                found +
                (
                    found === 1
                        ? " Category"
                        : " Categories"
                );


            /* -----------------------------------------
               NO RESULT
            ------------------------------------------ */

            noResult.style.display =
                found === 0
                    ? "block"
                    : "none";


            /* -----------------------------------------
               CLEAR BUTTON
            ------------------------------------------ */

            clearSearch.style.display =
                query.length > 0
                    ? "flex"
                    : "none";


            /* -----------------------------------------
               CLOSE BOOKS WHILE SEARCHING
            ------------------------------------------ */

            if (query.length > 0) {

                closeBooks();

            }

        }



        /* =================================================
           CLEAR SEARCH
        ================================================= */

        clearSearch.addEventListener(
            "click",
            function() {

                searchInput.value = "";

                searchCategory();

                searchInput.focus();

            }
        );



        /* =================================================
           SEARCH EVENT
        ================================================= */

        searchInput.addEventListener(
            "input",
            searchCategory
        );



        /* =================================================
           KEYBOARD SUPPORT FOR CATEGORIES
        ================================================= */

        categories.forEach(
            function(category) {

                category.addEventListener(
                    "keydown",
                    function(event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            const categoryName =
                                category.dataset.category;

                            showBooks(
                                categoryName
                            );

                        }

                    }
                );

            }
        );



        /* =================================================
           ESC KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Escape"
                ) {

                    closeBooks();

                }

            }
        );



        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(value) {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                value;


            return div.innerHTML;

        }



        /* =================================================
           INITIAL STATE
        ================================================= */

        categoryCount.textContent =
            categories.length +
            " Categories";


    </script>

</body>

</html>
