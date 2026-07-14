# UX Specification — Pasar Baru Gurmukhi & Kirtan Class

## Design Direction

### Theme & Colors
- **Light theme** with warm, welcoming Sikh-inspired aesthetics
- Primary: Deep Saffron `#FF6B00`
- Secondary: Royal Blue `#1A237E`
- Accent/Gold: `#FFB300`
- Background: Warm off-white `#FFF8F0`
- Surface/Cards: `#FFFFFF` with subtle warm shadow
- Text Primary: `#1A1A2E`
- Text Secondary: `#5A5A6E`
- Success: `#2E7D32`, Error: `#D32F2F`, Warning: `#F57C00`
- Status chips: Present `#2E7D32`, Absent `#D32F2F`, Late `#F57C00`, Excused `#1565C0`

### Typography
- Display/Headings: **Poppins** (Google Fonts) — 600/700 weight
- Body: **Nunito** (Google Fonts) — 400/600 weight
- Scale: Display 32px → H1 24px → H2 20px → Body 16px → Caption 13px

### Design Language
- Inspired by Little Lives / ClassDojo: rounded, friendly, card-based
- Cards: rounded 16px, white with `elevation: 2`, subtle warm shadow
- Gradient buttons: linear-gradient `[#FF6B00, #FF8F00]` for primary actions
- Royal blue used for secondary buttons, nav highlights, headers
- Gold `#FFB300` for badges, stars, achievement indicators
- Avatar circles with saffron border ring for students, blue for teachers
- Top app bar: white background with saffron accent line

### Spacing & Layout
- 8pt grid system
- Border radius: sm 8, md 12, lg 16, xl 24
- Card padding: 16px, screen padding: 16px horizontal
- Touch targets: minimum 44pt

## Animation & Motion
- Screen transitions: horizontal slide for stack pushes, fade for tab switches
- Button press: scale 0.97 spring + light haptic
- List items: staggered fade-in on mount
- Loading: skeleton shimmer placeholders (saffron-tinted)
- Attendance marking: checkmark scale-in animation with haptic
- Charts: animated draw-in on mount
- Pull-to-refresh on all list screens
- Respect reduced motion preferences

## Component Standards
- **Buttons**: Gradient fill (saffron), press animation, loading spinner state, disabled opacity 0.5
- **Inputs**: Outlined style, floating labels, saffron focus border, error shake + red border
- **Cards**: White, rounded 16px, subtle shadow, press animation for tappable cards
- **Avatars**: expo-image with blurhash, circular, saffron border for students, blue for teachers, fallback initials
- **Lists**: @shopify/flash-list for student/class lists, pull-to-refresh
- **Empty states**: Friendly illustration placeholder + descriptive text + CTA button
- **Status chips**: Rounded pill with colored background + white text
- **Accessibility**: Contrast ≥ 4.5:1, accessible labels on all interactive elements, 44pt touch targets

## Screens

### File Structure
```
app/
  _layout.tsx              # Root layout: AuthProvider wrapper, font loading
  auth/
    _layout.tsx            # If authenticated → <Redirect href="/tabs" />
    login.tsx              # Login screen
  tabs/
    _layout.tsx            # If !authenticated → <Redirect href="/auth/login" />; <Tabs> with 5 tabs
    index.tsx              # Dashboard tab
    students.tsx           # Students list tab
    classes.tsx            # Classes list tab
    attendance.tsx         # Attendance tab
    more.tsx               # More/Settings tab
  student/
    [studentId]/
      index.tsx            # Student detail
      edit.tsx             # Edit student
      progress.tsx         # Student progress view with charts
      report-cards.tsx     # Student report cards list
  class/
    [classId]/
      index.tsx            # Class detail
      session/
        [sessionId]/
          index.tsx        # Session detail — mark attendance + feedback
  teacher/
    [teacherId]/
      index.tsx            # Teacher detail/profile
      edit.tsx             # Edit teacher
  add-student.tsx          # Add new student
  add-teacher.tsx          # Add new teacher (admin only)
  add-session.tsx          # Create class session
  add-progress.tsx         # Add progress entry
  academic-years.tsx       # Manage academic years (admin)
  terms.tsx                # Manage terms (admin)
  metrics.tsx              # Manage progress metrics (admin)
  generate-report.tsx      # Generate report card form
  profile.tsx              # Current user profile + logout
```

