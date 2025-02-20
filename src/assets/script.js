import Sortable from "sortablejs/modular/sortable.core.esm";

// GLOBALS
const dropdownMenuEditBtn = document.querySelector(".dropdownMenuEditBtn");
let lastScrollPos = 0;
const searchForm = document.querySelector(".searchForm");

// EVENTS

// scroll
document.addEventListener("scroll", (event) => {
  if (lastScrollPos < window.scrollY) document.querySelector(".mainHeader").classList.add("hide");
  if (lastScrollPos > window.scrollY) document.querySelector(".mainHeader").classList.remove("hide");
  lastScrollPos = window.scrollY;
});

// search
document.querySelector(".searchBtn").addEventListener("click", (event) => {
  event.preventDefault();
  if (searchForm.search.value.length > 0) {
    searchForm.submit();
    return;
  }
  searchForm.search.focus();
});

// hover elongation
for (const el of document.querySelectorAll(".headerNavMenuItem")) {
  const headerNavBtn = el.querySelector(".headerNavBtn");
  if (headerNavBtn) {
    headerNavBtn.addEventListener("pointerenter", (event) => {
      for (const el of document.querySelectorAll(".headerNavMenuItem")) {
        el.classList.remove("hover");
      }
    });
    let hoverTimeout;
    headerNavBtn.addEventListener("pointerleave", (event) => {
      el.classList.add("hover");
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        el.classList.remove("hover");
      }, 333);
    });
  }
  const dropdownMenuCont = el.querySelector(".dropdownMenuCont");
  if (dropdownMenuCont) {
    dropdownMenuCont.addEventListener("pointerleave", (event) => {
      el.classList.remove("hover");
    });
  }
}

// profile
dropdownMenuEditBtn.addEventListener("click", (event) => {
  const inEditMode = event.target.closest(".dropdownMenu").dataset.edit === "true";
  event.target.closest(".dropdownMenu").dataset.edit = !inEditMode;
});

dropdownMenuEditBtn.addEventListener(
  "click",
  (event) => {
    Sortable.create(document.querySelector(".dropdownMenuSortable"), {
      animation: 150,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      handle: ".dropdownMenuItemHandle",
      draggable: ".dropdownMenuItem",
      ghostClass: "sortableGhost",
    });
  },
  { once: true },
);
