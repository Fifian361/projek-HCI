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
// const initSlider = (wrapper) => {
//     const imageList = wrapper.querySelector(".image-list");
//     const slideButtons = wrapper.querySelectorAll(".slider-button");
//     const slideScrollbar = wrapper.closest(".tochaku-market-content, .OMO-Market-content, .duaribuz-market-content")
//                                   .querySelector(".slider-scrollbar");
//     const scrollbarThumb = slideScrollbar.querySelector(".scrollbar-thumb");

//     const getMaxScrollLeft = () => imageList.scrollWidth - imageList.clientWidth;

//     // ── Thumb width: proporsional terhadap konten yang terlihat ──────────────
//     const updateThumbWidth = () => {
//         const ratio = imageList.clientWidth / imageList.scrollWidth;
//         const thumbWidth = Math.max(ratio * slideScrollbar.clientWidth, 32);
//         scrollbarThumb.style.width = `${thumbWidth}px`;
//     };

//     // ── Drag scrollbar thumb ─────────────────────────────────────────────────
//     scrollbarThumb.addEventListener("mousedown", (e) => {
//         const startX = e.clientX;
//         const thumbPosition = scrollbarThumb.offsetLeft;

//         const handleMouseMove = (e) => {
//             const deltaX = e.clientX - startX;
//             const newThumbPosition = thumbPosition + deltaX;
//             const maxThumbPosition = slideScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
//             const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
//             const scrollPosition = (boundedPosition / maxThumbPosition) * getMaxScrollLeft();
//             scrollbarThumb.style.left = `${boundedPosition}px`;
//             imageList.scrollLeft = scrollPosition;
//         };

//         const handleMouseUp = () => {
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//         };

//         document.addEventListener("mousemove", handleMouseMove);
//         document.addEventListener("mouseup", handleMouseUp);
//     });

//     // ── Prev / Next buttons ──────────────────────────────────────────────────
//     slideButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const direction = button.classList.contains("prev") ? -1 : 1;
//             const scrollAmount = imageList.clientWidth * direction;
//             imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
//         });
//     });

//     // ── Hide/show buttons based on scroll position ───────────────────────────
//     const handleSlideButtons = () => {
//         const maxScrollLeft = getMaxScrollLeft();
//         slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
//         slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
//     };

//     // ── Update thumb position ────────────────────────────────────────────────
//     const updateScrollThumbPosition = () => {
//         const maxScrollLeft = getMaxScrollLeft();
//         if (maxScrollLeft <= 0) return;
//         const scrollPosition = imageList.scrollLeft;
//         const maxThumbLeft = slideScrollbar.clientWidth - scrollbarThumb.offsetWidth;
//         const thumbPosition = (scrollPosition / maxScrollLeft) * maxThumbLeft;
//         scrollbarThumb.style.left = `${thumbPosition}px`;
//     };

//     // ── Scroll listener ──────────────────────────────────────────────────────
//     imageList.addEventListener("scroll", () => {
//         handleSlideButtons();
//         updateScrollThumbPosition();
//     });

//     // ── Hitung ulang setelah semua gambar dimuat ─────────────────────────────
//     const images = imageList.querySelectorAll("img");
//     let loadedCount = 0;

//     const onAllImagesLoaded = () => {
//         updateThumbWidth();
//         updateScrollThumbPosition();
//         handleSlideButtons();
//     };

//     images.forEach(img => {
//         if (img.complete) {
//             loadedCount++;
//             if (loadedCount === images.length) onAllImagesLoaded();
//         } else {
//             img.addEventListener("load", () => {
//                 loadedCount++;
//                 if (loadedCount === images.length) onAllImagesLoaded();
//             });
//         }
//     });

//     // ── ResizeObserver: recalc on window/container resize ────────────────────
//     const ro = new ResizeObserver(() => {
//         updateThumbWidth();
//         updateScrollThumbPosition();
//         handleSlideButtons();
//     });
//     ro.observe(imageList);

//     // ── Initial state ─────────────────────────────────────────────────────────
//     updateThumbWidth();
//     handleSlideButtons();
// };

// window.addEventListener("load", () => {
//     document.querySelectorAll(".slider-wrapper").forEach(wrapper => initSlider(wrapper));
// });
const initSlider = (wrapper) => {
    const imageList = wrapper.querySelector(".image-list");
    const slideButtons = wrapper.querySelectorAll(".slider-button");
    const slideScrollbar = wrapper.nextElementSibling;
    const scrollbarTrack = slideScrollbar.querySelector(".scrollbar-track");
    const scrollbarThumb = slideScrollbar.querySelector(".scrollbar-thumb");

    const getMaxScrollLeft = () => imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * getMaxScrollLeft();
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.classList.contains("prev") ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        const maxScrollLeft = getMaxScrollLeft();
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPosition = () => {
        const maxScrollLeft = getMaxScrollLeft();
        if (maxScrollLeft <= 0) return;
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (scrollbarTrack.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    /* hitung ulang setelah semua gambar dimuat */
    const images = imageList.querySelectorAll("img");
    let loadedCount = 0;
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
            if (loadedCount === images.length) updateScrollThumbPosition();
        } else {
            img.addEventListener("load", () => {
                loadedCount++;
                if (loadedCount === images.length) updateScrollThumbPosition();
            });
        }
    });
}

window.addEventListener("load", () => {
    document.querySelectorAll(".slider-wrapper").forEach(wrapper => initSlider(wrapper));
});