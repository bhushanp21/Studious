const screenNames = ["welcome", "home", "study", "chat", "schedule", "notice", "emergency"];
const container = document.getElementById("screens-container");
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const pickerButtons = Array.from(document.querySelectorAll(".screen-picker [data-go]"));
const phone = document.querySelector(".phone");
let screens = [];

async function loadScreens() {
  for (const screenName of screenNames) {
    try {
      const response = await fetch(`./screens/${screenName}.html`);
      const html = await response.text();
      container.insertAdjacentHTML("beforeend", html);
    } catch (error) {
      console.error(`Failed to load screen: ${screenName}`, error);
    }
  }

  // Load and inject footer
  try {
    const footerResponse = await fetch("./footer.html");
    const footerHtml = await footerResponse.text();
    const phoneSection = document.querySelector(".phone");
    phoneSection.insertAdjacentHTML("beforeend", footerHtml);
  } catch (error) {
    console.error("Failed to load footer", error);
  }

  screens = Array.from(document.querySelectorAll(".screen"));
  setupEventListeners();
  showScreen("welcome");
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  phone.classList.toggle("theme-dark", name === "welcome" || name === "emergency");

  pickerButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === name);
  });
}

function setupEventListeners() {
  const allNavButtons = Array.from(document.querySelectorAll("[data-go]"));
  allNavButtons.forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });

  const messageForm = document.querySelector(".message-form");
  if (messageForm) {
    messageForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  // Schedule tab switching
  const scheduleTabs = Array.from(document.querySelectorAll(".schedule-tab"));
  scheduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const period = tab.dataset.period;
      scheduleTabs.forEach((t) => {
        if (t.dataset.period === period) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });
      const views = Array.from(document.querySelectorAll(".schedule-view"));
      views.forEach((view) => {
        if (view.dataset.period === period) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });

  // Study tab switching
  const studyTabs = Array.from(document.querySelectorAll(".study-tab"));
  studyTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const period = tab.dataset.period;
      studyTabs.forEach((t) => {
        if (t.dataset.period === period) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });
      const views = Array.from(document.querySelectorAll(".study-view"));
      views.forEach((view) => {
        if (view.dataset.period === period) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });

  // Chat tab switching
  const chatTabs = Array.from(document.querySelectorAll(".chat-tab"));
  chatTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const channel = tab.dataset.channel;
      chatTabs.forEach((t) => {
        if (t.dataset.channel === channel) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });
      const views = Array.from(document.querySelectorAll(".chat-view"));
      views.forEach((view) => {
        if (view.dataset.channel === channel) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });

  // Emergency tab switching
  const emergencyTabs = Array.from(document.querySelectorAll(".emergency-tab"));
  emergencyTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mode;
      emergencyTabs.forEach((t) => {
        if (t.dataset.mode === mode) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });
      const views = Array.from(document.querySelectorAll(".emergency-view"));
      views.forEach((view) => {
        if (view.dataset.mode === mode) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });

  // Notice filter switching
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        if (b.dataset.filter === filter) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });
      // Note: You can add filtering logic here for notice cards
    });
  });
}

document.addEventListener("DOMContentLoaded", loadScreens);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
