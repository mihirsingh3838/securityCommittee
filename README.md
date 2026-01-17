# Security Committee - Pocket A, Sector 37

A modern, responsive web application for managing security committee information, announcements, payments, and occupant details for Pocket A, Sector 37, Faridabad.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Routing**: React Router DOM

## 📋 Features

- **Quick Access**: Easy navigation to balance sheets, payment history, occupant details, and more
- **Announcements**: Important community announcements and notices
- **Committee Members**: Directory of all committee members with contact information
- **Guard Details**: Contact information for day and night shift guards
- **Payment History**: Searchable payment records by house number, name, or mobile
- **Balance Sheet**: Financial overview with income, expenses, and balance tracking
- **Occupant Details**: Current residents with move-in dates and contact information
- **Suggestion Form**: Community feedback submission system
- **Responsive Design**: Fully responsive UI that works on all devices

## 🛠️ Installation

### Prerequisites

- Node.js (v20 or higher recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/security-committee
JWT_SECRET=your-secret-key-here
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, update this to your backend URL:
```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (or another port if 3000 is occupied)

## 📁 Project Structure

```
securityCommittee/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── models/                # Mongoose models
│   │   ├── Announcement.js
│   │   ├── Guard.js
│   │   ├── Member.js
│   │   ├── Occupant.js
│   │   ├── Payment.js
│   │   └── Suggestion.js
│   ├── routes/                # API routes
│   │   ├── announcements.js
│   │   ├── guards.js
│   │   ├── members.js
│   │   ├── occupants.js
│   │   ├── payments.js
│   │   └── suggestions.js
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Announcements.jsx
│   │   │   ├── CommitteeMembers.jsx
│   │   │   ├── GuardDetails.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── QuickAccess.jsx
│   │   │   ├── SuggestionForm.jsx
│   │   │   └── Updates.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── BalanceSheet.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── OccupantDetails.jsx
│   │   │   └── PaymentHistory.jsx
│   │   ├── App.jsx            # Main App component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles with Tailwind
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json
└── README.md
```

## 🎨 UI Features

- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Gradient Cards**: Beautiful gradient cards for quick access links
- **Responsive Tables**: Mobile-friendly tables with horizontal scroll
- **Color-Coded Badges**: Visual indicators for payment types and designations
- **Loading States**: Smooth loading animations
- **Hover Effects**: Interactive hover states for better UX
- **Mobile Menu**: Collapsible navigation menu for mobile devices

## 🔌 API Endpoints

### Members
- `GET /api/members` - Get all committee members
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create a new announcement
- `PUT /api/announcements/:id` - Update an announcement
- `DELETE /api/announcements/:id` - Delete an announcement

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create a new payment record
- `PUT /api/payments/:id` - Update a payment record
- `DELETE /api/payments/:id` - Delete a payment record

### Occupants
- `GET /api/occupants` - Get all occupants
- `POST /api/occupants` - Create a new occupant record
- `PUT /api/occupants/:id` - Update an occupant record
- `DELETE /api/occupants/:id` - Delete an occupant record

### Guards
- `GET /api/guards` - Get all guard details
- `POST /api/guards` - Create a new guard record
- `PUT /api/guards/:id` - Update a guard record
- `DELETE /api/guards/:id` - Delete a guard record

### Suggestions
- `GET /api/suggestions` - Get all suggestions
- `POST /api/suggestions` - Submit a new suggestion

## 🚀 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud)
3. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment

1. Build the production bundle:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 📝 Notes

- The application includes default data that displays when the API is not connected
- All components are responsive and mobile-friendly
- The UI uses modern Tailwind CSS for styling
- API calls include error handling with fallback to default data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for internal use by the Security Committee, Pocket A, Sector 37.

## 👥 Committee Information

**Term**: 12 October 2025 – 11 October 2028

For any queries or suggestions, please use the suggestion form on the website or contact the committee members.
