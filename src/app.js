// ============================================================================
// SCHEDULE SERVICE - Embedded for Android compatibility
// ============================================================================
const scheduleService = {
  _timetable: {
    Monday: {
      classes: [
        { id: 1,  time: '08:30 AM', subject: 'Mathematics',    room: 'Room 201',  teacher: 'Mr. Patel',    duration: '1 hour',    color: 'green'  },
        { id: 2,  time: '10:00 AM', subject: 'English',        room: 'Room 105',  teacher: 'Ms. Singh',    duration: '1 hour',    color: 'violet' },
        { id: 3,  time: '12:00 PM', subject: 'Science',        room: 'Lab 301',   teacher: 'Mrs. Sharma',  duration: '1.5 hours', color: 'blue'   },
        { id: 4,  time: '02:30 PM', subject: 'Physical Ed.',   room: 'Ground',    teacher: 'Coach Kumar',  duration: '1 hour',    color: 'orange' }
      ]
    },
    Tuesday: {
      classes: [
        { id: 5,  time: '08:30 AM', subject: 'History',        room: 'Room 302',  teacher: 'Mr. Desai',    duration: '1 hour',    color: 'teal'   },
        { id: 6,  time: '10:00 AM', subject: 'Computer Sci.',  room: 'Lab 201',   teacher: 'Dr. Verma',    duration: '1.5 hours', color: 'yellow' },
        { id: 7,  time: '12:00 PM', subject: 'Mathematics',    room: 'Room 201',  teacher: 'Mr. Patel',    duration: '1 hour',    color: 'green'  },
        { id: 8,  time: '02:00 PM', subject: 'Art Class',      room: 'Studio 5',  teacher: 'Mrs. Krishnan',duration: '1 hour',    color: 'pink'   }
      ]
    },
    Wednesday: {
      classes: [
        { id: 9,  time: '10:00 AM', subject: 'Mathematics',    room: 'Room 201',  teacher: 'Mr. Patel',    duration: '1 hour',    color: 'green'  },
        { id: 10, time: '12:00 PM', subject: 'Science',        room: 'Lab 301',   teacher: 'Mrs. Sharma',  duration: '1.5 hours', color: 'blue'   },
        { id: 11, time: '02:00 PM', subject: 'English',        room: 'Room 105',  teacher: 'Ms. Singh',    duration: '1 hour',    color: 'violet' },
        { id: 12, time: '04:00 PM', subject: 'Football Prac.', room: 'Ground',    teacher: 'Coach Kumar',  duration: '1 hour',    color: 'orange' }
      ]
    },
    Thursday: {
      classes: [
        { id: 13, time: '08:30 AM', subject: 'History',        room: 'Room 302',  teacher: 'Mr. Desai',    duration: '1 hour',    color: 'teal'   },
        { id: 14, time: '10:00 AM', subject: 'Computer Sci.',  room: 'Lab 201',   teacher: 'Dr. Verma',    duration: '1.5 hours', color: 'yellow' },
        { id: 15, time: '12:00 PM', subject: 'Mathematics',    room: 'Room 201',  teacher: 'Mr. Patel',    duration: '1 hour',    color: 'green'  },
        { id: 16, time: '02:00 PM', subject: 'Physics Lab',    room: 'Lab 102',   teacher: 'Dr. Gupta',    duration: '1.5 hours', color: 'blue'   },
        { id: 17, time: '04:00 PM', subject: 'Art Class',      room: 'Studio 5',  teacher: 'Mrs. Krishnan',duration: '1 hour',    color: 'pink'   }
      ]
    },
    Friday: {
      classes: [
        { id: 18, time: '08:00 AM', subject: 'Assembly',       room: 'Auditorium',teacher: 'Principal',    duration: '1 hour',    color: 'purple' },
        { id: 19, time: '10:00 AM', subject: 'Science',        room: 'Lab 301',   teacher: 'Mrs. Sharma',  duration: '1.5 hours', color: 'blue'   },
        { id: 20, time: '12:00 PM', subject: 'Debate Club',    room: 'Room 204',  teacher: 'Ms. Singh',    duration: '1 hour',    color: 'teal'   }
      ]
    },
    Saturday: { classes: [] },
    Sunday:   { classes: [] }
  },
  _dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  _formatDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  },
  _getDayData(date) {
    const dayName = this._dayNames[date.getDay()];
    const dayData = this._timetable[dayName] || { classes: [] };
    return {
      date: this._formatDate(date),
      dayName,
      classes: dayData.classes
    };
  },
  async getSchedule(period = 'today') {
    await new Promise(resolve => setTimeout(resolve, 300));
    const now = new Date();
    if (period === 'today') {
      return this._getDayData(now);
    }
    if (period === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      return this._getDayData(tomorrow);
    }
    return {
      date: 'This Week',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => ({
        name: day,
        subjects: (this._timetable[day]?.classes || []).map(c => ({
          name: c.subject,
          color: c.color
        }))
      }))
    };
  },
  async getAllSchedules() {
    return {
      today:    await this.getSchedule('today'),
      tomorrow: await this.getSchedule('tomorrow'),
      week:     await this.getSchedule('week')
    };
  }
};

