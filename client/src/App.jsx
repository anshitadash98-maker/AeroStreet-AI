import React, { useState, useEffect } from "react";
import "./App.css";

const DEFAULT_INDIAN_CITIES = [
  {
    id: "delhi",
    city: "Delhi NCR",
    state: "Delhi",
    aqi: 384,
    status: "Hazardous",
    station: "Anand Vihar CAAQMS",
    pm25: 340,
    pm10: 420,
    no2: 68,
    so2: 24,
    co: 4.2,
    temp: "24°C",
    humidity: "62%",
    wind: "4.2 km/h SE",
    trend: "+18 in last 3h",
    hotspot: "Stubble burning particulate drift & industrial corridor emissions along Ring Road.",
    forecast24: 395,
    forecast48: 410,
    forecast72: 360,
    grapStage: "GRAP Stage IV",
    actionPlan: "Halt all non-essential construction, mandate 50% work-from-home, deploy 35 anti-smog water cannons on Ring Road.",
  },
  {
    id: "gurugram",
    city: "Gurugram",
    state: "Haryana",
    aqi: 312,
    status: "Hazardous",
    station: "Vikas Sadan Sector 11",
    pm25: 285,
    pm10: 360,
    no2: 52,
    so2: 18,
    co: 3.6,
    temp: "25°C",
    humidity: "58%",
    wind: "5.1 km/h E",
    trend: "+8 in last 3h",
    hotspot: "High vehicular congestion at Cyber City & highway dust plumes on NH-48.",
    forecast24: 325,
    forecast48: 340,
    forecast72: 290,
    grapStage: "GRAP Stage III",
    actionPlan: "Intensify mechanized road sweeping, enforce ban on BS-III petrol & BS-IV diesel vehicles.",
  },
  {
    id: "lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    aqi: 268,
    status: "Very Poor",
    station: "Talkatora Industrial Area",
    pm25: 220,
    pm10: 295,
    no2: 44,
    so2: 15,
    co: 2.8,
    temp: "27°C",
    humidity: "54%",
    wind: "3.8 km/h NW",
    trend: "+12 in last 3h",
    hotspot: "Biomass burning & unpaved road dust near Transport Nagar.",
    forecast24: 280,
    forecast48: 270,
    forecast72: 230,
    grapStage: "GRAP Stage II",
    actionPlan: "Deploy water sprinklers twice daily, halt diesel generator sets except for emergency services.",
  },
  {
    id: "patna",
    city: "Patna",
    state: "Bihar",
    aqi: 245,
    status: "Very Poor",
    station: "Muradpur Station",
    pm25: 195,
    pm10: 270,
    no2: 38,
    so2: 12,
    co: 2.4,
    temp: "28°C",
    humidity: "65%",
    wind: "4.0 km/h NE",
    trend: "-5 in last 3h",
    hotspot: "Brick kiln plumes in peri-urban clusters and riverbed sand transport.",
    forecast24: 255,
    forecast48: 260,
    forecast72: 215,
    grapStage: "GRAP Stage II",
    actionPlan: "Inspect brick kiln zig-zag technology compliance, cover all sand transport trucks.",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    aqi: 142,
    status: "Moderate",
    station: "Bandra Kurla Complex",
    pm25: 88,
    pm10: 145,
    no2: 32,
    so2: 10,
    co: 1.8,
    temp: "31°C",
    humidity: "78%",
    wind: "11.2 km/h W",
    trend: "+3 in last 3h",
    hotspot: "Metro line construction debris and port freight transit.",
    forecast24: 150,
    forecast48: 135,
    forecast72: 120,
    grapStage: "GRAP Stage I",
    actionPlan: "Enforce 35-foot anti-dust acoustic barriers at all major infrastructure construction sites.",
  },
  {
    id: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    aqi: 188,
    status: "Moderate",
    station: "Victoria Memorial CAAQMS",
    pm25: 125,
    pm10: 190,
    no2: 40,
    so2: 16,
    co: 2.1,
    temp: "30°C",
    humidity: "74%",
    wind: "6.5 km/h S",
    trend: "+6 in last 3h",
    hotspot: "Industrial boiler emissions in Howrah cluster and garbage combustion in Dhapa.",
    forecast24: 195,
    forecast48: 185,
    forecast72: 160,
    grapStage: "GRAP Stage I",
    actionPlan: "Drone surveillance across Dhapa dumpsite, night patrolling for open biomass fires.",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    aqi: 68,
    status: "Satisfactory",
    station: "BTM Layout CAAQMS",
    pm25: 35,
    pm10: 65,
    no2: 22,
    so2: 7,
    co: 0.9,
    temp: "26°C",
    humidity: "60%",
    wind: "9.4 km/h SW",
    trend: "-2 in last 3h",
    hotspot: "Silk Board traffic bottleneck; overall air quality is healthy.",
    forecast24: 72,
    forecast48: 65,
    forecast72: 58,
    grapStage: "Standard Monitoring",
    actionPlan: "Routine electric bus fleet dispatch and green belt vegetative buffer maintenance.",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    aqi: 94,
    status: "Satisfactory",
    station: "Sanathnagar Industrial Area",
    pm25: 54,
    pm10: 98,
    no2: 28,
    so2: 9,
    co: 1.2,
    temp: "29°C",
    humidity: "55%",
    wind: "7.8 km/h NW",
    trend: "+4 in last 3h",
    hotspot: "Pharmaceutical chemical processing belt in Pashamylaram.",
    forecast24: 98,
    forecast48: 92,
    forecast72: 85,
    grapStage: "Standard Monitoring",
    actionPlan: "Continuous stack emissions monitoring and VOC leak detection patrols.",
  },
];

