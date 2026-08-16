const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const themeButton = document.getElementById("themeButton");
const mainSearch = document.getElementById("mainSearch");
const searchButton = document.getElementById("searchButton");


// ==========================
// MOBILE SIDEBAR
// ==========================

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});


// Close sidebar after mobile navigation

document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    if (window.innerWidth <= 768) {
      sidebar.classList.remove("show");
    }

  });

});


// ==========================
// DARK / LIGHT MODE
// ==========================

function setTheme(theme) {

  if (theme === "dark") {

    document.body.classList.add("dark");

    themeButton.innerHTML =
      '<i class="fa-solid fa-sun"></i>';

    themeButton.title = "Light mode";

  } else {

    document.body.classList.remove("dark");

    themeButton.innerHTML =
      '<i class="fa-solid fa-moon"></i>';

    themeButton.title = "Dark mode";

  }

  localStorage.setItem("kdp-theme", theme);
}


themeButton.addEventListener("click", () => {

  const isDark =
    document.body.classList.contains("dark");

  setTheme(isDark ? "light" : "dark");

  showToast(
    isDark
      ? "Light mode enabled"
      : "Dark mode enabled"
  );

});


const savedTheme =
  localStorage.getItem("kdp-theme");

if (savedTheme) {

  setTheme(savedTheme);

}


// ==========================
// SEARCH
// ==========================

function performSearch() {

  const query =
    mainSearch.value.trim();

  if (!query) {

    showToast("Please enter a book or subject");

    mainSearch.focus();

    return;
  }

  showToast(
    `Searching library for "${query}"`
  );

  /*
    Real book search will be connected
    in the next step with the 500-book database.
  */
}


searchButton.addEventListener(
  "click",
  performSearch
);


mainSearch.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      performSearch();
    }

  }
);


// ==========================
// DEPARTMENT BUTTONS
// ==========================

document
  .querySelectorAll(".department-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const department =
        button
          .closest(".department-card")
          .querySelector("h3")
          .innerText;

      showToast(
        `${department} selected`
      );

    });

  });


// ==========================
// SERVICE CARDS
// ==========================

document
  .querySelectorAll(".service-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const title =
        card.querySelector("h3").innerText;

      showToast(
        `${title} will be available in the next module`
      );

    });

  });


// ==========================
// TOAST
// ==========================

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const toastMessage =
    document.getElementById("toastMessage");

  toastMessage.innerText = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2800);

}


// ==========================
// ACTIVE NAVIGATION
// ==========================

document
  .querySelectorAll(".nav-link")
  .forEach(link => {

    link.addEventListener("click", () => {

      document
        .querySelectorAll(".nav-link")
        .forEach(item =>
          item.classList.remove("active")
        );

      link.classList.add("active");

    });

  });
