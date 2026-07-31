/* ============================================================
   Content renderer
   - Editable resume data: content.js
   - Visual rules: styles.css
   - This file only maps data to the existing visual components.
   ============================================================ */
const SITE = window.SITE_CONTENT;

if (!SITE) {
  throw new Error('SITE_CONTENT is missing. Load content.js before app.js.');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function sectionHead(number, title, moreLink = '') {
  return `
    <div class="sec-head reveal">
      <span class="num">${escapeHtml(number)}.</span><h3>${escapeHtml(title)}</h3>
      ${moreLink}
      <div class="line"></div>
    </div>`;
}

function contributionLevel(count) {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 9) return 2;
  if (count <= 19) return 3;
  return 4;
}

// Use local dates for the contribution graph (matches GitHub's own behavior).
// This way "today" in the graph matches the viewer's local "today", not UTC.
function localDate(value) {
  return new Date(`${value}T00:00:00`);
}
function localIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function contributionWindow() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // GitHub's graph is arranged in Sunday-starting week columns. Starting on
  // the Sunday 52 weeks ago keeps the grid aligned and avoids fixed dates.
  const start = new Date(end);
  start.setDate(start.getDate() - start.getDay() - (52 * 7));
  return { start, end };
}

function contributionTitle(date, count) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateLabel = `${weekdays[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  if (count === 0) return `No contributions on ${dateLabel}`;
  return `${count} contribution${count === 1 ? '' : 's'} on ${dateLabel}`;
}

function renderContributionGraph() {
  const { start, end } = contributionWindow();
  const oneDay = 86400000;
  const days = [];

  for (let cursor = new Date(start); cursor <= end; cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)) {
    const key = localIsoDate(cursor);
    const count = 0;
    const level = contributionLevel(count);
    days.push(`<span class="gh-day l${level}" title="${escapeHtml(contributionTitle(cursor, count))}" data-c="${count}" data-d="${key}"></span>`);
  }

  const monthLabels = [];
  let monthCursor = new Date(start.getFullYear(), start.getMonth() + 1, 1);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  while (monthCursor <= end) {
    const startColumn = Math.floor((monthCursor - start) / oneDay / 7) + 1;
    monthLabels.push(`<span class="gh-month" style="grid-column: ${startColumn}">${monthNames[monthCursor.getMonth()]}</span>`);
    monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1);
  }

  return `
    <div class="gh-card">
      <div class="gh-graph-area">
        <div class="gh-months">${monthLabels.join('')}</div>
        <div class="gh-dow-labels">
          <span style="grid-row: 2">Mon</span>
          <span style="grid-row: 4">Wed</span>
          <span style="grid-row: 6">Fri</span>
        </div>
        <div class="gh-grid">${days.join('')}</div>
      </div>
      <div class="gh-foot">
        <div class="gh-legend">
          <span>Less</span>
          <span class="gh-legend-cell l0" title="No contributions"></span>
          <span class="gh-legend-cell l1" title="Low"></span>
          <span class="gh-legend-cell l2" title="Medium"></span>
          <span class="gh-legend-cell l3" title="High"></span>
          <span class="gh-legend-cell l4" title="Very high"></span>
          <span>More</span>
        </div>
        <span class="gh-stamp" title="GitHub contributions are refreshed automatically">syncing automatically…</span>
      </div>
    </div>`;
}

function renderNavigation() {
  return `
    <nav class="top">
      <div class="nav-progress" aria-hidden="true"></div>
      <div class="container row">
        <a class="brand" href="#" aria-label="Back to top">
          <span class="brand-mark">YJ</span>
          <span class="brand-path">${escapeHtml(SITE.meta.brand)}</span>
        </a>
        <ul>${SITE.navigation.map(item => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join('')}</ul>
        <div class="nav-status" aria-hidden="true"><span></span> LIVE PORTFOLIO</div>
      </div>
    </nav>`;
}

function renderHero() {
  const hero = SITE.hero;
  return `
    <header class="hero">
      <div class="hero-orbit hero-orbit-a" aria-hidden="true"></div>
      <div class="hero-orbit hero-orbit-b" aria-hidden="true"></div>
      <div class="hero-shell">
        <div class="hero-main">
          <div class="hero-kicker-row">
            <span class="hero-kicker">RESEARCH AVATAR</span>
            <span class="hero-kicker alt">LV. M.S.-01</span>
          </div>
          <div class="greeting">${escapeHtml(hero.greeting)}</div>
          <h1 class="scramble-name" data-scramble-zh="${escapeHtml(hero.nameZh)}" data-scramble-en="${escapeHtml(hero.nameEn)}" title="Click to scramble">
            <span class="hero-name-zh"></span>
            <span class="hero-name-en">/ <span class="hero-name-en-inner"></span></span>
          </h1>
          <h2>${escapeHtml(hero.degree)} <span class="tag">${escapeHtml(hero.school)}</span></h2>
          <p class="sub">${escapeHtml(hero.summary)}</p>
          <div class="cta">
            <a class="btn primary" href="#publications">📄 View Publications</a>
            <a class="btn ghost" href="${escapeHtml(hero.scholarUrl)}" target="_blank" rel="noopener">🎓 Google Scholar</a>
            <a class="btn ghost" href="#about">👋 More About Me</a>
          </div>
        </div>
        <aside class="hero-console glass reveal show" aria-label="Research system summary">
          <div class="console-top">
            <span class="console-dot red"></span>
            <span class="console-dot yellow"></span>
            <span class="console-dot green"></span>
            <span class="console-title">mission.config</span>
          </div>
          <div class="console-lines">
            <div><span>mode</span><b>edge-ai / embodied-ai</b></div>
            <div><span>stack</span><b>NAS · CV · robotics</b></div>
            <div><span>target</span><b>real-time deployment</b></div>
            <div><span>status</span><b>open to collaborate</b></div>
          </div>
          <div class="console-meter" aria-hidden="true"><span></span></div>
          <div class="console-note">click the name · trigger intro animation</div>
        </aside>
      </div>
      <div class="hero-stickers" aria-hidden="true">
        <span>NAS</span>
        <span>CV</span>
        <span>EDGE</span>
        <span>ROBOT</span>
      </div>
    </header>`;
}

function renderSectionRibbon() {
  return `
    <div class="side-ribbon" aria-hidden="true">
      <span>姚俊杰</span>
      <span>YAO JUNJIE</span>
      <span>PORTFOLIO</span>
    </div>`;
}

function renderAbout() {
  const about = SITE.about;
  const featured = SITE.publications.find(publication => publication.id === about.featuredPublicationId);
  if (!featured) throw new Error(`Featured publication not found: ${about.featuredPublicationId}`);

  return `
    <section id="about">
      <div class="container">
        ${sectionHead('01', 'About')}
        <div class="about-stage">
          <aside class="about-side reveal" aria-hidden="true">
            <div class="about-side-num">01</div>
            <div class="about-side-label">about · me</div>
            <div class="about-side-line"></div>
          </aside>
          <div class="about-main">
            <div class="about-head reveal">
              <span class="status-pill"><span class="status-dot"></span>${escapeHtml(about.status)}</span>
              <h2 class="about-name">
                <span class="name-zh">${escapeHtml(about.nameZh)}</span>
                <span class="name-en">${escapeHtml(about.nameEn)}</span>
              </h2>
              <p class="about-tagline">${about.taglineHtml}</p>
            </div>
            <div class="bento">
              <div class="bento-quote glass reveal">
                <div class="featured-pub">
                  <a class="fp-cover" href="${escapeHtml(featured.pdfUrl)}" target="_blank" rel="noopener" aria-label="Open featured paper PDF">
                    <img src="${escapeHtml(featured.coverUrl)}" alt="${escapeHtml(featured.coverAlt)}" loading="lazy" />
                    <span class="fp-cover-badge">📄 Open PDF</span>
                  </a>
                  <div class="fp-body">
                    <div class="fp-head">
                      <span class="fp-label">// FEATURED</span>
                      <div class="fp-tags"><span class="tag q1">SCI Q1</span><span class="tag esi">ESI Highly Cited</span></div>
                    </div>
                    <a class="fp-title" href="${escapeHtml(featured.readUrl)}" target="_blank" rel="noopener">${escapeHtml(featured.title)}</a>
                    <div class="fp-authors">${about.featuredAuthorsHtml}</div>
                    <div class="fp-venue">${escapeHtml(about.featuredVenue)}</div>
                    <p class="fp-summary">${escapeHtml(about.featuredSummary)}</p>
                    <div class="fp-actions">
                      <a class="fp-cta primary" href="${escapeHtml(featured.readUrl)}" target="_blank" rel="noopener">↗ Read paper</a>
                      <a class="fp-cta" href="${escapeHtml(featured.pdfUrl)}" target="_blank" rel="noopener">📄 PDF</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bento-avatar reveal">
                <div class="avatar-frame" id="avatar">
                  <div class="avatar-glow"></div>
                  <div class="avatar-border"></div>
                  <img class="avatar-img" src="assets/avatar/cartoon.png" alt="${escapeHtml(about.nameEn)}" />
                  <div class="avatar-ui">
                    <span>PLAYER</span>
                    <b>YJ // AI RESEARCH</b>
                  </div>
                </div>
              </div>
              <div class="bento-focus glass reveal">
                <h5 class="bento-label">Focus</h5>
                <div class="focus-tags">${about.focus.map(item => `<span class="focus-tag">${escapeHtml(item)}</span>`).join('')}</div>
              </div>
              <div class="bento-currently glass reveal">
                <h5 class="bento-label">Currently</h5>
                <p>${about.currentlyHtml}</p>
              </div>
              <div class="bento-stats glass reveal">
                <h5 class="bento-label">By the numbers</h5>
                <div class="stats-row">${about.stats.map(stat => `
                  <div class="stat">
                    <div class="stat-num" data-target="${Number(stat.value)}" data-suffix="">0</div>
                    <div class="stat-label">${escapeHtml(stat.label)}</div>
                  </div>`).join('')}</div>
              </div>
              <div class="bento-contact glass reveal">${renderContributionGraph()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderExperience() {
  return `
    <section id="experience">
      <div class="container">
        ${sectionHead('02', 'Experience')}
        <div class="timeline">${SITE.experience.map(item => `
          <div class="tl-item glass reveal">
            <div class="tl-head">
              <h4>${escapeHtml(item.organization)}</h4>
              <span class="when">${escapeHtml(item.period)}</span>
            </div>
            <div class="tl-role">${escapeHtml(item.role)}</div>
            <ul>${item.bulletsHtml.map(bullet => `<li>${bullet}</li>`).join('')}</ul>
          </div>`).join('')}</div>
      </div>
    </section>`;
}

function renderPublications() {
  const scholarUrl = SITE.hero.scholarUrl;
  const moreLink = `<a class="more-link" href="${escapeHtml(scholarUrl)}" target="_blank" rel="noopener">完整列表 → Scholar</a>`;
  const published = SITE.publications.map((publication, index) => `
    <article class="pub-card glass reveal" data-pub="${escapeHtml(publication.id)}">
      <span class="pub-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <a class="pub-cover" href="${escapeHtml(publication.pdfUrl)}" target="_blank" rel="noopener" aria-label="Open PDF">
        <img class="pub-cover-img" src="${escapeHtml(publication.coverUrl)}" alt="${escapeHtml(publication.coverAlt)}" loading="lazy" />
        <span class="pub-cover-badge ${escapeHtml(publication.coverBadge.className)}">${escapeHtml(publication.coverBadge.label)}</span>
        <div class="pub-cover-overlay">📄 Open PDF</div>
      </a>
      <div class="pub-body">
        <div class="pub-meta">
          <span class="tag ${escapeHtml(publication.tag.className)}">${escapeHtml(publication.tag.label)}</span>
          <span class="pub-authors">${publication.authorsHtml}</span>
          <a class="pub-title-link" href="${escapeHtml(publication.readUrl)}" target="_blank" rel="noopener">${escapeHtml(publication.title)}</a>
          <span class="pub-venue">${escapeHtml(publication.venue)}</span>
        </div>
        <p class="pub-summary">${escapeHtml(publication.summary)}</p>
        <div class="pub-actions">
          <a class="btn-pub" href="${escapeHtml(publication.pdfUrl)}" target="_blank" rel="noopener">📄 PDF</a>
          <button class="btn-pub" data-cite="${escapeHtml(publication.id)}">📋 Cite</button>
          <a class="btn-pub" href="${escapeHtml(publication.readUrl)}" target="_blank" rel="noopener">↗ Read</a>
        </div>
      </div>
    </article>`).join('');

  const inProgress = SITE.worksInProgress.map(work => `
    <div class="pub pub-compact glass reveal">
      <span class="tag under">${escapeHtml(work.status)}</span>
      ${work.authorsHtml}
      <span class="title">${escapeHtml(work.title)}</span>.
      <span class="where">${escapeHtml(work.venue)}</span>.
    </div>`).join('');

  return `
    <section id="publications">
      <div class="container">
        ${sectionHead('03', 'Publications', moreLink)}
        <div class="pub-note reveal">
          <span class="pub-note-icon">⚠️</span>
          <div><strong>Citation note:</strong> Publication metadata (author lists, DOIs, venues, page numbers) is auto-synced from <em>CrossRef</em> and <em>Semantic Scholar</em> and has not been manually verified. For accurate citation, please always cross-check with <a href="${escapeHtml(scholarUrl)}" target="_blank" rel="noopener">Google Scholar ↗</a> (especially author order and full author names, which sometimes differ across databases).</div>
        </div>
        <div class="pub-list">${published}${inProgress}</div>
      </div>
    </section>`;
}

function renderAwards() {
  return `
    <section id="awards">
      <div class="container">
        ${sectionHead('04', 'Awards & Patents')}
        <div class="grid-2">
          <div>
            <h4 class="subsection-label">// Honors</h4>
            ${SITE.awards.map(award => `
              <div class="award glass reveal">
                <span class="emoji">${escapeHtml(award.emoji)}</span>${award.textHtml}
                <div class="role">${escapeHtml(award.detail)}</div>
              </div>`).join('')}
          </div>
          <div>
            <h4 class="subsection-label">// Patents (Under Application)</h4>
            ${SITE.patents.map(patent => `<div class="patent glass reveal">${escapeHtml(patent)}</div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

function renderHighlights() {
  const highlight = SITE.highlight;
  const moreLink = `<a class="more-link" href="${escapeHtml(SITE.hero.scholarUrl)}" target="_blank" rel="noopener">完整列表 → Scholar</a>`;
  return `
    <section id="highlights">
      <div class="container">
        ${sectionHead('05', 'Award Highlights', moreLink)}
        <div class="award-evidence award-evidence-featured glass reveal">
          <div class="evidence-head">
            <div class="evidence-meta">
              <h4>${escapeHtml(highlight.title)}</h4>
              <p>${escapeHtml(highlight.description)}</p>
            </div>
            <div class="evidence-links">${highlight.links.map(link => `
              <a class="evidence-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener" title="${escapeHtml(link.title)}">
                <span class="evidence-link-icon">${escapeHtml(link.icon)}</span><span>${escapeHtml(link.label)}</span><span class="evidence-link-arrow">↗</span>
              </a>`).join('')}</div>
          </div>
          <div class="evidence-video">
            <video controls preload="none" poster="${escapeHtml(highlight.posterUrl)}" playsinline>
              <source src="${escapeHtml(highlight.videoUrl)}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>`;
}

function renderContact() {
  const contact = SITE.contact;
  return `
    <section id="contact">
      <div class="container">
        ${sectionHead('06', 'Contact')}
        <div class="contact-block reveal">
          <h2 class="contact-headline">${contact.headlineHtml}</h2>
          <p class="contact-subline">${escapeHtml(contact.subline)}</p>
          <button type="button" class="contact-email-btn" data-copy="${escapeHtml(contact.email)}" aria-label="Copy email to clipboard">
            <span class="cr-k">Email</span><span class="cr-v">${escapeHtml(contact.email)}</span><span class="cr-arrow">↗</span>
          </button>
          <div class="contact-extra">
            <a class="contact-extra-link" href="${escapeHtml(contact.scholarUrl)}" target="_blank" rel="noopener"><span class="ce-icon">🎓</span> Google Scholar</a>
            <a class="contact-extra-link" href="${escapeHtml(contact.githubUrl)}" target="_blank" rel="noopener"><span class="ce-icon">🐙</span> GitHub</a>
            <span class="contact-extra-link contact-extra-static"><span class="ce-icon">📍</span> ${escapeHtml(contact.location)}</span>
          </div>
        </div>
      </div>
    </section>`;
}

function renderFooterAndModal() {
  return `
    <footer>
      <div class="container">
        <p>${SITE.footer.primaryHtml}</p>
        <p class="footer-legal">${escapeHtml(SITE.footer.legal)}</p>
      </div>
    </footer>
    <div class="cite-modal" id="cite-modal" role="dialog" aria-labelledby="cite-title" aria-modal="true">
      <div class="cite-backdrop" data-cite-close></div>
      <div class="cite-dialog glass">
        <div class="cite-head"><h4 id="cite-title">📋 Cite this paper</h4><button class="cite-close" data-cite-close aria-label="Close">✕</button></div>
        <div class="cite-meta-info" id="cite-meta">—</div>
        <div class="cite-tabs" role="tablist">
          <button class="cite-tab active" data-format="bibtex" role="tab">BibTeX</button>
          <button class="cite-tab" data-format="apa" role="tab">APA</button>
          <button class="cite-tab" data-format="mla" role="tab">MLA</button>
        </div>
        <div class="cite-body"><pre id="cite-content">—</pre></div>
        <div class="cite-foot"><button class="cite-copy" id="cite-copy">📋 Copy</button></div>
      </div>
    </div>`;
}

function renderSite() {
  document.title = SITE.meta.title;
  const root = document.getElementById('site-root');
  root.innerHTML = [
    renderNavigation(),
    renderSectionRibbon(),
    renderHero(),
    renderAbout(),
    renderExperience(),
    renderPublications(),
    renderAwards(),
    renderHighlights(),
    renderContact(),
    renderFooterAndModal()
  ].join('');
}

renderSite();

/* ============================================================
   GitHub contributions — generated by GitHub Actions, read as static data
   - The page never exposes a token or calls the rate-limited events API.
   - The workflow queries GitHub's contribution calendar every six hours.
   - A lightweight page-side poll picks up a newly deployed JSON file.
   ============================================================ */
const GH_DATA_URL = 'data/github-contributions.json';
const GH_DATA_POLL_MS = 15 * 60 * 1000;

function applyGitHubContributions(contributions) {
  let updated = 0;
  for (const [date, count] of Object.entries(contributions)) {
    const cell = document.querySelector(`.gh-day[data-d="${date}"]`);
    if (!cell) continue;
    const level = contributionLevel(count);
    cell.className = `gh-day l${level}`;
    cell.setAttribute('title', contributionTitle(localDate(date), count));
    cell.setAttribute('data-c', String(count));
    updated++;
  }
  return updated;
}

function setGhStamp(text, isLive) {
  const stamp = document.querySelector('.gh-stamp');
  if (!stamp) return;
  stamp.textContent = text;
  if (isLive) stamp.classList.add('live');
  else stamp.classList.remove('live');
}

async function refreshGitHubContributions() {
  try {
    // The query string prevents a browser or CDN cache from pinning an old
    // generated file while a visitor keeps the page open.
    const response = await fetch(`${GH_DATA_URL}?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const calendar = payload?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!Array.isArray(calendar?.weeks)) throw new Error('Invalid contribution calendar');
    if (calendar.weeks.length === 0) {
      setGhStamp('waiting for the first automatic sync');
      return;
    }

    const contributions = {};
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays || []) {
        contributions[day.date] = Number(day.contributionCount || 0);
      }
    }
    applyGitHubContributions(contributions);
    setGhStamp('updated automatically · GitHub Actions', true);
  } catch (error) {
    console.warn('GitHub contribution data fetch failed:', error);
    setGhStamp('automatic sync temporarily unavailable');
  }
}

refreshGitHubContributions();
setInterval(() => {
  if (document.visibilityState === 'visible') refreshGitHubContributions();
}, GH_DATA_POLL_MS);

/* ============================================================
   Interface polish: scroll progress, pointer aura, click sparks
   ============================================================ */
(function initInterfaceFx() {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.nav-progress');
  const navLinks = [...document.querySelectorAll('nav.top a[href^="#"]')]
    .filter(link => link.getAttribute('href') !== '#');
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateScrollState() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(1, Math.max(0, window.scrollY / max));
    if (progress) progress.style.transform = `scaleX(${pct})`;

    let activeId = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 120) activeId = section.id;
    }
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`));
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState);
  updateScrollState();

  if (!prefersReducedMotion) {
    window.addEventListener('pointermove', event => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    }, { passive: true });

    
  }
})();

