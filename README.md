# 🎓 GCP Cohort IIITA Stats

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

A modern web application to track and display Google Cloud Platform (GCP) cohort statistics for IIIT Allahabad students.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Usage](#-usage)

</div>

---

## 📋 Overview

**GCP Cohort IIITA Stats** is a sleek, user-friendly dashboard that allows students to look up their progress in the Google Cloud Platform learning program. By simply entering their email address, users can view their completion statistics, earned badges, and overall performance metrics.

## ✨ Features

- 🔍 **Email-based Lookup** - Quick search functionality to retrieve student data
- 📊 **Progress Tracking** - Visual representation of skill badges and arcade games completion
- 🏆 **Badge Display** - Showcase of earned Google Cloud badges
- 📱 **Responsive Design** - Seamless experience across all devices
- ⚡ **Real-time Data** - Live statistics fetched from Supabase backend
- 🎨 **Modern UI** - Clean and intuitive interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library for building interactive interfaces
- **Vite 5.0.8** - Next-generation frontend build tool for blazing fast development
- **CSS3** - Custom styling with modern design patterns

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database
  - Edge Functions for serverless API endpoints
  - Real-time data synchronization

### Build Tools & Dependencies
- **@vitejs/plugin-react** - Official Vite plugin for React
- **@supabase/supabase-js** - Supabase JavaScript client library

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rndastech/TestApp.git
   cd "GCP Cohort"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application

## 📖 Usage

1. Enter your email address in the search field
2. Click the search button or press Enter
3. View your GCP learning statistics, including:
   - Number of skill badges completed
   - Number of arcade games completed
   - Progress percentages
   - Earned badges list
   - Completion status


## 🎯 Project Structure

```
GCP Cohort/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is created for the GCP Cohort program at IIIT Allahabad.

## 👨‍💻 Author

**Ritesh N Das**
- GitHub: [@rndastech](https://github.com/rndastech)

---

<div align="center">

Made with ❤️ for GCP Cohort IIIT Allahabad

⭐ Star this repo if you find it helpful!

</div>
