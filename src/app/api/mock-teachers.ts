import type { Teacher, TeacherStats } from '@/entities/teacher'

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@school.edu',
    subject: 'Mathematics',
    rating: 4.8,
    status: 'active',
    completedTrainings: 12,
    totalTrainings: 12,
    joinDate: '2020-09-01',
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.wilson@school.edu',
    subject: 'Physics',
    rating: 4.5,
    status: 'active',
    completedTrainings: 10,
    totalTrainings: 12,
    joinDate: '2019-03-15',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@school.edu',
    subject: 'English',
    rating: 4.9,
    status: 'active',
    completedTrainings: 12,
    totalTrainings: 12,
    joinDate: '2021-01-10',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@school.edu',
    subject: 'Chemistry',
    rating: 4.2,
    status: 'inactive',
    completedTrainings: 6,
    totalTrainings: 12,
    joinDate: '2018-08-20',
  },
  {
    id: '5',
    name: 'Emily Brown',
    email: 'emily.brown@school.edu',
    subject: 'History',
    rating: 4.6,
    status: 'on_leave',
    completedTrainings: 8,
    totalTrainings: 12,
    joinDate: '2020-02-01',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'robert.taylor@school.edu',
    subject: 'Biology',
    rating: 4.7,
    status: 'active',
    completedTrainings: 11,
    totalTrainings: 12,
    joinDate: '2019-11-12',
  },
]

function computeStats(teachers: Teacher[]): TeacherStats {
  const total = teachers.length
  const active = teachers.filter((t) => t.status === 'active').length
  const sumRating = teachers.reduce((s, t) => s + t.rating, 0)
  const totalTrainings = teachers.reduce((s, t) => s + t.totalTrainings, 0)
  const completedTrainings = teachers.reduce((s, t) => s + t.completedTrainings, 0)
  return {
    totalTeachers: total,
    activeTeachers: active,
    averageRating: total ? Math.round((sumRating / total) * 10) / 10 : 0,
    completedTrainingsPercent:
      totalTrainings > 0 ? Math.round((completedTrainings / totalTrainings) * 1000) / 10 : 0,
  }
}

export function getMockTeacherStats(): TeacherStats {
  return computeStats(MOCK_TEACHERS)
}