// ============================================================================
// NOTICE SERVICE - Embedded for Android compatibility
// ============================================================================
const noticeService = {
  async getNotices() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {id: 1, category: 'urgent', title: 'School Assembly Tomorrow', content: "Tomorrow's school assembly starts at 8:00 AM. All students must be present. Formal uniforms are mandatory. Assembly will be in the main auditorium.", author: '📌 Principal\'s Office', time: 'Today, 3:45 PM'},
      {id: 2, category: 'academic', title: 'Science Project Submission', content: 'Final submission for the Science project (Chapter 5-7) is on Friday, 26 April. Submit your project in the science block or through Google Classroom. Late submissions will have 20% marks deducted.', author: '👨‍🏫 Mrs. Sharma (Science)', time: 'Yesterday, 2:30 PM'},
      {id: 3, category: 'academic', title: 'Maths Unit Test Next Monday', content: 'Unit test on Algebra and Geometry will be conducted next Monday. Topics: Linear equations, Quadratic equations, and Basic geometry proofs. Study from chapters 3 and 4.', author: '👨‍🏫 Mr. Patel (Mathematics)', time: '2 days ago, 11:00 AM'},
      {id: 4, category: 'academic', title: 'English Assignment Due', content: 'Write an essay on "The Impact of Technology on Society" (800-1000 words). Due date: April 28. Submit through email with subject line: "Class 7A - Essay Assignment".', author: '👩‍🏫 Ms. Singh (English)', time: '3 days ago, 4:20 PM'},
      {id: 5, category: '', title: 'Sports Day Registration Open', content: 'Registration for Annual Sports Day is now open! Choose from events: 100m Sprint, 4x100 Relay, Long Jump, High Jump, and Badminton. Register with your PE teacher before April 30.', author: '⚽ Coach Kumar (PE)', time: '5 days ago, 9:00 AM'}
    ];
  }
};

// ============================================================================
// HOMEWORK SERVICE - Embedded for Android compatibility
// ============================================================================
const homeworkService = {
  async getHomework() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      subjects: [
        { id: 'math', name: 'Mathematics', icon: '📐', color: 'green' },
        { id: 'science', name: 'Science', icon: '🔬', color: 'blue' },
        { id: 'english', name: 'English', icon: '📚', color: 'violet' },
        { id: 'history', name: 'History', icon: '🏛️', color: 'teal' },
        { id: 'cs', name: 'Computer Science', icon: '💻', color: 'yellow' }
      ],
      homeworks: {
        math: [
          { id: 1, subject: 'math', item: 'Chapter 5 - Algebra Exercises', description: 'Complete all odd-numbered questions from page 145-150', deadline: '2026-07-08', status: 'pending' },
          { id: 2, subject: 'math', item: 'Geometry Problem Set', description: 'Solve 10 geometry proofs from the worksheet', deadline: '2026-07-06', status: 'completed' },
          { id: 3, subject: 'math', item: 'Unit Test Preparation', description: 'Review chapters 3-5 and prepare formula sheet', deadline: '2026-07-10', status: 'not-done' }
        ],
        science: [
          { id: 4, subject: 'science', item: 'Lab Report - Photosynthesis', description: 'Write detailed lab report with observations and conclusions', deadline: '2026-07-09', status: 'pending' },
          { id: 5, subject: 'science', item: 'Chapter 7 Summary', description: 'Create mind map for nervous system chapter', deadline: '2026-07-07', status: 'pending' },
          { id: 6, subject: 'science', item: 'Model Project', description: 'Build a working model of solar system', deadline: '2026-07-15', status: 'not-done' }
        ],
        english: [
          { id: 7, subject: 'english', item: 'Essay - Technology and Society', description: 'Write 800-1000 word essay with references', deadline: '2026-07-08', status: 'completed' },
          { id: 8, subject: 'english', item: 'Poetry Analysis', description: 'Analyze 3 poems from the given list', deadline: '2026-07-10', status: 'pending' },
          { id: 9, subject: 'english', item: 'Reading Assignment', description: 'Read chapters 5-7 of the novel and make notes', deadline: '2026-07-06', status: 'completed' }
        ],
        history: [
          { id: 10, subject: 'history', item: 'Timeline Project', description: 'Create timeline of Ancient Rome with 20+ events', deadline: '2026-07-12', status: 'not-done' },
          { id: 11, subject: 'history', item: 'Document Analysis', description: 'Analyze historical documents provided in class', deadline: '2026-07-07', status: 'pending' }
        ],
        cs: [
          { id: 12, subject: 'cs', item: 'Python Programming Task', description: 'Write a program for file sorting algorithm', deadline: '2026-07-09', status: 'pending' },
          { id: 13, subject: 'cs', item: 'Database Design', description: 'Design database schema for school management system', deadline: '2026-07-11', status: 'not-done' }
        ]
      }
    };
  }
};

// ============================================================================
// Application Core
// ============================================================================

