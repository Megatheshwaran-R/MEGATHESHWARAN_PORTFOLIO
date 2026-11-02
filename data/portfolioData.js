// Centralized Portfolio Data for Megatheshwaran R
const PORTFOLIO_DATA = {
  personal: {
    name: "Megatheshwaran R",
    title: "Java Full Stack Developer & IoT Systems Engineer",
    badge: "AVAILABLE FOR IMMEDIATE JOINING",
    location: "Chennai, Tamil Nadu, India",
    openToRelocate: "Bangalore, Hyderabad, Coimbatore",
    email: "ravichandranmegathesh@gmail.com",
    phone: "+91 9092734889",
    github: "https://github.com/Megatheshwaran-R",
    linkedin: "https://linkedin.com/in/megathesh-ravichandran-1053061a0",
    resumeUrl: "Megatheeswaran_Resume.pdf",
    avatar: "assets/megatheshwaran_portrait.png",
    logo: "assets/megatheshwaran_logo.png",
    bio: "Java Full Stack Developer and 2024 B.E. ECE graduate with IAO Accredited Java Full Stack certification from Accord Info Matrix and enterprise internship exposure at VEI Technologies Pvt. Ltd. Specialized in engineering high-throughput Java enterprise backends, responsive modern frontend interfaces, ACID-compliant MySQL data layers, and connected IoT telemetry platforms published in IJNIET Journal."
  },

  kpis: [
    { label: "Core Competency", value: "Java Full Stack", sub: "Spring Boot, Servlets & MySQL", color: "cyan" },
    { label: "Academic Distinction", value: "94.0%", sub: "Diploma EEE (Kongunadu)", color: "green" },
    { label: "Peer-Reviewed Paper", value: "IJNIET", sub: "Published Research Journal", color: "purple" },
    { label: "Global Accreditations", value: "IAO Verified", sub: "Java & Web Technologies", color: "amber" }
  ],

  projects: [
    {
      id: "iot-energy",
      title: "IoT Energy Saving & Management for Telecom Operators & RCRs",
      category: "iot",
      categoryLabel: "IoT / Cloud Telemetry",
      status: "IJNIET Published Paper",
      statusColor: "green",
      image: "assets/iot_sensor_visual.jpg",
      description: "Remote climate telemetry and energy conservation platform designed to optimize power consumption across telecom operators' remote computer rooms (RCRs). Features NodeMCU (ESP8266), DHT11 sensing, automated relay cooling actuation at >34°C, MQ gas/flame hazard trip, and Blynk cloud telemetry over MQTT. Published in IJNIET Journal.",
      tech: ["NodeMCU ESP8266", "Blynk IoT Cloud", "MQTT Protocol", "DHT11", "Relay Actuation", "IJNIET Paper"],
      githubUrl: "https://github.com/Megatheshwaran-R/Iot_Energy_Monitoring_System",
      hasArchitecture: true,
      architecture: {
        title: "IoT Telecom Energy Conservation & RCR Telemetry Architecture",
        subtitle: "ESP8266 NodeMCU -> MQTT Broker -> Blynk Cloud Engine -> Edge Relay Control",
        pipeline: [
          { step: "01", name: "Edge Sensing", desc: "DHT11 reads ambient temperature every 2000ms; MQ sensor detects gas/flame hazards." },
          { step: "02", name: "MQTT Publish", desc: "ESP8266 packages sensor telemetry into MQTT packets published over Wi-Fi (802.11 b/g/n)." },
          { step: "03", name: "Cloud Broker", desc: "Blynk Cloud broker validates tokens, streams live charts, and triggers mobile push alerts." },
          { step: "04", name: "Autonomous Trip", desc: "If temperature exceeds 34°C, edge GPIO trips digital relay to engage emergency HVAC fans." }
        ],
        metrics: [
          { label: "Telemetry Latency", value: "<180ms" },
          { label: "Energy Reduction", value: "~22%" },
          { label: "MQTT Reliability", value: "99.98%" }
        ],
        safeguards: "Fail-safe hardware watchdog timer prevents MCU lockup; thermal hysteresis prevents relay chatter."
      }
    },
    {
      id: "smart-garbage",
      title: "Smart Garbage Monitoring System using IoT",
      category: "iot",
      categoryLabel: "IoT / Smart City",
      status: "ThingSpeak Cloud",
      statusColor: "cyan",
      image: "assets/iot_sensor_visual.jpg",
      description: "Civic cleanliness and municipal sanitation prototype utilizing HC-SR04 ultrasonic distance sensors interfaced with NodeMCU (ESP8266). Continuously tracks bin fill levels, transmits telemetry over Wi-Fi to ThingSpeak cloud, and triggers automated MATLAB alert emails when bins exceed 85% capacity to optimize sanitation truck dispatch routes.",
      tech: ["NodeMCU ESP8266", "HC-SR04 Ultrasonic", "ThingSpeak Cloud", "MATLAB Analysis", "Email Alerts", "Arduino IDE"],
      githubUrl: "https://github.com/Megatheshwaran-R",
      hasArchitecture: true,
      architecture: {
        title: "Smart Municipal Waste Telemetry & Logistics Pipeline",
        subtitle: "HC-SR04 Echo Timing -> Depth Conversion -> REST HTTP POST -> ThingSpeak Analytics",
        pipeline: [
          { step: "01", name: "Acoustic Ranging", desc: "HC-SR04 sends 40kHz ultrasonic burst and computes distance via microsecond echo time." },
          { step: "02", name: "Calibration", desc: "Calculates fill percentage = ((MaxDepth - Distance) / MaxDepth) * 100 with noise filtering." },
          { step: "03", name: "HTTP REST Dispatch", desc: "NodeMCU sends authenticated GET/POST requests to api.thingspeak.com/update." },
          { step: "04", name: "Dispatch Routing", desc: "ThingSpeak triggers React webhook and email alerts when fill levels surpass 85%." }
        ],
        metrics: [
          { label: "Fill Accuracy", value: "±1.5 cm" },
          { label: "Battery Life", value: "Sleep Mode Enabled" },
          { label: "Cloud Sync", value: "Every 15s" }
        ],
        safeguards: "Median filtering of 5 consecutive sonic pulses eliminates garbage surface reflection anomalies."
      }
    },
    {
      id: "license-plate",
      title: "Automated License Plate Recognition (ALPR) System",
      category: "matlab",
      categoryLabel: "Computer Vision / MATLAB",
      status: "Demonstrated at Excel Engg",
      statusColor: "amber",
      image: "assets/license_plate_visual.jpg",
      description: "Computer vision pipeline in MATLAB engineered to detect license plates from vehicle imagery under irregular illumination. Implements contrast adjustment, 2D median filtering, Sobel edge gradient detection, morphological dilation, Region of Interest (ROI) bounding box localization, and character template matching OCR. Demonstrated at National Level Technical Symposium.",
      tech: ["MATLAB", "Image Processing Toolbox", "Morphological Filters", "ROI Segmentation", "OCR Template Match"],
      githubUrl: "https://github.com/Megatheshwaran-R",
      hasArchitecture: true,
      architecture: {
        title: "Computer Vision ALPR Extraction & Optical Character Pipeline",
        subtitle: "Raw Frame -> Sobel Filtering -> Dilation -> Aspect Ratio Masking -> Template OCR",
        pipeline: [
          { step: "01", name: "Color Conversion", desc: "RGB frame converted to Luminance Grayscale with histogram equalization." },
          { step: "02", name: "Sobel Edge Gradient", desc: "Horizontal and vertical convolution kernels isolate high-frequency plate edges." },
          { step: "03", name: "Morphological Fill", desc: "Structuring element (strel) dilates contiguous pixel regions into solid plate candidate." },
          { step: "04", name: "Bounding Box OCR", desc: "Filters regions by aspect ratio (3:1 to 5:1) and matches alphanumeric character templates." }
        ],
        metrics: [
          { label: "Recognition Accuracy", value: "93.4%" },
          { label: "Processing Time", value: "~420ms / frame" },
          { label: "Demonstration", value: "National Symposium" }
        ],
        safeguards: "Adaptive contrast thresholding handles low-light headlight glare and oblique camera angles."
      }
    },
    {
      id: "library-system",
      title: "Online Library Management & Circulation Engine",
      category: "java",
      categoryLabel: "Core Java / JDBC",
      status: "Eclipse IDE",
      statusColor: "cyan",
      image: "assets/college_bg.jpg",
      description: "Comprehensive library management and book circulation application developed using Core Java and JDBC. Engineered a secure role-based login system (Admin vs Member), book inventory modules to add, delete, update, and search books, and configured transactional database connectivity with MySQL using PreparedStatements to ensure data consistency during check-in, checkout, and penalty calculations.",
      tech: ["Core Java", "JDBC", "MySQL", "PreparedStatements", "Eclipse IDE", "ACID Transactions"],
      githubUrl: "https://github.com/Megatheshwaran-R",
      hasArchitecture: true,
      architecture: {
        title: "Enterprise JDBC Persistence & Circulation State Engine",
        subtitle: "CLI / View -> Service Layer -> DAO Implementation -> PreparedStatement -> MySQL ACID",
        pipeline: [
          { step: "01", name: "Role Authorization", desc: "Enforces Admin vs Student permission boundaries with salted password verification." },
          { step: "02", name: "Inventory State", desc: "Queries real-time book copies; prevents over-allocation with atomic UPDATE locks." },
          { step: "03", name: "PreparedStatements", desc: "All SQL transactions parameterized to completely neutralize SQL Injection attacks." },
          { step: "04", name: "Fine Calculation", desc: "Automated cron formula calculates overdue charges: (ReturnDate - DueDate) * DailyRate." }
        ],
        metrics: [
          { label: "DB Latency", value: "<8ms" },
          { label: "Concurrency Safe", value: "ACID Guaranteed" },
          { label: "SQLi Vulnerability", value: "Zero (Parameterized)" }
        ],
        safeguards: "Database connection rollback invoked automatically if any multi-table insert fails."
      }
    },
    {
      id: "customer-mgmt",
      title: "Customer Information Management System",
      category: "java",
      categoryLabel: "Java Web MVC / Servlets",
      status: "Apache Tomcat",
      statusColor: "purple",
      image: "assets/college_bg.jpg",
      description: "Responsive multi-tier web application built with Java Servlets, JSP, JDBC, and MySQL to centralize enterprise customer records and eliminate spreadsheet redundancies. Implemented complete CRUD workflows allowing staff to register new clients, query profile records, and perform atomic updates. Utilizes JSP for view presentation and Servlets for controller routing.",
      tech: ["Java Servlets", "JSP", "JDBC", "MySQL", "HTML5 / CSS3", "Tomcat Server", "MVC"],
      githubUrl: "https://github.com/Megatheshwaran-R",
      hasArchitecture: true,
      architecture: {
        title: "Multi-Tier MVC Architecture with Apache Tomcat & MySQL",
        subtitle: "HTTP Request -> Controller Servlet -> Business Service -> DAO -> MySQL RDBMS",
        pipeline: [
          { step: "01", name: "Servlet Routing", desc: "HttpServlet catches GET/POST actions and routes to specific customer handler methods." },
          { step: "02", name: "Form Sanitization", desc: "Sanitizes input strings, verifies email format, and maps request params to CustomerDTO." },
          { step: "03", name: "HikariCP / JDBC", desc: "Acquires pooled connection from Apache Tomcat context, executes atomic query." },
          { step: "04", name: "JSP View Render", desc: "Attaches Customer model to request scope and forwards to JSP rendering responsive table." }
        ],
        metrics: [
          { label: "Average Dispatch", value: "14.2ms" },
          { label: "Architecture", value: "Strict MVC" },
          { label: "Server", value: "Apache Tomcat 9/10" }
        ],
        safeguards: "Cross-Site Scripting (XSS) mitigated through c:out taglib escaping; CSRF tokens on mutate forms."
      }
    },
    {
      id: "spring-api",
      title: "Scalable E-Commerce REST API & Microservice Engine",
      category: "java",
      categoryLabel: "Spring Boot / Microservices",
      status: "REST / JWT Security",
      statusColor: "green",
      image: "assets/college_bg.jpg",
      description: "High-throughput backend service providing enterprise RESTful endpoints for catalog filtering, authenticated shopping cart state, order workflows, and role-based administration. Engineered with Spring Boot, Spring Security (JWT auth), Spring Data JPA / Hibernate, and ACID transaction locks to prevent concurrency inventory anomalies.",
      tech: ["Spring Boot", "Spring Security", "JWT", "Hibernate / JPA", "MySQL", "REST API", "Postman"],
      githubUrl: "https://github.com/Megatheshwaran-R",
      hasArchitecture: true,
      architecture: {
        title: "Microservice REST API with Spring Security & JPA Persistence",
        subtitle: "Client Request -> JWT Filter -> Spring RestController -> Service -> Spring Data JPA",
        pipeline: [
          { step: "01", name: "Bearer Token Validation", desc: "JwtAuthenticationFilter extracts claims, validates signature, sets SecurityContext." },
          { step: "02", name: "RestController", desc: "Spring MVC maps path variables, deserializes JSON payload with @Valid validation." },
          { step: "03", name: "Transactional Service", desc: "@Transactional annotation manages rollback across order creation & stock decrement." },
          { step: "04", name: "Hibernate / JPA", desc: "Object-Relational Mapping translates entities into optimized SQL with 2nd-level cache." }
        ],
        metrics: [
          { label: "P99 Latency", value: "<19ms" },
          { label: "Token Expiry", value: "24h JWT with Refresh" },
          { label: "Test Coverage", value: "Postman Validated" }
        ],
        safeguards: "Optimistic locking (@Version) prevents race conditions when concurrent shoppers checkout the same SKU."
      }
    }
  ],

  skills: [
    {
      category: "Java & Backend Engineering",
      icon: "☕",
      color: "cyan",
      items: [
        { name: "Core Java (JDK/JRE/JVM)", level: 92, badge: "Advanced" },
        { name: "OOP Principles & Design", level: 95, badge: "Core" },
        { name: "Java Collections & Streams", level: 90, badge: "Advanced" },
        { name: "JDBC & Connection Pooling", level: 88, badge: "Production" },
        { name: "Java Servlets & JSP", level: 86, badge: "Advanced" },
        { name: "Spring Boot & REST APIs", level: 82, badge: "Proficient" },
        { name: "Apache Tomcat Deployment", level: 85, badge: "Advanced" }
      ]
    },
    {
      category: "Databases & Persistence",
      icon: "🗄️",
      color: "amber",
      items: [
        { name: "MySQL Relational DB", level: 90, badge: "Advanced" },
        { name: "Schema Design & Normalization", level: 88, badge: "Advanced" },
        { name: "CRUD Operations & Joins", level: 92, badge: "Core" },
        { name: "Constraints & Foreign Keys", level: 90, badge: "Advanced" },
        { name: "ACID Transaction Safety", level: 85, badge: "Proficient" },
        { name: "Hibernate & JPA Fundamentals", level: 80, badge: "Proficient" }
      ]
    },
    {
      category: "IoT & Embedded Edge Systems",
      icon: "📡",
      color: "green",
      items: [
        { name: "NodeMCU ESP8266 (Wi-Fi SoC)", level: 94, badge: "Specialist" },
        { name: "MQTT Pub/Sub Protocol", level: 92, badge: "Production" },
        { name: "HC-SR04 Ultrasonic Distance", level: 90, badge: "Advanced" },
        { name: "DHT11 Climate Sensing", level: 92, badge: "Advanced" },
        { name: "Blynk IoT Server & ThingSpeak", level: 90, badge: "Specialist" },
        { name: "GPIO Relay Actuation", level: 88, badge: "Advanced" }
      ]
    },
    {
      category: "Web & Modern Frontend",
      icon: "🌐",
      color: "purple",
      items: [
        { name: "React 18 & Components", level: 85, badge: "Proficient" },
        { name: "Modern JavaScript (ES6+)", level: 88, badge: "Advanced" },
        { name: "HTML5 & Semantic Standards", level: 92, badge: "Advanced" },
        { name: "CSS3 / Modern Layouts / Flex", level: 90, badge: "Advanced" },
        { name: "Three.js & 3D WebGL", level: 80, badge: "Interactive" },
        { name: "REST API Integration", level: 88, badge: "Proficient" }
      ]
    },
    {
      category: "Developer Tools & CI/CD",
      icon: "🛠️",
      color: "orange",
      items: [
        { name: "Eclipse IDE", level: 90, badge: "Primary IDE" },
        { name: "Visual Studio Code", level: 92, badge: "Primary IDE" },
        { name: "Git & GitHub CI/CD Actions", level: 86, badge: "Advanced" },
        { name: "Postman API Testing", level: 88, badge: "Testing" },
        { name: "Arduino IDE & Firmware", level: 88, badge: "Embedded" },
        { name: "MATLAB & Vision Toolbox", level: 82, badge: "Simulation" }
      ]
    },
    {
      category: "Architecture & Engineering Practices",
      icon: "📐",
      color: "blue",
      items: [
        { name: "MVC Architecture Pattern", level: 90, badge: "Architecture" },
        { name: "SDLC & Clean Code", level: 88, badge: "Process" },
        { name: "DAO / DTO Design Patterns", level: 85, badge: "Design" },
        { name: "Exception Handling & Logging", level: 88, badge: "Reliability" },
        { name: "Remote Energy Optimization", level: 92, badge: "Research" },
        { name: "SQL Injection Prevention", level: 92, badge: "Security" }
      ]
    }
  ],

  experience: [
    {
      role: "Java Full Stack Development Intern",
      company: "VEI Technologies Pvt. Ltd., Chennai",
      duration: "Feb 15, 2024 — Mar 15, 2024 (1 Month)",
      badge: "Industry Internship",
      highlights: [
        "Gained practical exposure to enterprise software development workflows, clean code conventions, and standard SDLC best practices.",
        "Assisted in analyzing and reviewing Java-based web application codebases to understand MVC architecture, request dispatching, and backend database connectivity.",
        "Participated in active code walkthroughs focusing on OOP modularization, relational database normalization, and frontend-to-backend data binding.",
        "Attended hands-on technical sessions covering IoT sensor integration, embedded microcontroller programming, and real-time cloud data pipelines."
      ]
    },
    {
      role: "Java and Web Technology Development (Java Full Stack Program)",
      company: "Accord Info Matrix (IAO Accredited), Chennai",
      duration: "Certified 2024 — 2025",
      badge: "Dual IAO Accreditation",
      highlights: [
        "Completed rigorous hands-on program covering Core Java, OOP fundamentals (Inheritance, Polymorphism, Encapsulation, Abstraction), Exception Handling, and Collections Framework.",
        "Mastered Java web technologies including JDBC connectivity (Connection Pooling, PreparedStatements, ResultSets), Java Servlets, JSP (JavaServer Pages), and Apache Tomcat server deployment.",
        "Engineered relational database schemas in MySQL with strict DDL/DML commands, CRUD operations, foreign key constraints, and multi-table joins.",
        "Earned dual accredited credentials from the International Accreditation Organization (IAO) in Java Technology (ID: AIM JT 18529) and Web Application Development (ID: AIM WD 18530)."
      ]
    }
  ],

  education: [
    {
      degree: "B.E. in Electronics & Communication Engineering",
      institution: "Kongunadu College of Engineering and Technology, Tholurpatti",
      period: "2021 — 2024",
      grade: "CGPA: 7.54 / 10.0",
      description: "Completed comprehensive coursework in Microprocessors, Digital System Design, and Embedded Computing. Lead author on peer-reviewed IoT telemetry research paper published in IJNIET."
    },
    {
      degree: "Diploma in Electrical & Electronics Engineering (EEE)",
      institution: "Kongunadu Polytechnic College, Tholurpatti",
      period: "2018 — 2021",
      grade: "94.0% with Distinction",
      description: "Graduated with top Distinction honors. Rigorous grounding in electrical circuitry, control systems, and instrumentation."
    }
  ],

  certifications: [
    { title: "Java Technology Certification", issuer: "International Accreditation Organization (IAO)", id: "AIM JT 18529", year: "2024" },
    { title: "Web Application Development", issuer: "International Accreditation Organization (IAO)", id: "AIM WD 18530", year: "2024" },
    { title: "Java Full Stack Developer Program", issuer: "Accord Info Matrix, Chennai", id: "AIM-FS-2024", year: "2024" },
    { title: "IoT & Microcontroller Workshop Certification", issuer: "VEI Technologies Pvt. Ltd., Chennai", id: "VEI-IOT-2024", year: "2024" }
  ],

  publications: [
    {
      title: "Energy Saving and Management Using MQTT Protocol in Telecom Operators' Remote Computer Room",
      venue: "International Journal of New Innovations in Engineering and Technology (IJNIET)",
      type: "Peer-Reviewed Journal Publication",
      year: "2024"
    },
    {
      title: "Automated License Plate Recognition (ALPR) using MATLAB",
      venue: "Excel Engineering College, Tiruchengode",
      type: "National Level Live Project Demonstration",
      year: "2023"
    },
    {
      title: "Wireless Communication Advances",
      venue: "Gnanamani Engineering College, Namakkal",
      type: "National Level Technical Symposium Presentation",
      year: "2023"
    }
  ],

  simulators: {
    endpoints: [
      {
        id: "customer",
        label: "Customer Admin: POST /api/v1/customers",
        method: "POST",
        path: "/api/v1/customers",
        payload: {
          companyName: "Apex Telecom Systems",
          contactPerson: "R. Ramanathan",
          email: "ramanathan@apex.io",
          tier: "ENTERPRISE",
          slaLevel: "99.9%"
        },
        response: {
          status: 201,
          message: "Customer profile created successfully.",
          data: {
            customerId: "C-9042",
            companyName: "Apex Telecom Systems",
            contactPerson: "R. Ramanathan",
            status: "ACTIVE",
            transactionId: "TX-94812-ACID"
          },
          executionMetrics: {
            servletDispatch: "2.4ms",
            validation: "1.1ms",
            hikariConnectionAcquire: "3.2ms",
            preparedStatementExec: "7.8ms",
            totalLatency: "14.5ms"
          }
        }
      },
      {
        id: "library",
        label: "Library System: POST /api/v1/library/borrow",
        method: "POST",
        path: "/api/v1/library/borrow",
        payload: {
          memberId: "MEM-4091",
          bookId: 1042,
          action: "ISSUE_BOOK",
          durationDays: 14
        },
        response: {
          status: 200,
          message: "Book circulation issued successfully.",
          data: {
            transactionId: "LIB-TX-7731",
            bookTitle: "Core Java Volume I: Fundamentals",
            status: "ISSUED",
            dueDate: "2026-11-16",
            lateFeeRatePerDay: "₹5.00"
          },
          executionMetrics: {
            authVerification: "1.8ms",
            stockCheck: "2.5ms",
            preparedStatementInsert: "4.2ms",
            totalLatency: "8.5ms"
          }
        }
      },
      {
        id: "telecom",
        label: "Telecom Energy: POST /api/v1/telecom/telemetry",
        method: "POST",
        path: "/api/v1/telecom/telemetry",
        payload: {
          nodeId: "ESP8266-RCR-07",
          location: "Chennai South RCR",
          temperatureC: 35.8,
          humidityPercent: 68.2,
          gasPpm: 142,
          fanRelayState: "TRIGGERED_HIGH"
        },
        response: {
          status: 202,
          message: "Telemetry ingested. Automated relay tripped cooling fan.",
          data: {
            alertCode: "WARN_THERMAL_EXCEEDED_34C",
            relayEngaged: true,
            mqttTopic: "rcr/telecom/node07/status",
            publishedToBlynk: true
          },
          executionMetrics: {
            mqttBrokerAck: "18.2ms",
            dbTimeseriesAppend: "6.4ms",
            alertDispatch: "3.1ms",
            totalLatency: "27.7ms"
          }
        }
      }
    ]
  }
};

// Universal export: works as global script, CommonJS, and ES Module
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PORTFOLIO_DATA };
}
