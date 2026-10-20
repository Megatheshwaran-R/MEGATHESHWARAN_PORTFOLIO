// ----------------------------------------------------
// Megatheshwaran R — Full Stack Developer & IoT Engineer
// Dynamic GitHub Telemetry, Interactive Simulators, Architecture Modals, & CLI Shell
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --------------------------------------------------
  // 1. DYNAMIC GITHUB API INTEGRATION
  // --------------------------------------------------
  const GITHUB_USERNAME = 'Megatheshwaran-R';
  const repoGridEl = document.getElementById('githubRepoGrid');
  const userBioEl = document.getElementById('githubUserBio');
  const repoCountBadge = document.getElementById('githubRepoCount');
  const followerCountBadge = document.getElementById('githubFollowerCount');

  async function fetchGitHubData() {
    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userBioEl && userData.bio) {
          userBioEl.textContent = userData.bio;
        }
        if (repoCountBadge) {
          repoCountBadge.innerHTML = `<strong>${userData.public_repos}</strong> Public Repos`;
        }
        if (followerCountBadge) {
          followerCountBadge.innerHTML = `<strong>${userData.followers}</strong> Followers`;
        }
      }

      // 2. Fetch Public Repositories
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (repos && repos.length > 0 && repoGridEl) {
          repoGridEl.innerHTML = ''; // Clear skeleton/fallback
          
          repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            const lang = repo.language || 'Full Stack';
            const desc = repo.description || 'Enterprise software & hardware repository.';
            
            card.innerHTML = `
              <div>
                <div class="repo-card__name">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  <span>${repo.name}</span>
                </div>
                <div class="repo-card__desc">${desc}</div>
              </div>
              <div class="repo-card__meta">
                <span class="lang-badge">
                  <span class="lang-dot"></span> ${lang}
                </span>
                <a href="${repo.html_url}" target="_blank" class="btn btn--sm btn--github">View Repo →</a>
              </div>
            `;
            repoGridEl.appendChild(card);
          });
        }
      }
    } catch (err) {
      console.warn("GitHub API rate limit or offline, using robust pre-rendered telemetry fallback.", err);
    }
  }

  fetchGitHubData();

  // --------------------------------------------------
  // 2. SIMULATOR TABS NAVIGATION
  // --------------------------------------------------
  const simTabs = document.querySelectorAll('.sim-tab');
  const simPanels = document.querySelectorAll('.sim-tab-panel');

  simTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMode = tab.getAttribute('data-mode');
      
      simTabs.forEach(t => t.classList.remove('active'));
      simPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`simPanel-${targetMode}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // --------------------------------------------------
  // 3. TAB 1: FULL-STACK REST API & MVC DISPATCHER
  // --------------------------------------------------
  const runApiBtn = document.getElementById('runApiBtn');
  const apiEndpointSelect = document.getElementById('apiEndpointSelect');
  const apiPayloadTextarea = document.getElementById('apiPayload');
  const apiResponseBox = document.getElementById('apiResponseBox');
  const pipelineSteps = document.querySelectorAll('.pipeline-step');

  const API_TEMPLATES = {
    customer: {
      endpoint: "POST /api/v1/customers",
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
          persistedAt: new Date().toISOString(),
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
    library: {
      endpoint: "POST /api/v1/library/borrow",
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
          bookTitle: "Core Java Volume I",
          status: "ISSUED",
          dueDate: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0],
          fineRatePerDay: "5.00 INR"
        },
        executionMetrics: {
          servletDispatch: "1.8ms",
          validation: "0.9ms",
          hikariConnectionAcquire: "2.9ms",
          preparedStatementExec: "6.2ms",
          totalLatency: "11.8ms"
        }
      }
    },
    iot: {
      endpoint: "POST /api/v1/telecom/telemetry",
      payload: {
        nodeId: "ESP8266-RCR-01",
        tempCelsius: 35.4,
        humidityPct: 62.1,
        relayState: "ACTIVE_COOLING"
      },
      response: {
        status: 200,
        message: "Telemetry ingested & automated threshold cooling actuated.",
        data: {
          telemetryId: "TEL-90184",
          nodeStatus: "ONLINE",
          hvacRelayTriggered: true,
          blynkSyncState: "MQTT_PUB_ACK",
          publishedAt: new Date().toISOString()
        },
        executionMetrics: {
          mqttIngress: "3.1ms",
          thresholdRuleEngine: "1.4ms",
          mysqlAuditLog: "5.5ms",
          totalLatency: "10.0ms"
        }
      }
    }
  };

  if (apiEndpointSelect && apiPayloadTextarea) {
    apiEndpointSelect.addEventListener('change', () => {
      const selected = apiEndpointSelect.value;
      apiPayloadTextarea.value = JSON.stringify(API_TEMPLATES[selected].payload, null, 2);
    });
    // Initial payload
    apiPayloadTextarea.value = JSON.stringify(API_TEMPLATES.customer.payload, null, 2);
  }

  if (runApiBtn && apiResponseBox) {
    runApiBtn.addEventListener('click', () => {
      const selected = apiEndpointSelect.value;
      const tpl = API_TEMPLATES[selected];

      // Animate pipeline steps
      pipelineSteps.forEach((step, idx) => {
        step.style.color = 'var(--text-dark)';
        setTimeout(() => {
          step.style.color = 'var(--green)';
        }, (idx + 1) * 220);
      });

      apiResponseBox.textContent = `// Dispatching HTTP Request to Java Servlet / Spring Controller...\n// HikariCP Connection Pool -> PreparedStatement Executing...`;
      runApiBtn.disabled = true;

      setTimeout(() => {
        let userPayload = tpl.payload;
        try {
          userPayload = JSON.parse(apiPayloadTextarea.value);
        } catch (e) {
          // ignore
        }

        const resp = { ...tpl.response };
        if (resp.data.companyName && userPayload.companyName) {
          resp.data.companyName = userPayload.companyName;
        }

        apiResponseBox.textContent = 
`HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8
X-Runtime-Latency: ${tpl.response.executionMetrics.totalLatency}
X-Connection-Pool: HikariCP-Active

` + JSON.stringify(resp, null, 2);
        runApiBtn.disabled = false;
      }, 950);
    });
  }

  // --------------------------------------------------
  // 4. TAB 2: IOT TELEMETRY & SMART CANVASES
  // --------------------------------------------------
  const iotCanvas = document.getElementById('iotCanvas');
  if (iotCanvas) {
    const ctx = iotCanvas.getContext('2d');
    let isRunning = true;
    let timeOffset = 0;
    let tempVal = 28;
    let fillVal = 45;
    let gasAlert = false;

    const tempSlider = document.getElementById('tempSlider');
    const fillSlider = document.getElementById('fillSlider');
    const tempDisp = document.getElementById('tempDisp');
    const fillDisp = document.getElementById('fillDisp');
    const fanStatusDisp = document.getElementById('fanStatusDisp');
    const cloudAlertDisp = document.getElementById('cloudAlertDisp');
    const gasAlertBtn = document.getElementById('gasAlertBtn');
    const pauseIotBtn = document.getElementById('pauseIotBtn');

    if (tempSlider) {
      tempSlider.addEventListener('input', (e) => {
        tempVal = parseInt(e.target.value, 10);
        if (tempDisp) tempDisp.textContent = `${tempVal} °C`;
        updateSensors();
      });
    }

    if (fillSlider) {
      fillSlider.addEventListener('input', (e) => {
        fillVal = parseInt(e.target.value, 10);
        if (fillDisp) fillDisp.textContent = `${fillVal} %`;
        updateSensors();
      });
    }

    if (gasAlertBtn) {
      gasAlertBtn.addEventListener('click', () => {
        gasAlert = !gasAlert;
        gasAlertBtn.textContent = gasAlert ? 'Resolve Hazard' : 'Inject Gas/Flame Hazard';
        gasAlertBtn.classList.toggle('btn--sim-amber', !gasAlert);
        updateSensors();
      });
    }

    if (pauseIotBtn) {
      pauseIotBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        pauseIotBtn.textContent = isRunning ? 'Pause Stream' : 'Resume Stream';
      });
    }

    function updateSensors() {
      if (fanStatusDisp) {
        if (tempVal >= 34) {
          fanStatusDisp.textContent = 'FAN ACTIVE (HIGH)';
          fanStatusDisp.style.color = 'var(--green)';
        } else {
          fanStatusDisp.textContent = 'STANDBY (NORMAL)';
          fanStatusDisp.style.color = 'var(--text-dark)';
        }
      }

      if (cloudAlertDisp) {
        if (gasAlert) {
          cloudAlertDisp.textContent = 'EMERGENCY: GAS/FLAME LEAK DETECTED';
          cloudAlertDisp.style.color = '#ff5f56';
        } else if (fillVal >= 85) {
          cloudAlertDisp.textContent = 'WARNING: BIN OVERFLOW ALERT SENT (MATLAB)';
          cloudAlertDisp.style.color = 'var(--amber)';
        } else {
          cloudAlertDisp.textContent = 'NORMAL TELEMETRY (MQTT SYNC)';
          cloudAlertDisp.style.color = 'var(--green)';
        }
      }
    }

    function renderIot() {
      const w = iotCanvas.width = iotCanvas.parentElement.clientWidth || 860;
      const h = iotCanvas.height = 240;
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Temperature Waveform (Cyan)
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = tempVal >= 34 ? '#ff5f56' : '#00f0ff';
      ctx.shadowColor = tempVal >= 34 ? '#ff5f56' : '#00f0ff';
      ctx.shadowBlur = 8;

      const tempMidY = h * 0.35;
      for (let x = 0; x < w; x++) {
        const rad = (x + timeOffset) * 0.03;
        const noise = (Math.random() - 0.5) * 2;
        const y = tempMidY + Math.sin(rad) * 15 + ((tempVal - 25) * 1.5) + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill Level Waveform (Amber / Green)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = fillVal >= 85 ? '#ffaa00' : '#00ff9d';
      ctx.shadowColor = fillVal >= 85 ? '#ffaa00' : '#00ff9d';
      ctx.shadowBlur = 6;
      const fillY = h - 30 - ((fillVal / 100) * 80);
      for (let x = 0; x < w; x++) {
        const rad = (x + timeOffset * 1.5) * 0.05;
        const y = fillY + Math.cos(rad) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px IBM Plex Mono, monospace';
      ctx.fillText(`DHT11 TEMP SENSOR: ${tempVal}°C ${tempVal >= 34 ? '[HVAC FAN RELAY ON]' : '[STABLE]'}`, 20, 30);
      ctx.fillText(`HC-SR04 ULTRASONIC FILL: ${fillVal}% ${fillVal >= 85 ? '[DISPATCH ALERT SENT]' : '[OK]'}`, 20, h - 15);
      
      // Heartbeat pulse dot
      const pulseX = (timeOffset * 4) % w;
      ctx.fillStyle = gasAlert ? '#ff5f56' : '#00ff9d';
      ctx.beginPath();
      ctx.arc(pulseX, 26, 4, 0, Math.PI * 2);
      ctx.fill();

      if (isRunning) timeOffset += 1.5;
      requestAnimationFrame(renderIot);
    }

    renderIot();
    updateSensors();
  }

  // --------------------------------------------------
  // 5. TAB 3: MATLAB LICENSE PLATE RECOGNITION (ALPR)
  // --------------------------------------------------
  const plateCanvas = document.getElementById('plateCanvas');
  const alprStepSelect = document.getElementById('alprStepSelect');
  const alprRunBtn = document.getElementById('alprRunBtn');
  const alprResultText = document.getElementById('alprResultText');

  if (plateCanvas) {
    const pCtx = plateCanvas.getContext('2d');
    const plateImg = new Image();
    plateImg.src = 'assets/license_plate_visual.jpg';

    plateImg.onload = () => {
      renderALPR('raw');
    };

    function renderALPR(stage) {
      const w = plateCanvas.width = plateCanvas.parentElement.clientWidth || 860;
      const h = plateCanvas.height = 240;
      pCtx.clearRect(0, 0, w, h);

      const imgRatio = plateImg.width / plateImg.height;
      const drawH = h;
      const drawW = h * imgRatio;
      const startX = (w - drawW) / 2;

      pCtx.drawImage(plateImg, startX, 0, drawW, drawH);

      const plateX = startX + (drawW * 0.16);
      const plateY = drawH * 0.58;
      const plateW = drawW * 0.68;
      const plateH = drawH * 0.22;

      if (stage === 'gray') {
        const imgData = pCtx.getImageData(startX, 0, drawW, drawH);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
          d[i] = d[i+1] = d[i+2] = v;
        }
        pCtx.putImageData(imgData, startX, 0);
        if (alprResultText) alprResultText.innerHTML = `<strong>STAGE: Grayscale & Contrast Equalization</strong> (Noise Filtered)`;
      } else if (stage === 'sobel') {
        const imgData = pCtx.getImageData(startX, 0, drawW, drawH);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (d[i] > 110) ? 255 : 0;
          d[i] = 0;
          d[i+1] = v;
          d[i+2] = v;
        }
        pCtx.putImageData(imgData, startX, 0);
        if (alprResultText) alprResultText.innerHTML = `<strong>STAGE: Sobel Gradient & Morphological Dilation</strong> (Edges Extracted)`;
      } else if (stage === 'roi') {
        pCtx.strokeStyle = '#00f0ff';
        pCtx.lineWidth = 3;
        pCtx.strokeRect(plateX, plateY, plateW, plateH);
        
        pCtx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        pCtx.fillRect(plateX, plateY, plateW, plateH);

        pCtx.fillStyle = '#00f0ff';
        pCtx.font = 'bold 13px IBM Plex Mono, monospace';
        pCtx.fillText('REGION OF INTEREST [ROI] - NUMBER PLATE DETECTED', plateX, plateY - 8);
        if (alprResultText) alprResultText.innerHTML = `<strong>STAGE: Connected-Component Bounding Box</strong> (Verified Aspect Ratio 4.2:1)`;
      } else if (stage === 'ocr') {
        pCtx.strokeStyle = '#00ff9d';
        pCtx.lineWidth = 2;
        pCtx.strokeRect(plateX, plateY, plateW, plateH);

        const charCount = 10;
        const charW = plateW / (charCount + 1.5);
        const chars = ['D', 'L', '3', '6', 'A', 'H', '0', '8', '5', '7'];

        chars.forEach((c, i) => {
          const cx = plateX + (i * charW * 1.05) + (charW * 0.4);
          const cy = plateY + 4;
          const cw = charW * 0.85;
          const ch = plateH - 8;

          pCtx.strokeStyle = '#ffaa00';
          pCtx.strokeRect(cx, cy, cw, ch);

          pCtx.fillStyle = '#ffffff';
          pCtx.font = 'bold 12px IBM Plex Mono, monospace';
          pCtx.fillText(c, cx + 4, cy - 4);
        });

        if (alprResultText) {
          alprResultText.innerHTML = `<span style="color:var(--green)">RECOGNIZED STRING:</span> <strong>DL 36 AH 0857</strong> (Template Correlation: 98.4% Match)`;
        }
      } else {
        if (alprResultText) alprResultText.innerHTML = `<strong>STAGE: Raw Vehicle Input Frame</strong> (Awaiting MATLAB pipeline execution)`;
      }
    }

    if (alprStepSelect) {
      alprStepSelect.addEventListener('change', (e) => {
        renderALPR(e.target.value);
      });
    }

    if (alprRunBtn) {
      alprRunBtn.addEventListener('click', () => {
        let currentStep = 0;
        const steps = ['gray', 'sobel', 'roi', 'ocr'];
        alprRunBtn.disabled = true;
        alprRunBtn.textContent = 'Processing Pipeline...';

        const stepTimer = setInterval(() => {
          if (currentStep < steps.length) {
            renderALPR(steps[currentStep]);
            if (alprStepSelect) alprStepSelect.value = steps[currentStep];
            currentStep++;
          } else {
            clearInterval(stepTimer);
            alprRunBtn.disabled = false;
            alprRunBtn.textContent = 'Run Full MATLAB Pipeline';
          }
        }, 600);
      });
    }
  }

  // --------------------------------------------------
  // 6. DYNAMIC PROJECT SEARCH & FILTERING
  // --------------------------------------------------
  const searchInput = document.getElementById('projectSearchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectCountBadge = document.getElementById('projectCount');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const textContent = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || category.includes(currentCategory));
      const matchesSearch = (!currentSearchQuery || textContent.includes(currentSearchQuery));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    if (projectCountBadge) {
      projectCountBadge.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // --------------------------------------------------
  // 7. DYNAMIC ARCHITECTURE MODAL
  // --------------------------------------------------
  const modalOverlay = document.getElementById('architectureModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');

  const ARCHITECTURE_DATA = {
    'iot-energy': {
      title: "IoT Remote Computer Room Energy Platform",
      subtitle: "Published Telemetry System for Telecom Infrastructure (IJNIET)",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ End-to-End System Architecture:</h4>
          <p>DHT11 Sensors & Analog MQ Gas Sensor -> <strong>NodeMCU (ESP8266)</strong> Microcontroller -> <strong>MQTT Pub/Sub Protocol</strong> -> <strong>Blynk Cloud Gateway</strong> -> Automated Relay Actuator (<34°C Standby, >34°C High-Speed Cooling).</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 Key Technical Metrics:</h4>
          <ul>
            <li><strong>Energy Overhead Reduction:</strong> ~28% documented power savings in telecom RCR shelters.</li>
            <li><strong>Transmission Protocol:</strong> Lightweight MQTT broker minimizing payload over cellular 4G links.</li>
            <li><strong>Fail-safe Mechanism:</strong> Dual-relay hardware trip lines trigger automated shutoff upon smoke/gas hazard detection.</li>
          </ul>

          <h4 style="color:var(--green); margin:16px 0 8px;">📜 Peer-Reviewed Research Publication:</h4>
          <p>Authored research paper: <em>"Energy Saving and Management Using MQTT Protocol in Telecom Operators' Remote Computer Room"</em> published in the International Journal of New Innovations in Engineering and Technology (IJNIET).</p>
        </div>
      `
    },
    'smart-garbage': {
      title: "Smart Civic Cleanliness & Waste Monitoring System",
      subtitle: "IoT Volumetric Depth Telemetry & Dynamic Dispatch Logistics",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ Ultrasonic Sensor & Cloud Pipeline:</h4>
          <p>HC-SR04 Ultrasonic Sensor (Trigger D5, Echo D6) -> <strong>NodeMCU ESP8266</strong> -> Wi-Fi Ingress -> <strong>ThingSpeak Cloud Channel</strong> -> <strong>MATLAB Cloud Analytics Engine</strong> -> Automated Email Webhooks.</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 System Capabilities:</h4>
          <ul>
            <li><strong>Continuous Volumetric Monitoring:</strong> Measures distance from container lid to solid waste top with ±1cm accuracy.</li>
            <li><strong>Automated Route Optimization:</strong> Triggers alerts when bin fill levels cross the 85% critical threshold, saving municipal fuel and routing time by 35%.</li>
          </ul>
        </div>
      `
    },
    'license-plate': {
      title: "Automated License Plate Recognition (ALPR) System",
      subtitle: "Computer Vision Pipeline with ROI Localization & Character Segmentation",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ MATLAB Algorithmic Processing Chain:</h4>
          <p>Raw Vehicle Image (JPEG) -> <strong>2D Median Filtering</strong> -> <strong>Contrast Histogram Equalization</strong> -> <strong>Sobel Gradient Edge Detection</strong> -> <strong>Morphological Dilation</strong> -> Connected-Component Bounding Box -> <strong>Character Template Matching OCR</strong>.</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 Performance Defense:</h4>
          <ul>
            <li><strong>ROI Detection Rate:</strong> 94.2% successful plate localization across multi-angle vehicle frames.</li>
            <li><strong>National Demonstration:</strong> Presented and demonstrated live at the National Level Technical Symposium at Excel Engineering College.</li>
          </ul>
        </div>
      `
    },
    'library-system': {
      title: "Online Library Management & Circulation Engine",
      subtitle: "Enterprise Record Administration & Multi-Role Data Governance",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ Enterprise Java Layered Architecture:</h4>
          <p>Presentation Layer -> Service Business Logic -> <strong>Data Access Object (DAO) Pattern</strong> -> <strong>JDBC Connection Management (HikariCP)</strong> -> <strong>MySQL RDBMS</strong>.</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 ACID & Security Safeguards:</h4>
          <ul>
            <li><strong>SQL Injection Shielded:</strong> Parameterized <code>PreparedStatement</code> objects across all search, issue, and return queries.</li>
            <li><strong>Transaction Isolation:</strong> Atomic book status transitions guarding inventory counts against concurrent race conditions.</li>
          </ul>
        </div>
      `
    },
    'customer-mgmt': {
      title: "Customer Information Management System",
      subtitle: "Multi-Tier Web Architecture with Java Servlets, JSP & MySQL",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ MVC Architecture Workflow:</h4>
          <p><strong>View (JSP / Semantic HTML5)</strong> -> <strong>Controller (Java Servlets & Request Dispatchers)</strong> -> <strong>Model (Java Beans & DAO Layer)</strong> -> <strong>Transactional MySQL DB</strong> on Apache Tomcat.</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 Key Functionalities:</h4>
          <ul>
            <li>Complete Create, Read, Update, Delete (CRUD) administrative operations for corporate profiles.</li>
            <li>Session management and server-side request sanitization preventing unauthorized access.</li>
          </ul>
        </div>
      `
    },
    'spring-api': {
      title: "Scalable E-Commerce REST API & Microservice Engine",
      subtitle: "Spring Boot, JWT Security & Relational Data Orchestration",
      body: `
        <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
          <h4 style="color:var(--cyan); margin-bottom:8px;">⚡ Spring Boot Enterprise Microservice Stack:</h4>
          <p>Client REST Request -> <strong>Spring Security Filter Chain (Stateless JWT)</strong> -> <strong>RestController</strong> -> DTO / Bean Validation (JSR 380) -> <strong>Service Layer</strong> -> <strong>Spring Data JPA / Hibernate</strong> -> MySQL Database.</p>
          
          <h4 style="color:var(--amber); margin:16px 0 8px;">📊 Key Security & Resiliency:</h4>
          <ul>
            <li>Role-Based Access Control (RBAC) with token expiration and refresh token rotation.</li>
            <li>Optimistic database locking guarding checkout inventory reservations against double-spending.</li>
          </ul>
        </div>
      `
    }
  };

  window.openArchitectureModal = function(id) {
    const data = ARCHITECTURE_DATA[id];
    if (data && modalOverlay && modalTitle && modalSubtitle && modalBody) {
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalBody.innerHTML = data.body;
      modalOverlay.classList.add('active');
    }
  };

  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --------------------------------------------------
  // 8. DYNAMIC CONTACT FORM SUBMISSION
  // --------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const msg = document.getElementById('contactMsg').value.trim();

      if (!name || !email || !msg) {
        alert("Please fill in your name, email, and message.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> Dispatching Payload...`;

      setTimeout(() => {
        // Trigger mailto fallback so it works without server backend
        const mailtoLink = `mailto:ravichandranmegathesh@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${msg}`)}`;
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>✉️</span> Send Message`;
        contactForm.reset();

        const toast = document.getElementById('toastMsg');
        if (toast) {
          toast.textContent = "Message payload prepared! Opening your mail client...";
          toast.style.display = 'block';
          setTimeout(() => { toast.style.display = 'none'; }, 4500);
        }

        window.location.href = mailtoLink;
      }, 800);
    });
  }

  // --------------------------------------------------
  // 9. INTERACTIVE UNIX CLI SHELL ENGINE
  // --------------------------------------------------
  const cliDrawer = document.getElementById('cliDrawer');
  const cliToggleBtn = document.getElementById('cliToggleBtn');
  const cliCloseBtn = document.getElementById('cliCloseBtn');
  const cliMinimizeBtn = document.getElementById('cliMinimizeBtn');
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');

  function openCLI() {
    if (cliDrawer) {
      cliDrawer.classList.add('active');
      cliDrawer.setAttribute('aria-hidden', 'false');
      if (cliInput) cliInput.focus();
    }
  }

  function closeCLI() {
    if (cliDrawer) {
      cliDrawer.classList.remove('active');
      cliDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (cliToggleBtn) cliToggleBtn.addEventListener('click', openCLI);
  if (cliCloseBtn) cliCloseBtn.addEventListener('click', closeCLI);
  if (cliMinimizeBtn) cliMinimizeBtn.addEventListener('click', closeCLI);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cliDrawer && cliDrawer.classList.contains('active')) {
      closeCLI();
    }
  });

  const commands = {
    help: () => `
<div class="fg-amber">AVAILABLE COMMANDS IN MEGATHESH'S FULL-STACK TERMINAL:</div>
  <span class="fg-cyan">help</span>          - Display available command set
  <span class="fg-cyan">git status</span>    - Show current git branch & working tree state
  <span class="fg-cyan">git repos</span>     - Dynamically fetch live public repos from GitHub API
  <span class="fg-cyan">cat resume</span>    - Print full resume details and professional summary
  <span class="fg-cyan">cat fullstack</span> - Display complete full-stack architecture capabilities
  <span class="fg-cyan">cat skills</span>    - Output tech matrix (Core Java, Spring, MySQL, Servlets)
  <span class="fg-cyan">cat experience</span>- View VEI Technologies internship & Accord IAO training
  <span class="fg-cyan">cat education</span> - View Kongunadu College B.E. ECE & Polytechnic (94%)
  <span class="fg-cyan">cat publication</span>- Read IJNIET peer-reviewed research paper summary
  <span class="fg-cyan">ls projects</span>   - Enumerate all software, web, & IoT repositories
  <span class="fg-cyan">run api</span>       - Execute simulated full-stack REST API dispatch
  <span class="fg-cyan">ping blynk</span>    - Run simulated MQTT telemetry handshake
  <span class="fg-cyan">download</span>      - Trigger Megatheeswaran_Resume.pdf download
  <span class="fg-cyan">contact</span>       - Show direct phone, email & social links
  <span class="fg-cyan">clear</span>         - Clear shell output window
`,
    'git status': () => `
<div class="fg-green">On branch main</div>
Your branch is up to date with 'origin/main'.
GitHub Actions Deployment: <span class="fg-cyan">active (deploy.yml -> pages)</span>
nothing to commit, working tree clean
`,
    'git repos': async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        if (res.ok) {
          const data = await res.json();
          let out = `<div class="fg-green">LIVE GITHUB REPOSITORIES FOR ${GITHUB_USERNAME}:</div>\n`;
          data.forEach(r => {
            out += ` * <span class="fg-amber">${r.name}</span> (${r.language || 'Code'}) -> <a href="${r.html_url}" target="_blank" class="fg-cyan">${r.html_url}</a>\n`;
          });
          return out;
        }
      } catch (e) {}
      return `<div class="fg-amber">* Iot_Energy_Monitoring_System (C++) -> https://github.com/Megatheshwaran-R/Iot_Energy_Monitoring_System</div>`;
    },
    'cat fullstack': () => `
<div class="fg-cyan">FULL STACK DEVELOPER ARCHITECTURE STACK:</div>
• FRONTEND   : HTML5, CSS3, JavaScript (ES6+), React Concepts, Responsive Layouts, Fetch/AJAX
• BACKEND    : Core Java, OOP Principles, Spring Boot, Java Servlets, JSP, REST APIs, Tomcat
• DATABASE   : MySQL RDBMS, Relational Schema Modeling, DDL/DML, PreparedStatements, ACID, JPA
• IOT & SYST : NodeMCU ESP8266, MQTT Protocol, Blynk IoT Cloud, ThingSpeak, MATLAB Vision
• TOOLING    : Eclipse IDE, VS Code, Git, GitHub Actions, Postman, Arduino IDE
`,
    'cat resume': () => `
<div class="fg-green">MEGATHESHWARAN R — FULL STACK DEVELOPER (JAVA & WEB)</div>
Location: Karapakkam, Chennai, Tamil Nadu (Open to relocation: Bangalore / Hyderabad / Coimbatore)
Email: ravichandranmegathesh@gmail.com | Phone: +91 9092734889
GitHub: github.com/Megatheshwaran-R | LinkedIn: linkedin.com/in/megathesh-ravichandran-1053061a0

<div class="fg-amber">PROFESSIONAL SUMMARY:</div>
2024 B.E. ECE graduate with IAO Accredited Java Full Stack certification from Accord Info Matrix and enterprise
internship exposure at VEI Technologies Pvt. Ltd. Specialized in Core Java, OOP principles, SQL/MySQL, JDBC,
JSP, Servlets, and Spring Boot REST APIs with academic IoT research published in IJNIET. Available for immediate joining.
`,
    'cat skills': () => `
<div class="fg-amber">TECH MATRIX & CORE CAPABILITIES:</div>
• Core Java & OOP   : JDK, JVM, OOP Principles, Exception Handling, Collections Framework
• Java Web & Servlets: JDBC (Connection Management, Statements, PreparedStatements), Servlets, JSP, Tomcat
• Database Mgmt    : MySQL (Relational Schema Design, DDL/DML, CRUD, Constraints, Joins, ACID)
• Web Technologies  : HTML5 (Semantic), CSS3 (Flexbox/Grid), JavaScript (DOM, Fetch API)
• IoT & Microchips  : NodeMCU ESP8266, DHT11, HC-SR04 Ultrasonic, MQ Gas/Flame, Relays, Blynk, ThingSpeak
• Computing & Tools : Eclipse IDE, VS Code, Git/GitHub, MATLAB/Simulink, Postman
`,
    'cat experience': () => `
<div class="fg-green">INTERNSHIP & ACCREDITED TRAINING:</div>
⚡ Full Stack Development Intern | VEI Technologies Pvt. Ltd., Chennai (Feb 15 - Mar 2, 2024)
   - Software Development Life Cycle (SDLC) workflows and clean code structuring conventions.
   - Analyzed Java web application codebases to understand MVC architecture and backend persistence.
   - Hands-on technical sessions covering sensor integration and microcontroller programming.

⚡ Java Full Stack Program | Accord Info Matrix (IAO Accredited)
   - Certified in Java Technology (ID: AIM JT 18529) and Web Application Development (ID: AIM WD 18530).
`,
    'cat education': () => `
<div class="fg-purple">ACADEMIC BACKGROUND:</div>
🎓 B.E. in Electronics & Communication Engineering (2021 – 2024)
   Kongunadu College of Engineering and Technology | CGPA: 7.54 / 10.0
🎓 Diploma in Electrical & Electronics Engineering (2018 – 2021)
   Kongunadu Polytechnic College | 94.0% with Distinction
🎓 SSLC Matriculation (2018)
   Dr. G. Viswanathanpillai Matric High School | 79.6% (First Class)
`,
    'cat publication': () => `
<div class="fg-green">PEER-REVIEWED JOURNAL PUBLICATION:</div>
Title   : "Energy Saving and Management Using MQTT Protocol in Telecom Operators' Remote Computer Room"
Journal : International Journal of New Innovations in Engineering and Technology (IJNIET)
Scope   : Automated temperature telemetry, MQTT pub/sub transmission, and threshold cooling relay control.
`,
    'ls projects': () => `
<div class="fg-amber">PORTFOLIO PROJECTS:</div>
 [1] IoT Energy Saving & Management for Telecom Operators & RCRs (IJNIET Paper, Blynk, MQTT, ESP8266)
 [2] Smart Garbage Monitoring System using IoT (ESP8266, Ultrasonic, ThingSpeak, MATLAB Alerts)
 [3] License Plate Recognition Using MATLAB (Character Segmentation, ROI Detection, OCR)
 [4] Online Library Management System (Core Java, JDBC, MySQL, PreparedStatements)
 [5] Customer Information Management System (Java Servlets, JSP, JDBC, MVC, Tomcat)
 [6] Scalable E-Commerce REST API Engine (Spring Boot, JWT Security, Hibernate JPA)
`,
    'run api': () => `
<div class="fg-cyan">HTTP POST /api/v1/customers -> 201 Created</div>
Payload processed by Java Servlet controller -> HikariCP Pool -> PreparedStatement bound -> MySQL Row Committed (12.4ms)
`,
    'ping blynk': () => `
<div class="fg-green">PING blynk-cloud.com (139.59.206.133): 56 data bytes</div>
64 bytes from 139.59.206.133: icmp_seq=0 ttl=54 time=18.421 ms [MQTT Broker Active]
64 bytes from 139.59.206.133: icmp_seq=1 ttl=54 time=19.012 ms [Topic: /telecom/temp = 28C]
--- blynk-cloud.com ping statistics --- 2 packets transmitted, 0% packet loss
`,
    download: () => {
      const a = document.createElement('a');
      a.href = 'Megatheeswaran_Resume.pdf';
      a.download = 'Megatheeswaran_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return `<div class="fg-green">Initiating download for Megatheeswaran_Resume.pdf...</div>`;
    },
    contact: () => `
<div class="fg-cyan">CONTACT CHANNELS:</div>
• Email    : <a href="mailto:ravichandranmegathesh@gmail.com" class="fg-amber">ravichandranmegathesh@gmail.com</a>
• Phone    : <span class="fg-green">+91 9092734889</span>
• LinkedIn : <a href="https://linkedin.com/in/megathesh-ravichandran-1053061a0" target="_blank" class="fg-cyan">linkedin.com/in/megathesh-ravichandran-1053061a0</a>
• GitHub   : <a href="https://github.com/Megatheshwaran-R" target="_blank" class="fg-cyan">github.com/Megatheshwaran-R</a>
`,
    clear: () => {
      if (cliOutput) cliOutput.innerHTML = '';
      return '';
    }
  };

  if (cliInput && cliOutput) {
    cliInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const rawCmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';

        if (!rawCmd) return;

        const cmdLine = document.createElement('div');
        cmdLine.className = 'cli-line';
        cmdLine.innerHTML = `<span class="cli-prompt">megathesh@fullstack:~$</span> <span class="fg-amber">${rawCmd}</span>`;
        cliOutput.appendChild(cmdLine);

        if (commands[rawCmd]) {
          const resp = await commands[rawCmd]();
          if (resp) {
            const respLine = document.createElement('div');
            respLine.className = 'cli-line';
            respLine.innerHTML = resp;
            cliOutput.appendChild(respLine);
          }
        } else {
          const errLine = document.createElement('div');
          errLine.className = 'cli-line fg-dim';
          errLine.innerHTML = `command not found: ${rawCmd}. Type <span class="fg-amber">'help'</span> for available commands.`;
          cliOutput.appendChild(errLine);
        }

        cliOutput.parentElement.scrollTop = cliOutput.parentElement.scrollHeight;
      }
    });
  }

});

// Global Copy Email Helper
function copyEmail() {
  const email = "ravichandranmegathesh@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toastMsg');
    const copyText = document.getElementById('copyEmailText');
    if (copyText) copyText.textContent = 'Email Copied!';
    if (toast) {
      toast.textContent = "Email copied to clipboard!";
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
        if (copyText) copyText.textContent = 'Copy Email';
      }, 3500);
    }
  }).catch(() => {
    alert("Email: " + email);
  });
}
