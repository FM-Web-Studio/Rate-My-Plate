import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeSwitch, Loading, NotFound } from './components';
import { useTheme } from './hooks';
import pageData from './information/page.json';
import spiesData from './information/spies.json';

// ============================================
// IMPORTS - STYLING
// ============================================

import styles from './App.module.css';

// ============================================
// SPY CARD COMPONENT
// ============================================

const SpyCard = ({ agent, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`${styles['spy-card']} ${isVisible ? styles['visible'] : ''} ${isFlipped ? styles['flipped'] : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles['card-inner']}>
        {/* FRONT OF CARD */}
        <div className={styles['card-front']}>
          <div className={styles['classification-badge']}>
            {agent.clearanceLevel}
          </div>
          <div className={styles['agent-image-container']}>
            <img 
              src={require(`./images/spies/${agent.image}`)} 
              alt={agent.name}
              className={styles['agent-image']}
            />
            <div className={styles['image-overlay']}>
              <div className={styles['scan-line']}></div>
            </div>
          </div>
          <div className={styles['agent-info']}>
            <div className={styles['agent-status']}>
              <span className={styles['status-dot']}></span>
              {agent.status}
            </div>
            <h3 className={styles['agent-name']}>{agent.name}</h3>
            <p className={styles['agent-codename']}>"{agent.codename}"</p>
            <p className={styles['agent-classification']}>{agent.classification}</p>
            <div className={styles['tap-hint']}>
              <span>TAP FOR INTEL</span>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className={styles['card-back']}>
          <div className={styles['dossier-header']}>
            <h3>CLASSIFIED DOSSIER</h3>
            <p className={styles['agent-id']}>ID: {agent.id}</p>
          </div>
          
          <div className={styles['stats-container']}>
            {Object.entries(agent.stats).map(([stat, value]) => (
              <div key={stat} className={styles['stat-bar']}>
                <div className={styles['stat-label']}>
                  <span>{stat.toUpperCase()}</span>
                  <span className={styles['stat-value']}>{value}</span>
                </div>
                <div className={styles['stat-progress']}>
                  <div 
                    className={styles['stat-fill']}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles['specialties']}>
            <h4>SPECIALTIES</h4>
            <div className={styles['specialty-tags']}>
              {agent.specialties.map((specialty, idx) => (
                <span key={idx} className={styles['tag']}>{specialty}</span>
              ))}
            </div>
          </div>

          <div className={styles['motto']}>
            <p>"{agent.motto}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOME PAGE COMPONENT
// ============================================

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading message="Accessing Classified Files" />;
  }

  return (
    <div className={styles.app}>
      {/* THEME SWITCH */}
      <div className={styles['theme-switch-container']}>
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} size={28} />
      </div>

      {/* ANIMATED BACKGROUND */}
      <div className={styles['background-pattern']}>
        <div className={styles['grid-overlay']}></div>
        <div className={styles['scan-effect']}></div>
      </div>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles['mission-badge']}>
          <span className={styles['badge-text']}>{pageData.missionCode}</span>
        </div>
        
        <h1 className={styles['main-title']}>
          <span className={styles['glitch']} data-text={pageData.title}>
            {pageData.title}
          </span>
        </h1>
        
        <p className={styles.subtitle}>{pageData.subtitle}</p>
        <p className={styles.tagline}>{pageData.tagline}</p>
        
        <div className={styles['access-granted']}>
          <div className={styles['typing-effect']}>
            <span>ACCESS GRANTED</span>
            <span className={styles['cursor']}>_</span>
          </div>
        </div>
      </section>

      {/* CURRENT MISSION DETAILS */}
      <section className={styles['mission-details-section']}>
        <h2 className={styles['section-title']}>
          <span className={styles['title-line']}></span>
          CURRENT MISSION DETAILS
          <span className={styles['title-line']}></span>
        </h2>

        <div className={styles['mission-details-grid']}>
          {/* HOST & LOCATION */}
          <div className={styles['mission-card']}>
            <div className={styles['mission-card-header']}>
              <h3>🎩 HOST & LOCATION</h3>
            </div>
            <div className={styles['mission-card-content']}>
              <div className={styles['mission-info-row']}>
                <span className={styles['label']}>Mission Commander:</span>
                <span className={styles['value']}>{pageData.currentMission.host}</span>
              </div>
              <div className={styles['mission-info-row']}>
                <span className={styles['label']}>Mission Number:</span>
                <span className={styles['value']}>#{pageData.currentMission.missionNumber}</span>
              </div>
              <div className={styles['location-info']}>
                <h4>{pageData.currentMission.location.venue}</h4>
                <p>{pageData.currentMission.location.address}</p>
                <p>{pageData.currentMission.location.city}</p>
                <p className={styles['coordinates']}>{pageData.currentMission.location.coordinates}</p>
              </div>
            </div>
          </div>

          {/* THEME & DRESS CODE */}
          <div className={styles['mission-card']}>
            <div className={styles['mission-card-header']}>
              <h3>🎭 THEME & ATTIRE</h3>
            </div>
            <div className={styles['mission-card-content']}>
              <div className={styles['mission-info-row']}>
                <span className={styles['label']}>Mission Theme:</span>
                <span className={styles['value']}>{pageData.currentMission.theme}</span>
              </div>
              <div className={styles['dress-code']}>
                <h4>Dress Code</h4>
                <p className={styles['dress-code-text']}>{pageData.currentMission.dressCode}</p>
              </div>
              <div className={styles['previous-mission']}>
                <h4>Previous Mission</h4>
                <p><strong>{pageData.currentMission.previousMission.host}</strong></p>
                <p>Theme: {pageData.currentMission.previousMission.theme}</p>
                <p className={styles['status']}>{pageData.currentMission.previousMission.status}</p>
              </div>
            </div>
          </div>

          {/* CLASSIFIED MENU */}
          <div className={styles['mission-card']}>
            <div className={styles['mission-card-header']}>
              <h3>{pageData.currentMission.menu.title}</h3>
            </div>
            <div className={styles['mission-card-content']}>
              <div className={styles['menu-items']}>
                {pageData.currentMission.menu.items.map((item, idx) => (
                  <div key={idx} className={styles['menu-item']}>
                    <span className={styles['course']}>{item.course}:</span>
                    <span className={styles['dish']}>{item.dish}</span>
                  </div>
                ))}
              </div>
              <div className={styles['menu-note']}>
                <p>⚠️ {pageData.currentMission.menu.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENTS SECTION */}
      <section className={styles['agents-section']}>
        <h2 className={styles['section-title']}>
          <span className={styles['title-line']}></span>
          THE OPERATIVES
          <span className={styles['title-line']}></span>
        </h2>
        
        <div className={styles['agents-grid']}>
          {spiesData.agents.map((agent, index) => (
            <SpyCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </section>

      {/* MISSION BRIEFING */}
      <section className={styles['briefing-section']}>
        <h2 className={styles['section-title']}>
          <span className={styles['title-line']}></span>
          MISSION BRIEFING
          <span className={styles['title-line']}></span>
        </h2>

        <div className={styles['briefing-grid']}>
          {/* HOW IT WORKS */}
          <div className={styles['briefing-card']}>
            <div className={styles['card-header']}>
              <h3>{pageData.sections.howItWorks.title}</h3>
              <span className={styles['card-icon']}>🎯</span>
            </div>
            <ul className={styles['briefing-list']}>
              {pageData.sections.howItWorks.points.map((point, idx) => (
                <li key={idx}>
                  <span className={styles['bullet']}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* SCHEDULING */}
          <div className={styles['briefing-card']}>
            <div className={styles['card-header']}>
              <h3>{pageData.sections.datesAndTimes.title}</h3>
              <span className={styles['card-icon']}>📅</span>
            </div>
            <ul className={styles['briefing-list']}>
              {pageData.sections.datesAndTimes.points.map((point, idx) => (
                <li key={idx}>
                  <span className={styles['bullet']}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* IMPORTANT BITS */}
          <div className={styles['briefing-card']}>
            <div className={styles['card-header']}>
              <h3>{pageData.sections.importantBits.title}</h3>
              <span className={styles['card-icon']}>⚠️</span>
            </div>
            <ul className={styles['briefing-list']}>
              {pageData.sections.importantBits.points.map((point, idx) => (
                <li key={idx}>
                  <span className={styles['bullet']}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* UNWRITTEN RULES */}
          <div className={styles['briefing-card']}>
            <div className={styles['card-header']}>
              <h3>{pageData.sections.unwrittenRules.title}</h3>
              <span className={styles['card-icon']}>🔒</span>
            </div>
            <ul className={styles['briefing-list']}>
              {pageData.sections.unwrittenRules.points.map((point, idx) => (
                <li key={idx}>
                  <span className={styles['bullet']}>▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RATING CRITERIA */}
      <section className={styles['criteria-section']}>
        <h2 className={styles['section-title']}>
          <span className={styles['title-line']}></span>
          ASSESSMENT CRITERIA
          <span className={styles['title-line']}></span>
        </h2>

        <div className={styles['criteria-grid']}>
          {pageData.sections.ratingCriteria.criteria.map((criterion, idx) => (
            <div 
              key={idx} 
              className={styles['criterion-card']}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={styles['criterion-icon']}>{criterion.icon}</div>
              <h3>{criterion.name}</h3>
              <p>{criterion.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <p className={styles['footer-mission']}>🍝 🍷 🍰</p>
          <p className={styles['footer-text']}>
            This message will self-destruct in... just kidding. See you at dinner!
          </p>
          <div className={styles['footer-stamp']}>
            <span>APPROVED</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;