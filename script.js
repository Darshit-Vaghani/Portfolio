const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

// Toggle Navigation Menu
const toggleNav = () => {
  nav.classList.toggle("hidden");
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);
navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Update Achievements Section Theme
function updateAchievementsTheme() {
  const isDarkMode = document.body.classList.contains("dark");
  document.querySelectorAll(".achievement-card").forEach(card => {
    card.style.backgroundColor = isDarkMode ? "#222" : "#fff";
    card.style.color = isDarkMode ? "#fff" : "#000";
  });
}

// Animate Work Section on Scroll
workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      const [textbox, picture] = Array.from(entry.target.children);
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(el => el.style.animationPlayState = "running");
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => observer.observe(workEl));

// Toggle Theme and Store Preference
const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

// Apply stored theme on load

  document.body.classList.add("dark");

updateAchievementsTheme(); // Ensure Achievements section updates on page load

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;
  
  if (isChecked) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  updateAchievementsTheme(); // Update Achievements cards on theme change
});

// Trap the tab when menu is opened
const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Rotating Logos Animation
const logosWrappers = document.querySelectorAll(".logo-group");
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// Set current year in the footer
yearEl.textContent = new Date().getFullYear();

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevents default form submission
  fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
  }).then(response => {
      if (response.ok) {
          alert("Thank you! Your message has been sent.");
          document.querySelector("form").reset();
      } else {
          alert("Oops! Something went wrong. Please try again.");
      }
  }).catch(error => alert("Error! Please check your internet connection."));
});

document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".carousel-control-prev");
  const nextBtn = document.querySelector(".carousel-control-next");
  const carouselElement = document.getElementById("cardCarousel");
  const carousel = new bootstrap.Carousel(carouselElement);

  prevBtn.addEventListener("click", function () {
      carousel.prev();
  });

  nextBtn.addEventListener("click", function () {
      carousel.next();
  });
});