### 1. Login Screen (`app/auth/login.tsx`)
- **Purpose**: Email/password authentication
- **Layout**: Centered card on warm background
  - School logo/name "Pasar Baru Gurmukhi & Kirtan Class" in Poppins 600, saffron color
  - Khanda icon or decorative Sikh motif above title
  - Email input (floating label, keyboard type email)
  - Password input (floating label, secure entry, show/hide toggle)
  - "Log In" gradient button (saffron), full width
  - Error banner below button if login fails
- **Actions**: Tap Log In → calls `login()` on AuthProvider; on success AuthProvider state updates, layout guard redirects to tabs

### 2. Dashboard (`app/tabs/index.tsx`)
- **Purpose**: Role-aware overview
- **Tab icon**: Home icon, label "Home"
- **Admin View**:
  - Header: "Welcome, {name}" + current academic year badge
  - Stats row (horizontal scroll): Total Students, Total Teachers, Active Classes, Today's Sessions — each in a colored card
  - "Pending Attendance" section: list of today's sessions where attendance hasn't been submitted, each card shows class name + time + red "Not Submitted" chip. Tap → push to session detail
  - "Quick Actions" grid: Add Student, Add Session, Generate Report, Manage Years — 2×2 icon buttons
  - "Recent Feedback" section: last 5 feedback entries as compact cards
- **Teacher View**:
  - Header: "Welcome, {name}"
  - "My Classes Today" section: cards for each class the teacher is assigned to that has a session today. Each shows class name, time, student count, attendance status chip. Tap → push to session detail
  - "Quick Actions": Mark Attendance, Add Feedback
  - "My Recent Feedback": last 5 feedback entries by this teacher
- **Data needed**: GET /api/dashboard (role-aware response)

### 3. Students List (`app/tabs/students.tsx`)
- **Tab icon**: People icon, label "Students"
- **Layout**:
  - Search bar at top (filter by name)
  - Filter chips: by class (horizontal scroll)
  - Student cards in FlashList: avatar (photo or initials), name, parent name, enrolled classes as small chips, age
  - FAB "+" button (bottom right) → push to add-student
- **Actions**: Tap student card → push to student detail; Tap FAB → push to add-student
- **Teacher role**: sees only students in their assigned classes; no FAB (teachers cannot add students)
- **Data**: GET /api/students?search=&classId=&page=&limit=

### 4. Student Detail (`app/student/[studentId]/index.tsx`)
- **Purpose**: Complete student profile and history
- **Layout**:
  - Hero section: large avatar, name, age (auto-calculated from DOB), parent name, contact number, DOB
  - Edit button (pencil icon) in header → push to edit screen (admin only)
  - Tabbed sections below (horizontal tab bar, not nested navigator):
    - **Classes**: enrolled classes list with enrollment date and status chip (ACTIVE/COMPLETED/WITHDRAWN). Each tappable → push to class detail
    - **Attendance**: overall attendance percentage donut chart + per-class breakdown bars. Recent attendance list (date, class, status chip)
    - **Progress**: per-metric progress cards with sparkline charts. Tap → push to student progress screen
    - **Feedback**: chronological list of feedback about this student. Each shows date, class, teacher name, content
    - **History**: timeline of class movements (enrolled, promoted, graduated) with dates and academic years
  - "Report Cards" button at bottom → push to student report-cards screen
- **Data**: GET /api/students/:id (full profile + enrollments + attendance summary + progress + feedback + history)

### 5. Edit Student (`app/student/[studentId]/edit.tsx`)
- **Purpose**: Edit student profile
- **Layout**: Form with pre-filled fields: photo (tap to change via image picker → upload flow), name, parent name, DOB (date picker), contact number
- **Actions**: Save → PATCH /api/students/:id; photo change triggers presigned upload flow
- **Admin only**