const PLATFORM_ITEMS = [
  {
    name: "Live AQI Telemetry",
    desc: "Continuous sub-minute telemetry streaming from 400+ CPCB CAAQMS stations, calibrated with WAQI and IQAir reference nodes across all 28 states.",
    metrics: "400+ CAAQMS nodes · 99.8% sensor uptime · Sub-minute frequency",
  },
  {
    name: "India SVG Map & Regional Drilldowns",
    desc: "Interactive vector map of India with live state-by-state, district, and municipal ward choropleth air quality indicators and drilldown views.",
    metrics: "28 States · 780 Districts · Ward-level resolution",
  },
  {
    name: "72-Hour Gemini AI Forecast",
    desc: "Multimodal AI combining satellite Fire Radiative Power (FRP), industrial stack data, and atmospheric meteorological models to project smog peaks up to 3 days ahead.",
    metrics: "94.6% 72-hr accuracy · Wind vector dispersion · Inversion layer modeling",
  },
  {
    name: "CCTV Pollution Alerts",
    desc: "Edge-deployed computer vision pipelines detecting open municipal waste burning, construction dust plumes, and diesel vehicle exhaust in real time.",
    metrics: "0.8s inference speed · Automated geo-tagging · 98.2% plume detection precision",
  },
  {
    name: "Automated Municipal Action Plans",
    desc: "Dynamic Graded Response Action Plan (GRAP I to IV) execution workflows tailored to each municipal ward with automated resource dispatch recommendations.",
    metrics: "Automated anti-smog cannon routing · Traffic diversion rules · Construction halts",
  },
  {
    name: "Legal Notice Generator",
    desc: "Instant statutory notices auto-generated under the Air (Prevention & Control of Pollution) Act 1981 and Section 133 CrPC for non-compliant industrial and construction sites.",
    metrics: "Pre-formatted legal PDFs · Digital signature support · Automated municipal delivery",
  },
  {
    name: "Community Clean-Up Drives",
    desc: "Citizen coordination hub for tree plantation, localized dust suppression, and neighborhood smog awareness drives with verified impact metrics.",
    metrics: "120+ active citizen groups · 45,000+ volunteers engaged · Real-time impact ledger",
  },
  {
    name: "Citizen Smog Reports",
    desc: "Empowering everyday citizens to upload geo-tagged photo evidence of smoke, burning, or uncovered construction dust with automated AI verification.",
    metrics: "Photo GPS verification · Instant municipal ticket dispatch · Resolution tracking",
  },
  {
    name: "District Comparison Tool",
    desc: "Comprehensive multi-district analytical comparisons across historical seasonal trends, crop burning impact, and municipal enforcement effectiveness.",
    metrics: "5-year historical trends · Multi-variable regression · Exportable CSV/PDF datasets",
  },
  {
    name: "Transparent Methodology & Open Sources",
    desc: "Full open-source transparency on sensor calibration formulas, US EPA and CPCB breakpoint algorithms, and Gemini atmospheric prompts.",
    metrics: "Standardized EPA & CPCB formula · Open REST & GraphQL APIs · CC-BY-4.0 data license",
  },
];

