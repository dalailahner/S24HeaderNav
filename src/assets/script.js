import Sortable from "sortablejs/modular/sortable.core.esm";

// scroll
let lastScrollPos = 0;
document.addEventListener("scroll", (event) => {
  if (lastScrollPos < window.scrollY) document.querySelector(".mainHeader").classList.add("hide");
  if (lastScrollPos > window.scrollY) document.querySelector(".mainHeader").classList.remove("hide");
  lastScrollPos = window.scrollY;
});

// search
document.querySelector(".searchBtn").addEventListener("click", (event) => {
  event.preventDefault();
  const searchForm = document.querySelector(".searchForm");
  if (searchForm.search.value.length > 0) {
    searchForm.submit();
    return;
  }
  searchForm.search.focus();
});

// setup flyout menus
const headerNavMenuItemWithFlyout = document.querySelectorAll(".headerNavMenuItem:has(.dropdownMenu)");
for (const el of headerNavMenuItemWithFlyout) {
  const headerNavBtn = el.querySelector(".headerNavBtn");
  if (headerNavBtn) {
    // reset state (remove hover class on every menu item)
    headerNavBtn.addEventListener("pointerenter", (event) => {
      for (const elOfPointerEnter of headerNavMenuItemWithFlyout) {
        elOfPointerEnter.classList.remove("hover");
      }
    });
      }
      }
    });
    // elongate hover state when leaving the menu item
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
  // remove hover class when leaving the flyout menu
  if (dropdownMenuCont) {
    dropdownMenuCont.addEventListener("pointerleave", (event) => {
      el.classList.remove("hover");
    });
  }
}

// Sortable
for (const el of document.querySelectorAll(".dropdownMenuEditBtn")) {
  el.addEventListener("click", (event) => {
    const containingDropdown = event.target.closest(".dropdownMenu");
    containingDropdown.dataset.edit = !(containingDropdown.dataset.edit === "true");
  });

  el.addEventListener(
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
}