/* ============================================================
   Particles background
   ============================================================ */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, particles, mouse = { x: -1000, y: -1000 };

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initParticles() {
  const n = Math.min(110, Math.floor(W * H / 12000));
  particles = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.6,
    hue: 240 + Math.random() * 120,
  }));
}
function step() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const d  = Math.hypot(dx, dy);
    if (d < 120) {
      const f = (120 - d) / 120 * 0.6;
      p.x += (dx / d) * f;
      p.y += (dy / d) * f;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.85)`;
    ctx.fill();
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(${(a.hue+b.hue)/2}, 80%, 70%, ${0.18 * (1 - d/110)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(step);
}
window.addEventListener('resize', () => { resize(); initParticles(); });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseout',  () => { mouse.x = mouse.y = -1000; });
resize(); initParticles(); step();

/* ============================================================
   Reveal on scroll
   ============================================================ */
const io = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      // count-up if the element has stat counters
      e.target.querySelectorAll('.stat-num').forEach(el => {
        if (el.dataset.target && !el.dataset.run) {
          el.dataset.run = '1';
          const target = parseInt(el.dataset.target, 10) || 0;
          const suffix = el.dataset.suffix || '';
          const dur = 1200;
          const start = performance.now();
          const step = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            const val = Math.round(eased * target);
            el.textContent = val + suffix;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ?noshow=1 — force-show all reveals (for screenshots)
if (new URLSearchParams(location.search).get('noshow') === '1') {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  const style = document.createElement('style');
  style.textContent = '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }';
  document.head.appendChild(style);
  // ?sec=about — also auto-scroll to a section (for screenshot tooling)
  const sec = new URLSearchParams(location.search).get('sec');
  if (sec) {
    setTimeout(() => {
      const el = document.getElementById(sec);
      if (el) el.scrollIntoView({ block: 'start' });
    }, 200);
  }
}

/* ============================================================
   Avatar mouse-parallax (About section)
   ============================================================ */
(function () {
  const avatar = document.getElementById('avatar');
  if (!avatar) return;
  let raf = null;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  document.addEventListener('mousemove', e => {
    const rect = avatar.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / 30;   // ±10px max
    const dy = (e.clientY - cy) / 30;
    targetX = Math.max(-12, Math.min(12, dx));
    targetY = Math.max(-12, Math.min(12, dy));
    if (!raf) raf = requestAnimationFrame(update);
  });
  function update() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    avatar.style.setProperty('--px', currentX.toFixed(2) + 'px');
    avatar.style.setProperty('--py', currentY.toFixed(2) + 'px');
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      raf = requestAnimationFrame(update);
    } else {
      raf = null;
    }
  }
})();

/* ============================================================
   Hero reveal — v6 (3-phase self-introduction)
   - Phase 1: cycle through excuse phrases (the "noise")
   - Phase 2: typewriter "额...对了" / "oh... right" (the "oh right" moment)
   - Phase 3: final reveal "我是姚俊杰" / "I'm Yao Junjie" + green flash
   - Story: every excuse you can think of for not answering,
     then a moment of realization, then a real self-intro.
   - Each phase is independently awaitable; click re-triggers
     the whole sequence.
   ============================================================ */
const SCRAMBLE_PHRASES_CN = [
  '出门没带手机', '消息没回', '不想加班', '衣服没洗',
  '我在路上', '刚看到', '网络不好', '手机没电',
  '在洗澡', '刚醒', '马上到', '忘了',
  '等一下', '再说吧', '有点忙', '回头聊',
  '可能吧', '算了吧', '没事没事', '下次吧',
  '别催了', '马上好', '再等等', '在地铁',
  '我看看', '不一定', '回头说', '有点事'
];

const SCRAMBLE_PHRASES_EN = [
  'on the way', 'phone dead', 'shower now', 'lunch time',
  'at the gym', 'wifi sucks', 'no signal', 'busy now',
  'in a mtg', 'rushing', 'l8r ok', 'gonna pass',
  'maybe next', 'no thanks', 'driving', 'walking',
  'brb', 'omw', 'ttyl', 'afk',
  'just woke', 'in transit', 'heads down', 'low batt'
];

async function revealHero(el, opts) {
  if (!el) return;

  // Cancel any previous reveal for THIS element
  if (el._scrambleRAF) cancelAnimationFrame(el._scrambleRAF);
  if (el._scrambleTO) clearTimeout(el._scrambleTO);
  if (el._revealJob) el._revealJob.cancelled = true;
  const job = { cancelled: false };
  el._revealJob = job;

  // Phase 1: cycle through excuse phrases
  if (opts.cyclePhrases && opts.cyclePhrases.length > 0) {
    await cyclePhrases(el, opts.cyclePhrases, opts.cycleDuration, opts.cycleFrameInterval, job);
    if (job.cancelled) return;
  }

  // Phase 2: typewriter realization
  if (opts.typeText) {
    await typewrite(el, opts.typeText, opts.typeCharDelay, opts.typeHold, job);
    if (job.cancelled) return;
  }

  // Phase 3: final reveal + green flash
  el.textContent = opts.finalText;
  el.classList.remove('scramble-resolved');
  void el.offsetWidth;
  el.classList.add('scramble-resolved');
  el._scrambleTO = setTimeout(() => el.classList.remove('scramble-resolved'), 700);
}

function cyclePhrases(el, pool, duration, frameInterval, job) {
  return new Promise(resolve => {
    el.textContent = pool[Math.floor(Math.random() * pool.length)];
    const start = performance.now();
    let lastFrame = start;
    let lastPhrase = el.textContent;

    function tick(now) {
      if (job.cancelled) { resolve(); return; }
      const elapsed = now - start;
      if (elapsed >= duration) { resolve(); return; }

      if (now - lastFrame >= frameInterval) {
        // Avoid same phrase twice in a row
        let next;
        do {
          next = pool[Math.floor(Math.random() * pool.length)];
        } while (next === lastPhrase && pool.length > 1);
        el.textContent = next;
        lastPhrase = next;
        lastFrame = now;
      }
      el._scrambleRAF = requestAnimationFrame(tick);
    }
    el._scrambleRAF = requestAnimationFrame(tick);
  });
}

function typewrite(el, text, charDelay, hold, job) {
  return new Promise(resolve => {
    el.classList.add('typing');
    el.textContent = '';
    let i = 0;

    function next() {
      if (job.cancelled) {
        el.classList.remove('typing');
        resolve();
        return;
      }
      if (i >= text.length) {
        el.classList.remove('typing');
        el._scrambleTO = setTimeout(resolve, hold);
        return;
      }
      el.textContent += text[i];
      i++;
      el._scrambleTO = setTimeout(next, charDelay);
    }
    next();
  });
}

(function () {
  const zh = document.querySelector('.hero-name-zh');
  const en = document.querySelector('.hero-name-en-inner');
  const wrap = document.querySelector('.scramble-name');
  if (!zh || !en || !wrap) return;

  // Initial reveal — CN
  revealHero(zh, {
    cyclePhrases:    SCRAMBLE_PHRASES_CN,
    cycleDuration:   1500,
    cycleFrameInterval: 250,
    typeText:        '额...对了',
    typeCharDelay:   80,
    typeHold:        300,
    finalText:       '我是姚俊杰'
  });

  // EN starts 250ms after CN (slight cascade)
  setTimeout(() => {
    revealHero(en, {
      cyclePhrases:    SCRAMBLE_PHRASES_EN,
      cycleDuration:   1200,
      cycleFrameInterval: 220,
      typeText:        'oh... right',
      typeCharDelay:   60,
      typeHold:        250,
      finalText:       "I'm Yao Junjie"
    });
  }, 250);

  // Click to re-introduce (shorter, snappier)
  wrap.addEventListener('click', () => {
    revealHero(zh, {
      cyclePhrases:    SCRAMBLE_PHRASES_CN,
      cycleDuration:   900,
      cycleFrameInterval: 180,
      typeText:        '额...对了',
      typeCharDelay:   50,
      typeHold:        200,
      finalText:       '我是姚俊杰'
    });
    setTimeout(() => {
      revealHero(en, {
        cyclePhrases:    SCRAMBLE_PHRASES_EN,
        cycleDuration:   800,
        cycleFrameInterval: 160,
        typeText:        'oh... right',
        typeCharDelay:   40,
        typeHold:        180,
        finalText:       "I'm Yao Junjie"
      });
    }, 180);
  });
})();

/* ============================================================
   Cite modal — Google Scholar-style citation generator
   ============================================================ */
const CITES = Object.fromEntries(
  SITE.publications.map(publication => [publication.id, publication.citation])
);

function makeCiteKey(c) {
  const first = c.authors.split(',')[0].split(' ').pop().toLowerCase().replace(/[^a-z]/g, '');
  return first + c.year + (c.title.split(' ')[0] || 'paper').toLowerCase();
}
function toBibTeX(c) {
  const key = makeCiteKey(c);
  if (c.type === 'article') {
    return [
      `@article{${key},`,
      `  title    = {${c.title}},`,
      `  author   = {${c.authors}},`,
      `  journal  = {${c.venue}},`,
      `  volume   = {${c.vol}},`,
      `  pages    = {${c.pages}},`,
      `  year     = {${c.year}},`,
      `  publisher= {${c.publisher}},`,
      `  doi      = {${c.doi || ''}}`,
      `}`
    ].join('\n');
  }
  return [
    `@inproceedings{${key},`,
    `  title    = {${c.title}},`,
    `  author   = {${c.authors}},`,
    `  booktitle= {${c.venue}},`,
    `  pages    = {${c.pages}},`,
    `  year     = {${c.year}},`,
    `  publisher= {${c.publisher}},`,
    `  doi      = {${c.doi || ''}}`,
    `}`
  ].join('\n');
}
function toAPA(c) {
  const volStr = c.vol ? `, ${c.vol}` : '';
  if (c.type === 'article') {
    return `${c.authors} (${c.year}). ${c.title}. ${c.venue}${volStr}, ${c.pages}. https://doi.org/${c.doi}`;
  }
  return `${c.authors} (${c.year}). ${c.title}. In ${c.venue} (pp. ${c.pages}). ${c.publisher}. https://doi.org/${c.doi}`;
}
function toMLA(c) {
  const doiTail = c.doi ? ` https://doi.org/${c.doi}.` : '';
  if (c.type === 'article') {
    return `${c.authors} "${c.title}." ${c.venue}, vol. ${c.vol}, ${c.year}, art. ${c.pages}.${doiTail}`;
  }
  return `${c.authors} "${c.title}." ${c.venue}, ${c.year}, pp. ${c.pages}.${doiTail}`;
}

