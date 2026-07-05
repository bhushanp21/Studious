const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const pickerButtons = Array.from(document.querySelectorAll(".screen-picker [data-go]"));
const phone = document.querySelector(".phone");

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  phone.classList.toggle("theme-dark", name === "lock" || name === "emergency");

  pickerButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === name);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.querySelector(".message-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
