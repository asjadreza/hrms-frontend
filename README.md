# HRMS Lite - Frontend

Modern React-based frontend for the HRMS Lite application built with React 18, React Router, Vite, and Axios.

## 🚀 Overview

This frontend provides a complete user interface for managing employees and attendance records. It features:
- Modern React 18 with hooks
- Client-side routing with React Router
- Responsive design with custom CSS
- Icon integration with React Icons
- RESTful API integration with Axios
- Modular component architecture
- Service layer for API calls

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS3** - Styling with custom variables

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see [Backend README](../backend/README.md))

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the frontend root directory:

```bash
touch .env
```

Add the following environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

**For Production:**
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

**Note:** The `.env` file is already in `.gitignore` and won't be committed to version control. Use `.env.example` as a template.

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button/          # Button component
│   │   ├── Card/            # Card component
│   │   ├── EmptyState/      # Empty state component
│   │   ├── ErrorMessage/    # Error message component
│   │   ├── FormField/       # Form input component
│   │   ├── Layout/          # Main layout with navigation
│   │   ├── Loading/         # Loading spinner component
│   │   └── Modal/           # Modal dialog component
│   ├── pages/               # Page components
│   │   ├── Dashboard/       # Dashboard page
│   │   ├── Employees/       # Employee management page
│   │   └── Attendance/      # Attendance management page
│   ├── services/            # API service layer
│   │   ├── api.js           # Axios instance configuration
│   │   ├── employee.service.js    # Employee API calls
│   │   └── attendance.service.js  # Attendance API calls
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables (create this)
├── .env.example             # Environment variables template
├── vite.config.js           # Vite configuration
├── package.json
└── README.md
```

## 🎨 Features & Pages

### Dashboard (`/`)

- Overview statistics:
  - Total Employees
- Attendance Summary:
  - Total Records
  - Present Count
  - Absent Count
- Employee Summary:
  - List of employees with attendance statistics
  - Quick access to employee details

### Employees (`/employees`)

- View all employees in a table
- Add new employees with form validation
- Delete employees with confirmation
- Real-time updates after operations
- Empty state when no employees exist

### Attendance (`/attendance`)

- View all attendance records
- Filter by:
  - Employee (dropdown)
  - Start Date
  - End Date
- Mark attendance for employees:
  - Select employee
  - Select date
  - Mark as Present or Absent
- Clear filters functionality
- Empty state when no records match filters

## 🧩 Components

### Button
Reusable button component with variants:
- `primary` - Primary action button
- `danger` - Destructive action button
- `secondary` - Secondary action button
- `outline` - Outlined button style

### Card
Container component for grouping related content.

### Modal
Dialog component for displaying forms and confirmations.

### FormField
Form input component with label and error display.

### Loading
Loading spinner component for async operations.

### EmptyState
Component displayed when no data is available.

### ErrorMessage
Component for displaying error messages.

### Layout
Main layout component with:
- Navigation sidebar
- Active route highlighting
- Responsive design

## 🔌 API Integration

The frontend communicates with the backend API through service files:

### API Configuration (`services/api.js`)

```javascript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
```

### Employee Service (`services/employee.service.js`)

- `getAll()` - Fetch all employees
- `getById(id)` - Fetch employee by ID
- `create(data)` - Create new employee
- `delete(id)` - Delete employee

### Attendance Service (`services/attendance.service.js`)

- `getAll(params)` - Fetch all attendance records with filters
- `getByEmployee(employeeId, params)` - Fetch attendance for specific employee
- `mark(data)` - Mark attendance
- `getDashboardSummary()` - Fetch dashboard statistics

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Environment Variables for Production

Set the following environment variable in your hosting platform:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

### Build & Deploy Commands

**Build:**
```bash
npm install && npm run build
```

**Deploy:**
Upload the `dist/` directory to your hosting platform.

### Recommended Platforms

- **Vercel** - Optimized for React/Vite, automatic deployments
- **Netlify** - Easy setup with continuous deployment
- **GitHub Pages** - Free hosting for static sites
- **Render** - Full-stack platform support

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy!

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy!

## 🎨 Styling

The application uses:
- **Custom CSS** with CSS variables for theming
- **CSS Modules** approach (component-specific CSS files)
- **Responsive design** with mobile-first approach

### CSS Variables

Defined in `src/index.css`:
- `--primary-color` - Primary brand color
- `--primary-hover` - Primary hover state
- `--danger-color` - Danger/error color
- `--background-color` - Background color
- `--text-color` - Primary text color
- `--border-color` - Border color
- `--shadow` - Box shadow
- And more...

## 🔄 State Management

The application uses React hooks for state management:
- `useState` - Local component state
- `useEffect` - Side effects and data fetching
- No global state management library (can be added if needed)

## 📱 Responsive Design

The application is fully responsive:
- **Desktop** - Full layout with sidebar navigation
- **Tablet** - Adjusted spacing and layout
- **Mobile** - Stacked layout, optimized for touch

## 🐛 Troubleshooting

### API Connection Issues

**Error: `Network Error` or `CORS Error`**

1. Verify your backend is running on the correct port
2. Check `VITE_API_URL` in `.env` matches your backend URL
3. Ensure backend CORS is configured to allow your frontend origin
4. Restart the dev server after changing `.env`

**Error: `404 Not Found` on API calls**

1. Verify `VITE_API_URL` includes `/api` at the end
2. Check that backend routes are prefixed with `/api`
3. Ensure backend server is running

### Build Issues

**Error: `Failed to resolve import`**

1. Run `npm install` to ensure all dependencies are installed
2. Check that import paths are correct (case-sensitive)
3. Verify file extensions in imports (`.jsx`, `.js`)

**Error: `Environment variable not found`**

1. Ensure `.env` file exists in the frontend root
2. Verify variable name starts with `VITE_`
3. Restart dev server after changing `.env`
4. For production builds, set environment variables in hosting platform

### Development Server Issues

**Port already in use**

Change the port in `vite.config.js`:
```javascript
server: {
  port: 3001, // or any available port
}
```

**Hot reload not working**

1. Clear browser cache
2. Restart the dev server
3. Check for syntax errors in console

## 📝 Notes

- The application uses ES modules (`type: "module"` in package.json)
- Environment variables must be prefixed with `VITE_` to be accessible in the app
- The Vite proxy in `vite.config.js` is optional and mainly helps with CORS during development
- All API calls go through the service layer for better organization
- Components are organized in folders with index.js for cleaner imports

## 🔗 Related Documentation

- [Main Project README](../README.md)
- [Backend README](../backend/README.md)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

**Happy Coding! 🚀**
