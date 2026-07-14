# API Specification — Pasar Baru Gurmukhi & Kirtan Class

Base URL: `/api`

All authenticated endpoints require `Authorization: Bearer <token>` header. Endpoints marked `Admin` return 403 for TEACHER role.

## Auth

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/auth/login | {email: string (required), password: string (required)} | {token: string, user: {id: UUID, email: string, name: string, role: "ADMIN" \| "TEACHER", teacherId: UUID \| null}} | No |
| GET | /api/auth/me | — | {user: {id: UUID, email: string, name: string, role: "ADMIN" \| "TEACHER", teacherId: UUID \| null}} | Bearer |

Note: No public signup. Admins create teacher accounts via POST /api/teachers. Initial admin account is seeded.

## File Upload

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/upload/presigned | {fileName: string (required), contentType: string (required), isPublic: boolean (optional, default false)} | {uploadUrl: string, cloud_storage_path: string} | Bearer |
| POST | /api/upload/complete | {cloud_storage_path: string (required), fileName: string (required), contentType: string (required), fileSize: integer (optional)} | {id: UUID, cloud_storage_path: string, fileName: string} | Bearer |
| GET | /api/files/:id/url?mode=view\|download | — | {url: string} | Bearer |
| DELETE | /api/files/:id | — | {success: boolean} | Bearer |

## Dashboard

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/dashboard | — | {totalStudents: integer, totalTeachers: integer, activeClasses: integer, todaySessions: {id: UUID, classId: UUID, className: string, date: ISO8601, attendanceSubmitted: boolean}[], pendingAttendanceSessions: {id: UUID, classId: UUID, className: string, date: ISO8601}[], recentFeedback: Feedback[], activeAcademicYear: {id: UUID, name: string} \| null} | Bearer |

For TEACHER role: `totalStudents` and `totalTeachers` reflect only their scope; `todaySessions` filtered to assigned classes; `pendingAttendanceSessions` filtered similarly.

## Students

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/students?search=string&classId=UUID&page=integer&limit=integer | — | {items: StudentListItem[], total: integer, page: integer, totalPages: integer} | Bearer |
| GET | /api/students/:id | — | StudentDetail | Bearer |
| POST | /api/students | {name: string (required), parentName: string (required), dob: ISO8601 (required), contactNumber: string (required), photoFileId: UUID \| null (optional), classIds: UUID[] (optional)} | StudentDetail | Admin |
| PATCH | /api/students/:id | {name: string (optional), parentName: string (optional), dob: ISO8601 (optional), contactNumber: string (optional), photoFileId: UUID \| null (optional)} | StudentDetail | Admin |
| DELETE | /api/students/:id | — | {success: boolean} | Admin |

### StudentListItem
```
{
  id: UUID,
  name: string,
  parentName: string,
  dob: ISO8601,
  age: integer,
  contactNumber: string,
  photoFileId: UUID | null,
  photoUrl: string | null,
  enrolledClasses: {id: UUID, name: string, grade: string}[]
}
```

### StudentDetail
```
{
  id: UUID,
  name: string,
  parentName: string,
  dob: ISO8601,
  age: integer,
  contactNumber: string,
  photoFileId: UUID | null,
  photoUrl: string | null,
  enrollments: {
    id: UUID,
    classId: UUID,
    className: string,
    classGrade: string,
    enrollmentDate: ISO8601,
    status: "ACTIVE" | "COMPLETED" | "WITHDRAWN"
  }[],
  attendanceSummary: {
    totalSessions: integer,
    present: integer,
    absent: integer,
    late: integer,
    excused: integer,
    percentage: number,
    perClass: {classId: UUID, className: string, percentage: number, total: integer, present: integer}[]
  },
  recentAttendance: {date: ISO8601, className: string, status: string}[],
  progress: {metricId: UUID, metricName: string, metricType: string, classId: UUID, className: string, entries: {date: ISO8601, value: number, notes: string | null}[]}[],
  feedback: {id: UUID, date: ISO8601, className: string, teacherName: string, content: string}[],
  classHistory: {id: UUID, classId: UUID, className: string, academicYearName: string, action: "ENROLLED" | "PROMOTED" | "GRADUATED", date: ISO8601}[],
  createdAt: ISO8601
}
```

## Student Enrollments

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/students/:studentId/enrollments | {classId: UUID (required)} | {id: UUID, studentId: UUID, classId: UUID, enrollmentDate: ISO8601, status: "ACTIVE"} | Admin |
| PATCH | /api/enrollments/:id | {status: "ACTIVE" \| "COMPLETED" \| "WITHDRAWN" (required)} | {id: UUID, status: string} | Admin |
| DELETE | /api/enrollments/:id | — | {success: boolean} | Admin |

