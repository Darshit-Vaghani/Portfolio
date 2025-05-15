// script.js
const nav       = document.querySelector(".nav");
const navMenu   = document.querySelector(".nav-items");
const btnToggle = document.querySelector(".menu-btn");
const workEls   = document.querySelectorAll(".work-box");
const workImgs  = document.querySelectorAll(".work-img");
const yearEl    = document.querySelector(".footer-text span");

// — Toggle Navigation Menu —
const toggleNav = () => {
  nav.classList.toggle("hidden");
  document.body.classList.toggle("lock-screen");
  btnToggle.textContent = nav.classList.contains("hidden") ? "menu" : "close";
};
btnToggle.addEventListener("click", toggleNav);
navMenu .addEventListener("click", e => {
  if (e.target.localName === "a") toggleNav();
});
document.body.addEventListener("keydown", e => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) toggleNav();
});

// — Achievements Theme —
function updateAchievementsTheme() {
  const dark = document.body.classList.contains("dark");
  document.querySelectorAll(".achievement-card")
    .forEach(card => {
      card.style.backgroundColor = dark ? "#222" : "#fff";
      card.style.color           = dark ? "#fff" : "#000";
    });
}

// — Work Section Scroll Animation —
workImgs.forEach(img => img.classList.add("transform"));

let workObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const [textbox, picture] = Array.from(entry.target.children);
    picture.classList.remove("transform");
    Array.from(textbox.children).forEach(el => {
      el.style.animationPlayState = "running";
    });
    workObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

workEls.forEach(el => workObserver.observe(el));

// — Theme Toggle & Persistence —
const themeToggle = document.querySelector('input[type="checkbox"]');
const savedTheme  = localStorage.getItem("theme");

  document.body.classList.add("dark");
 
updateAchievementsTheme();

themeToggle.addEventListener("click", () => {
  if (themeToggle.checked) {
    document.body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
  updateAchievementsTheme();
});

// — Focus Trap on Menu —
const lastFocused = document.querySelector('a[data-focused="last-focused"]');
document.body.addEventListener("keydown", e => {
  if (e.key === "Tab" && document.activeElement === lastFocused) {
    e.preventDefault();
    btnToggle.focus();
  }
});

// — Rotating Logos —
const logosGroups = document.querySelectorAll(".logo-group");
const sleep       = ms => new Promise(res => setTimeout(res, ms));

logosGroups.forEach(async (group, i) => {
  const logos = Array.from(group.children);
  await sleep(1400 * i);
  setInterval(() => {
    logos.push(logos.shift());
    logos.forEach((logo, idx) => {
      logo.classList.toggle("hide", idx !== 1);
      logo.classList.toggle("to-top", idx === 0);
      logo.classList.toggle("to-bottom", idx === 2);
    });
  }, 5600);
});

// — Footer Year —
yearEl.textContent = new Date().getFullYear();

// — Contact Form AJAX —
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  fetch(this.action, {
    method: this.method,
    body: new FormData(this),
    headers: { Accept: "application/json" }
  })
  .then(res => {
    if (res.ok) {
      alert("Thank you! Your message has been sent.");
      this.reset();
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  })
  .catch(() => alert("Error! Please check your internet connection."));
});

// — Bootstrap Carousel Controls —
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".carousel-control-prev");
  const nextBtn = document.querySelector(".carousel-control-next");
  const carousel = new bootstrap.Carousel(document.getElementById("cardCarousel"));
  prevBtn.addEventListener("click", () => carousel.prev());
  nextBtn.addEventListener("click", () => carousel.next());
});
