// ==========================================================================
// Megatheshwaran R — Super 3D React Portfolio Application
// Powered by React 18 & Three.js WebGL
// ==========================================================================

const { useState, useEffect, useRef, useMemo } = React;

// --------------------------------------------------------------------------
// Sound Effects Synthesizer (Web Audio API)
// --------------------------------------------------------------------------
class CyberAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playPulse() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
}

const soundFX = new CyberAudio();

// --------------------------------------------------------------------------
// 3D Three.js Interactive Hero Canvas Component
// --------------------------------------------------------------------------
function ThreeHeroCanvas({ modelMode, setModelMode, themeColor, isWireframe, pulseTrigger }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const groupRef = useRef(null);
  const satellitesRef = useRef([]);
  const shockwaveRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, lastX: 0, lastY: 0 });

  // Color mapping
  const colorHex = useMemo(() => {
    switch (themeColor) {
      case 'cyan': return 0x00f0ff;
      case 'green': return 0x00ff9d;
      case 'purple': return 0xb026ff;
      case 'amber': return 0xffaa00;
      default: return 0x00f0ff;
    }
  }, [themeColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(colorHex, 2.5, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 3. Main Rotating Group
    const rootGroup = new THREE.Group();
    groupRef.current = rootGroup;
    scene.add(rootGroup);

    // 4. Build 3D Geometries based on modelMode
    function buildModel() {
      // Clear previous children
      while (rootGroup.children.length > 0) {
        const obj = rootGroup.children[0];
        rootGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      }
      satellitesRef.current = [];

      const mainMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        wireframe: isWireframe,
        roughness: 0.2,
        metalness: 0.8,
        emissive: colorHex,
        emissiveIntensity: isWireframe ? 0.35 : 0.15
      });

      const wireMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });

      if (modelMode === 'core') {
        // Holographic Cyber Core: Outer Icosahedron + Inner Octahedron + Ring
        const outerGeo = new THREE.IcosahedronGeometry(6.5, 1);
        const outerMesh = new THREE.Mesh(outerGeo, wireMat);
        rootGroup.add(outerMesh);

        const innerGeo = new THREE.OctahedronGeometry(4, 0);
        const innerMesh = new THREE.Mesh(innerGeo, mainMat);
        innerMesh.name = "coreInner";
        rootGroup.add(innerMesh);

        const ringGeo = new THREE.TorusGeometry(8.5, 0.12, 16, 100);
        const ringMesh = new THREE.Mesh(ringGeo, wireMat);
        ringMesh.rotation.x = Math.PI / 3;
        rootGroup.add(ringMesh);

        // 6 Orbiting Satellites (Java, Spring, MySQL, IoT, React, REST)
        const labels = ['JAVA', 'SPRING', 'MYSQL', 'IOT', 'REACT', 'REST'];
        labels.forEach((label, i) => {
          const satGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
          const satMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            wireframe: false,
            metalness: 0.9,
            roughness: 0.1,
            emissive: colorHex,
            emissiveIntensity: 0.4
          });
          const sat = new THREE.Mesh(satGeo, satMat);
          sat.userData = { angle: (i / labels.length) * Math.PI * 2, radius: 10, speed: 0.015 + (i * 0.003) };
          rootGroup.add(sat);
          satellitesRef.current.push(sat);
        });

      } else if (modelMode === 'galaxy') {
        // 3D Skill Galaxy: Multi-ring Solar System with Central Star
        const sunGeo = new THREE.SphereGeometry(3.5, 32, 32);
        const sunMesh = new THREE.Mesh(sunGeo, mainMat);
        rootGroup.add(sunMesh);

        // Orbit Rings
        [6.5, 9, 11.5, 14].forEach((radius, idx) => {
          const rGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
          const rMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
          const rMesh = new THREE.Mesh(rGeo, rMat);
          rMesh.rotation.x = Math.PI / 2 + (idx * 0.15);
          rootGroup.add(rMesh);

          // Planet on ring
          const pGeo = new THREE.DodecahedronGeometry(0.8, 0);
          const pMat = new THREE.MeshStandardMaterial({ color: colorHex, wireframe: isWireframe, emissive: colorHex, emissiveIntensity: 0.3 });
          const planet = new THREE.Mesh(pGeo, pMat);
          planet.userData = { angle: idx * 1.5, radius, speed: 0.02 / (idx + 1) };
          rootGroup.add(planet);
          satellitesRef.current.push(planet);
        });

      } else if (modelMode === 'torus') {
        // Quantum Torus Knot
        const knotGeo = new THREE.TorusKnotGeometry(4.8, 1.2, 120, 16, 2, 5);
        const knotMesh = new THREE.Mesh(knotGeo, mainMat);
        rootGroup.add(knotMesh);

        const outerCage = new THREE.SphereGeometry(8, 16, 16);
        const cageMesh = new THREE.Mesh(outerCage, wireMat);
        rootGroup.add(cageMesh);

      } else if (modelMode === 'matrix') {
        // Cyber Matrix Tesseract
        const box1 = new THREE.BoxGeometry(6, 6, 6);
        const mesh1 = new THREE.Mesh(box1, wireMat);
        rootGroup.add(mesh1);

        const box2 = new THREE.BoxGeometry(3.2, 3.2, 3.2);
        const mesh2 = new THREE.Mesh(box2, mainMat);
        rootGroup.add(mesh2);

        // Connect corner rays
        const points = [];
        const corners = [
          [-3, -3, -3], [3, -3, -3], [3, 3, -3], [-3, 3, -3],
          [-3, -3, 3], [3, -3, 3], [3, 3, 3], [-3, 3, 3]
        ];
        corners.forEach(([x, y, z]) => {
          points.push(new THREE.Vector3(x, y, z));
          points.push(new THREE.Vector3(x * 0.53, y * 0.53, z * 0.53));
        });
        const rayGeo = new THREE.BufferGeometry().setFromPoints(points);
        const rayMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.5 });
        const rays = new THREE.LineSegments(rayGeo, rayMat);
        rootGroup.add(rays);
      }
    }

    buildModel();

    // 5. Local Particle Starfield
    const partCount = 450;
    const partGeo = new THREE.BufferGeometry();
    const partPositions = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i += 3) {
      partPositions[i] = (Math.random() - 0.5) * 50;
      partPositions[i + 1] = (Math.random() - 0.5) * 50;
      partPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
    const partMat = new THREE.PointsMaterial({
      color: colorHex,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(partGeo, partMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 6. Interactive Shockwave Ring
    const shockGeo = new THREE.RingGeometry(0.1, 0.4, 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const shockwave = new THREE.Mesh(shockGeo, shockMat);
    shockwaveRef.current = shockwave;
    scene.add(shockwave);

    // 7. Mouse Orbit Drag & Parallax
    const onMouseDown = (e) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouseRef.current.targetX = x * 0.6;
      mouseRef.current.targetY = y * 0.6;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        rootGroup.rotation.y += deltaX * 0.01;
        rootGroup.rotation.x += deltaY * 0.01;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const onMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        mouseRef.current.isDragging = true;
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (mouseRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - mouseRef.current.lastX;
        const deltaY = e.touches[0].clientY - mouseRef.current.lastY;
        rootGroup.rotation.y += deltaX * 0.015;
        rootGroup.rotation.x += deltaY * 0.015;
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth parallax lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!mouseRef.current.isDragging) {
        rootGroup.rotation.y += 0.008;
        rootGroup.rotation.x += 0.004;
      }

      rootGroup.position.x = mouseRef.current.x * 2;
      rootGroup.position.y = mouseRef.current.y * 2;

      // Inner Core Pulse
      const coreInner = rootGroup.getObjectByName("coreInner");
      if (coreInner) {
        const scale = 1 + Math.sin(time * 3) * 0.08;
        coreInner.scale.set(scale, scale, scale);
      }

      // Orbiting Satellites
      satellitesRef.current.forEach((sat) => {
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = Math.sin(sat.userData.angle * 2) * 1.5;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      // Slowly rotate particle field
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.02;
        particlesRef.current.rotation.x = time * 0.01;
      }

      // Animate shockwave if active
      if (shockwaveRef.current && shockwaveRef.current.userData.expanding) {
        shockwaveRef.current.scale.x += delta * 18;
        shockwaveRef.current.scale.y += delta * 18;
        shockwaveRef.current.material.opacity -= delta * 1.2;
        if (shockwaveRef.current.material.opacity <= 0) {
          shockwaveRef.current.userData.expanding = false;
          shockwaveRef.current.material.opacity = 0;
          shockwaveRef.current.scale.set(1, 1, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [modelMode, colorHex, isWireframe]);

  // Pulse Wave trigger effect
  useEffect(() => {
    if (pulseTrigger && shockwaveRef.current) {
      soundFX.playPulse();
      shockwaveRef.current.scale.set(1, 1, 1);
      shockwaveRef.current.material.opacity = 0.9;
      shockwaveRef.current.userData.expanding = true;
    }
  }, [pulseTrigger]);

  return (
    <div className="hero-3d-wrap">
      <div ref={mountRef} className="hero-3d-canvas" title="Click and drag to rotate 3D viewport" />
      
      {/* 3D Model HUD Indicator */}
      <div className="hud-badge-info">
        <span className="pulse-dot"></span>
        <span>WebGL 60 FPS // 3D Interactive Viewport</span>
      </div>

      <button className="hud-pulse-btn" onClick={() => {
        soundFX.playPulse();
        if (shockwaveRef.current) {
          shockwaveRef.current.scale.set(1, 1, 1);
          shockwaveRef.current.material.opacity = 0.9;
          shockwaveRef.current.userData.expanding = true;
        }
      }}>
        <span>⚡</span> Pulse Energy Wave
      </button>

      {/* Interactive 3D Model HUD Controls */}
      <div className="hud-bar">
        <div className="hud-title">
          <span>❖ 3D GEOMETRY:</span>
        </div>
        <div className="hud-group">
          <button className={`hud-btn ${modelMode === 'core' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setModelMode('core'); }}>Cyber Core</button>
          <button className={`hud-btn ${modelMode === 'galaxy' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setModelMode('galaxy'); }}>Skill Galaxy</button>
          <button className={`hud-btn ${modelMode === 'torus' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setModelMode('torus'); }}>Quantum Torus</button>
          <button className={`hud-btn ${modelMode === 'matrix' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setModelMode('matrix'); }}>Tesseract</button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Global Ambient 3D Three.js Particle Starfield
// --------------------------------------------------------------------------
function AmbientBackground3D({ themeColor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Starfield particles
    const starCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      positions[i + 2] = (Math.random() - 0.5) * 2000;

      // Cyan to purple gradient stars
      colors[i] = 0.0;
      colors[i + 1] = 0.94;
      colors[i + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      starField.rotation.y += 0.0006;
      starField.rotation.x += 0.0003;
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas id="three-bg-canvas" ref={canvasRef} />;
}

// --------------------------------------------------------------------------
// RainBackground Component
// --------------------------------------------------------------------------
function RainBackground({ rainMode = 'cyber' }) {
  const rainRef = useRef(null);

  useEffect(() => {
    const canvas = rainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let currentWind = -0.12;
    let targetWind = -0.12;
    let lastMouseX = 0;
    let lightningAlpha = 0;
    let nextLightning = Date.now() + 14000;

    const isMobile = window.innerWidth < 768;
    const count = rainMode === 'storm' ? (isMobile ? 150 : 300) : (isMobile ? 85 : 180);

    let drops = [];
    let ripples = [];

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 0.75 + 0.25;
      drops.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * (height + 200) - 100,
        z: z,
        length: (22 + Math.random() * 26) * z,
        speed: (15 + Math.random() * 12) * z,
        thickness: (0.75 + Math.random() * 0.95) * z,
        alpha: (0.25 + Math.random() * 0.6) * z
      });
    }

    const fontSize = 14;
    let matrixCols = Math.floor(width / fontSize);
    let matrixDrops = [];
    const matrixGlyphs = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈJAVA0x4F{}();=>intvoid';
    for (let i = 0; i < matrixCols; i++) {
      matrixDrops.push({
        y: Math.floor(Math.random() * -30),
        speed: Math.random() * 0.5 + 0.8
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      matrixCols = Math.floor(width / fontSize);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const dx = (e.clientX - lastMouseX) * 0.0025;
      lastMouseX = e.clientX;
      targetWind = -0.12 + Math.max(-0.4, Math.min(0.4, dx));
    };
    window.addEventListener('mousemove', handleMouseMove);

    let reqId;
    let lastMatrix = 0;

    const render = (timestamp) => {
      reqId = requestAnimationFrame(render);
      if (rainMode === 'off') {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      currentWind += (targetWind - currentWind) * 0.04;
      targetWind += (-0.12 - targetWind) * 0.02;

      if (rainMode === 'matrix') {
        ctx.fillStyle = 'rgba(7, 9, 14, 0.16)';
        ctx.fillRect(0, 0, width, height);
        if (timestamp - lastMatrix > 45) {
          lastMatrix = timestamp;
          ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;
          for (let i = 0; i < matrixCols; i++) {
            const col = matrixDrops[i];
            const x = i * fontSize;
            const y = col.y * fontSize;
            const g = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
            if (y > 0 && y < height + 40) {
              ctx.fillStyle = '#ffffff';
              ctx.fillText(g, x, y);
              ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
              ctx.fillText(g, x, y - fontSize);
            }
            col.y += col.speed;
            if (col.y * fontSize > height && Math.random() > 0.975) {
              col.y = Math.floor(Math.random() * -15);
            }
          }
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (rainMode === 'storm') {
        const now = Date.now();
        if (now > nextLightning) {
          lightningAlpha = 0.18;
          nextLightning = now + 12000 + Math.random() * 14000;
        }
        if (lightningAlpha > 0.005) {
          ctx.fillStyle = `rgba(180, 235, 255, ${lightningAlpha})`;
          ctx.fillRect(0, 0, width, height);
          lightningAlpha *= 0.86;
        }
      }

      const speedMult = rainMode === 'storm' ? 1.6 : 1.0;
      const sinA = Math.sin(currentWind);
      const cosA = Math.cos(currentWind);

      ctx.lineCap = 'round';
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.x += sinA * d.speed * speedMult;
        d.y += cosA * d.speed * speedMult;

        const tailX = d.x - sinA * d.length;
        const tailY = d.y - cosA * d.length;

        const grad = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.65, `rgba(0, 240, 255, ${d.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(200, 250, 255, ${d.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = d.thickness;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();

        if (d.y > height + 10) {
          if (ripples.length < 30) {
            ripples.push({ x: d.x, y: height - 2, rx: 1, ry: 0.35, maxR: (5 + Math.random() * 7) * d.z, alpha: 0.7 * d.z });
          }
          d.y = -d.length - Math.random() * 40;
          d.x = Math.random() * (width + 400) - 200;
        }
        if (d.x < -200) d.x = width + 150;
        if (d.x > width + 200) d.x = -150;
      }

      for (let r = ripples.length - 1; r >= 0; r--) {
        const rp = ripples[r];
        rp.rx += 0.55;
        rp.ry += 0.22;
        rp.alpha -= 0.035;
        if (rp.alpha <= 0 || rp.rx >= rp.maxR) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(0, 240, 255, ${rp.alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.rx, rp.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    render(0);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rainMode]);

  return <canvas ref={rainRef} className="rain-canvas" aria-hidden="true" />;
}

// --------------------------------------------------------------------------
// Navigation Bar Component
// --------------------------------------------------------------------------
function Navbar({ onOpenTerminal, soundEnabled, setSoundEnabled, themeColor, setThemeColor, rainMode, setRainMode, onShowToast }) {
  const [copied, setCopied] = useState(false);

  const toggleSound = () => {
    soundFX.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) soundFX.playClick();
  };

  const cycleTheme = () => {
    soundFX.playClick();
    const themes = ['cyan', 'green', 'purple', 'amber'];
    const nextIdx = (themes.indexOf(themeColor) + 1) % themes.length;
    setThemeColor(themes[nextIdx]);
  };

  const cycleRain = () => {
    soundFX.playClick();
    const modes = ['cyber', 'storm', 'matrix', 'off'];
    const nextIdx = (modes.indexOf(rainMode) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setRainMode(nextMode);
    if (onShowToast) {
      const labels = {
        cyber: '⚡ Cyber Neon Rain Active',
        storm: '🌩️ Neon Thunderstorm Active',
        matrix: '💻 Matrix Code Rain Active',
        off: '🚫 Rain Disabled'
      };
      onShowToast(labels[nextMode] || `Rain Mode: ${nextMode}`);
    }
  };

  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a href="#overview" className="brand" onClick={() => soundFX.playClick()}>
          <img src="assets/megatheshwaran_logo.png" alt="Megathesh Logo" className="brand__logo" />
          <span className="brand__name">megathesh<span className="brand__accent">.dev</span></span>
          <span className="brand__badge">
            <span className="pulse-dot"></span> JAVA FULL STACK
          </span>
        </a>

        <nav className="nav">
          <a href="#overview" className="nav__link" onClick={() => soundFX.playClick()}>Overview</a>
          <a href="#simulator" className="nav__link" onClick={() => soundFX.playClick()}>Live Console</a>
          <a href="#github" className="nav__link" onClick={() => soundFX.playClick()}>GitHub Live</a>
          <a href="#skills" className="nav__link" onClick={() => soundFX.playClick()}>Skills Galaxy</a>
          <a href="#projects" className="nav__link" onClick={() => soundFX.playClick()}>Projects</a>
          <a href="#experience" className="nav__link" onClick={() => soundFX.playClick()}>Experience</a>
          <a href="#education" className="nav__link" onClick={() => soundFX.playClick()}>Education</a>
          <a href="#contact" className="nav__link nav__link--highlight" onClick={() => soundFX.playClick()}>Contact</a>
        </nav>

        <div className="topbar__actions">
          {/* Rain Mode Switcher */}
          <button className={`btn btn--rain ${rainMode !== 'off' ? 'rain-active' : 'rain-off'}`} onClick={cycleRain} title={`Atmospheric Rain: ${rainMode.toUpperCase()} (Click to toggle modes)`}>
            🌧️ <span className="rain-btn-text">Rain</span> <span className="rain-btn-badge">{rainMode.toUpperCase()}</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button className={`btn btn--icon ${soundEnabled ? 'active' : ''}`} title={`Sound FX: ${soundEnabled ? 'ON' : 'OFF'}`} onClick={toggleSound}>
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Theme Switcher */}
          <button className="btn btn--icon" title={`Theme Color: ${themeColor.toUpperCase()}`} onClick={cycleTheme}>
            🎨
          </button>

          {/* CLI Terminal Launcher */}
          <button className="btn btn--cli" onClick={() => { soundFX.playClick(); onOpenTerminal(); }} title="Toggle Interactive UNIX Terminal">
            <span>$_</span> CLI Shell
          </button>

          {/* Resume PDF */}
          <a href="Megatheeswaran_Resume.pdf" target="_blank" className="btn btn--primary" onClick={() => soundFX.playClick()} title="Download Resume PDF">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Resume PDF
          </a>
        </div>
      </div>
    </header>
  );
}

// --------------------------------------------------------------------------
// Multi-Mode Simulator Console Component
// --------------------------------------------------------------------------
function SimulatorConsole({ onShowToast }) {
  const [activeTab, setActiveTab] = useState('fullstack');
  const [selectedEndpoint, setSelectedEndpoint] = useState('customer');
  const [payloadText, setPayloadText] = useState('');
  const [responseOutput, setResponseOutput] = useState('');
  const [pipelineActiveStep, setPipelineActiveStep] = useState(0);

  // IoT State
  const [tempVal, setTempVal] = useState(28);
  const [fillVal, setFillVal] = useState(45);
  const [hazardAlert, setHazardAlert] = useState(false);
  const [isIotPaused, setIsIotPaused] = useState(false);

  // ALPR State
  const [alprStep, setAlprStep] = useState('raw');
  const [alprText, setAlprText] = useState('STAGE: Raw Vehicle Input Frame (Ready for computer vision processing)');

  const iotCanvasRef = useRef(null);
  const alprCanvasRef = useRef(null);

  // Init API Payload
  useEffect(() => {
    const ep = PORTFOLIO_DATA.simulators.endpoints.find(e => e.id === selectedEndpoint);
    if (ep) {
      setPayloadText(JSON.stringify(ep.payload, null, 2));
      setResponseOutput(`-- Target: ${ep.label}\n-- Ready for dispatch. Click "Dispatch Java Full Stack Request" below.`);
      setPipelineActiveStep(0);
    }
  }, [selectedEndpoint]);

  // Dispatch API Simulation
  const handleDispatchApi = () => {
    soundFX.playPulse();
    const ep = PORTFOLIO_DATA.simulators.endpoints.find(e => e.id === selectedEndpoint);
    if (!ep) return;

    setResponseOutput("// [HTTP DISPATCH] Initiating request through Java MVC Dispatcher Servlet...");
    setPipelineActiveStep(1);

    setTimeout(() => {
      setPipelineActiveStep(2);
      setResponseOutput(prev => prev + "\n// [CONTROLLER] @Valid Bean Validation & DTO mapping completed.");
    }, 250);

    setTimeout(() => {
      setPipelineActiveStep(3);
      setResponseOutput(prev => prev + "\n// [HIKARICP] Pooled JDBC Connection acquired in 3.2ms.");
    }, 500);

    setTimeout(() => {
      setPipelineActiveStep(4);
      soundFX.playBeep();
      const res = {
        ...ep.response,
        executedAt: new Date().toISOString(),
        clientPayloadEcho: JSON.parse(payloadText || '{}')
      };
      setResponseOutput(JSON.stringify(res, null, 2));
      onShowToast("Java Full Stack API Response Rendered!");
    }, 800);
  };

  // IoT Canvas Animation
  useEffect(() => {
    if (activeTab !== 'iot') return;
    const canvas = iotCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 240;

    let animId;
    let offset = 0;
    const history = [];

    const draw = () => {
      if (!isIotPaused) offset += 2;
      ctx.fillStyle = '#020509';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Temperature Waveform
      ctx.strokeStyle = tempVal > 34 ? '#ef4444' : '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = (canvas.height / 2) + Math.sin((x + offset) * 0.03) * (tempVal * 1.5) + Math.cos((x - offset) * 0.01) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Ultrasonic Fill Level Line
      ctx.strokeStyle = '#00ff9d';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      const fillY = canvas.height - (fillVal / 100) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, fillY);
      ctx.lineTo(canvas.width, fillY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Telemetry Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px monospace';
      ctx.fillText(`MQTT TOPIC: rcr/telecom/dht11 | AMBIENT: ${tempVal}°C | FILL: ${fillVal}%`, 14, 24);
      if (tempVal > 34 || hazardAlert) {
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`[CRITICAL] FAN RELAY TRIPPED // COOLING ACTIVE`, 14, 42);
      } else {
        ctx.fillStyle = '#00ff9d';
        ctx.fillText(`[NORMAL] MQTT HEARTBEAT SYNCED`, 14, 42);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [activeTab, tempVal, fillVal, hazardAlert, isIotPaused]);

  // ALPR Canvas Step-through
  useEffect(() => {
    if (activeTab !== 'alpr') return;
    const canvas = alprCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 240;

    ctx.fillStyle = '#020509';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mock vehicle shape
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width * 0.15, 30, canvas.width * 0.7, 180);

    // Bounding Box for License Plate
    const plateX = canvas.width * 0.35;
    const plateY = 130;
    const plateW = canvas.width * 0.3;
    const plateH = 45;

    if (alprStep === 'raw') {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(plateX, plateY, plateW, plateH);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px monospace';
      ctx.fillText("TN 48 BB 2024", plateX + 20, plateY + 28);
      setAlprText("Step 1: Raw Vehicle Frame Captured under variable illumination.");
    } else if (alprStep === 'gray') {
      ctx.fillStyle = '#475569';
      ctx.fillRect(plateX, plateY, plateW, plateH);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px monospace';
      ctx.fillText("TN 48 BB 2024", plateX + 20, plateY + 28);
      setAlprText("Step 2: Grayscale & Contrast Equalization applied (rgb2gray + histeq).");
    } else if (alprStep === 'sobel') {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(plateX, plateY, plateW, plateH);
      ctx.fillStyle = '#00f0ff';
      ctx.font = '16px monospace';
      ctx.fillText("| | | | | | | |", plateX + 20, plateY + 28);
      setAlprText("Step 3: Sobel Edge Detection & Morphological Dilation highlighted gradient contours.");
    } else if (alprStep === 'roi') {
      ctx.strokeStyle = '#00ff9d';
      ctx.lineWidth = 3;
      ctx.strokeRect(plateX - 5, plateY - 5, plateW + 10, plateH + 10);
      ctx.fillStyle = '#00ff9d';
      ctx.font = '16px monospace';
      ctx.fillText("TN 48 BB 2024", plateX + 20, plateY + 28);
      setAlprText("Step 4: Region of Interest (ROI) Isolated via Aspect Ratio Filter (4:1).");
    } else if (alprStep === 'ocr') {
      ctx.strokeStyle = '#b026ff';
      ctx.lineWidth = 3;
      ctx.strokeRect(plateX - 5, plateY - 5, plateW + 10, plateH + 10);
      ctx.fillStyle = '#00ff9d';
      ctx.font = 'bold 20px monospace';
      ctx.fillText("[T] [N] [4] [8] [B] [B] [2] [0] [2] [4]", plateX + 10, plateY + 30);
      setAlprText("Step 5: Optical Character Recognition (OCR) Matched 10/10 Characters (99.2% Confidence).");
    }
  }, [activeTab, alprStep]);

  return (
    <section className="section section--dark" id="simulator">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// REAL-TIME FULL STACK INTERACTION</p>
          <h2 className="h2">Interactive Java Full Stack & IoT Engineering Console</h2>
          <p className="section-desc">Test real-time REST API dispatches with editable payloads, simulate live IoT MQTT telemetry, and inspect computer vision character segmentation directly in your browser.</p>
        </div>

        <div className="sim-container">
          {/* Mode Switcher Tabs */}
          <div className="sim-nav">
            <button className={`sim-tab ${activeTab === 'fullstack' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setActiveTab('fullstack'); }}>
              <span>⚡</span> Java Full Stack REST API & MVC Dispatcher
            </button>
            <button className={`sim-tab ${activeTab === 'iot' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setActiveTab('iot'); }}>
              <span>📡</span> IoT Telecom & Smart Sanitation Telemetry
            </button>
            <button className={`sim-tab ${activeTab === 'alpr' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setActiveTab('alpr'); }}>
              <span>🚗</span> MATLAB License Plate Recognition (ALPR)
            </button>
          </div>

          {/* Tab 1: Full Stack API */}
          {activeTab === 'fullstack' && (
            <div className="sim-panel">
              <div className="sim-header">
                <div className="sim-title">
                  <span className="pulse-dot"></span> Java Web MVC -> Controller -> Service Layer -> MySQL PreparedStatement
                </div>
                <div className="sim-steps-chain">
                  <span className={`pipeline-step ${pipelineActiveStep >= 1 ? 'active' : ''}`}>1. Controller</span>
                  <span className={`pipeline-step ${pipelineActiveStep >= 2 ? 'active' : ''}`}>2. Validation</span>
                  <span className={`pipeline-step ${pipelineActiveStep >= 3 ? 'active' : ''}`}>3. HikariCP Pool</span>
                  <span className={`pipeline-step ${pipelineActiveStep >= 4 ? 'active' : ''}`}>4. ACID Transaction</span>
                </div>
              </div>

              <div className="sim-editor-grid">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    // INCOMING CLIENT HTTP PAYLOAD (EDITABLE JSON):
                  </div>
                  <textarea className="sim-code-area" value={payloadText} onChange={(e) => setPayloadText(e.target.value)} spellCheck="false" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    // SERVER MVC & DATABASE RESPONSE:
                  </div>
                  <pre className="sim-response-box">{responseOutput}</pre>
                </div>
              </div>

              <div className="sim-controls-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexGrow: 1 }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Route:</label>
                  <select className="form-select" value={selectedEndpoint} onChange={(e) => { soundFX.playClick(); setSelectedEndpoint(e.target.value); }}>
                    {PORTFOLIO_DATA.simulators.endpoints.map(ep => (
                      <option key={ep.id} value={ep.id}>{ep.label}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn--primary" onClick={handleDispatchApi}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  Dispatch Java Full Stack Request
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: IoT Telemetry */}
          {activeTab === 'iot' && (
            <div className="sim-panel">
              <div className="sim-header">
                <div className="sim-title">
                  <span className="pulse-dot"></span> ESP8266 NodeMCU & Blynk Cloud Telemetry Stream (MQTT Pub/Sub)
                </div>
                <div style={{ display: 'flex', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  <span>TEMP: <strong className={tempVal > 34 ? 'text-amber' : 'text-cyan'}>{tempVal} °C</strong></span>
                  <span>FAN RELAY: <strong className={tempVal > 34 ? 'text-amber' : 'text-green'}>{tempVal > 34 ? 'ACTUATED (HIGH)' : 'STANDBY'}</strong></span>
                  <span>BIN FILL: <strong className="text-green">{fillVal} %</strong></span>
                </div>
              </div>

              <div className="sim-canvas-viewport">
                <canvas ref={iotCanvasRef} className="sim-canvas" />
              </div>

              <div className="sim-controls-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>RCR Temp (°C):</label>
                    <input type="range" className="form-range" min="15" max="50" value={tempVal} onChange={(e) => setTempVal(Number(e.target.value))} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)' }}>{tempVal}°C</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Waste Fill (%):</label>
                    <input type="range" className="form-range" min="5" max="100" value={fillVal} onChange={(e) => setFillVal(Number(e.target.value))} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--green)' }}>{fillVal}%</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn--secondary btn--sm" onClick={() => { soundFX.playClick(); setIsIotPaused(!isIotPaused); }}>
                    {isIotPaused ? 'Resume Stream' : 'Pause Stream'}
                  </button>
                  <button className="btn btn--primary btn--sm" onClick={() => {
                    soundFX.playPulse();
                    setHazardAlert(true);
                    setTempVal(42);
                    onShowToast("Hazard Injected! Emergency Relays Triggered!");
                    setTimeout(() => setHazardAlert(false), 4000);
                  }}>
                    Inject Hazard Trip
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: ALPR Simulation */}
          {activeTab === 'alpr' && (
            <div className="sim-panel">
              <div className="sim-header">
                <div className="sim-title">
                  <span className="pulse-dot"></span> MATLAB 2024 ALPR — Morphological Segmentation & OCR Matrix
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)' }}>
                  {alprText}
                </div>
              </div>

              <div className="sim-canvas-viewport">
                <canvas ref={alprCanvasRef} className="sim-canvas" />
              </div>

              <div className="sim-controls-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Algorithmic Stage:</label>
                  <select className="form-select" value={alprStep} onChange={(e) => { soundFX.playClick(); setAlprStep(e.target.value); }}>
                    <option value="raw">Step 1: Raw Vehicle Frame</option>
                    <option value="gray">Step 2: Grayscale & Contrast Equalization</option>
                    <option value="sobel">Step 3: Sobel Edge Gradient & Dilation</option>
                    <option value="roi">Step 4: ROI Bounding Box Isolation</option>
                    <option value="ocr">Step 5: Character Segmentation & OCR Match</option>
                  </select>
                </div>

                <button className="btn btn--primary btn--sm" onClick={() => {
                  soundFX.playPulse();
                  const steps = ['raw', 'gray', 'sobel', 'roi', 'ocr'];
                  let i = 0;
                  const intId = setInterval(() => {
                    i++;
                    if (i < steps.length) {
                      setAlprStep(steps[i]);
                    } else {
                      clearInterval(intId);
                      onShowToast("ALPR Pipeline Complete: 10/10 Characters Matched!");
                    }
                  }, 600);
                }}>
                  Run Full Auto Pipeline
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 3D Tilt Card Project Showcase Component
// --------------------------------------------------------------------------
function ProjectsShowcase({ onInspectArchitecture, onShowToast }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter(p => {
      const matchesCategory = filter === 'all' || p.category === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  // 3D Tilt calculation on mouse move
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// FEATURED REPOSITORIES & ENGINEERING WORK</p>
          <h2 className="h2">Software, IoT & Web Engineering Portfolio</h2>
          <p className="section-desc">Search and inspect projects across Java enterprise web applications, real-time IoT cloud telemetry, and MATLAB image processing.</p>
        </div>

        {/* Dynamic Toolbar */}
        <div className="project-toolbar">
          <div className="filter-group">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setFilter('all'); }}>All Projects</button>
            <button className={`filter-btn ${filter === 'java' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setFilter('java'); }}>Java Full Stack</button>
            <button className={`filter-btn ${filter === 'iot' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setFilter('iot'); }}>IoT & Telemetry</button>
            <button className={`filter-btn ${filter === 'matlab' ? 'active' : ''}`} onClick={() => { soundFX.playClick(); setFilter('matlab'); }}>Computer Vision & MATLAB</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search tech, e.g. Java, MySQL, MQTT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>
              Showing {filteredProjects.length} of {PORTFOLIO_DATA.projects.length}
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {proj.image && (
                <div className="project-card__img-wrap">
                  <img src={proj.image} alt={proj.title} className="project-card__img" />
                </div>
              )}
              <div className="project-card__body">
                <div className="project-card__header">
                  <span className={`project-tag project-tag--${proj.statusColor || 'cyan'}`}>{proj.categoryLabel}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{proj.status}</span>
                </div>
                <h3 className="project-card__title">{proj.title}</h3>
                <p className="project-card__desc">{proj.description}</p>
                <div className="project-card__tech">
                  {proj.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
                <div className="project-card__footer">
                  <button className="btn btn--secondary btn--sm" onClick={() => { soundFX.playClick(); onInspectArchitecture(proj); }}>
                    Inspect Architecture
                  </button>
                  <a href={proj.githubUrl} target="_blank" className="btn btn--primary btn--sm" onClick={() => soundFX.playClick()}>
                    GitHub Repo →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Skills Galaxy Matrix Component
// --------------------------------------------------------------------------
function SkillsGalaxy() {
  return (
    <section className="section section--dark" id="skills">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// 3D TECHNICAL STACK & PROFICIENCY RADAR</p>
          <h2 className="h2">Technical Competencies & Engineering Depth</h2>
          <p className="section-desc">Extensive capabilities across multi-tier Java enterprise systems, relational database architecture, modern web frontend, and connected IoT telemetry platforms.</p>
        </div>

        <div className="skills-grid">
          {PORTFOLIO_DATA.skills.map((cluster, idx) => (
            <div key={idx} className="skill-cluster-card">
              <div className="skill-cluster-header">
                <div className="skill-icon-bubble">{cluster.icon}</div>
                <h3 className="skill-cluster-title">{cluster.category}</h3>
              </div>
              <div className="skill-list">
                {cluster.items.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-item-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-badge">{skill.badge}</span>
                    </div>
                    <div className="skill-bar-wrap">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Live Dynamic GitHub Telemetry Component
// --------------------------------------------------------------------------
function GitHubTelemetry() {
  const [userData, setUserData] = useState({
    bio: "Java Full Stack Developer | B.E. ECE | Core Java, Spring Boot, JDBC, JSP & Servlets, MySQL",
    public_repos: 1,
    followers: 12
  });
  const [repos, setRepos] = useState([
    {
      name: "Iot_Energy_Monitoring_System",
      description: "Developed an IoT-based energy monitoring and management system for telecom operators and Remote Computer Rooms (RCR) using the Blynk server. Published in IJNIET.",
      language: "C++ / Arduino",
      html_url: "https://github.com/Megatheshwaran-R/Iot_Energy_Monitoring_System"
    },
    {
      name: "customer-information-system",
      description: "Multi-tier enterprise customer administration system with Java Servlets, JSP, JDBC connection pooling, and transactional MySQL relational database.",
      language: "Java / MVC",
      html_url: "https://github.com/Megatheshwaran-R"
    },
    {
      name: "library-management-engine",
      description: "Core Java book inventory and circulation engine featuring role-based privileges, automated overdue fines, and PreparedStatement persistence.",
      language: "Core Java / JDBC",
      html_url: "https://github.com/Megatheshwaran-R"
    }
  ]);

  useEffect(() => {
    async function loadGitHub() {
      try {
        const uRes = await fetch("https://api.github.com/users/Megatheshwaran-R");
        if (uRes.ok) {
          const uJson = await uRes.json();
          setUserData(uJson);
        }
        const rRes = await fetch("https://api.github.com/users/Megatheshwaran-R/repos?sort=updated&per_page=6");
        if (rRes.ok) {
          const rJson = await rRes.json();
          if (rJson && rJson.length > 0) setRepos(rJson);
        }
      } catch (e) {
        console.warn("Using offline GitHub fallback telemetry.");
      }
    }
    loadGitHub();
  }, []);

  return (
    <section className="section" id="github">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// REAL-TIME GITHUB TELEMETRY</p>
          <h2 className="h2">Live GitHub Activity & Open Source Repositories</h2>
          <p className="section-desc">Dynamic telemetry synchronized live with the GitHub REST API (<a href={PORTFOLIO_DATA.personal.github} target="_blank" style={{ color: 'var(--cyan)' }}>github.com/Megatheshwaran-R</a>).</p>
        </div>

        <div className="github-card">
          <div className="github-user-bar">
            <div className="github-user-info">
              <img src="assets/megatheshwaran_portrait.png" alt="Megatheshwaran Avatar" className="github-avatar" />
              <div>
                <div className="github-handle">Megatheshwaran R (@Megatheshwaran-R)</div>
                <div className="github-bio">{userData.bio}</div>
              </div>
            </div>
            <div className="github-stats-chips">
              <span className="github-chip"><strong>{userData.public_repos}</strong> Public Repos</span>
              <span className="github-chip"><strong>Active</strong> Profile</span>
              <span className="github-chip"><span className="pulse-dot"></span> Live Synced</span>
            </div>
          </div>

          <div className="github-repos-grid">
            {repos.map((repo, i) => (
              <div key={i} className="repo-card">
                <div>
                  <div className="repo-card__name">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <span>{repo.name}</span>
                  </div>
                  <div className="repo-card__desc">{repo.description || "Enterprise software & hardware repository."}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)' }}>{repo.language || 'Java Full Stack'}</span>
                  <a href={repo.html_url} target="_blank" className="btn btn--secondary btn--sm" onClick={() => soundFX.playClick()}>View Repo →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Experience & Education Components
// --------------------------------------------------------------------------
function ExperienceSection() {
  return (
    <section className="section section--dark" id="experience">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// PRODUCTION EXPERIENCE & ACCREDITED TRAINING</p>
          <h2 className="h2">Where Engineering Meets Execution</h2>
          <p className="section-desc">Hands-on software development lifecycle exposure, accredited Java full stack training, and published IoT research.</p>
        </div>

        <div className="experience-grid">
          {PORTFOLIO_DATA.experience.map((exp, i) => (
            <div key={i} className="exp-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">{exp.role}</h3>
                  <div className="exp-company">{exp.company}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="exp-date">{exp.duration}</div>
                  <span className="project-tag project-tag--green" style={{ marginTop: '4px', display: 'inline-block' }}>{exp.badge}</span>
                </div>
              </div>
              <ul className="exp-list">
                {exp.highlights.map((h, hIdx) => (
                  <li key={hIdx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <div className="section-header">
          <p className="eyebrow">// ACADEMIC HONORS & VERIFIED CREDENTIALS</p>
          <h2 className="h2">Education, Certifications & Publications</h2>
        </div>

        <div className="edu-grid">
          {/* Degrees */}
          {PORTFOLIO_DATA.education.map((edu, i) => (
            <div key={i} className="edu-card">
              <div className="edu-card__icon">🎓</div>
              <h3 className="edu-card__degree">{edu.degree}</h3>
              <div className="edu-card__school">{edu.institution}</div>
              <div className="edu-card__meta">
                <span>{edu.period}</span>
                <span className="grade-badge">{edu.grade}</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{edu.description}</p>
            </div>
          ))}

          {/* Certifications */}
          <div className="edu-card">
            <div className="edu-card__icon">🏆</div>
            <h3 className="edu-card__degree">Professional Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {PORTFOLIO_DATA.certifications.map((c, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{c.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cyan)' }}>{c.issuer} ({c.year}) {c.id ? `| ID: ${c.id}` : ''}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="edu-card">
            <div className="edu-card__icon">📜</div>
            <h3 className="edu-card__degree">Publications & Presentations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {PORTFOLIO_DATA.publications.map((p, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{p.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--green)' }}>{p.venue} ({p.year})</div>
                  <span className="project-tag" style={{ marginTop: '4px', display: 'inline-block' }}>{p.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Contact Form & Footer Component
// --------------------------------------------------------------------------
function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playPulse();
    const mailto = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(formData.subject || 'Opportunity')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailto;
    onShowToast("Opening email client with your message...");
  };

  const copyEmail = () => {
    soundFX.playBeep();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    onShowToast("Email copied to clipboard!");
  };

  return (
    <section className="section section--dark" id="contact">
      <div className="wrap wrap--narrow">
        <div className="contact-box">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>// LET'S BUILD SCALABLE SYSTEMS</p>
          <h2 className="h2">Get In Touch With Megatheshwaran</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Actively seeking full-time <strong>Java Full Stack Developer</strong>, <strong>Backend Engineer</strong>, and <strong>Junior Software Engineer</strong> roles. Based in Chennai; open to Bangalore, Hyderabad, or Coimbatore. Available for immediate joining.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Hiring Manager / Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Work Email</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="e.g. hr@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Subject / Role Opportunity</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Java Full Stack Developer Position"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                className="form-textarea"
                rows="4"
                required
                placeholder="Hello Megathesh, we would love to invite you for a technical interview..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
              <span>✉️</span> Send Message Via Email Client
            </button>
          </form>

          <div className="contact-info-grid">
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="contact-item" onClick={() => soundFX.playClick()}>
              <span className="contact-item__icon">✉️</span>
              <div>
                <span className="contact-item__lbl">Email Address</span>
                <span className="contact-item__val">{PORTFOLIO_DATA.personal.email}</span>
              </div>
            </a>
            <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="contact-item" onClick={() => soundFX.playClick()}>
              <span className="contact-item__icon">📞</span>
              <div>
                <span className="contact-item__lbl">Phone</span>
                <span className="contact-item__val">{PORTFOLIO_DATA.personal.phone}</span>
              </div>
            </a>
            <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" className="contact-item" onClick={() => soundFX.playClick()}>
              <span className="contact-item__icon">💼</span>
              <div>
                <span className="contact-item__lbl">LinkedIn</span>
                <span className="contact-item__val">Megathesh R</span>
              </div>
            </a>
            <a href={PORTFOLIO_DATA.personal.github} target="_blank" className="contact-item" onClick={() => soundFX.playClick()}>
              <span className="contact-item__icon">💻</span>
              <div>
                <span className="contact-item__lbl">GitHub</span>
                <span className="contact-item__val">@Megatheshwaran-R</span>
              </div>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '28px' }}>
            <a href={PORTFOLIO_DATA.personal.resumeUrl} target="_blank" className="btn btn--primary" onClick={() => soundFX.playClick()}>
              Download Resume PDF
            </a>
            <button className="btn btn--secondary" onClick={copyEmail}>
              Copy Email Address
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Architecture Deep-Dive Modal Overlay
// --------------------------------------------------------------------------
function ArchitectureModal({ project, onClose }) {
  if (!project || !project.architecture) return null;
  const arch = project.architecture;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{arch.title}</h3>
            <div className="modal-subtitle">{arch.subtitle}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            // END-TO-END DATA PIPELINE & DISPATCH STAGES:
          </div>
          <div className="arch-step-list">
            {arch.pipeline.map((p, i) => (
              <div key={i} className="arch-step-item">
                <span className="arch-step-num">{p.step}</span>
                <div>
                  <div className="arch-step-name">{p.name}</div>
                  <div className="arch-step-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>
            // PERFORMANCE BENCHMARKS & METRICS:
          </div>
          <div className="arch-metrics-grid">
            {arch.metrics.map((m, i) => (
              <div key={i} className="arch-metric-box">
                <div className="arch-metric-val">{m.value}</div>
                <div className="arch-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>

          {arch.safeguards && (
            <div style={{ background: 'rgba(0, 255, 157, 0.05)', border: '1px solid rgba(0, 255, 157, 0.2)', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--green)' }}>
              <strong>🔒 Reliability & Security Safeguard:</strong> {arch.safeguards}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// UNIX Cyber Terminal Modal Drawer Component
// --------------------------------------------------------------------------
function CyberTerminal({ isOpen, onClose, setModelMode, setThemeColor, rainMode, setRainMode, onShowToast }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'dim', text: "ttyUSB0 — megathesh@cyber-core:~# initialized." },
    { type: 'cyan', text: "Type 'help' for commands, 'cat resume', 'git repos', 'rain <mode>', or 'run api'." }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    soundFX.playClick();
    setInputVal('');

    const newEntries = [{ type: 'prompt', text: `megathesh@cyber-core:~$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Available Commands:
  help            - List available shell commands
  cat resume      - Output summary resume credentials
  cat skills      - List core competencies & tech stack
  cat experience  - VEI Technologies & Accord Info Matrix details
  cat education   - Degrees, CGPA & Distinction honors
  cat publication - Peer-reviewed IJNIET publication
  git repos       - Output open-source repositories
  run api         - Simulate Java Full Stack MVC request dispatch
  rain <mode>     - Switch atmospheric rain (cyber | storm | matrix | off)
  3d mode <name>  - Switch 3D model (core | galaxy | torus | matrix)
  theme <color>   - Switch neon theme (cyan | green | purple | amber)
  contact         - Display verified contact details
  clear           - Clear terminal window buffer
  matrix          - Trigger cyberpunk cascade animation`
        });
        break;

      case 'cat resume':
        newEntries.push({
          type: 'output',
          text: `MEGATHESHWARAN R — Java Full Stack Developer
Degree: B.E. ECE (Kongunadu College of Engineering, CGPA 7.54)
Diploma: EEE (Kongunadu Polytechnic, 94.0% Distinction)
Certifications: IAO Accredited Java Technology (AIM JT 18529) & Web Dev (AIM WD 18530)
Internship: VEI Technologies Pvt. Ltd., Chennai`
        });
        break;

      case 'cat skills':
        newEntries.push({
          type: 'output',
          text: `JAVA & BACKEND: Core Java, OOP, Collections, JDBC, Servlets, JSP, Spring Boot, Tomcat
DATABASES: MySQL RDBMS, Schema Design, Normalization, ACID Transactions
IOT: NodeMCU ESP8266, MQTT Protocol, Blynk IoT Cloud, DHT11, Ultrasonic
FRONTEND: React 18, Three.js 3D WebGL, Modern JavaScript, HTML5/CSS3`
        });
        break;

      case 'cat experience':
        newEntries.push({
          type: 'output',
          text: `1. VEI Technologies Pvt. Ltd. (Chennai) — Java Full Stack Intern (2024)
2. Accord Info Matrix (Chennai) — IAO Certified Java Full Stack Program (2024-2025)`
        });
        break;

      case 'cat education':
        newEntries.push({
          type: 'output',
          text: `B.E. in ECE (2021-2024) - Kongunadu College of Engg (CGPA: 7.54/10.0)
Diploma in EEE (2018-2021) - Kongunadu Polytechnic (94.0% Distinction)`
        });
        break;

      case 'cat publication':
        newEntries.push({
          type: 'output',
          text: `IJNIET Peer-Reviewed Paper: "Energy Saving and Management Using MQTT Protocol in Telecom Operators' Remote Computer Room"`
        });
        break;

      case 'git repos':
        newEntries.push({
          type: 'output',
          text: `1. Iot_Energy_Monitoring_System (C++ / Arduino) - IJNIET Published
2. customer-information-system (Java / MVC Servlets)
3. library-management-engine (Core Java / JDBC)`
        });
        break;

      case 'run api':
        newEntries.push({
          type: 'cyan',
          text: `[200 OK] POST /api/v1/customers -> Controller -> HikariCP Pool -> MySQL PreparedStatement (Latency: 14.2ms)`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Email: ravichandranmegathesh@gmail.com
Phone: +91 9092734889
LinkedIn: linkedin.com/in/megathesh-ravichandran-1053061a0
GitHub: github.com/Megatheshwaran-R`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'matrix':
        soundFX.playPulse();
        newEntries.push({
          type: 'cyan',
          text: `01001010 01100001 01110110 01100001 00100000 01010011 01110100 01100001 01100011 01101011\nFOLLOW THE WHITE RABBIT... SYSTEM READY.`
        });
        break;

      case 'rain':
        newEntries.push({
          type: 'cyan',
          text: `ATMOSPHERIC RAIN SUBSYSTEM:
Current Status: Active [Mode: ${(rainMode || 'CYBER').toUpperCase()}]
Available Rain Commands:
  • rain cyber  - Ultra-sleek neon cyan cyber rain streaks with splashes
  • rain storm  - Intense neon thunderstorm with high wind & lightning pulses
  • rain matrix - Digital streaming code rain (binary, hex & Java tokens)
  • rain off    - Pause and disable atmospheric rain
  • rain on     - Resume default cyber neon rain`
        });
        break;

      case 'rain cyber':
      case 'rain on':
        setRainMode('cyber');
        if (onShowToast) onShowToast('⚡ Cyber Neon Rain Active');
        newEntries.push({ type: 'cyan', text: '🌧️ Switched rain mode to: CYBER NEON RAIN' });
        break;

      case 'rain storm':
        setRainMode('storm');
        if (onShowToast) onShowToast('🌩️ Neon Thunderstorm Active');
        newEntries.push({ type: 'cyan', text: '🌩️ Switched rain mode to: NEON THUNDERSTORM' });
        break;

      case 'rain matrix':
        setRainMode('matrix');
        if (onShowToast) onShowToast('💻 Matrix Code Rain Active');
        newEntries.push({ type: 'cyan', text: '💻 Switched rain mode to: MATRIX DIGITAL CODE RAIN' });
        break;

      case 'rain off':
        setRainMode('off');
        if (onShowToast) onShowToast('🚫 Atmospheric Rain Disabled');
        newEntries.push({ type: 'dim', text: '🚫 Atmospheric rain disabled.' });
        break;

      default:
        if (cmd.startsWith('rain ')) {
          const sub = cmd.split(' ')[1];
          if (['cyber', 'storm', 'matrix', 'off'].includes(sub)) {
            setRainMode(sub);
            newEntries.push({ type: 'cyan', text: `Switched rain mode to: ${sub.toUpperCase()}` });
          } else {
            newEntries.push({ type: 'dim', text: `Unknown rain mode: '${sub}'. Choose: cyber | storm | matrix | off` });
          }
        } else if (cmd.startsWith('3d mode ')) {
          const mode = cmd.split(' ')[2];
          if (['core', 'galaxy', 'torus', 'matrix'].includes(mode)) {
            setModelMode(mode);
            newEntries.push({ type: 'cyan', text: `3D model switched to: ${mode.toUpperCase()}` });
          } else {
            newEntries.push({ type: 'dim', text: `Invalid 3D mode. Choose: core | galaxy | torus | matrix` });
          }
        } else if (cmd.startsWith('theme ')) {
          const col = cmd.split(' ')[1];
          if (['cyan', 'green', 'purple', 'amber'].includes(col)) {
            setThemeColor(col);
            newEntries.push({ type: 'cyan', text: `Theme color switched to: ${col.toUpperCase()}` });
          } else {
            newEntries.push({ type: 'dim', text: `Invalid theme color. Choose: cyan | green | purple | amber` });
          }
        } else {
          newEntries.push({ type: 'dim', text: `Command not recognized: '${cmd}'. Type 'help' for command list.` });
        }
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
  };

  return (
    <div className="cli-drawer">
      <div className="cli-window">
        <div className="cli-bar">
          <div className="cli-dots">
            <span className="dot--red" onClick={onClose} title="Close Terminal"></span>
            <span className="dot--yellow"></span>
            <span className="dot--green"></span>
          </div>
          <div className="cli-title">ttyUSB0 — megathesh@cyber-core:~# (React 18 Terminal)</div>
          <button className="btn btn--cli btn--sm" onClick={onClose}>✕ Close [ESC]</button>
        </div>

        <div className="cli-body">
          {history.map((h, i) => (
            <div key={i} style={{ color: h.type === 'cyan' ? 'var(--cyan)' : h.type === 'prompt' ? '#00ff9d' : h.type === 'dim' ? 'var(--text-muted)' : '#f8fafc', whiteSpace: 'pre-wrap' }}>
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="cli-input-bar">
          <span className="cli-prompt">megathesh@cyber-core:~$</span>
          <input
            type="text"
            className="cli-input"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type a command (help, cat resume, git repos, run api, 3d mode, clear)..."
          />
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Root React Application Component
// --------------------------------------------------------------------------
function App() {
  const [modelMode, setModelMode] = useState('core');
  const [themeColor, setThemeColor] = useState('cyan');
  const [isWireframe, setIsWireframe] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [rainMode, setRainMode] = useState('cyber');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const triggerPulse = () => {
    setPulseCount(c => c + 1);
  };

  const copyEmail = () => {
    soundFX.playBeep();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    showToast("Email copied to clipboard!");
  };

  // Keyboard shortcut: ESC closes modal or terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setTerminalOpen(false);
        setSelectedArchProject(null);
      }
      if (e.key === '`') {
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      {/* Ambient 3D Particle Starfield */}
      <AmbientBackground3D themeColor={themeColor} />
      <RainBackground rainMode={rainMode} />
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="ambient-glow-top" aria-hidden="true" />

      {/* Top Navigation */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        rainMode={rainMode}
        setRainMode={setRainMode}
        onShowToast={showToast}
      />

      {/* Hero Section */}
      <section className="hero" id="overview">
        <div className="wrap hero__grid">
          
          {/* Left Column: Developer Positioning */}
          <div className="hero__content">
            <div className="status-pill">
              <span className="pulse-dot"></span>
              <span>{PORTFOLIO_DATA.personal.badge}</span>
            </div>

            <h1 className="hero__title">
              Engineering Scalable <span className="text-gradient">Java Full Stack Architectures</span> & Resilient Backends.
            </h1>

            <p className="hero__lead">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* KPI Cards */}
            <div className="kpi-grid">
              {PORTFOLIO_DATA.kpis.map((kpi, idx) => (
                <div key={idx} className={`kpi-card kpi-card--${kpi.color}`}>
                  <span className="kpi-card__val">{kpi.value}</span>
                  <span className="kpi-card__lbl">{kpi.label} — {kpi.sub}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hero__cta">
              <a href="#projects" className="btn btn--primary" onClick={() => soundFX.playClick()}>
                Explore 3D Projects Showcase
              </a>
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="btn btn--secondary" onClick={() => soundFX.playClick()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Contact Megathesh
              </a>
              <button className="btn btn--secondary" onClick={copyEmail}>
                Copy Email
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Canvas */}
          <div>
            <ThreeHeroCanvas
              modelMode={modelMode}
              setModelMode={setModelMode}
              themeColor={themeColor}
              isWireframe={isWireframe}
              pulseTrigger={pulseCount}
            />
          </div>

        </div>
      </section>

      {/* Interactive Simulator Console */}
      <SimulatorConsole onShowToast={showToast} />

      {/* Dynamic Live GitHub Section */}
      <GitHubTelemetry />

      {/* 3D Skills Galaxy Matrix */}
      <SkillsGalaxy />

      {/* Projects Showcase */}
      <ProjectsShowcase
        onInspectArchitecture={(proj) => setSelectedArchProject(proj)}
        onShowToast={showToast}
      />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education & Certifications */}
      <EducationSection />

      {/* Contact Section */}
      <ContactSection onShowToast={showToast} />

      {/* Architecture Deep Dive Modal */}
      {selectedArchProject && (
        <ArchitectureModal
          project={selectedArchProject}
          onClose={() => setSelectedArchProject(null)}
        />
      )}

      {/* Interactive Cyber Terminal Drawer */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        setModelMode={setModelMode}
        setThemeColor={setThemeColor}
        rainMode={rainMode}
        setRainMode={setRainMode}
        onShowToast={showToast}
      />

      {/* Animated Toast Notification */}
      {toastMsg && <div className="toast-msg">{toastMsg}</div>}

      {/* Footer */}
      <footer className="footer">
        <div className="wrap footer__inner">
          <span>© {new Date().getFullYear()} Megatheshwaran R. Engineered with React 18 & Three.js 3D WebGL.</span>
          <span className="footer__status">
            <span className="pulse-dot"></span> STATUS: Ready to Join Java Full Stack & Backend Roles
          </span>
        </div>
      </footer>
    </div>
  );
}

// Immediate React 18 Mounting Function
function mountReactApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
      console.log("⚡ 3D React Core Mounted Successfully!");
    } catch (err) {
      console.error("Mount error:", err);
      rootElement.innerHTML = `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:#00f0ff;font-family:monospace;padding:20px;text-align:center;">
          <div>
            <h2>Initialization Notice</h2>
            <p style="color:#ef4444;margin:10px 0;">${err.message}</p>
            <button onclick="location.reload()" style="background:#00f0ff;color:#000;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:bold;">Reload Page</button>
          </div>
        </div>
      `;
    }
  }
}

// Execute immediately without waiting for DOMContentLoaded (which already fired before Babel transpilation)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountReactApp);
} else {
  mountReactApp();
}
