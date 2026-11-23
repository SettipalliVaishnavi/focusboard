# FocusBoard – Task Management Dashboard

A modern, responsive task management dashboard built using React.js and Vite. FocusBoard helps users organize daily activities, manage tasks, track progress, and improve productivity through a simple and user-friendly interface.

## Project Overview

FocusBoard is a frontend task management application that allows users to create, edit, delete, search, filter, and track tasks.

The application provides a dashboard with task statistics, priority indicators, status management, and Focus Notes to help users stay organized.

Task information is stored in browser localStorage, so data remains available after refreshing the page.

## Features

### 1. Dashboard Overview
- Display total number of tasks.
- Display tasks currently in progress.
- Display completed tasks.
- Calculate overall task completion percentage.
- Update statistics dynamically when tasks change.

### 2. Task Management (CRUD)
- Create new tasks.
- Edit existing tasks.
- Delete tasks with confirmation.
- Update task details.
- Set task due dates.

### 3. Task Status Management

Tasks can have three statuses:
- To do
- In progress
- Completed

### 4. Priority Management

Each task can have one of three priority levels:
- Low
- Medium
- High

### 5. Search and Filtering
- Search tasks by title.
- Case-insensitive search.
- Filter tasks by status.
- Filter tasks by priority.
- Apply status and priority filters together.
- Display an empty state when no tasks match.

### 6. Focus Notes Carousel
- Three Focus Notes slides.
- Previous and Next navigation.
- Individual slide indicators.
- Productivity tips and reminders.

### 7. Local Storage
- Save task information in browser localStorage.
- Automatically restore saved tasks.
- Preserve task information after refreshing the browser.
- Load sample tasks when no saved task data exists.

### 8. Responsive Design
- Desktop layout.
- Tablet layout.
- Mobile layout.
- Responsive navigation and task cards.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | User interface development |
| JavaScript | Application functionality |
| Vite | Development server and build tool |
| CSS3 | Styling and responsive design |
| React Hooks | State and lifecycle management |
| localStorage | Browser-based data persistence |
| Lucide React | Icons |

## Project Structure

```text
focusboard/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── FilterTabs.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   │
│   ├── data/
│   │   └── sampleTasks.js
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── screenshots/
│
├── AI_USAGE.md