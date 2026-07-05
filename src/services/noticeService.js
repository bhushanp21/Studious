/**
 * Fake Notice Service
 * Returns mock notice data in JSON format
 * TODO: Replace with actual API endpoint later
 */

const noticeService = {
  async getNotices() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 1,
        category: 'urgent',
        title: 'School Assembly Tomorrow',
        content: "Tomorrow's school assembly starts at 8:00 AM. All students must be present. Formal uniforms are mandatory. Assembly will be in the main auditorium.",
        author: '📌 Principal\'s Office',
        time: 'Today, 3:45 PM'
      },
      {
        id: 2,
        category: 'academic',
        title: 'Science Project Submission',
        content: 'Final submission for the Science project (Chapter 5-7) is on Friday, 26 April. Submit your project in the science block or through Google Classroom. Late submissions will have 20% marks deducted.',
        author: '👨‍🏫 Mrs. Sharma (Science)',
        time: 'Yesterday, 2:30 PM'
      },
      {
        id: 3,
        category: 'academic',
        title: 'Maths Unit Test Next Monday',
        content: 'Unit test on Algebra and Geometry will be conducted next Monday. Topics: Linear equations, Quadratic equations, and Basic geometry proofs. Study from chapters 3 and 4.',
        author: '👨‍🏫 Mr. Patel (Mathematics)',
        time: '3 days ago, 4:20 PM'
      },
      {
        id: 5,
        category: '',
        title: 'Sports Day Registration Open',
        content: 'Registration for Annual Sports Day is now open! Choose        content: 'Registration for Annual Sports DaHi        content: 'Registration f with your PE teacher before April 30.',
        author: '⚽ Coach Kumar (PE)',
        time: '5 days ago, 9:00 AM'
      }
    ];
  }
};