## Classes

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/classes | — | ClassListItem[] | Bearer |
| GET | /api/classes/:id | — | ClassDetail | Bearer |

### ClassListItem
```
{
  id: UUID,
  name: string,
  grade: string,
  description: string | null,
  studentCount: integer,
  teachers: {id: UUID, name: string, photoFileId: UUID | null, photoUrl: string | null}[],
  nextSessionDate: ISO8601 | null
}
```

### ClassDetail
```
{
  id: UUID,
  name: string,
  grade: string,
  description: string | null,
  teachers: {id: UUID, name: string, photoFileId: UUID | null, photoUrl: string | null}[],
  students: {id: UUID, name: string, photoFileId: UUID | null, photoUrl: string | null, enrollmentStatus: string}[],
  sessions: {id: UUID, date: ISO8601, attendanceSubmitted: boolean, termName: string | null}[],
  metrics: {id: UUID, name: string, type: string, description: string | null}[]
}
```

## Teacher Assignments

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/classes/:classId/teachers | {teacherId: UUID (required)} | {id: UUID, classId: UUID, teacherId: UUID} | Admin |
| DELETE | /api/classes/:classId/teachers/:teacherId | — | {success: boolean} | Admin |

## Teachers

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/teachers | — | TeacherListItem[] | Admin |
| GET | /api/teachers/:id | — | TeacherDetail | Bearer |
| POST | /api/teachers | {email: string (required), password: string (required), name: string (required), dob: ISO8601 (required), contactNumber: string (required), photoFileId: UUID \| null (optional), classIds: UUID[] (optional)} | TeacherDetail | Admin |
| PATCH | /api/teachers/:id | {name: string (optional), dob: ISO8601 (optional), contactNumber: string (optional), photoFileId: UUID \| null (optional)} | TeacherDetail | Bearer |
| DELETE | /api/teachers/:id | — | {success: boolean} | Admin |

### TeacherListItem
```
{
  id: UUID,
  userId: UUID,
  name: string,
  dob: ISO8601,
  age: integer,
  contactNumber: string,
  photoFileId: UUID | null,
  photoUrl: string | null,
  assignedClasses: {id: UUID, name: string, grade: string}[]
}
```

### TeacherDetail
```
{
  id: UUID,
  userId: UUID,
  name: string,
  dob: ISO8601,
  age: integer,
  contactNumber: string,
  photoFileId: UUID | null,
  photoUrl: string | null,
  assignedClasses: {id: UUID, name: string, grade: string}[],
  attendanceSummary: {totalSessions: integer, present: integer, absent: integer, percentage: number},
  createdAt: ISO8601
}
```

## Sessions

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/sessions | {classId: UUID (required), date: ISO8601 (required), academicYearId: UUID (required), termId: UUID \| null (optional)} | SessionDetail | Bearer |
| GET | /api/sessions/:id | — | SessionDetail | Bearer |
| DELETE | /api/sessions/:id | — | {success: boolean} | Admin |

### SessionDetail
```
{
  id: UUID,
  classId: UUID,
  className: string,
  classGrade: string,
  date: ISO8601,
  academicYearId: UUID,
  academicYearName: string,
  termId: UUID | null,
  termName: string | null,
  attendanceSubmitted: boolean,
  students: {
    id: UUID,
    name: string,
    photoFileId: UUID | null,
    photoUrl: string | null,
    attendanceStatus: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | null
  }[],
  teacherAttendance: {
    teacherId: UUID,
    teacherName: string,
    status: "PRESENT" | "ABSENT" | null
  }[],
  feedback: {
    id: UUID,
    teacherName: string,
    content: string,
    type: "STUDENT_SPECIFIC" | "GENERAL",
    studentId: UUID | null,
    studentName: string | null,
    createdAt: ISO8601
  }[]
}
```

## Attendance

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/attendance/bulk | {sessionId: UUID (required), studentAttendance: {studentId: UUID, status: "PRESENT" \| "ABSENT" \| "LATE" \| "EXCUSED"}[] (required), teacherAttendance: {teacherId: UUID, status: "PRESENT" \| "ABSENT"}[] (optional)} | {success: boolean, savedCount: integer} | Bearer |
| GET | /api/attendance/overview?classId=UUID&month=integer&year=integer | — | {sessions: {id: UUID, date: ISO8601, attendanceSubmitted: boolean}[], classSummary: {totalSessions: integer, averageAttendance: number}, studentBreakdown: {studentId: UUID, studentName: string, present: integer, absent: integer, late: integer, excused: integer, total: integer, percentage: number}[]} | Bearer |

