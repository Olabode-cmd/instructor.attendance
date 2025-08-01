# Instructor Attendance Management System

A comprehensive web application built with Next.js for instructors to manage classes, track student attendance, log assignments, and monitor performance insights. This NextJs monolithic application provides a robust solution for educational institutions and individual instructors.

## Features

- **Secure Authentication**: PIN-based login with security questions for account recovery
- **Class Management**: Create, edit, delete, and archive classes with scheduling
- **Student Management**: Add students with detailed profiles and multi-class assignments
- **Attendance Tracking**: Daily attendance with Present/Late/Absent status and notes
- **Assignment Tracking**: Log assignments, submissions, and grades
- **Performance Analytics**: Attendance rates, completion metrics, and automated alerts
- **Calendar View**: Visual overview of classes and activities
- **Export Functionality**: Generate Excel/CSV reports for attendance and performance data
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Font**: Bricolage Grotesque from Google Fonts
- **Database**: SQLite (planned)
- **Authentication**: Local PIN-based system
- **State Management**: React hooks with localStorage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Contributing

I welcome contributions from developers at Digital Fortress, NIIT Fortesoft and the entire JavaScript community! This is an open-source project aimed at helping educators manage their classes more effectively.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/instructor-attendance.git
   cd instructor-attendance
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Make Your Changes**
   - Follow the existing code style and conventions
   - Write clear, concise commit messages
   - Add tests for new features when applicable
   - Update documentation as needed

5. **Test Your Changes**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

6. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request with a clear description
   - Reference any related issues
   - Wait for review and address feedback

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Commits**: Use conventional commit messages (feat:, fix:, docs:, etc.)
- **Issues**: Check existing issues before creating new ones
- **Documentation**: Update README and inline comments for significant changes
- **Testing**: Ensure your changes don't break existing functionality

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔧 Performance optimizations
- 🌐 Internationalization support
- 📱 Mobile responsiveness improvements

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main application pages
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
├── data/              # JSON data files
└── lib/               # Utility functions
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the existing [Issues](https://github.com/yourusername/instructor-attendance/issues)
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ for educators worldwide**