const modal       = document.getElementById('cite-modal');
const citeContent = document.getElementById('cite-content');
const citeMeta    = document.getElementById('cite-meta');
const citeCopyBtn = document.getElementById('cite-copy');
let currentCite   = null;
let currentFormat = 'bibtex';

function renderCite() {
  if (!currentCite) return;
  const c = CITES[currentCite];
  citeMeta.textContent  = `${c.authors} · ${c.venue}, ${c.year}`;
  const fns = { bibtex: toBibTeX, apa: toAPA, mla: toMLA };
  citeContent.textContent = fns[currentFormat](c);
}
function openCite(key) {
  currentCite   = key;
  currentFormat = 'bibtex';
  document.querySelectorAll('.cite-tab').forEach(t => t.classList.toggle('active', t.dataset.format === 'bibtex'));
  renderCite();
  modal.classList.add('open');
}
function closeCite() { modal.classList.remove('open'); currentCite = null; }

document.querySelectorAll('[data-cite]').forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); openCite(btn.dataset.cite); });
});
document.querySelectorAll('[data-cite-close]').forEach(el => {
  el.addEventListener('click', closeCite);
});
document.querySelectorAll('.cite-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cite-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFormat = tab.dataset.format;
    renderCite();
  });
});
citeCopyBtn.addEventListener('click', async () => {
  const text = citeContent.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  }
  citeCopyBtn.classList.add('copied');
  citeCopyBtn.textContent = '✓ Copied';
  setTimeout(() => { citeCopyBtn.classList.remove('copied'); citeCopyBtn.textContent = '📋 Copy'; }, 1600);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeCite();
});

/* ============================================================
   Copy-to-clipboard for elements with [data-copy="..."]
   - shows "Copied!" + checkmark for 1.5s, then reverts
   - falls back to execCommand for non-secure contexts
   ============================================================ */
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Fallback for non-secure contexts (file://, http://, etc.)
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        ta.style.pointerEvents = 'none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        ok = true;
      } catch {}
    }
    if (!ok) return;
    // Visual feedback
    btn.classList.add('copied');
    const v = btn.querySelector('.cr-v');
    const arrow = btn.querySelector('.cr-arrow');
    if (!v || !arrow) return;
    const origV = v.textContent;
    const origArrow = arrow.textContent;
    v.textContent = 'Copied!';
    arrow.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('copied');
      v.textContent = origV;
      arrow.textContent = origArrow;
    }, 1500);
  });
});