### 6. Add Student (`app/add-student.tsx`)
- **Purpose**: Create new student
- **Layout**: Form: photo upload (optional), name (required), parent name (required), DOB (required, date picker), contact number (required)
- **After save**: also shows class enrollment picker — multi-select from available classes
- **Actions**: Submit → POST /api/students (creates student + enrollments)
- **Admin only**

### 7. Classes List (`app/tabs/classes.tsx`)
- **Tab icon**: Book icon, label "Classes"
- **Layout**:
  - Cards grouped by grade (Nursery, 1, 2, 3, 4, 5, 6, Special) with section headers
  - Each card: class name, grade badge, student count, teacher names, next session date
  - No add class — classes are seeded
- **Teacher role**: sees only assigned classes
- **Actions**: Tap class → push to class detail
- **Data**: GET /api/classes

### 8. Class Detail (`app/class/[classId]/index.tsx`)
- **Purpose**: Class overview and session management
- **Layout**:
  - Header: class name, grade badge, description
  - **Teachers** section: horizontal avatar row of assigned teachers
  - **Students** section: list of enrolled students with avatars. Tap → push to student detail
  - **Sessions** section: list of class sessions (date, attendance status — submitted/pending). Tap → push to session detail
  - **Metrics** section: list of progress metrics defined for this class
  - FAB "+" → push to add-session (to create a new session for this class)
- **Admin extras**: "Manage Enrollments" button (add/remove students), "Assign Teachers" button
- **Data**: GET /api/classes/:id

### 9. Session Detail / Mark Attendance (`app/class/[classId]/session/[sessionId]/index.tsx`)
- **Purpose**: Mark attendance + add feedback for a session
- **Layout**:
  - Header: class name, session date
  - **Student Attendance List**: each row shows student avatar + name + 4 status buttons (Present ✓, Absent ✗, Late ⏰, Excused 📋). Tapping a button highlights it with color + haptic. Default unset.
  - **Teacher Attendance** section (admin only): similar row for each assigned teacher
  - "Save Attendance" gradient button — bulk saves all attendance
  - **Feedback Section** below:
    - "Add Class Note" button → expands inline text area for general feedback
    - "Add Student Note" → shows student picker dropdown + text area
    - Existing feedback listed below with teacher name, type chip, content
  - **Progress Entry** section: "Add Progress" button → push to add-progress screen pre-filled with this session
- **Actions**: Save attendance → POST /api/attendance/bulk; Add feedback → POST /api/feedback
- **Data**: GET /api/sessions/:id (students, existing attendance, feedback, teacher attendance)

### 10. Attendance Tab (`app/tabs/attendance.tsx`)
- **Tab icon**: Checkmark-calendar icon, label "Attendance"
- **Purpose**: Quick attendance overview and history
- **Layout**:
  - Class selector dropdown at top
  - Calendar view (month) showing dots on session dates (green = submitted, red = pending)
  - Tap a date with session → push to session detail
  - Below calendar: attendance statistics for selected class — overall %, per-student breakdown table
- **Teacher role**: dropdown shows only assigned classes
- **Data**: GET /api/attendance/overview?classId=&month=&year=

### 11. More Tab (`app/tabs/more.tsx`)
- **Tab icon**: Menu/grid icon, label "More"
- **Purpose**: Settings, admin functions, profile
- **Layout**: Section list
  - **My Profile**: tap → push to profile screen
  - **Admin Section** (admin only):
    - Teachers: tap → shows teacher list (inline or push). Each teacher card: avatar, name, classes. Tap → push to teacher detail. "+" button → push to add-teacher
    - Academic Years: tap → push to academic-years screen
    - Terms: tap → push to terms screen
    - Progress Metrics: tap → push to metrics screen
    - Reports: tap → push to generate-report screen
  - **Log Out** button (red text) at bottom → calls `logout()` on AuthProvider; state updates, layout guard redirects to auth

### 12. Profile Screen (`app/profile.tsx`)
- **Purpose**: View/edit current user profile
- **Layout**: If user is a teacher, shows teacher profile (photo, name, DOB, contact, assigned classes). Edit button for own profile. If admin, shows name + email + role badge.
- **Log Out** button also present here

