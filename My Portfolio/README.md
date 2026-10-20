# Megatheshwaran R — Java Full Stack Developer Portfolio

A dynamic, production-quality personal portfolio website for **Megatheshwaran R**, engineered with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Optimized for static deployment on **GitHub Pages**.

---

## 🌟 Architecture & Features

- **Positioning**: Confident, outcome-driven presentation leading with real system implementations, technical depth, and measurable outcomes. Zero entry-level or fresher phrasing.
- **Hero Section**: Dynamic typing effect cycling through technical roles, animated ambient mesh background, interactive Java Spring Boot code snippet card, and direct CTAs.
- **About Section**: Profile photo with glowing animated gradient frame, proof-of-work count-up stats (Systems Engineered, Technologies Mastered, Repositories, Verified Credentials), and architectural philosophy.
- **Featured Projects**: Located right after About as the flagship section. Large case-study cards featuring problem statements, architectural solutions, key capabilities, metrics, and an interactive deep-dive modal (`projects.json`).
- **Technical Skills**: Categorized tab switcher (Backend, Frontend, Databases, DevOps/Tools) with animated proficiency indicators and technology badges (`skills.json`).
- **Engineering Journey**: Animated vertical timeline highlighting his internship at VEI Technologies, accredited full-stack program at Accord Info Matrix, peer-reviewed research publication in IJNIET, and national symposia presentations (`timeline.json`).
- **Live GitHub Integration**: Client-side integration with GitHub's public API fetching live repository metrics, star counts, forks, and a commit cadence activity matrix with graceful rate-limit fallback.
- **Credentials & Education**: Accredited IAO certifications with verification links, alongside verified academic degree milestones (`certifications.json`).
- **Interactive Contact**: Form with input validation, celebratory confetti, toast notifications, direct phone, email, and social networks.
- **Dynamic UX**:
  - Dark/Light mode toggle with system preference detection and `localStorage` persistence
  - Custom desktop interactive cursor with magnetic hover detection
  - Sticky glassmorphic navbar with active scroll section highlight
  - Top scroll progress indicator
  - Preloader animation featuring the initials `MR`
  - 3D interactive tilt cards with glare physics
  - Full support for `prefers-reduced-motion` and mobile responsiveness (tested across 360px, 768px, 1024px, 1440px)

---

## 📁 Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── boy.png                 # Developer profile portrait
│   ├── logo.png                # Brand logo & favicon
│   └── resume.pdf              # Verified downloadable resume PDF
├── src/
│   ├── assets/                 # Static graphical assets
│   ├── components/             # Reusable UI components
│   │   ├── BackToTop.jsx       # Floating scroll-to-top button
│   │   ├── CustomCursor.jsx    # Animated desktop cursor
│   │   ├── Navbar.jsx          # Sticky glassmorphic navbar & mobile drawer
│   │   ├── Preloader.jsx       # Startup initials animation
│   │   ├── ProjectModal.jsx    # Case-study deep dive modal
│   │   ├── ScrollProgress.jsx  # Pinned viewport progress bar
│   │   ├── TiltCard.jsx        # 3D interactive tilt wrapper
│   │   └── Toast.jsx           # Success/error notifications
│   ├── data/                   # Content layer (edit without touching components!)
│   │   ├── certifications.json # Certifications & academic history
│   │   ├── profile.json        # Bio, contact, tagline, social links, stats
│   │   ├── projects.json       # Case-study projects with problems & solutions
│   │   ├── skills.json         # Categorized technical skills & proficiency
│   │   └── timeline.json       # Internship, publication & training milestones
│   ├── hooks/                  # Custom React hooks
│   │   ├── useActiveSection.js # Active viewport section tracking
│   │   ├── useDarkMode.js      # Theme detection & persistence
│   │   ├── useGitHubData.js    # Client-side GitHub API fetcher with fallbacks
│   │   └── useScrollProgress.js# Scroll percentage tracker
│   ├── sections/               # Single-page sections
│   │   ├── About.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── GitHubSection.jsx
│   │   ├── Hero.jsx
│   │   ├── Journey.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Tailwind directives, fonts, glass utilities
│   └── main.jsx                # React DOM entry point
├── dist/                       # Static production build (generated)
├── index.html                  # HTML entry with Open Graph & SEO meta tags
├── package.json
├── tailwind.config.js
└── vite.config.js              # Configured with relative base './' for GitHub Pages
```

---

## 🚀 Local Development

### 1. Prerequisites
Ensure **Node.js** (v18+) is installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Create Production Static Build
```bash
npm run build
```
This compiles the website into optimized static HTML, CSS, and JS files inside the `dist/` directory.

### 5. Preview Static Production Build
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) to preview the production bundle locally.

---

## ✏️ How to Edit Content

All portfolio content is decoupled into `/src/data/` so you can update details without altering React component code:

1. **Profile & Socials**: Edit [`src/data/profile.json`](src/data/profile.json) to change your tagline, bio, email, phone, LinkedIn, GitHub username, or proof-of-work stats.
2. **Projects**: Edit [`src/data/projects.json`](src/data/projects.json) to add, remove, or modify project case studies, metrics, problem statements, architectures, and repository links.
3. **Skills**: Edit [`src/data/skills.json`](src/data/skills.json) to update proficiency levels, categories, and technical tags.
4. **Timeline & Internships**: Edit [`src/data/timeline.json`](src/data/timeline.json) to add new internships, talks, or publications.
5. **Certifications & Education**: Edit [`src/data/certifications.json`](src/data/certifications.json) to add certifications, drive verification links, or degree scores.
6. **Resume PDF**: Replace `public/resume.pdf` with any new version of your PDF.

---

## 🌐 Deploying to GitHub Pages

### Method A: Automated GitHub Actions (Recommended)
This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete modern Java Full Stack portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to the `main` branch will automatically build and publish your site!

### Method B: Manual Deploy using `gh-pages`
If you prefer deploying via the `gh-pages` branch:
1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run build
   npm run deploy
   ```

---

## 📄 License
MIT &copy; Megatheshwaran R. All rights reserved.
