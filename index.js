// body link event listeners
const links = {
  github: "https://github.com/sam-parsons",
  linkedin: "https://www.linkedin.com/in/samparsons269/"
};
$(".icon").on("click", e => {
  window.open(links[e.target.id], "_self");
});

// navbar expansion event listener
const toggle = document.getElementsByClassName("toggle-button")[0];
const navLinks = document.getElementsByClassName("links")[0];

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const body = document.getElementsByTagName("body")[0];

setTimeout(() => {
  body.classList.toggle("loaded");
}, 1000);
