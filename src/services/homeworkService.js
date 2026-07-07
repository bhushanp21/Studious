/**
 * Homework Service
 * Provides homework data organized by subject
 */

const homeworkService = {
  async getHomework() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      subjects: [
        {
          id: 'math',
          name: 'Mathematics',
          icon: '📐',
          color: 'green'
        },
        {
          id: 'science',
          name: 'Science',
          icon: '🔬',
          color: 'blue'
        },
        {
          id: 'english',
          name: 'English',
          icon: '📚',
          color: 'violet'
        },
        {
          id: 'history',
          name: 'History',
          icon: '🏛️',
          color: 'teal'
        },
        {
          id: 'cs',
          name: 'Computer Science',
          icon: '💻',
          color: 'yellow'
        }
      ],
      homeworks: {
        math: [
          {
            id: 1,
            subject: 'math',
            item: 'Chapter 5 - Algebra Exercises',
            description: 'Complete all odd-numbered questions from page 145-150',
            deadline: '2026-07-08',
            status: 'pending'
          },
          {
            id: 2,
            subject: 'math',
            item: 'Geometry Problem Set',
            description: 'Solve 10 geometry proofs from the worksheet',
            deadline: '2026-07-06',
            status: 'completed'
          },
          {
            id: 3,
            subject: 'math',
            item: 'Unit Test Preparation',
            description: 'Review chapters 3-5 and prepare formula sheet',
            deadline: '2026-07-10',
            status: 'not-done'
          }
        ],
        science: [
          {
            id: 4,
            subject: 'science',
            item: 'Lab Report - Photosynthesis',
            description: 'Write detailed lab report with observations and conclusions',
            deadline: '2026-07-09',
            status: 'pending'
          },
          {
            id: 5,
            subject: 'science',
            item: 'Chapter 7 Summary',
            description: 'Create mind map for nervous system chapter',
            deadline: '2026-07-07',
            status: 'pending'
          },
          {
            id: 6,
            subject: 'science',
            item: 'Model Project',
            description: 'Build a working model of solar system',
            deadline: '2026-07-15',
            status: 'not-done'
          }
        ],
        english: [
          {
            id: 7,
            subject: 'english',
            item: 'Essay - Technology and Society',
            description: 'Write 800-1000 word essay with references',
            deadline: '2026-07-08',
            status: 'completed'
          },
          {
            id: 8,
            subject: 'english',
            item: 'Poetry Analysis',
            description: 'Analyze 3 poems from the given list',
            deadline: '2026-07-10',
            status: 'pending'
          },
          {
            id: 9,
            subject: 'english',
            item: 'Reading Assignment',
            description: 'Read chapters 5-7 of the novel and make notes',
            deadline: '2026-07-06',
            status: 'completed'
          }
        ],
        history: [
          {
            id: 10,
            subject: 'history',
            item: 'Timeline Project',
            description: 'Create timeline of Ancient Rome with 20+ events',
            deadline: '2026-07-12',
            status: 'not-done'
          },
          {
            id: 11,
            subject: 'history',
            item: 'Document Analysis',
            description: 'Analyze historical documents provided in class',
            deadline: '2026-07-07',
            status: 'pending'
          }
        ],
        cs: [
          {
            id: 12,
            subject: 'cs',
            item: 'Python Programming Task',
            description: 'Write a program for file sorting algorithm',
            deadline: '2026-07-09',
            status: 'pending'
          },
          {
            id: 13,
            subject: 'cs',
            item: 'Database Design',
            description: 'Design database schema for school management system',
            deadline: '2026-07-11',
            status: 'not-done'
          }
        ]
      }
    };
  }
};
