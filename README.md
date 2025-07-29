# 📝 Advanced To-Do List App

A modern, feature-rich to-do list application with priority management, due dates, dark/light theme toggle, and responsive design.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with a simple form
- ✅ **Mark Complete** - Toggle tasks as done/undone with checkboxes
- ✅ **Edit Tasks** - Double-click any task to edit inline
- ✅ **Delete Tasks** - Edit a task to blank and it will be removed
- ✅ **Persistent Done State** - Completed tasks remain visible with strikethrough

### Advanced Features
- 🎯 **Priority Levels** - Set Low, Medium, or High priority with color-coded badges
- 📅 **Due Dates** - Add due dates with overdue highlighting
- 🌙 **Theme Toggle** - Switch between light and dark themes (saves preference)
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✏️ **In-place Editing** - Double-click to edit tasks without losing context
- 📋 **Multiple Lists** - Create and manage separate lists for different projects
- 🔄 **List Switching** - Quickly switch between different task lists
- 🗑️ **List Management** - Add new lists and delete unwanted ones

## 🎨 Design Features

### Visual Elements
- **Custom Handwritten Font** - Gochi Hand for a personal touch
- **Color-coded Priority Badges** - Green (Low), Yellow (Medium), Red (High)
- **Compact Date Display** - Shows dates as "25 / July" format
- **Overdue Highlighting** - Past due dates are highlighted in red
- **Smooth Animations** - Hover effects and transitions throughout
- **List Tabs Interface** - Easy-to-use tabs for switching between lists
- **List Management Controls** - Clean input and button design for adding lists

### Theme Support
- **Light Theme** - Purple gradient background with light container
- **Dark Theme** - Dark purple background with matching UI elements
- **Persistent Storage** - Theme preference saved in localStorage

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `To-Do-List.html` in your web browser
3. **Start Adding Tasks** - Type in the input field and click Submit

## 📱 Responsive Breakpoints

- **Mobile (≤480px)** - Compact layout, full-width inputs, smaller badges
- **Tablet (500px-768px)** - Standard layout with optimized spacing
- **Desktop (≥768px)** - Full-width container with larger elements

## 🎯 Usage Guide

### Adding Tasks
1. Select the list you want to add the task to (or stay on Main List)
2. Type your task in the main input field
3. Select priority (Low/Medium/High)
4. Optionally set a due date
5. Click "Submit" button

### Managing Lists
- **Create New List**: Type a name in "New list name..." field and click "+ Add List" or press Enter
- **Switch Lists**: Click on any list tab to switch to that list
- **Delete Lists**: Click the "×" button on any list tab (Main List cannot be deleted)
- **Organize Tasks**: Each list maintains its own separate tasks

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Double-click on task text to edit inline
- **Delete**: Edit a task to be completely blank to remove it
- **Theme**: Click the moon/sun icon in the top-right corner

### Keyboard Shortcuts
- **Enter** - Submit new task, finish editing, or create new list
- **Double-click** - Start editing a task
- **Escape/Click outside** - Cancel editing
- **Tab Navigation** - Navigate between form elements and list tabs

## 🛠️ Technical Stack

- **HTML5** - Semantic structure with form elements
- **CSS3** - Custom styling, flexbox, grid, animations, media queries
- **Vanilla JavaScript** - ES6+ features, localStorage, DOM manipulation
- **Google Fonts** - Gochi Hand cursive font
- **Responsive Design** - Mobile-first approach

## 📂 File Structure

```
To-Do-List/
├── To-Do-List.html    # Main HTML file
├── styles.css         # All CSS styling and themes
├── script.js          # JavaScript functionality
└── README.md          # This documentation
```

## 🔧 Customization

### Colors
- **Primary Purple**: `#a39bd2`
- **Accent Blue**: `#24bffb`
- **Priority Colors**: Green `#6bcf63`, Yellow `#f7b731`, Red `#eb3b5a`
- **Dark Theme**: `#1a1625` background, `#2d2438` containers

### Fonts
- **Main Font**: Gochi Hand (Google Fonts)
- **Fallback**: Cursive system fonts

## 🌟 Future Enhancements

Potential features that could be added:
- Task categories/tags within lists
- Drag-and-drop reordering of tasks and lists
- Task counters (total, completed, remaining) per list
- Clear completed tasks button for each list
- Export/import functionality for individual lists
- Search and filter options across all lists
- Recurring tasks
- List templates and sharing
- Cloud sync for multiple lists
- Task dependencies between lists

## 🐛 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with modern web technologies and best practices:
- Semantic HTML
- CSS Grid and Flexbox
- ES6 Modules (IIFE pattern)
- LocalStorage for theme persistence
- Event delegation for dynamic content
- Responsive design principles
- Multiple list state management
- Dynamic DOM manipulation for list tabs

---

**Enjoy staying organized with your new to-do list! 🎉**
