# Megatheshwaran R — Java Full Stack Engineering Portfolio

Dynamic, ultra-lightweight, high-visibility portfolio for **Megatheshwaran R** (Java Full Stack Developer & IoT Systems Engineer).

---

## ⚡ Java Full Stack & Dynamic Architecture

- **Java Full Stack Developer Positioning**: Highlights expertise across **Frontend** (HTML5, CSS3, JavaScript ES6+, React concepts, Responsive UI), **Backend** (Core Java, Spring Boot, Java Servlets, JSP, RESTful APIs, Apache Tomcat), **Databases** (MySQL RDBMS, Hibernate/JPA, JDBC connection pooling, ACID transactions), and **IoT Telemetry** (NodeMCU ESP8266, MQTT Pub/Sub).
- **Live Dynamic GitHub Telemetry**:
  - Live asynchronous integration with GitHub REST API (`https://api.github.com/users/Megatheshwaran-R`).
  - Displays real-time public repo counts, profile bio, and a dynamic stream of open-source repositories with language tags, stars, and direct links.
  - Graceful pre-rendered fallbacks ensure the page functions seamlessly even if offline or API rate-limited.
- **Dynamic Java Full Stack Project Search & Filtering**:
  - Real-time search bar that filters projects dynamically as you type (title, tech tags, descriptions).
  - Category filters (`All`, `Java Full Stack`, `IoT & Telemetry`, `Computer Vision & MATLAB`) with live project counter badge (`Showing X of 6 projects`).
- **Dynamic System Architecture Modal**:
  - Click **"Inspect Architecture"** on any project to open a slide-out deep dive detailing the end-to-end data pipeline, database schema, security safeguards (SQLi/CSRF protection), and engineering metrics.
- **Interactive Multi-Mode Engineering Console**:
  1. **Java Full Stack REST API & MVC Dispatcher**: Live editable JSON payload editor with real-time dispatch simulation through Controller -> Service -> HikariCP Pool -> MySQL PreparedStatement with sub-15ms response latency.
  2. **IoT Telecom & Smart Sanitation Telemetry**: Real-time HTML5 canvas graphing DHT11 temperature, ultrasonic depth levels, automated cooling fan triggers, and MQTT heartbeats.
  3. **MATLAB ALPR Pipeline**: Interactive computer vision steps for license plate recognition with live bounding boxes.
- **Interactive UNIX CLI Terminal**:
  - Terminal drawer (`$_ CLI Shell`) with dynamic commands: `git status`, `git repos` (live GitHub fetch), `run api`, `cat fullstack`, `cat javafullstack`, `cat resume`, `cat skills`, `cat experience`, `cat education`, `cat publication`, `ls projects`, `ping blynk`, `download`, `contact`, `clear`.
- **Dynamic Contact Form**:
  - Form with real-time validation and dispatch state, opening mail clients with formatted inquiries and displaying animated toast alerts.
- **Zero-Dependency Footprint**:
  - Entire application is pure HTML5, CSS3, and JavaScript — loads in under 100 milliseconds with no heavy `node_modules` or build pipeline.
  - Reduced folder size by **>97%** (from 229 MB down to ~7 MB total, root site ~1.5 MB).

---

## 🚀 Instant Deployment to GitHub Pages

### Automated GitHub Actions CI/CD (Included)
The repository includes `.github/workflows/deploy.yml`:
1. Push this folder to your repository `https://github.com/Megatheshwaran-R/Megatheshwaran-R.github.io` (or any repo).
2. In GitHub, go to **Settings** -> **Pages** -> **Source**: select **GitHub Actions**.
3. Any push to `main` will automatically deploy your static portfolio in under 15 seconds!

### Manual GitHub Pages Option
1. Go to **Settings** -> **Pages**.
2. **Build and deployment** -> **Source**: "Deploy from a branch".
3. **Branch**: `main`, Folder: `/ (root)`. Click **Save**.
