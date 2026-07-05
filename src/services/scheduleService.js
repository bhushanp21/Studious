/**
 * Fake Schedule Service
 * Stores a full weekly timetable and resolves 'today'/'tomorrow' dynamically.
 * TODO: Replace with actual API endpoint later
 */

const scheduleService = {

  // Full weekly timetable — keyed by day name
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

  /**
   * Fetch schedule for a given period.
   * @param {string} period - 'today', 'tomorrow', or 'week'
   * @returns {Promise<Object>} Schedule data
   */
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

    // week view — return all weekdays with summary subjects
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

