# Database Schema — Pasar Baru Gurmukhi & Kirtan Class

## Enums

```
enum UserRole {
  ADMIN
  TEACHER
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  EXCUSED
}

enum TeacherAttendanceStatus {
  PRESENT
  ABSENT
}

enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  WITHDRAWN
}

enum MetricType {
  SCORE
  LEVEL
  RATING
}

enum FeedbackType {
  STUDENT_SPECIFIC
  GENERAL
}

enum HistoryAction {
  ENROLLED
  PROMOTED
  GRADUATED
}
```

## Entities

### User
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| email | String | Unique, required |
| password | String | bcrypt hashed, required |
| name | String | Required |
| role | UserRole | Required, default TEACHER |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

Seed: one admin user (email: admin@pasarbaru.org, password: hashed "admin123", role: ADMIN)

### Teacher
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| userId | UUID | FK to User, unique, required, ON DELETE CASCADE |
| name | String | Required |
| dob | DateTime | Required |
| contactNumber | String | Required |
| photoFileId | UUID | FK to File, nullable, ON DELETE SET NULL |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### Student
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | String | Required |
| parentName | String | Required |
| dob | DateTime | Required |
| contactNumber | String | Required |
| photoFileId | UUID | FK to File, nullable, ON DELETE SET NULL |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### Class
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | String | Required, unique |
| grade | String | Required |
| description | String | Nullable |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

Seed data (11 classes):
- Nikke Tarey, grade: Nursery
- Class 1, grade: 1
- Class 2A, grade: 2
- Class 2B, grade: 2
- Class 3, grade: 3
- Nitnem 1, grade: 4
- Nitnem 2, grade: 5
- Nitnem 3, grade: 6
- Kirtan Class, grade: Special
- Tabla Class, grade: Special
- Conversation Class, grade: Special

### ClassEnrollment
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| studentId | UUID | FK to Student, required, ON DELETE CASCADE |
| classId | UUID | FK to Class, required, ON DELETE CASCADE |
| enrollmentDate | DateTime | Required, default now |
| status | EnrollmentStatus | Required, default ACTIVE |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

Unique constraint: (studentId, classId) — a student can only be enrolled once per class

### TeacherAssignment
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| teacherId | UUID | FK to Teacher, required, ON DELETE CASCADE |
| classId | UUID | FK to Class, required, ON DELETE CASCADE |
| createdAt | DateTime | Auto |

Unique constraint: (teacherId, classId)

### AcademicYear
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | String | Required |
| startDate | DateTime | Required |
| endDate | DateTime | Required |
| isActive | Boolean | Required, default false |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### Term
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | String | Required |
| startDate | DateTime | Required |
| endDate | DateTime | Required |
| academicYearId | UUID | FK to AcademicYear, required, ON DELETE CASCADE |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

### ClassSession
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| classId | UUID | FK to Class, required, ON DELETE CASCADE |
| date | DateTime | Required |
| academicYearId | UUID | FK to AcademicYear, required, ON DELETE CASCADE |
| termId | UUID | FK to Term, nullable, ON DELETE SET NULL |
| createdAt | DateTime | Auto |

Index: (classId, date)

### StudentAttendance
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| studentId | UUID | FK to Student, required, ON DELETE CASCADE |
| classSessionId | UUID | FK to ClassSession, required, ON DELETE CASCADE |
| status | AttendanceStatus | Required |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

Unique constraint: (studentId, classSessionId)

### TeacherAttendance
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| teacherId | UUID | FK to Teacher, required, ON DELETE CASCADE |
| classSessionId | UUID | FK to ClassSession, required, ON DELETE CASCADE |
| status | TeacherAttendanceStatus | Required |
| createdAt | DateTime | Auto |

Unique constraint: (teacherId, classSessionId)

### ProgressMetric
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| name | String | Required |
| description | String | Nullable |
| classId | UUID | FK to Class, required, ON DELETE CASCADE |
| type | MetricType | Required |
| createdAt | DateTime | Auto |

### StudentProgress
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| studentId | UUID | FK to Student, required, ON DELETE CASCADE |
| progressMetricId | UUID | FK to ProgressMetric, required, ON DELETE CASCADE |
| classSessionId | UUID | FK to ClassSession, required, ON DELETE CASCADE |
| value | Float | Required |
| notes | String | Nullable |
| createdAt | DateTime | Auto |

Index: (studentId, progressMetricId)

### Feedback
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| classSessionId | UUID | FK to ClassSession, required, ON DELETE CASCADE |
| teacherId | UUID | FK to Teacher, required, ON DELETE CASCADE |
| studentId | UUID | FK to Student, nullable, ON DELETE CASCADE |
| content | String | Required |
| type | FeedbackType | Required |
| createdAt | DateTime | Auto |

Index: (classSessionId), (studentId)

### ReportCard
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| studentId | UUID | FK to Student, required, ON DELETE CASCADE |
| academicYearId | UUID | FK to AcademicYear, required, ON DELETE CASCADE |
| termId | UUID | FK to Term, nullable, ON DELETE SET NULL |
| pdfFileId | UUID | FK to File, required, ON DELETE CASCADE |
| generatedAt | DateTime | Required, default now |
| createdAt | DateTime | Auto |

Index: (studentId)

### StudentClassHistory
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| studentId | UUID | FK to Student, required, ON DELETE CASCADE |
| classId | UUID | FK to Class, required, ON DELETE CASCADE |
| academicYearId | UUID | FK to AcademicYear, required, ON DELETE CASCADE |
| action | HistoryAction | Required |
| date | DateTime | Required, default now |
| createdAt | DateTime | Auto |

Index: (studentId)

### File
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, auto-generated |
| userId | UUID | FK to User, required, ON DELETE CASCADE |
| fileName | String | Required |
| cloud_storage_path | String | Unique, required |
| isPublic | Boolean | Default false |
| contentType | String | Required |
| fileSize | Integer | Nullable |
| createdAt | DateTime | Auto |

## Relationships Summary
- User 1:1 Teacher (via Teacher.userId)
- Teacher M:N Class (via TeacherAssignment)
- Student M:N Class (via ClassEnrollment)
- Class 1:N ClassSession
- ClassSession 1:N StudentAttendance
- ClassSession 1:N TeacherAttendance
- ClassSession 1:N Feedback
- ClassSession 1:N StudentProgress
- Class 1:N ProgressMetric
- AcademicYear 1:N Term
- AcademicYear 1:N ClassSession
- Student 1:N ReportCard
- Student 1:N StudentClassHistory
- File referenced by: Teacher.photoFileId, Student.photoFileId, ReportCard.pdfFileId
