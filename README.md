# HRMS Lite - Frontend

Modern React-based frontend for the HRMS Lite application built with React 18, React Router, Vite, and Axios.

## 📋 Project Overview

The HRMS Lite Frontend is a single-page application (SPA) that provides a user-friendly interface for managing employees and tracking attendance. It serves as the client-side of the HRMS Lite system, communicating with the backend API to perform all data operations.

### Key Features

- **Employee Management Interface**: Add, view, and delete employees with form validation
- **Attendance Tracking Interface**: Mark attendance and filter records by employee and date range
- **Dashboard Analytics**: View summary statistics and employee attendance overviews
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with loading states, error handling, and empty states
- **Client-Side Routing**: Seamless navigation between pages using React Router
- **Real-Time Updates**: Automatic data refresh after create/update/delete operations
- **Modular Architecture**: Reusable components and service layer for maintainability

### Pages

- **Dashboard** (`/`) - Overview with statistics and employee summaries
- **Employees** (`/employees`) - Employee management with CRUD operations
- **Attendance** (`/attendance`) - Attendance tracking with filtering capabilities

## 🛠️ Tech Stack

- **React 18** - Modern UI library with hooks and functional components
- **React Router DOM** - Client-side routing for single-page application navigation
- **Vite** - Fast build tool and development server with hot module replacement
- **Axios** - HTTP client library for making API requests to the backend
- **React Icons** - Icon library providing a wide range of icons for UI elements
- **CSS3** - Custom styling with CSS variables for theming and responsive design

## 🚀 Steps to Run the Project Locally

### Prerequisites

Before starting, ensure you have:
- **Node.js** (v18 or higher) installed
- **npm** or **yarn** package manager
- **Backend API running** (see [Backend README](../backend/README.md))

### Step 1: Clone and Navigate to Frontend

```bash
# If cloning the entire repository
git clone <repository-url>
cd quess-corps-hrms/frontend

# Or if already in the project root
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the frontend root directory:

```bash
touch .env
```

Edit the `.env` file and add:

```env
VITE_API_URL=http://localhost:5000/api
```

**For Production:**
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

**Note:** 
- The `.env` file is already in `.gitignore` and won't be committed to version control
- Use `.env.example` as a template
- Environment variables must be prefixed with `VITE_` to be accessible in the app

### Step 4: Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the next available port).

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:3000`

You should see the HRMS Lite dashboard. Make sure the backend API is running on `http://localhost:5000` for the frontend to function properly.

### Quick Start Commands Summary

```bash
# Install dependencies
npm install

# Set up .env file with VITE_API_URL (optional, defaults to localhost:5000/api)
# Then run:
npm run dev
```

### Additional Commands

**Build for Production:**
```bash
npm run build
```
This creates an optimized production build in the `dist/` directory.

**Preview Production Build:**
```bash
npm run preview
```
This serves the production build locally for testing.

## 📝 Assumptions & Limitations

### Assumptions

1. **Backend API Availability**: The frontend assumes the backend API is running and accessible at the URL specified in `VITE_API_URL` (defaults to `http://localhost:5000/api`)

2. **No Authentication Required**: The frontend assumes no authentication system. All API endpoints are publicly accessible (suitable for development/internal use only)

3. **Browser Compatibility**: The application assumes modern browser support for ES6+ features, CSS Grid, and Flexbox

4. **JavaScript Enabled**: The application requires JavaScript to be enabled in the browser (no server-side rendering or static fallback)

5. **API Response Format**: The frontend assumes consistent API response formats from the backend (success responses with data, error responses with error messages)

6. **Single User Session**: The application is designed for single-user sessions with no concurrent user management or real-time collaboration features

7. **Client-Side State Only**: All state management is done client-side using React hooks. No global state management library (Redux, Zustand, etc.)

8. **No Offline Support**: The application requires an active internet connection and cannot function offline

9. **No Data Persistence**: No local storage or caching of data. All data is fetched from the API on each page load

10. **Date Handling**: Date inputs and displays assume the user's local timezone. No timezone conversion is performed

### Limitations

1. **No Authentication/Authorization**: There is no user authentication, login system, or role-based access control. Anyone with access to the URL can use all features

2. **No Form Persistence**: Form data is not saved if the user navigates away or refreshes the page before submission

3. **No Optimistic Updates**: All UI updates wait for API responses. No optimistic UI updates for better perceived performance

4. **No Pagination**: List views (employees, attendance) display all records without pagination, which may cause performance issues with large datasets

5. **No Search Functionality**: No search or filter capabilities beyond the basic attendance filters (employee, date range)

6. **No Sorting**: Results are displayed in default order with no sorting options

7. **No Bulk Operations**: No ability to select and perform bulk actions on multiple records

8. **No Data Export**: No functionality to export employee or attendance data to CSV/Excel formats

9. **No Print Support**: No print-friendly views or print functionality

10. **No Keyboard Shortcuts**: No keyboard shortcuts for common actions

11. **Limited Error Recovery**: Basic error handling with user-friendly messages, but no automatic retry mechanisms or advanced error recovery

12. **No Loading Skeletons**: Loading states use spinners instead of skeleton screens for better perceived performance

13. **No Caching**: All API calls are made fresh on each page load/component mount. No caching strategy implemented

14. **No Request Debouncing**: Search/filter inputs don't debounce API requests, which may cause unnecessary API calls

15. **No Image Upload**: No support for employee profile pictures or document uploads

16. **No Real-Time Updates**: No WebSocket or polling for real-time data updates. Users must refresh to see changes made by others

17. **No Accessibility Features**: Limited accessibility features. No screen reader optimization, keyboard navigation, or ARIA labels

18. **No Internationalization**: Application is in English only with no multi-language support

19. **No Dark Mode**: No dark mode or theme switching functionality

20. **No Data Validation Feedback**: Client-side validation exists but may not cover all edge cases. Relies heavily on backend validation

### Future Enhancements

For production use, consider adding:
- User authentication and authorization (JWT, OAuth)
- Role-based access control (Admin, HR, Employee views)
- Form persistence and auto-save
- Optimistic UI updates
- Pagination and infinite scroll
- Advanced search and filtering
- Sorting and column customization
- Bulk operations
- Data export (CSV, Excel, PDF)
- Print-friendly views
- Keyboard shortcuts
- Advanced error recovery and retry mechanisms
- Loading skeletons
- Caching strategy (React Query, SWR)
- Request debouncing and throttling
- Image upload and file handling
- Real-time updates (WebSocket, Server-Sent Events)
- Accessibility improvements (ARIA, keyboard navigation)
- Internationalization (i18n)
- Dark mode and theme switching
- Comprehensive client-side validation
- Unit and integration testing (Jest, React Testing Library)
- E2E testing (Cypress, Playwright)
- Performance monitoring and analytics
- Error tracking (Sentry)
- Progressive Web App (PWA) features

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

## 🔌 API Integration

The frontend communicates with the backend API through service files:

- **Employee Service** - `getAll()`, `getById(id)`, `create(data)`, `delete(id)`
- **Attendance Service** - `getAll(params)`, `getByEmployee(employeeId, params)`, `mark(data)`, `getDashboardSummary()`

All API calls use the Axios instance configured in `services/api.js`, which reads the `VITE_API_URL` environment variable.

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

## 🔗 Related Documentation

- [Main Project README](../README.md)
- [Backend README](../backend/README.md)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

**Happy Coding! 🚀**
