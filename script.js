const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const links = document.querySelectorAll(".site-nav a");

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});
