// scheduleService is loaded from services/scheduleService.js
// noticeService is loaded from services/noticeService.js

// ============================================================================
// Application Core
// ============================================================================

const screenNames = ["welcome", "home", "study", "chat", "schedule", "notice", "emergency"];
const container = document.getElementById("screens-container");
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const pickerButtons = Array.from(document.querySelectorAll(".screen-picker [data-go]"));
const phone = document.querySelector(".phone");
let screens = [];




// Schedule rendering functions
function renderScheduleItems(classes, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!classes || classes.length === 0) {
    container.innerHTML = `
      <div class="no-class-day">
        <div class="no-class-emoji">🎉</div>
        <h3>No Classes Today!</h3>
        <p>It's a holiday — enjoy your day off 😄</p>
      </div>`;
    return;
  }

  container.innerHTML = classes
    .map(
      (cls) => `
    <div class="schedule-item">
      <div class="time-slot">${cls.time}</div>
      <div class="subject-card ${cls.color}">
        <h3>${cls.subject}</h3>
        <p>${cls.room} • ${cls.teacher}</p>
        <span class="duration">${cls.duration}</span>
      </div>
    </div>
  `
    )
    .join("");
}

function renderWeekView(days) {
  const container = document.getElementById("week-schedule");
  if (!container) return;

  container.innerHTML = days
    .map(
      (day) => `
    <div class="week-day">
      <h3>${day.name}</h3>
      <div class="day-subjects">
        ${day.subjects.map((subject) => `<span class="mini-subject ${subject.color}">${subject.name}</span>`).join("")}
      </div>
    </div>
  `
    )
    .join("");
}

const NOTICE_CACHE_KEY = "studious_notices";

function getCachedNotices() {
  try {
    const raw = localStorage.getItem(NOTICE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCachedNotices(data) {
  try {
    localStorage.setItem(NOTICE_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to cache notices:", e);
  }
}

function renderNotices(notices, filter = "all") {
  const container = document.getElementById("notices-container");
  if (!container) return;

  const filtered = filter === "all" ? notices : notices.filter(n => n.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = '<p class="loading">No notices found.</p>';
    return;
  }

  container.innerHTML = filtered.map(notice => {
    const badgeHtml = notice.category
      ? `<span class="badge ${notice.category}-badge">${notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}</span>`
      : "";
    return `
      <article class="notice-card ${notice.category}">
        <div class="notice-header-row">
          <div>
            ${badgeHtml}
            <h2>${notice.title}</h2>
          </div>
          <time>${notice.time}</time>
        </div>
        <p class="notice-content">${notice.content}</p>
        <div class="notice-footer">
          <span class="teacher-name">${notice.author}</span>
        </div>
      </article>`;
  }).join("");
}

async function loadNoticeData() {
  const activeFilter = (() => {
    const btn = document.querySelector(".filter-btn.active");
    return btn ? btn.dataset.filter : "all";
  })();

  // Serve from cache immediately
  const cached = getCachedNotices();
  if (cached) {
    renderNotices(cached, activeFilter);
  }

  try {
    const data = await noticeService.getNotices();
    const serialized = JSON.stringify(data);
    if (!cached || JSON.stringify(cached) !== serialized) {
      setCachedNotices(data);
      renderNotices(data, activeFilter);
    }
  } catch (error) {
    console.error("Failed to load notices:", error);
    if (!cached) {
      const container = document.getElementById("notices-container");
      if (container) {
        container.innerHTML = '<p class="error">Failed to load notices</p>';
      }
    }
  }
}

const SCHEDULE_CACHE_PREFIX = "studious_schedule_";

function getCachedSchedule(period) {
  try {
    const raw = localStorage.getItem(SCHEDULE_CACHE_PREFIX + period);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCachedSchedule(period, data) {
  try {
    localStorage.setItem(SCHEDULE_CACHE_PREFIX + period, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to cache schedule:", e);
  }
}

function renderSchedulePeriod(period, data) {
  const dateHeader = document.getElementById(`${period}-date`);
  if (dateHeader) {
    dateHeader.textContent = data.date;
  }
  if (period === "week") {
    renderWeekView(data.days);
  } else {
    renderScheduleItems(data.classes, `${period}-schedule`);
  }
}

async function loadScheduleData(period = "today") {
  // Serve from cache immediately for instant display
  const cached = getCachedSchedule(period);
  if (cached) {
    renderSchedulePeriod(period, cached);
  }

  try {
    const data = await scheduleService.getSchedule(period);

    // Update cache and re-render only if data has changed
    const serialized = JSON.stringify(data);
    if (!cached || JSON.stringify(cached) !== serialized) {
      setCachedSchedule(period, data);
      renderSchedulePeriod(period, data);
    }
  } catch (error) {
    console.error(`Failed to load schedule for ${period}:`, error);
    if (!cached) {
      const container = document.getElementById(`${period}-schedule`);
      if (container) {
        container.innerHTML = '<p class="error">Failed to load schedule</p>';
      }
    }
  }
}

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

  // Load schedule data when switching to schedule screen
  if (name === "schedule") {
    // Determine which tab is currently active
    const activeTab = document.querySelector(".schedule-tab.active");
    const period = activeTab ? activeTab.dataset.period : "today";
    loadScheduleData(period);
  }

  // Load notice data when switching to notice screen
  if (name === "notice") {
    loadNoticeData();
  }
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
      // Load schedule data from service
      loadScheduleData(period);
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
        b.classList.toggle("active", b.dataset.filter === filter);
      });
      // Re-render notices from cache using the selected filter
      const cached = getCachedNotices();
      if (cached) {
        renderNotices(cached, filter);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", loadScreens);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