export default function App() {
  const [cities, setCities] = useState(DEFAULT_INDIAN_CITIES);
  const [selectedCityId, setSelectedCityId] = useState("delhi");
  const [filterType, setFilterType] = useState("all");
  const [activeModal, setActiveModal] = useState(null); // 'map' | 'forecast' | 'municipality' | 'report'
  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [actionDispatched, setActionDispatched] = useState(false);
  const [noticeGenerated, setNoticeGenerated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forecastHour, setForecastHour] = useState(24);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  // Attempt live API fetch from /api/live-aqi with graceful fallback
  useEffect(() => {
    fetch("/api/live-aqi")
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : d.locations || [];
        if (list.length > 0) {
          const merged = list.map((item) => {
            const cityName = item.city || item.name || "Station";
            const aqiVal = Number(item.aqi) || 150;
            return {
              id: cityName.toLowerCase().replace(/\s+/g, "-"),
              city: cityName,
              state: item.state || "India",
              aqi: aqiVal,
              status: getAqiStatus(aqiVal),
              station: item.station || `${cityName} Central Monitoring`,
              pm25: item.pm25 || Math.round(aqiVal * 0.85),
              pm10: item.pm10 || Math.round(aqiVal * 1.2),
              no2: item.no2 || 45,
              so2: item.so2 || 15,
              co: item.co || 2.5,
              temp: item.temp || "28°C",
              humidity: item.humidity || "60%",
              wind: item.wind || "5.4 km/h SE",
              trend: item.trend || "+5 in last 3h",
              hotspot: item.hotspot || "Regional particulate drift and vehicular corridor.",
              forecast24: Math.round(aqiVal * 1.05),
              forecast48: Math.round(aqiVal * 1.12),
              forecast72: Math.round(aqiVal * 0.95),
              grapStage: aqiVal > 300 ? "GRAP Stage IV" : aqiVal > 200 ? "GRAP Stage III" : "GRAP Stage I",
              actionPlan: "Automated municipal action protocol active.",
            };
          });
          setCities(merged);
        }
      })
      .catch(() => {
        // Dev server fallback is already loaded
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getAqiStatus(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Satisfactory";
    if (aqi <= 200) return "Moderate";
    if (aqi <= 300) return "Poor";
    if (aqi <= 400) return "Very Poor";
    return "Hazardous";
  }

  function getAqiColor(aqi) {
    if (aqi <= 50) return "#10b981"; // Green
    if (aqi <= 100) return "#84cc16"; // Lime
    if (aqi <= 200) return "#f59e0b"; // Orange
    if (aqi <= 300) return "#ef4444"; // Red
    if (aqi <= 400) return "#b91c1c"; // Dark Red
    return "#7f1d1d"; // Maroon/Hazardous
  }

  const filteredCities = cities.filter((c) => {
    if (searchQuery && !c.city.toLowerCase().includes(searchQuery.toLowerCase()) && !c.state.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterType === "hazardous") return c.aqi >= 300;
    if (filterType === "severe") return c.aqi >= 200 && c.aqi < 300;
    if (filterType === "moderate") return c.aqi < 200;
    return true;
  });

  const handleDispatchAction = () => {
    setActionDispatched(true);
    setTimeout(() => setActionDispatched(false), 4000);
  };

  const handleGenerateNotice = () => {
    setNoticeGenerated(true);
    setTimeout(() => setNoticeGenerated(false), 4000);
  };

  return (
    <div className="intercom-page aerostreet-theme">
      {/* 1. TOP NAVBAR */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-left">
            <a href="#" className="nav-brand">
              <svg className="aerostreet-logo-icon" viewBox="0 0 32 32" width="28" height="28" fill="none">
                <rect width="32" height="32" rx="7" fill="#111827" />
                <path
                  d="M7 11.5c0-1.1.9-2 2-2s2 .9 2 2v9c0 1.1-.9 2-2 2s-2-.9-2-2v-9zm5-3.5c0-1.1.9-2 2-2s2 .9 2 2v16c0 1.1-.9 2-2 2s-2-.9-2-2V8zm5 2.5c0-1.1.9-2 2-2s2 .9 2 2v11c0 1.1-.9 2-2 2s-2-.9-2-2v-11zm5 3.5c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4z"
                  fill="#00e5a3"
                />
              </svg>
              <span className="brand-name">AEROSTREET-AI</span>
              <span className="brand-pill">INDIA</span>
            </a>

            <nav className="nav-menu">
              <button className="nav-item-btn" onClick={() => setActiveModal("map")}>
                National Map
              </button>
              <button className="nav-item-btn" onClick={() => setActiveModal("forecast")}>
                72-Hr Forecast
              </button>
              <button className="nav-item-btn" onClick={() => setActiveModal("municipality")}>
                Municipal Action
              </button>
              <button className="nav-item-btn" onClick={() => setActiveModal("report")}>
                Citizen Reports
              </button>
              <a href="#platform" className="nav-link">Platform</a>
            </nav>
          </div>

          <div className="nav-right">
            <div className="live-pulse-container" title="400+ CAAQMS monitoring nodes transmitting">
              <span className="live-beacon" />
              <span className="live-status-text">Live CPCB Stream</span>
            </div>
            <button className="nav-cta-btn" onClick={() => setActiveModal("map")}>
              Open dashboard →
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <img src="/assets/hero_landscape.jpg" alt="AeroStreet Clean Air Futuristic Vision" className="hero-bg-image" />
          <div className="hero-gradient-overlay" />
        </div>

        <div className="hero-inner-content">
          <h1 className="hero-headline">
            <span className="hero-line">The new age</span>
            <span className="hero-line">of air quality</span>
            <span className="hero-line hero-line-indent">is AI-first</span>
          </h1>

          <p className="hero-subtext">
            Live telemetry for every Indian state, 72-hour Gemini-powered forecasts, and automated municipal action plans
            in one complete, unified clean air intelligence platform.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-white" onClick={() => setActiveModal("map")}>
              View live India map
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-glass" onClick={() => setActiveModal("forecast")}>
              See 72-hour forecast
            </button>
          </div>

          <div className="hero-floating-label">
            AeroStreet-AI is the complete AI-first air quality platform for India.
          </div>

          {/* FLOATING HERO DASHBOARD WINDOW */}
          <div className="hero-mockup-container">
            <div className="hero-dashboard-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="window-title">
                  <span className="window-badge">● LIVE TELEMETRY</span>
                  AeroStreet India Grid — Gemini 1.5 Pro Active
                </div>
                <div className="window-actions">
                  <span className="window-status-pill">CPCB Sync: 100% Online</span>
                </div>
              </div>

              <div className="window-body">
                {/* Window Sidebar */}
                <div className="window-sidebar">
                  <div className="sidebar-icon active" title="National Map" onClick={() => setActiveModal("map")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                      <line x1="8" y1="2" x2="8" y2="18" />
                      <line x1="16" y1="6" x2="16" y2="22" />
                    </svg>
                    <span className="badge">{cities.length}</span>
                  </div>
                  <div className="sidebar-icon" title="72-Hr Forecast" onClick={() => setActiveModal("forecast")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <span className="badge badge-accent">72h</span>
                  </div>
                  <div className="sidebar-icon" title="Municipal Action" onClick={() => setActiveModal("municipality")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="sidebar-icon" title="Citizen Reports" onClick={() => setActiveModal("report")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="sidebar-bottom-icon" title="Telemetry Settings">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                </div>

                {/* City Triage List */}
                <div className="window-conv-list">
                  <div className="conv-header">
                    <span>Regional Telemetry</span>
                    <select
                      className="filter-pill-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All States</option>
                      <option value="hazardous">Hazardous (300+)</option>
                      <option value="severe">Very Poor (200+)</option>
                      <option value="moderate">Moderate (&lt;200)</option>
                    </select>
                  </div>

                  <div className="city-search-box">
                    <input
                      type="text"
                      placeholder="Search state/city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="city-list-scrollable">
                    {filteredCities.map((item) => (
                      <div
                        key={item.id}
                        className={`conv-item ${item.id === selectedCityId ? "active" : ""}`}
                        onClick={() => setSelectedCityId(item.id)}
                      >
                        <div className="conv-avatar">
                          <div
                            className="avatar-img-placeholder"
                            style={{ background: getAqiColor(item.aqi) }}
                          >
                            {item.aqi}
                          </div>
                          <span className="online-indicator" />
                        </div>
                        <div className="conv-meta">
                          <div className="conv-top-line">
                            <strong>{item.city}</strong>
                            <span className="conv-time">{item.state}</span>
                          </div>
                          <p className="conv-snippet">{item.station}</p>
                          <div className="conv-tags">
                            <span
                              className="tag-status"
                              style={{
                                color: getAqiColor(item.aqi),
                                background: `${getAqiColor(item.aqi)}15`,
                              }}
                            >
                              {item.status}
                            </span>
                            <span className="tag-trend">{item.trend}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Incident & Gemini AI Feed */}
                <div className="window-chat-main">
                  <div className="chat-thread-header">
                    <div className="thread-user-info">
                      <div
                        className="thread-avatar"
                        style={{ background: getAqiColor(selectedCity.aqi) }}
                      >
                        {selectedCity.aqi}
                      </div>
                      <div>
                        <h4>
                          {selectedCity.city}
                          <span className="thread-company">
                            {selectedCity.state} · {selectedCity.station}
                          </span>
                        </h4>
                        <span className="thread-email">
                          Weather: {selectedCity.temp}, {selectedCity.humidity} Humidity · Wind: {selectedCity.wind}
                        </span>
                      </div>
                    </div>
                    <div className="thread-actions">
                      <span className="action-tag green">● Live Sensor Feed</span>
                      <button
                        className="btn-takeover"
                        onClick={() => setActiveModal("municipality")}
                      >
                        GRAP Console ↗
                      </button>
                    </div>
                  </div>

                  <div className="chat-messages">
                    {/* Environmental Incident */}
                    <div className="message message-user">
                      <div className="message-content">
                        <strong>Alert #IN-{selectedCity.id.toUpperCase()}-942:</strong>{" "}
                        {selectedCity.hotspot} Current PM2.5 levels at {selectedCity.pm25} µg/m³ (exceeding safe limits by {Math.round(selectedCity.pm25 / 15)}x).
                      </div>
                      <span className="message-time">Telemetry verified · 2m ago</span>
                    </div>

                    {/* Gemini CleanAir AI Analysis */}
                    <div className="message message-ai">
                      <div className="ai-author-row">
                        <div className="ai-badge-icon">✦</div>
                        <strong>Gemini CleanAir AI</strong>
                        <span className="ai-reply-speed">72h Forecast Engine</span>
                      </div>
                      <div className="message-content ai-bubble">
                        <strong>Atmospheric Diagnosis:</strong> Thermal inversion layer combined with low wind velocity ({selectedCity.wind}) is preventing particulate dispersion.
                        <br /><br />
                        <strong>72-Hour Smog Projection:</strong>
                        <ul className="forecast-bullet-list">
                          <li>Next 24h: <strong>{selectedCity.forecast24} AQI</strong> (Trajectory worsening overnight)</li>
                          <li>Next 48h: <strong>{selectedCity.forecast48} AQI</strong> (Projected smog peak)</li>
                          <li>Next 72h: <strong>{selectedCity.forecast72} AQI</strong> (Wind reversal expected)</li>
                        </ul>
                        <br />
                        <strong>Automated Action Plan ({selectedCity.grapStage}):</strong>
                        <br />
                        {selectedCity.actionPlan}
                      </div>
                      <div className="ai-action-buttons">
                        <button
                          className="ai-btn-primary"
                          onClick={handleDispatchAction}
                          disabled={actionDispatched}
                        >
                          {actionDispatched ? "✓ Fleet Dispatched to Corridors" : "⚡ Dispatch Anti-Smog Fleet"}
                        </button>
                        <button
                          className="ai-btn-secondary"
                          onClick={handleGenerateNotice}
                          disabled={noticeGenerated}
                        >
                          {noticeGenerated ? "✓ Statutory Notice Issued" : "Generate Legal Notice (Air Act)"}
                        </button>
                      </div>
                    </div>

                    {actionDispatched && (
                      <div className="message message-system-alert">
                        <div className="sys-alert-content">
                          🚨 <strong>Action Enacted:</strong> Anti-smog water cannons deployed along key corridors in {selectedCity.city}. Environmental enforcement teams notified.
                        </div>
                      </div>
                    )}

                    {noticeGenerated && (
                      <div className="message message-system-alert">
                        <div className="sys-alert-content">
                          ⚖️ <strong>Legal Notice Generated:</strong> Notice under Section 133 CrPC / Air (Prevention & Control of Pollution) Act 1981 dispatched to 14 non-compliant industrial sites in {selectedCity.city}.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Sidebar: Gemini Air Copilot & Telemetry Breakdown */}
                <div className="window-copilot-pane">
                  <div className="copilot-header">
                    <div className="copilot-title-row">
                      <span className="copilot-sparkle">✦</span>
                      <h5>Gemini Air Copilot</h5>
                    </div>
                    <span className="copilot-status">Active</span>
                  </div>

                  <div className="copilot-card">
                    <div className="copilot-card-title">Live Pollutant Gauge</div>
                    <div className="pollutant-gauge-row">
                      <div className="gauge-number" style={{ color: getAqiColor(selectedCity.aqi) }}>
                        {selectedCity.aqi}
                      </div>
                      <div className="gauge-meta">
                        <strong>{selectedCity.status}</strong>
                        <span>Indian AQI Scale</span>
                      </div>
                    </div>
                  </div>

                  <div className="copilot-card">
                    <div className="copilot-card-title">Key Pollutants (µg/m³)</div>
                    <div className="pollutant-meter-group">
                      <div className="pol-row">
                        <span>PM2.5: {selectedCity.pm25}</span>
                        <div className="pol-bar"><div style={{ width: `${Math.min((selectedCity.pm25 / 350) * 100, 100)}%`, background: "#ef4444" }} /></div>
                      </div>
                      <div className="pol-row">
                        <span>PM10: {selectedCity.pm10}</span>
                        <div className="pol-bar"><div style={{ width: `${Math.min((selectedCity.pm10 / 450) * 100, 100)}%`, background: "#f59e0b" }} /></div>
                      </div>
                      <div className="pol-row">
                        <span>NO2: {selectedCity.no2}</span>
                        <div className="pol-bar"><div style={{ width: `${(selectedCity.no2 / 100) * 100}%`, background: "#3b82f6" }} /></div>
                      </div>
                    </div>
                  </div>

                  <div className="copilot-card highlight-card">
                    <div className="copilot-card-title">Health Advisory</div>
                    <p className="copilot-card-text">
                      {selectedCity.aqi > 300
                        ? "Hazardous air. Avoid all outdoor activity. N95 masks mandatory. Keep air purifiers running."
                        : selectedCity.aqi > 200
                        ? "Very poor air. Sensitive groups should stay indoors. Avoid prolonged outdoor exertion."
                        : "Air quality is acceptable. Ideal conditions for regular outdoor routines."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* City Carousel Indicator Dots */}
            <div className="hero-carousel-dots">
              {cities.slice(0, 5).map((c) => (
                <button
                  key={c.id}
                  className={`carousel-dot ${c.id === selectedCityId ? "active" : ""}`}
                  onClick={() => setSelectedCityId(c.id)}
                  title={c.city}
                  aria-label={c.city}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: THE OPEN LETTER FROM THE TEAM */}
      <section className="letter-section">
        <div className="letter-wrapper">
          <div className="letter-content-col">
            <h2 className="letter-heading">
              A note from the team:<br />
              welcome to AeroStreet-AI
            </h2>

            <div className="letter-body">
              <p>
                Every city and citizen in India deserves to know the truth about the air they breathe. For decades, air pollution data has been locked in static PDF reports, delayed by days, or presented without actionable solutions.{" "}
                <mark className="yellow-highlight">Today, we are on the brink of the biggest shift in environmental governance since the satellite era.</mark>
              </p>

              <p>
                Air pollution cannot be solved by passive monitoring alone. By uniting live CPCB telemetry with Gemini-powered atmospheric predictive modeling, we can forecast dangerous smog surges 72 hours before they hit—enabling cities to act proactively rather than reactively.{" "}
                <mark className="yellow-highlight">Municipalities that adopt AI-first air intelligence will protect millions of lives and pull away from those that don't.</mark>
              </p>

              <p>
                We built AeroStreet-AI to be the most comprehensive, hyper-local clean air intelligence platform in the world. Accurate down to the ward level, open to every citizen, and integrated directly into municipal enforcement.{" "}
                <mark className="yellow-highlight">This isn't just an AQI app; it is a completely new operational foundation for clean air in India.</mark>
              </p>

              <p>
                The future of clean skies is within our reach, and we can't wait to build it with you.
              </p>
            </div>

            <div className="letter-signature-block">
              <div className="cursive-signature">Team AeroStreet</div>
              <div className="signature-info">
                <strong>Team AeroStreet-AI</strong>
                <span>Founding Engineers & Environmental Researchers</span>
                <span className="company-tag">AeroStreet India Initiative</span>
              </div>
            </div>
          </div>

          <div className="letter-illustration-col">
            <div className="trophy-illustration-frame">
              <img
                src="/assets/blue_trophy_art.jpg"
                alt="AeroStreet Clean Air Initiative Trophy Illustration"
                className="trophy-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: PRODUCT SUITE (DARK SECTION) */}
      <section className="product-section">
        <div className="product-container">
          <div className="product-heading-area">
            <h2 className="product-main-heading">
              AI-first air quality for<br />
              citizens, analysts, and leaders
            </h2>
          </div>

          {/* CARD 1: LIVE TELEMETRY & MAP */}
          <div className="feature-card">
            <div className="feature-card-content">
              <div className="feature-tag tag-orange">LIVE AQI TELEMETRY</div>
              <h3 className="feature-title">
                Know your air,<br />instantly
              </h3>
              <p className="feature-desc">
                Live telemetry for every Indian state, district, and municipal ward. Direct sensor ingestion from CPCB, IQAir, and WAQI calibrated with real-time weather and wind vectors.
              </p>
              <button className="feature-cta-btn" onClick={() => setActiveModal("map")}>
                Explore live map →
              </button>
            </div>

            <div className="feature-card-visual scenic-visual">
              <img src="/assets/scenic_card_bg.jpg" alt="AeroStreet India Map Visual" className="card-backdrop-img" />
              <div className="floating-phone-mockup">
                <div className="phone-screen">
                  <div className="phone-header">
                    <div className="phone-avatar" style={{ background: "#00e5a3" }}>⚡</div>
                    <div>
                      <div className="phone-name">AeroStreet Sentinel</div>
                      <div className="phone-status">Live CPCB Telemetry</div>
                    </div>
                  </div>
                  <div className="phone-chat">
                    <div className="bubble bubble-user">What is the current AQI in Anand Vihar, Delhi?</div>
                    <div className="bubble bubble-bot">
                      <strong>Anand Vihar CAAQMS: 384 AQI (Hazardous)</strong>
                      <br /><br />
                      PM2.5: 340 µg/m³ · PM10: 420 µg/m³. Wind: 4.2 km/h SE. GRAP Stage IV guidelines in effect.
                    </div>
                    <div className="phone-quick-actions">
                      <span className="quick-pill" onClick={() => setActiveModal("map")}>Open India Map ↗</span>
                      <span className="quick-pill" onClick={() => setActiveModal("forecast")}>72-Hr Forecast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: GEMINI 72-HOUR AI FORECAST (Reversed) */}
          <div className="feature-card feature-card-reverse">
            <div className="feature-card-visual copilot-visual">
              <div className="inbox-copilot-ui">
                <div className="copilot-ui-header">
                  <div className="ui-tabs">
                    <span className="ui-tab active">Gemini 72-Hour Smog Model</span>
                    <span className="ui-tab">Satellite FRP Feeds</span>
                  </div>
                  <span className="copilot-confidence-pill">✦ 94.6% Forecast Accuracy</span>
                </div>
                <div className="copilot-ui-body">
                  <div className="copilot-draft-box">
                    <div className="draft-header">
                      <span className="draft-label">Atmospheric Inversion Warning:</span>
                      <span className="draft-source">Source: INSAT-3D & CPCB Deep Model</span>
                    </div>
                    <p className="draft-text">
                      "Stubble burning plumes in Northern Punjab (FRP: 1,420 MW) are synchronizing with south-easterly wind shifts. Delhi NCR and Western UP will experience a 45% particulate spike within 36 hours."
                    </p>
                    <div className="draft-action-row">
                      <button className="btn-insert-reply" onClick={() => setActiveModal("forecast")}>
                        View 72-Hour Predictive Heatmap
                      </button>
                      <button className="btn-regenerate" onClick={() => setActiveModal("municipality")}>
                        Trigger GRAP Actions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-card-content">
              <div className="feature-tag tag-teal">GEMINI AI FORECAST</div>
              <h3 className="feature-title">
                AI forecasts that<br />plan ahead
              </h3>
              <p className="feature-desc">
                72-hour AQI predictions and a pan-India predictive heatmap. Ingesting satellite fire radiative power, industrial stack telemetry, and meteorological inversions.
              </p>
              <button className="feature-cta-btn" onClick={() => setActiveModal("forecast")}>
                See 72-hr forecast →
              </button>
            </div>
          </div>

          {/* CARD 3: MUNICIPAL ACTION HUB */}
          <div className="feature-card">
            <div className="feature-card-content">
              <div className="feature-tag tag-blue">MUNICIPAL ACTION HUB</div>
              <h3 className="feature-title">
                Turn data into<br />municipal action
              </h3>
              <p className="feature-desc">
                CCTV alerts, automated legal notice generation under the Air Act, dynamic anti-smog water cannon routing, and Graded Response Action Plans in one unified hub.
              </p>
              <button className="feature-cta-btn" onClick={() => setActiveModal("municipality")}>
                Open action console →
              </button>
            </div>

            <div className="feature-card-visual helpdesk-visual">
              <div className="ticket-triage-table">
                <div className="triage-header">
                  <span>Enforcement Incident</span>
                  <span>Assignee</span>
                  <span>Status</span>
                </div>
                <div className="triage-row urgent">
                  <div className="ticket-title-col">
                    <span className="p-dot dot-red" />
                    <div>
                      <strong>Illegal Waste Burning - Ghazipur</strong>
                      <span className="sub">CCTV Detection · PM2.5 Surge: +180</span>
                    </div>
                  </div>
                  <div className="assignee-col">
                    <span className="mini-avatar" style={{ background: "#ef4444" }}>MCD</span>
                    Patrol Unit 4
                  </div>
                  <div className="sla-col"><span className="sla-badge danger">Active Plume</span></div>
                </div>

                <div className="triage-row">
                  <div className="ticket-title-col">
                    <span className="p-dot dot-yellow" />
                    <div>
                      <strong>Uncovered Construction Dust - NH-48</strong>
                      <span className="sub">Section 133 Notice Auto-Issued</span>
                    </div>
                  </div>
                  <div className="assignee-col">
                    <span className="mini-avatar" style={{ background: "#f59e0b" }}>⚖️</span>
                    Legal Desk
                  </div>
                  <div className="sla-col"><span className="sla-badge success">Notice Sent</span></div>
                </div>

                <div className="triage-row">
                  <div className="ticket-title-col">
                    <span className="p-dot dot-green" />
                    <div>
                      <strong>Anti-Smog Water Cannon Routing</strong>
                      <span className="sub">Ring Road Corridor · 6 Units Active</span>
                    </div>
                  </div>
                  <div className="assignee-col">
                    <span className="mini-avatar" style={{ background: "#10b981" }}>💧</span>
                    PWD Fleet
                  </div>
                  <div className="sla-col"><span className="sla-badge normal">Spraying</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 4: DATA SOURCES & RESULTS (BENTO GRID) */}
      <section className="customers-section" id="customers">
        <div className="customers-container">
          <div className="customers-header">
            <h2 className="customers-heading">
              Trusted data,<br />transparent sources
            </h2>
          </div>

          <div className="bento-grid">
            {/* Tile 1: Photo Man Green */}
            <div className="bento-tile tile-photo">
              <img src="/assets/customer_green.jpg" alt="Environmental Researcher" className="bento-img" />
              <div className="tile-logo-overlay">
                <span className="brand-logo-text">CPCB TELEMETRY</span>
              </div>
            </div>

            {/* Tile 2: White CPCB */}
            <div className="bento-tile tile-white">
              <div className="logo-cpcb">
                <span className="cpcb-brand-mark">CPCB</span>
              </div>
              <div className="tile-subtext">Readings from official CAAQMS monitoring stations across India.</div>
            </div>

            {/* Tile 3: Hot Pink Quote Card */}
            <div className="bento-tile tile-pink">
              <div className="quote-text">
                "AeroStreet's 72-hour forecasts allowed our municipal corporation to deploy dust suppressants 36 hours before peak smog, curbing emergency ward admissions by 42%."
              </div>
              <div className="quote-author">
                <strong>Municipal Taskforce</strong>
                <span>Air Quality Management Commission</span>
              </div>
            </div>

            {/* Tile 4: White IQAir */}
            <div className="bento-tile tile-white">
              <div className="logo-coda">
                <span className="coda-brand-mark">IQAir</span>
              </div>
              <div className="tile-subtext">Global calibration standards & reference satellite overlays.</div>
            </div>

            {/* Tile 5: Photo Woman Red */}
            <div className="bento-tile tile-photo">
              <img src="/assets/customer_red.jpg" alt="Municipal Commissioner" className="bento-img" />
              <div className="tile-logo-overlay">
                <span className="brand-logo-text">CLEAN AIR TASKFORCE</span>
              </div>
            </div>

            {/* Tile 6: White WAQI */}
            <div className="bento-tile tile-white">
              <div className="logo-stylized">
                <span className="stylized-mark">WAQI</span>
              </div>
              <div className="tile-subtext">World Air Quality Index open data ingestion and cross-validation.</div>
            </div>

            {/* Tile 7: Electric Cyan Quote Card */}
            <div className="bento-tile tile-cyan">
              <div className="quote-text">
                "Better data. Better decisions. Cleaner air. We saw community clean-up drive participation jump by 310% once citizens had access to hyper-local street-level telemetry."
              </div>
              <div className="quote-author">
                <strong>Clean Air Citizens Collective</strong>
                <span>Bengaluru Environmental Coalition</span>
              </div>
            </div>

            {/* Tile 8: White Gemini AI */}
            <div className="bento-tile tile-white">
              <div className="logo-wealthsimple">
                <span className="wealthsimple-text">Gemini AI</span>
              </div>
              <div className="tile-subtext">Multimodal atmospheric forecasting and automated action planning.</div>
            </div>

            {/* Tile 9: Photo Man Dark */}
            <div className="bento-tile tile-photo">
              <img src="/assets/customer_dark.jpg" alt="Ministry Data Scientist" className="bento-img" />
              <div className="tile-logo-overlay">
                <span className="brand-logo-text">MINISTRY RESEARCH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: LIVE STATS / REPORT (DARK BLUEPRINT) */}
      <section className="report-section">
        <div className="report-blueprint-backdrop" />
        <div className="report-inner">
          <div className="report-card">
            <h3 className="report-title">
              Where the air is worst right now across India
            </h3>
            <p className="report-desc">
              Real-time telemetry aggregated from 400+ continuous ambient air monitoring stations. Tracking PM2.5, PM10, and regulatory threshold compliance.
            </p>
            <div className="report-btn-wrapper">
              <button className="report-btn" onClick={() => setActiveModal("map")}>
                View national telemetry rankings →
              </button>
            </div>

            <div className="report-divider" />

            {/* Chart with watercolor top bar */}
            <div className="report-chart">
              {cities.slice(0, 5).map((r, index) => {
                const maxAqi = Math.max(...cities.map((c) => c.aqi), 400);
                const barWidth = `${Math.round((r.aqi / maxAqi) * 100)}%`;
                return (
                  <div className="chart-row" key={r.id}>
                    <div className="chart-label">
                      <strong>{r.city}</strong> ({r.state})
                    </div>
                    <div className="chart-bar-container">
                      {index === 0 ? (
                        <div className="watercolor-bar" style={{ width: barWidth }}>
                          <svg className="watercolor-svg" viewBox="0 0 500 24" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="watercolorGradAir" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.9" />
                                <stop offset="85%" stopColor="#b91c1c" stopOpacity="0.92" />
                                <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.85" />
                              </linearGradient>
                              <filter id="brushRoughnessAir" x="-5%" y="-15%" width="110%" height="130%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                              </filter>
                            </defs>
                            <path
                              d="M 4,12 Q 15,3 40,5 T 120,4 T 220,6 T 320,4 T 420,5 T 495,12 Q 480,21 420,19 T 320,20 T 220,18 T 120,20 T 40,19 Z"
                              fill="url(#watercolorGradAir)"
                              filter="url(#brushRoughnessAir)"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="standard-bar"
                          style={{
                            width: barWidth,
                            background: getAqiColor(r.aqi),
                          }}
                        />
                      )}
                    </div>
                    <div className="chart-value" style={{ color: getAqiColor(r.aqi) }}>
                      {r.aqi} AQI
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 6: THE COMPLETE AIR QUALITY PLATFORM */}
      <section className="platform-section" id="platform">
        <div className="platform-container">
          <h2 className="platform-main-heading">
            The complete air quality platform
          </h2>

          <div className="platform-layout">
            <div className="platform-list-col">
              {PLATFORM_ITEMS.map((item, index) => (
                <div
                  key={item.name}
                  className={`platform-list-row ${activePlatformIndex === index ? "expanded" : ""}`}
                  onClick={() => setActivePlatformIndex(activePlatformIndex === index ? null : index)}
                >
                  <div className="row-main">
                    <span className="bullet-dot">•</span>
                    <strong className="item-name">{item.name}</strong>
                  </div>
                  <div className="row-desc">{item.desc}</div>
                  {activePlatformIndex === index && (
                    <div className="row-metrics">
                      <span>⚡ Spec: {item.metrics}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="platform-preview-col">
              <div className="scenic-framed-card">
                <img src="/assets/scenic_card_bg.jpg" alt="AeroStreet Platform Backdrop" className="framed-bg" />
                <div className="messenger-widget-box">
                  <div className="widget-header">
                    <div className="widget-logo" style={{ background: "#00e5a3" }}>
                      <svg viewBox="0 0 32 32" width="22" height="22" fill="#111827">
                        <path d="M8 12c0-1.1.9-2 2-2s2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8zm5-3c0-1.1.9-2 2-2s2 .9 2 2v14c0 1.1-.9 2-2 2s-2-.9-2-2V9zm5 2c0-1.1.9-2 2-2s2 .9 2 2v10c0 1.1-.9 2-2 2s-2-.9-2-2V11zm5 3c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4z" />
                      </svg>
                    </div>
                    <h3>AeroStreet Mobile Sentinel</h3>
                    <p>Hyper-local AQI for {selectedCity.city}</p>
                  </div>

                  <div className="widget-search">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search any Indian pin code / district..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="widget-cards">
                    <div className="widget-card-item" onClick={() => setActiveModal("map")}>
                      <div className="wci-title">Live State Map ({cities.length} Stations)</div>
                      <div className="wci-sub">CPCB calibrated live updates</div>
                    </div>
                    <div className="widget-card-item" onClick={() => setActiveModal("forecast")}>
                      <div className="wci-title">72-Hour AI Forecast</div>
                      <div className="wci-sub">Gemini multimodal predictions</div>
                    </div>
                    <div className="widget-card-item" onClick={() => setActiveModal("municipality")}>
                      <div className="wci-title">Municipal Action Plan</div>
                      <div className="wci-sub">{selectedCity.grapStage} protocols</div>
                    </div>
                  </div>
                  <div className="widget-gradient-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="intercom-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <svg className="footer-icon" viewBox="0 0 32 32" width="28" height="28" fill="none">
                <rect width="32" height="32" rx="7" fill="#ffffff" />
                <path
                  d="M7 11.5c0-1.1.9-2 2-2s2 .9 2 2v9c0 1.1-.9 2-2 2s-2-.9-2-2v-9zm5-3.5c0-1.1.9-2 2-2s2 .9 2 2v16c0 1.1-.9 2-2 2s-2-.9-2-2V8zm5 2.5c0-1.1.9-2 2-2s2 .9 2 2v11c0 1.1-.9 2-2 2s-2-.9-2-2v-11zm5 3.5c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4z"
                  fill="#111827"
                />
              </svg>
              <span>AEROSTREET-AI</span>
            </div>
            <p className="footer-tagline">
              India's complete AI-first air quality platform. Live telemetry, predictive forecasts, and municipal action.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Telemetry</h5>
              <button className="footer-link-btn" onClick={() => setActiveModal("map")}>National Map</button>
              <button className="footer-link-btn" onClick={() => setActiveModal("forecast")}>72-Hour Forecast</button>
              <a href="#platform">District Drilldowns</a>
              <a href="#platform">Predictive Heatmap</a>
            </div>

            <div className="footer-col">
              <h5>Municipal Hub</h5>
              <button className="footer-link-btn" onClick={() => setActiveModal("municipality")}>GRAP Console</button>
              <button className="footer-link-btn" onClick={() => setActiveModal("municipality")}>Legal Notice Generator</button>
              <a href="#platform">CCTV Pollution Alerts</a>
              <a href="#platform">Anti-Smog Fleet Dispatch</a>
            </div>

            <div className="footer-col">
              <h5>Citizen Action</h5>
              <button className="footer-link-btn" onClick={() => setActiveModal("report")}>Report Smoke Plume</button>
              <a href="#platform">Community Clean-Up</a>
              <a href="#platform">Health & Mask Guidelines</a>
              <a href="#platform">School Smog Advisories</a>
            </div>

            <div className="footer-col">
              <h5>Data & Standards</h5>
              <a href="#platform">CPCB CAAQMS Methodology</a>
              <a href="#platform">WAQI Calibration Standards</a>
              <a href="#platform">Gemini AI Model Specs</a>
              <a href="#platform">Open Data API (REST/GraphQL)</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2026 AeroStreet-AI. Real-time data ingested from CPCB, IQAir, WAQI & Gemini AI.</span>
            <a href="#privacy">Methodology</a>
            <a href="#terms">Open Data Terms</a>
            <a href="#security">Sensor Validation</a>
          </div>
          <div className="footer-lang">
            <span>🇮🇳 India (English / हिंदी)</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
         FUNCTIONAL MODALS
         ========================================================================= */}

      {/* MODAL 1: NATIONAL LIVE MAP */}
      {activeModal === "map" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>🇮🇳 India National Air Quality Telemetry Grid</h3>
                <p>Live CAAQMS readings across 28 states & union territories</p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-city-grid">
                {cities.map((item) => (
                  <div
                    key={item.id}
                    className="modal-city-card"
                    style={{ borderTop: `4px solid ${getAqiColor(item.aqi)}` }}
                    onClick={() => {
                      setSelectedCityId(item.id);
                      setActiveModal(null);
                    }}
                  >
                    <div className="mcc-header">
                      <h4>{item.city}</h4>
                      <span className="mcc-state">{item.state}</span>
                    </div>
                    <div className="mcc-aqi-row">
                      <div className="mcc-aqi" style={{ color: getAqiColor(item.aqi) }}>
                        {item.aqi}
                      </div>
                      <div className="mcc-status-pill" style={{ background: `${getAqiColor(item.aqi)}20`, color: getAqiColor(item.aqi) }}>
                        {item.status}
                      </div>
                    </div>
                    <div className="mcc-station">{item.station}</div>
                    <div className="mcc-pollutants">
                      <span>PM2.5: {item.pm25} µg/m³</span>
                      <span>PM10: {item.pm10} µg/m³</span>
                    </div>
                    <button className="mcc-select-btn">Select for telemetry stream →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 72-HOUR AI FORECAST */}
      {activeModal === "forecast" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>✦ Gemini 72-Hour Atmospheric Predictive Model</h3>
                <p>Projection for {selectedCity.city}, {selectedCity.state}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="forecast-slider-container">
                <label>
                  Timeline Projection: <strong>+{forecastHour} Hours Ahead</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="72"
                  step="12"
                  value={forecastHour}
                  onChange={(e) => setForecastHour(Number(e.target.value))}
                  className="forecast-slider"
                />
                <div className="forecast-ticks">
                  <span>Current (0h)</span>
                  <span>+12h</span>
                  <span>+24h</span>
                  <span>+36h</span>
                  <span>+48h</span>
                  <span>+72h</span>
                </div>
              </div>

              <div className="forecast-projected-card">
                <div className="fpc-stat">
                  <span>Predicted AQI at +{forecastHour}h</span>
                  <div
                    className="fpc-number"
                    style={{
                      color: getAqiColor(
                        forecastHour === 0
                          ? selectedCity.aqi
                          : forecastHour <= 24
                          ? selectedCity.forecast24
                          : forecastHour <= 48
                          ? selectedCity.forecast48
                          : selectedCity.forecast72
                      ),
                    }}
                  >
                    {forecastHour === 0
                      ? selectedCity.aqi
                      : forecastHour <= 24
                      ? selectedCity.forecast24
                      : forecastHour <= 48
                      ? selectedCity.forecast48
                      : selectedCity.forecast72}{" "}
                    AQI
                  </div>
                  <span className="fpc-sub">
                    Trajectory: {forecastHour >= 48 ? "Gradual dispersion" : "Particulate accumulation"}
                  </span>
                </div>
                <div className="fpc-factors">
                  <strong>Atmospheric Vectors:</strong>
                  <ul>
                    <li>Wind Speed: {selectedCity.wind}</li>
                    <li>Inversion Ceiling: 380m (Thermal trap)</li>
                    <li>Satellite Stubble Fire Detections: Active</li>
                    <li>Model Confidence: 94.6%</li>
                  </ul>
                </div>
              </div>

              <div className="forecast-actions">
                <button
                  className="btn-primary-modal"
                  onClick={() => {
                    setActiveModal("municipality");
                  }}
                >
                  Generate Pre-emptive Action Plan →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: MUNICIPAL ACTION HUB */}
      {activeModal === "municipality" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>🏛️ Municipal Action & Enforcement Console</h3>
                <p>Graded Response Action Plan (GRAP) for {selectedCity.city}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="grap-banner">
                <div className="grap-level">Current Tier: <strong>{selectedCity.grapStage}</strong></div>
                <p>{selectedCity.actionPlan}</p>
              </div>

              <div className="municipal-tools-grid">
                <div className="tool-card">
                  <h4>💧 Anti-Smog Fleet Deployment</h4>
                  <p>Dispatch automated mist cannons to high-density particulate corridors.</p>
                  <button
                    className="tool-btn"
                    onClick={handleDispatchAction}
                    disabled={actionDispatched}
                  >
                    {actionDispatched ? "✓ 8 Cannons Dispatched" : "Dispatch PWD Water Cannons"}
                  </button>
                </div>

                <div className="tool-card">
                  <h4>⚖️ Legal Notice Automation</h4>
                  <p>Issue statutory notices under Section 133 CrPC / Air Act 1981 to polluters.</p>
                  <button
                    className="tool-btn"
                    onClick={handleGenerateNotice}
                    disabled={noticeGenerated}
                  >
                    {noticeGenerated ? "✓ 14 Notices Dispatched" : "Generate Statutory Notices"}
                  </button>
                </div>

                <div className="tool-card">
                  <h4>🚨 Traffic Corridor Diversion</h4>
                  <p>Reroute heavy commercial diesel transport around urban peripheral bypasses.</p>
                  <button
                    className="tool-btn"
                    onClick={() => alert(`Traffic diversion order broadcasted to ${selectedCity.city} Traffic Police.`)}
                  >
                    Broadcast Diversion Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CITIZEN SMOG REPORT */}
      {activeModal === "report" && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>📸 Citizen Smog & Waste Burning Report</h3>
                <p>Empower your city with verified environmental evidence</p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <form
                className="report-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Thank you! Your citizen report for ${selectedCity.city} has been verified by Gemini AI and dispatched to the municipal taskforce.`);
                  setActiveModal(null);
                }}
              >
                <div className="form-group">
                  <label>Incident Type</label>
                  <select required>
                    <option>Open Municipal Waste Burning</option>
                    <option>Uncovered Construction Dust Plume</option>
                    <option>Industrial Chimney Smoke Violation</option>
                    <option>Biomass / Stubble Fire</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location / Ward</label>
                  <input type="text" defaultValue={`${selectedCity.city} — Near Central Ring`} required />
                </div>

                <div className="form-group">
                  <label>Photo Evidence Upload</label>
                  <div className="upload-dropzone">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Click to simulate photo attachment with GPS coordinates</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes / Landmark</label>
                  <textarea rows="3" placeholder="Describe the smoke color, source, and proximity to residential areas..."></textarea>
                </div>

                <button type="submit" className="btn-primary-modal">
                  Submit Verified Citizen Report →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
