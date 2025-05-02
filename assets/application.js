// 1. Import Swiper core styles + required modules

document.addEventListener("DOMContentLoaded", function () {
  // 1. Get all the elements we need to work with
  const backdrop = document.getElementById("backdrop");
  const mobileMenu = document.getElementById("mobile-menu");
  const cartSidebar = document.getElementById("cart-sidebar");
  const mobileMenuButton = document.getElementById("open-mobilemenu");
  const closeMobileMenuButton = document.getElementById("close-mobilemenu");
  const cartButton = document.getElementById("open-cart");
  const navLink = document.getElementById("dropdown-link");
  const megaNav = document.getElementById("mega-nav");
  const accordionButtons = document.querySelectorAll(".accordion-button");

  // Utility
  function showBackdrop() {
    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function hideBackdrop() {
    backdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  backdrop.addEventListener("click", closeAll);

  function closeAll() {
    closeMobileMenu();
    cartSidebar.classList.add("translate-x-full"); // Hide cart
    hideBackdrop();
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAll();
    }
  });

  closeAll();

  ///////////////
  // Mega Menu
  ///////////////

  let hoverTimeout;

  function showMegaNav() {
    clearTimeout(hoverTimeout);
    showBackdrop();
    backdrop.classList.remove("z-40");
    backdrop.classList.add("z-30");
    megaNav.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function hideMegaNav() {
    hoverTimeout = setTimeout(() => {
      hideBackdrop();
      backdrop.classList.remove("z-30");
      backdrop.classList.add("z-40");
      megaNav.classList.add("hidden");
    }, 150);
  }

  if (navLink) {
    navLink.addEventListener("mouseenter", function () {
      showMegaNav();
    });

    megaNav.addEventListener("mouseenter", showMegaNav);
    megaNav.addEventListener("mouseleave", hideMegaNav);
  }

  //////////////
  // Mobile Menu
  /////////////

  function openMobileMenu() {
    mobileMenu.classList.remove("-translate-x-full"); // Show menu
    showBackdrop();
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("-translate-x-full");
    hideBackdrop();
  }

  mobileMenuButton.addEventListener("click", openMobileMenu);
  closeMobileMenuButton.addEventListener("click", closeMobileMenu);

  //////////////
  // Cart
  /////////////

  function openCart() {
    cartSidebar.classList.remove("translate-x-full"); // Show cart
    showBackdrop();
  }

  cartButton.addEventListener("click", openCart);

  // Mobile Menu Dropdown Toggles
  const toggleSubmenus = document.querySelectorAll(".toggle-submenu");

  toggleSubmenus.forEach((button) => {
    button.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const icon = this.querySelector("svg");

      // Toggle the submenu
      submenu.classList.toggle("hidden");

      // Toggle the icon rotation
      if (submenu.classList.contains("hidden")) {
        icon.classList.remove("rotate-90");
      } else {
        icon.classList.add("rotate-90");
      }
    });
  });

  //////////////
  // Acordian
  /////////////

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.closest(".accordion-item");
      const content = item.querySelector(".accordion-content");
      const icon = item.querySelector(".accordion-icon");

      // Toggle current item
      content.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");

      // Close other open items
      document
        .querySelectorAll(".accordion-content")
        .forEach((otherContent) => {
          if (
            otherContent !== content &&
            !otherContent.classList.contains("hidden")
          ) {
            otherContent.classList.add("hidden");
            otherContent
              .closest(".accordion-item")
              .querySelector(".accordion-icon")
              .classList.remove("rotate-180");
          }
        });
    });
  });

  //////////////
  // Swiper
  /////////////
});