### 13. Teacher Detail (`app/teacher/[teacherId]/index.tsx`)
- **Purpose**: View teacher profile
- **Layout**: Avatar, name, age, DOB, contact, assigned classes list, attendance history
- Edit button → push to edit teacher (admin only)
- **Data**: GET /api/teachers/:id

### 14. Edit Teacher (`app/teacher/[teacherId]/edit.tsx`)
- Form: photo, name, DOB, contact. Save → PATCH /api/teachers/:id
- Admin only

### 15. Add Teacher (`app/add-teacher.tsx`)
- Form: email (for user account), password, name, DOB, contact, photo (optional), class assignments (multi-select)
- Creates User (role TEACHER) + Teacher profile + assignments
- POST /api/teachers
- Admin only

### 16. Student Progress (`app/student/[studentId]/progress.tsx`)
- **Purpose**: Detailed progress view with charts
- **Layout**:
  - Class selector (if enrolled in multiple)
  - For each metric in selected class: line chart showing values over time (x = session dates, y = value)
  - Below charts: table of all progress entries (date, metric, value, notes)
- **Data**: GET /api/progress?studentId=&classId=

### 17. Add Progress (`app/add-progress.tsx`)
- **Purpose**: Record progress entry
- **Layout**: Form — student picker, class picker (filtered to student's classes), session picker, metric picker (filtered to class metrics), value input (number), notes (optional)
- Pre-filled if navigated from session detail
- POST /api/progress

### 18. Academic Years (`app/academic-years.tsx`)
- **Purpose**: CRUD academic years
- **Layout**: List of years with name, dates, active badge. Add form (inline expandable): name, start date, end date. Tap to set active. Only one active at a time.
- POST /api/academic-years, PATCH /api/academic-years/:id, GET /api/academic-years
- Admin only

### 19. Terms (`app/terms.tsx`)
- **Purpose**: Manage terms within active academic year
- **Layout**: Academic year selector, list of terms. Add form: name, start date, end date.
- POST /api/terms, GET /api/terms?academicYearId=
- Admin only

### 20. Metrics (`app/metrics.tsx`)
- **Purpose**: Manage progress metrics per class
- **Layout**: Class selector, list of metrics (name, type badge). Add form: name, description, type (SCORE/LEVEL/RATING).
- POST /api/metrics, GET /api/metrics?classId=
- Admin only

### 21. Generate Report (`app/generate-report.tsx`)
- **Purpose**: Generate report cards
- **Layout**: Student picker (searchable), academic year selector, term selector. "Generate Report Card" button.
- On generate: POST /api/report-cards/generate → returns report card with PDF. Shows download/share buttons.
- Admin only

### 22. Student Report Cards (`app/student/[studentId]/report-cards.tsx`)
- **Purpose**: List of generated report cards for a student
- **Layout**: List of report cards with term name, generated date. Tap → download PDF (GET /api/report-cards/:id/download) and open share sheet.
- **Data**: GET /api/report-cards?studentId=

## Navigation

### Unauthenticated Flow
- `app/auth/_layout.tsx`: if `isLoading` → splash; if `isAuthenticated` → `<Redirect href="/tabs" />`; else render `<Stack>`
- Only screen: Login

### Authenticated Flow
- `app/tabs/_layout.tsx`: if `isLoading` → splash; if `!isAuthenticated` → `<Redirect href="/auth/login" />`; else render `<Tabs>` with 5 tabs:
  1. Home (index) — Home icon
  2. Students — People icon
  3. Classes — Book icon
  4. Attendance — Calendar-check icon
  5. More — Menu icon
- All non-tab screens are stack-pushed from tab screens
- Role-based visibility: Teacher role hides admin-only buttons/sections but routes are also guarded on backend

### Auth State Transitions
- Login: user taps Log In → `login()` updates AuthProvider state → layout guard in `auth/_layout.tsx` detects `isAuthenticated=true` → `<Redirect href="/tabs" />`
- Logout: user taps Log Out → `logout()` clears state → layout guard in `tabs/_layout.tsx` detects `!isAuthenticated` → `<Redirect href="/auth/login" />`