const screenNames = [ "home", "schedule", "notice", "homework", "emergency"];
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

function renderHomeworkSubjects(subjects) {
  const container = document.getElementById("homework-subjects-list");
  if (!container) return;
  
  container.innerHTML = subjects.map((subject, index) => `
    <button class="homework-subject-tab ${index === 0 ? 'active' : ''}" data-subject="${subject.id}">
      <span class="subject-icon">${subject.icon}</span>
      <span class="subject-name">${subject.name}</span>
    </button>
  `).join("");
}

function renderHomeworkItems(items, homeworks) {
  const container = document.getElementById("homework-items-list");
  if (!container) return;
  
  const currentSubject = document.querySelector(".homework-subject-tab.active")?.dataset.subject || "math";
  const subjectHomeworks = homeworks[currentSubject] || [];
  
  if (subjectHomeworks.length === 0) {
    container.innerHTML = '<p class="no-homework">No homework for this subject</p>';
    return;
  }
  
  container.innerHTML = subjectHomeworks.map(hw => {
    const statusClass = hw.status.replace('-', '-');
    const statusIcon = hw.status === 'completed' ? '✅' : hw.status === 'pending' ? '⏳' : '❌';
    const deadlineDate = new Date(hw.deadline);
    const today = new Date();
    const isOverdue = deadlineDate < today && hw.status !== 'completed';
    
    return `
      <div class="homework-card ${statusClass} ${isOverdue ? 'overdue' : ''}">
        <div class="homework-header">
          <div>
            <h3>${hw.item}</h3>
            <p class="homework-description">${hw.description}</p>
          </div>
          <span class="homework-status ${hw.status}">${statusIcon}</span>
        </div>
        <div class="homework-footer">
          <span class="homework-deadline">📅 ${deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span class="homework-status-text">${hw.status === 'completed' ? 'Completed' : hw.status === 'pending' ? 'Pending' : 'Not Done'}</span>
        </div>
      </div>
    `;
  }).join("");
}

async function loadHomeworkData() {
  console.log("[Homework] Loading homework data");
  
  try {
    const data = await homeworkService.getHomework();
    console.log("[Homework] Got homework data:", data);
    
    renderHomeworkSubjects(data.subjects);
    renderHomeworkItems(data.subjects, data.homeworks);
    
    // Save to session for subject tab switching
    window.currentHomeworkData = data;    
    // Setup homework subject tab event listeners
    const homeworkSubjectTabs = Array.from(document.querySelectorAll(".homework-subject-tab"));
    homeworkSubjectTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const subject = tab.dataset.subject;
        homeworkSubjectTabs.forEach((t) => {
          t.classList.toggle("active", t.dataset.subject === subject);
        });
        // Re-render homework items for selected subject
        if (window.currentHomeworkData) {
          renderHomeworkItems(window.currentHomeworkData.subjects, window.currentHomeworkData.homeworks);
        }
      });
    });  } catch (error) {
    console.error("Failed to load homework:", error);
    const container = document.getElementById("homework-items-list");
    if (container) {
      container.innerHTML = '<p class="error">Failed to load homework</p>';
    }
  }
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
  console.log(`[Schedule] Rendering ${period}:`, data);
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
  console.log(`[Schedule] Loading schedule for: ${period}`);
  
  // Serve from cache immediately for instant display
  const cached = getCachedSchedule(period);
  console.log(`[Schedule] Cache for ${period}:`, cached);
  if (cached) {
    renderSchedulePeriod(period, cached);
  }

  try {
    console.log(`[Schedule] Calling scheduleService.getSchedule('${period}')`);
    const data = await scheduleService.getSchedule(period);
    console.log(`[Schedule] Got data from service:`, data);

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
    const footerResponse = await fetch("./footer.html?v=" + Date.now());
    const footerHtml = await footerResponse.text();
    const phoneSection = document.querySelector(".phone");
    phoneSection.insertAdjacentHTML("beforeend", footerHtml);
  } catch (error) {
    console.error("Failed to load footer", error);
  }

  screens = Array.from(document.querySelectorAll(".screen"));
  setupEventListeners();
  showScreen("home");
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  phone.classList.toggle("theme-dark", name === "home" || name === "emergency");

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

  // Load homework data when switching to homework screen
  if (name === "homework") {
    loadHomeworkData();
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

  // Homework subject switching
  const homeworkSubjectTabs = Array.from(document.querySelectorAll(".homework-subject-tab"));
  homeworkSubjectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const subject = tab.dataset.subject;
      homeworkSubjectTabs.forEach((t) => {
        t.classList.toggle("active", t.dataset.subject === subject);
      });
      // Re-render homework items for selected subject
      if (window.currentHomeworkData) {
        renderHomeworkItems(window.currentHomeworkData.subjects, window.currentHomeworkData.homeworks);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[App] DOMContentLoaded - Starting loadScreens");
  loadScreens();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("[App] Service worker supported, registering...");
    navigator.serviceWorker.register("./service-worker.js").catch((e) => {
      console.log("[App] Service worker registration failed:", e);
    });
  });
}
