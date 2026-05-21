const hamburger = document.querySelector(".hamburger");
const linkContainer = document.querySelector(".menu");
const links = document.querySelectorAll(".menu_link");

hamburger.addEventListener("click", () => {
    linkContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
});

window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        closeMenu();
    }
});

if (window.matchMedia("(max-width: 1000px)").matches) {
        closeMenu();
}

function closeMenu(){
    links.forEach((link) => {
        link.addEventListener("click", () => {
            linkContainer.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}
