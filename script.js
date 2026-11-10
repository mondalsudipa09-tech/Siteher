(() => {
  "use strict";

  const slider = document.querySelector(".slider");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const slideCount = document.querySelector(".slide-count");
  const dialog = document.querySelector(".message-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogMessage = document.querySelector("#dialog-message");

  if (!slider || !nextButton || !prevButton || !slideCount) return;

  const getItems = () => Array.from(slider.querySelectorAll(".item"));
  const totalSlides = getItems().length;

  function updateSlider() {
    const items = getItems();

    items.forEach((item, index) => {
      const isActive = index === 0;
      item.classList.toggle("is-active", isActive);
      item.style.setProperty("--slot", String(index));

      if (isActive) {
        item.removeAttribute("role");
        item.removeAttribute("tabindex");
        item.removeAttribute("aria-label");
      } else {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-label", `Show message ${item.dataset.slide}: ${item.dataset.title}`);
      }
    });

    const activeSlide = Number(items[0].dataset.slide || 1);
    slideCount.innerHTML = `${String(activeSlide).padStart(2, "0")} <span>/</span> ${String(totalSlides).padStart(2, "0")}`;
  }

  function showNext() {
    const items = getItems();
    if (items.length > 1) slider.append(items[0]);
    updateSlider();
  }

  function showPrevious() {
    const items = getItems();
    if (items.length > 1) slider.prepend(items[items.length - 1]);
    updateSlider();
  }

  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrevious);

  function selectThumbnail(selectedItem) {
    const items = getItems();
    const selectedIndex = items.indexOf(selectedItem);
    if (selectedIndex < 1) return;

    for (let i = 0; i < selectedIndex; i += 1) {
      slider.append(getItems()[0]);
    }
    updateSlider();
  }

  slider.addEventListener("click", (event) => {
    const readMoreButton = event.target.closest(".read-more");
    if (readMoreButton) {
      const activeItem = slider.querySelector(".item.is-active");
      if (!activeItem || !dialog || typeof dialog.showModal !== "function") return;

      dialogTitle.textContent = activeItem.dataset.title || "A little message";
      dialogMessage.textContent = activeItem.dataset.message || "";
      dialog.showModal();
      return;
    }

    const selectedItem = event.target.closest(".item");
    if (selectedItem && !selectedItem.classList.contains("is-active")) {
      selectThumbnail(selectedItem);
    }
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const selectedItem = event.target.closest(".item");
    if (selectedItem && !selectedItem.classList.contains("is-active")) {
      event.preventDefault();
      selectThumbnail(selectedItem);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (dialog && dialog.open) return;
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrevious();
  });

  // Allow swipe navigation on touch screens.
  let touchStartX = 0;
  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) showNext();
    else showPrevious();
  }, { passive: true });

  updateSlider();
})();
