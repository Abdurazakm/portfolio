# 🚀 Abdurazak Mohammed - Portfolio Website

A modern, responsive portfolio website built with React, showcasing professional experience, education, projects, and certificates with beautiful animations and interactive features.

## 🌐 Live Demo

**[View Live Portfolio →](https://portfolio-1i5s-git-version-2-abdurazakms-projects.vercel.app/)**

## ✨ Features

### 🎨 **Modern Design**
- **Gradient Backgrounds**: Beautiful gradient designs with glassmorphism effects
- **Dark Theme**: Professional dark color scheme with blue and purple accents
- **Responsive Layout**: Mobile-first design that works on all devices
- **Custom Scrollbars**: Elegant scrollbars with blue-purple gradient styling

### 🎭 **Advanced Animations**
- **Framer Motion**: Smooth, professional animations throughout the site
- **Scroll Animations**: Elements animate into view as you scroll
- **Hover Effects**: Interactive hover animations on cards and buttons
- **Loading Animations**: Beautiful loading screens with rotating elements

### 📱 **Fully Responsive**
- **Mobile Optimized**: Perfect experience on phones and tablets
- **Desktop Ready**: Stunning layout for larger screens
- **Cross-Browser Compatible**: Works seamlessly across all modern browsers

### 🏆 **Interactive Certificate Modal**
- **Full-Screen Modal**: Professional certificate viewer with complete scrolling
- **High-Quality Images**: Certificate images display at optimal resolution
- **Detailed Information**: Comprehensive certificate details and skills gained
- **Smooth Scrolling**: Custom scrollbar with navigation bar clearance
- **Keyboard Navigation**: Escape key support and click-outside-to-close

### 🔧 **Technical Features**
- **Performance Optimized**: Fast loading with Vite build system
- **Component Architecture**: Modular React components for maintainability
- **Custom UI Components**: Reusable UI elements with consistent styling
- **Error Handling**: Robust image loading with fallback support

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 19.1.0** - Modern React with latest features
- **Vite 7.0.6** - Lightning-fast build tool and development server

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Custom CSS Variables** - Dynamic theming system
- **Responsive Design** - Mobile-first approach

### **Animation & Interactivity**
- **Framer Motion 12.23** - Production-ready motion library
- **Lucide React 0.487** - Beautiful icon library
- **React Icons 5.5** - Comprehensive icon collection

### **Routing & Navigation**
- **React Router DOM 7.7** - Declarative routing for React

### **UI Components**
- **Radix UI** - Accessible, unstyled UI primitives
  - Dialog components for modals
  - Select components
  - Slot utilities
- **Custom Modal System** - Purpose-built certificate viewer

### **Utilities**
- **clsx & tailwind-merge** - Efficient className management
- **class-variance-authority** - Type-safe variant handling

## 📂 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── simple-modal.jsx
│   │   │   ├── skeleton.tsx
│   │   │   └── utils.ts
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── dist/ (build output)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (version 16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📱 Sections Overview

### 🏠 **Hero Section**
- Professional introduction with animated profile image
- Dynamic typing effects and call-to-action buttons
- Social media links and contact information

### 👨‍💻 **About Section**
- Personal story and professional background
- Skills overview with animated progress indicators
- Professional values and approach

### 🛠️ **Skills Section**
- Technical skills organized by category
- Visual skill levels with animated progress bars
- Technology stack showcase

### 💼 **Projects Section**
- Portfolio of professional and personal projects
- Interactive project cards with hover effects
- Technology stack and live demo links

### 🎓 **Experience & Education**
- Professional experience and training programs
- Educational background and achievements
- **Interactive Certificate Gallery** with modal viewer

### 📞 **Contact Section**
- Contact form with validation
- Social media links and professional profiles
- Location and availability information

## 🏆 Certificate Modal Features

The portfolio includes a sophisticated certificate viewing system:

### **📋 Certificate Display**
- **Full-Screen Modal**: Professional presentation of certificates
- **High-Resolution Images**: Certificates display in optimal quality
- **Detailed Information**: Complete certificate metadata and descriptions

### **🔍 Modal Functionality**
- **Smooth Animations**: Framer Motion powered entry/exit animations
- **Full Scrolling Support**: Navigate through all certificate content
- **Navigation Bar Clearance**: Proper spacing to avoid header overlap
- **Multiple Close Options**: X button, Escape key, or click outside
- **Mobile Responsive**: Perfect experience on all devices

### **📊 Certificate Details Include**
- Certificate title and issuing organization
- Year of completion and current status
- Detailed course description
- Skills gained and learning outcomes
- Certification value and professional relevance

## 🎨 Customization

### **Colors & Theming**
The portfolio uses a sophisticated color system defined in `src/index.css`:
- Primary colors: Blues and purples
- Accent colors: Customizable through CSS variables
- Dark theme optimized for professional presentation

### **Content Updates**
- **Personal Information**: Update in respective component files
- **Projects**: Modify the projects array in `Projects.jsx`
- **Certificates**: Update certificate data in `Experience.jsx`
- **Skills**: Customize skill categories in `Skills.jsx`

## 🔧 Configuration Files

### **Tailwind Config (`tailwind.config.js`)**
- Custom color palette
- Extended theme with CSS variables
- Animation configurations

### **Vite Config (`vite.config.js`)**
- React plugin configuration
- Build optimizations
- Development server settings

## 📈 Performance Features

- **Code Splitting**: Automatic code splitting for optimal loading
- **Image Optimization**: Fallback system for reliable image loading
- **Lazy Loading**: Components load as needed for better performance
- **Minimal Bundle Size**: Optimized build with tree shaking

## 🌟 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👤 Author

**Abdurazak Mohammed**
- Portfolio: [Live Demo](https://portfolio-1i5s-git-version-2-abdurazakms-projects.vercel.app/)
- GitHub: [@abdurazakms](https://github.com/abdurazakms)
- LinkedIn: [Abdurazak Mohammed](https://linkedin.com/in/abdurazak-mohammed)

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Vercel** - For seamless deployment
- **Community** - For continuous inspiration and support

---

⭐ **Star this repository if you found it helpful!**

🔗 **Live Demo**: [https://portfolio-1i5s-git-version-2-abdurazakms-projects.vercel.app/](https://portfolio-1i5s-git-version-2-abdurazakms-projects.vercel.app/)