## Feedback

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/feedback | {classSessionId: UUID (required), content: string (required), type: "STUDENT_SPECIFIC" \| "GENERAL" (required), studentId: UUID \| null (required if STUDENT_SPECIFIC)} | {id: UUID, classSessionId: UUID, teacherId: UUID, teacherName: string, studentId: UUID \| null, studentName: string \| null, content: string, type: string, createdAt: ISO8601} | Bearer |

## Progress

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/progress | {studentId: UUID (required), progressMetricId: UUID (required), classSessionId: UUID (required), value: number (required), notes: string \| null (optional)} | {id: UUID, studentId: UUID, progressMetricId: UUID, classSessionId: UUID, value: number, notes: string \| null, createdAt: ISO8601} | Bearer |
| GET | /api/progress?studentId=UUID&classId=UUID | — | {metrics: {metricId: UUID, metricName: string, metricType: string, entries: {id: UUID, date: ISO8601, sessionId: UUID, value: number, notes: string \| null}[]}[]} | Bearer |

## Progress Metrics

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/metrics?classId=UUID | — | {id: UUID, name: string, description: string \| null, classId: UUID, className: string, type: "SCORE" \| "LEVEL" \| "RATING"}[] | Bearer |
| POST | /api/metrics | {name: string (required), description: string \| null (optional), classId: UUID (required), type: "SCORE" \| "LEVEL" \| "RATING" (required)} | {id: UUID, name: string, description: string \| null, classId: UUID, type: string} | Admin |
| DELETE | /api/metrics/:id | — | {success: boolean} | Admin |

## Academic Years

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/academic-years | — | {id: UUID, name: string, startDate: ISO8601, endDate: ISO8601, isActive: boolean, createdAt: ISO8601}[] | Bearer |
| POST | /api/academic-years | {name: string (required), startDate: ISO8601 (required), endDate: ISO8601 (required)} | {id: UUID, name: string, startDate: ISO8601, endDate: ISO8601, isActive: boolean} | Admin |
| PATCH | /api/academic-years/:id | {name: string (optional), startDate: ISO8601 (optional), endDate: ISO8601 (optional), isActive: boolean (optional)} | {id: UUID, name: string, startDate: ISO8601, endDate: ISO8601, isActive: boolean} | Admin |

Note: Setting `isActive: true` on one year automatically sets all others to `isActive: false`.

## Terms

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| GET | /api/terms?academicYearId=UUID | — | {id: UUID, name: string, startDate: ISO8601, endDate: ISO8601, academicYearId: UUID, academicYearName: string}[] | Bearer |
| POST | /api/terms | {name: string (required), startDate: ISO8601 (required), endDate: ISO8601 (required), academicYearId: UUID (required)} | {id: UUID, name: string, startDate: ISO8601, endDate: ISO8601, academicYearId: UUID} | Admin |
| DELETE | /api/terms/:id | — | {success: boolean} | Admin |

## Report Cards

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/report-cards/generate | {studentId: UUID (required), academicYearId: UUID (required), termId: UUID \| null (optional)} | {id: UUID, studentId: UUID, studentName: string, academicYearName: string, termName: string \| null, pdfFileId: UUID, pdfUrl: string, generatedAt: ISO8601} | Admin |
| GET | /api/report-cards?studentId=UUID | — | {id: UUID, studentId: UUID, studentName: string, academicYearName: string, termName: string \| null, pdfFileId: UUID, pdfUrl: string, generatedAt: ISO8601}[] | Bearer |
| GET | /api/report-cards/:id/download | — | {url: string} | Bearer |

Note: POST /api/report-cards/generate creates the PDF on the backend using pdfkit, uploads to S3 via internal presigned URL flow, creates a File record, and returns the report card with a pre-signed download URL.

## Student Class History

| Method | Path | Request Body | Response Body | Auth |
|--------|------|-------------|---------------|------|
| POST | /api/students/:studentId/history | {classId: UUID (required), academicYearId: UUID (required), action: "ENROLLED" \| "PROMOTED" \| "GRADUATED" (required)} | {id: UUID, studentId: UUID, classId: UUID, className: string, academicYearId: UUID, academicYearName: string, action: string, date: ISO8601} | Admin |
