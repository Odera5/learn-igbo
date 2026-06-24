// Igbo Language Learning Platform - Main App Controller

// 1. STATE MANAGEMENT
const STATE = {
  xp: 0,
  streak: 1,
  level: 'Beginner (Mmalite)',
  completedLessons: [],
  lastActiveDate: null,
  activeVocabDeck: 'animals',
  activeVocabIndex: 0,
  quizState: {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false
  }
};

// XP thresholds for unlocking content levels
const LEVEL_THRESHOLDS = {
  'level-1': 0,      // Unlocked initially
  'level-2': 100,    // Requires 100 XP
  'level-3': 250,    // Requires 250 XP
  'level-4': 450     // Requires 450 XP
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadUserState();
  setupRouting();
  setupEventListeners();
  renderDashboard();
  renderAlphabet();
  renderGreetings();
  renderProverbs();
  initToneTrainerWord();
});

// Load state from LocalStorage
function loadUserState() {
  const savedState = localStorage.getItem('muta_igbo_user_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      STATE.xp = parsed.xp || 0;
      STATE.completedLessons = parsed.completedLessons || [];
      STATE.streak = parsed.streak || 1;
      STATE.lastActiveDate = parsed.lastActiveDate;
      
      // Update streak if active on a new day, reset if missed a day
      checkStreak();
      updateLevelTitle();
    } catch (e) {
      console.error("Error loading user state from storage", e);
    }
  } else {
    STATE.lastActiveDate = new Date().toDateString();
    saveUserState();
  }
  updateHeaderStats();
}

// Check and increment daily streak
function checkStreak() {
  const today = new Date().toDateString();
  if (STATE.lastActiveDate) {
    const lastDate = new Date(STATE.lastActiveDate);
    const currentDate = new Date(today);
    
    // Difference in milliseconds
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day!
      STATE.streak += 1;
      STATE.lastActiveDate = today;
      saveUserState();
    } else if (diffDays > 1) {
      // Streak broken, reset
      STATE.streak = 1;
      STATE.lastActiveDate = today;
      saveUserState();
    }
  } else {
    STATE.lastActiveDate = today;
    saveUserState();
  }
}

// Update level threshold titles
function updateLevelTitle() {
  if (STATE.xp >= 450) {
    STATE.level = 'Advanced (Onye Maara)';
  } else if (STATE.xp >= 250) {
    STATE.level = 'Intermediate (Nnọchianya)';
  } else if (STATE.xp >= 100) {
    STATE.level = 'Conversational (Mkparịta)';
  } else {
    STATE.level = 'Beginner (Mmalite)';
  }
}

// Save state to LocalStorage
function saveUserState() {
  localStorage.setItem('muta_igbo_user_state', JSON.stringify({
    xp: STATE.xp,
    completedLessons: STATE.completedLessons,
    streak: STATE.streak,
    lastActiveDate: STATE.lastActiveDate
  }));
}

// Add XP points
function awardXP(amount, playSound = true) {
  STATE.xp += amount;
  updateLevelTitle();
  saveUserState();
  updateHeaderStats();
  
  // Re-render dashboard path status
  renderDashboardPaths();
  
  if (playSound) {
    IgboAudio.playFeedbackSound('level-up');
  }
}

// Update Header stats UI elements
function updateHeaderStats() {
  document.getElementById('header-xp-val').innerText = STATE.xp;
  document.getElementById('header-streak-val').innerText = STATE.streak;
  document.getElementById('header-level-val').innerText = STATE.level.split(' ')[0];
  
  document.getElementById('dashboard-streak-val').innerText = STATE.streak;
  document.getElementById('dashboard-level-title').innerText = `Current Status: ${STATE.level}`;
}


// 2. SPA ROUTER
function setupRouting() {
  const handleRouting = () => {
    // Default to dashboard
    let hash = window.location.hash || '#dashboard';
    
    // Clean hash
    const viewName = hash.replace('#', '');
    
    // Toggle active view panel
    const viewSections = document.querySelectorAll('.view-section');
    let viewFound = false;
    
    viewSections.forEach(section => {
      if (section.id === `view-${viewName}`) {
        section.classList.add('active-view');
        viewFound = true;
      } else {
        section.classList.remove('active-view');
      }
    });
    
    if (!viewFound) {
      document.getElementById('view-dashboard').classList.add('active-view');
      hash = '#dashboard';
    }

    // Toggle navigation link states
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Run view specific trigger loads
    if (viewName === 'dashboard') {
      renderDashboard();
    } else if (viewName === 'lessons') {
      renderLessonsSidebar();
    } else if (viewName === 'vocabulary') {
      renderVocabCard();
    }
    
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('load', handleRouting);
}


// 3. VIEW RENDERERS

// A. Dashboard Rendering
function renderDashboard() {
  updateHeaderStats();
  
  // Calculate total lessons and completion percentage
  let totalLessons = 0;
  IGBO_DATA.levels.forEach(lvl => totalLessons += lvl.lessons.length);
  const completedCount = STATE.completedLessons.length;
  const completionPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  document.getElementById('dashboard-level-percent').innerText = `${completionPercent}% Platform Completed`;
  document.getElementById('dashboard-progress-fill').style.width = `${completionPercent}%`;
  
  renderDashboardPaths();
  setupWordOfDay();
}

function renderDashboardPaths() {
  const container = document.getElementById('dashboard-paths-list');
  container.innerHTML = '';

  IGBO_DATA.levels.forEach(level => {
    const isUnlocked = STATE.xp >= LEVEL_THRESHOLDS[level.id];
    const levelXPGoal = LEVEL_THRESHOLDS[level.id];
    
    // Calculate completions inside this level
    const levelLessonIds = level.lessons.map(l => l.id);
    const completedInLevel = level.lessons.filter(l => STATE.completedLessons.includes(l.id)).length;
    const progressText = `${completedInLevel} of ${level.lessons.length} complete`;

    const card = document.createElement('div');
    card.className = `level-card ${isUnlocked ? '' : 'locked'}`;
    
    let btnHTML = '';
    if (isUnlocked) {
      btnHTML = `<button class="level-action-btn" onclick="startLevel('${level.id}')">Start Learning →</button>`;
    } else {
      btnHTML = `<button class="level-action-btn" disabled>🔓 Unlocks at ${levelXPGoal} XP</button>`;
    }

    card.innerHTML = `
      <div class="level-info">
        <div class="level-badge">${level.shortTitle}</div>
        <h3>${level.title}</h3>
        <p>${level.description}</p>
        <div style="font-size: 0.8rem; color: var(--accent); margin-top: 0.25rem; font-weight: 500;">
          ${isUnlocked ? progressText : 'Locked'}
        </div>
      </div>
      <div>
        ${btnHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

function startLevel(levelId) {
  // Save route state logic
  const level = IGBO_DATA.levels.find(l => l.id === levelId);
  if (level && level.lessons.length > 0) {
    window.location.hash = `#lessons`;
    // Select first lesson
    setTimeout(() => {
      selectLesson(level.lessons[0].id);
    }, 50);
  }
}

// Word of the Day logic
function setupWordOfDay() {
  // Use current date day of month to rotate through a stable word index
  const day = new Date().getDate();
  const allVocabs = [];
  
  Object.keys(IGBO_DATA.vocabDecks).forEach(key => {
    IGBO_DATA.vocabDecks[key].forEach(w => allVocabs.push(w));
  });

  const wordIndex = day % allVocabs.length;
  const dailyWord = allVocabs[wordIndex];

  const wordValEl = document.getElementById('daily-word-val');
  const transEl = document.getElementById('daily-word-trans');
  const phEl = document.getElementById('daily-word-ph');

  wordValEl.innerText = dailyWord.word;
  transEl.innerText = dailyWord.translation;
  
  // Tones description helper
  const toneDesc = getToneDescription(dailyWord.tonePattern);
  phEl.innerText = `${dailyWord.phonetics} (${toneDesc} tone)`;

  // Listeners
  const speakBtn = document.getElementById('daily-word-speak');
  const toneBtn = document.getElementById('daily-word-tone');

  // Remove existing listener clones to avoid stack piling
  const newSpeakBtn = speakBtn.cloneNode(true);
  const newToneBtn = toneBtn.cloneNode(true);
  speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
  toneBtn.parentNode.replaceChild(newToneBtn, toneBtn);

  newSpeakBtn.addEventListener('click', () => {
    IgboAudio.speakText(dailyWord.word);
    newSpeakBtn.classList.add('audio-playing');
    setTimeout(() => newSpeakBtn.classList.remove('audio-playing'), 400);
  });

  newToneBtn.addEventListener('click', () => {
    IgboAudio.playToneContour(dailyWord.tonePattern);
    newToneBtn.classList.add('audio-playing');
    setTimeout(() => newToneBtn.classList.remove('audio-playing'), 400);
  });
}

function getToneDescription(pattern) {
  if (!pattern) return '';
  return pattern.map(t => {
    if (t === 1) return 'High';
    if (t === -1) return 'Low';
    return 'Downstep';
  }).join('-');
}


// B. Alphabet Rendering
function renderAlphabet() {
  const container = document.getElementById('alphabet-container');
  container.innerHTML = '';

  IGBO_DATA.alphabet.forEach(item => {
    const card = document.createElement('div');
    card.className = 'letter-card';
    
    let badgeHTML = item.type === 'vowel' ? '<span class="letter-badge-vowel" title="Vowel harmony key"></span>' : '';
    
    card.innerHTML = `
      ${badgeHTML}
      <div class="letter-char">${item.letter}</div>
      <div class="letter-name">${item.name}</div>
      <div class="letter-example"><strong>${item.example}</strong><br><span style="font-size:0.75rem">${item.translation}</span></div>
    `;

    card.addEventListener('click', () => {
      // Play name pronunciation
      IgboAudio.speakText(item.name, 0.7);
      
      // Select visual style
      document.querySelectorAll('.letter-card').forEach(c => c.style.borderColor = 'rgba(255, 255, 255, 0.05)');
      card.style.borderColor = 'var(--accent)';
      
      // Update drawer
      showLetterDetail(item);
    });

    container.appendChild(card);
  });
}

function showLetterDetail(item) {
  const panel = document.getElementById('letter-detail-panel');
  panel.style.display = 'block';

  document.getElementById('detail-char').innerText = item.letter;
  document.getElementById('detail-title').innerHTML = `Letter ${item.letter} (${item.name})`;
  document.getElementById('detail-desc').innerHTML = `${item.description} ${item.type === 'vowel' ? `Belongs to the <strong>${item.group} vowel harmony</strong> group.` : ''}`;
  document.getElementById('detail-example').innerText = item.example;
  document.getElementById('detail-translation').innerText = item.translation;

  const speakBtn = document.getElementById('detail-speak-btn');
  const toneBtn = document.getElementById('detail-tone-btn');

  // Clone listeners to refresh binds
  const newSpeakBtn = speakBtn.cloneNode(true);
  const newToneBtn = toneBtn.cloneNode(true);
  speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
  toneBtn.parentNode.replaceChild(newToneBtn, toneBtn);

  newSpeakBtn.addEventListener('click', () => {
    IgboAudio.speakText(item.example);
  });

  newToneBtn.addEventListener('click', () => {
    if (item.tonePattern) {
      IgboAudio.playToneContour(item.tonePattern);
    } else {
      // Default fallback syllables for letters
      IgboAudio.playToneContour([1]);
    }
  });

  // Smooth scroll to details
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// C. Lessons View Rendering
function renderLessonsSidebar() {
  const navTree = document.getElementById('lessons-nav-tree');
  navTree.innerHTML = '';

  IGBO_DATA.levels.forEach(level => {
    const isUnlocked = STATE.xp >= LEVEL_THRESHOLDS[level.id];
    
    const groupDiv = document.createElement('div');
    groupDiv.className = 'lesson-nav-group';
    
    groupDiv.innerHTML = `
      <div class="lesson-group-title">${level.shortTitle} ${isUnlocked ? '' : '🔒'}</div>
      <ul class="lesson-nav-list">
        ${level.lessons.map(lesson => {
          const isCompleted = STATE.completedLessons.includes(lesson.id);
          const activeClass = ''; // Checked during state select
          const completeIcon = isCompleted ? ' ✅' : '';
          
          return `
            <li class="lesson-nav-item ${isUnlocked ? '' : 'locked'}" 
                data-lesson-id="${lesson.id}"
                id="lesson-tab-${lesson.id}">
              ${lesson.title}${completeIcon}
            </li>
          `;
        }).join('')}
      </ul>
    `;
    
    navTree.appendChild(groupDiv);
  });

  // Add click events to active nodes
  document.querySelectorAll('.lesson-nav-item:not(.locked)').forEach(item => {
    item.addEventListener('click', () => {
      const lessonId = item.getAttribute('data-lesson-id');
      selectLesson(lessonId);
    });
  });
}

function selectLesson(lessonId) {
  // Update sidebar classes
  document.querySelectorAll('.lesson-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const activeTab = document.getElementById(`lesson-tab-${lessonId}`);
  if (activeTab) activeTab.classList.add('active');

  // Find lesson data
  let lesson = null;
  let levelIndex = 0;
  
  for (let i = 0; i < IGBO_DATA.levels.length; i++) {
    const found = IGBO_DATA.levels[i].lessons.find(l => l.id === lessonId);
    if (found) {
      lesson = found;
      levelIndex = i + 1;
      break;
    }
  }

  if (!lesson) return;

  // Toggle visible containers
  document.getElementById('lesson-content-placeholder').style.display = 'none';
  document.getElementById('lesson-content-area').style.display = 'block';

  // Inject content
  document.getElementById('lesson-level-badge').innerText = `LEVEL ${levelIndex}`;
  document.getElementById('lesson-title').innerText = lesson.title;
  document.getElementById('lesson-text-body').innerHTML = lesson.content;

  // Complete button set
  const completeBtn = document.getElementById('mark-lesson-complete-btn');
  if (STATE.completedLessons.includes(lessonId)) {
    completeBtn.innerText = 'Lesson Completed ✓';
    completeBtn.disabled = true;
    completeBtn.style.opacity = '0.6';
    completeBtn.style.cursor = 'not-allowed';
  } else {
    completeBtn.innerText = 'Mark Complete (+50 XP)';
    completeBtn.disabled = false;
    completeBtn.style.opacity = '1';
    completeBtn.style.cursor = 'pointer';
    
    // Replace event listener
    const newBtn = completeBtn.cloneNode(true);
    completeBtn.parentNode.replaceChild(newBtn, completeBtn);
    newBtn.addEventListener('click', () => {
      STATE.completedLessons.push(lessonId);
      awardXP(50);
      renderLessonsSidebar();
      selectLesson(lessonId);
    });
  }

  // Render Lesson vocab items
  const vocabContainer = document.getElementById('lesson-vocab-container');
  vocabContainer.innerHTML = '';

  if (lesson.vocabulary && lesson.vocabulary.length > 0) {
    lesson.vocabulary.forEach(vocab => {
      const card = document.createElement('div');
      card.className = 'vocab-practice-card';
      
      card.innerHTML = `
        <div>
          <div class="card-vocab-word">${vocab.word}</div>
          <div class="card-vocab-ph">[${vocab.phonetics}]</div>
          <div class="card-vocab-trans">${vocab.translation}</div>
        </div>
        <div class="card-actions">
          <button class="round-audio-btn spec-speak-btn" title="Speak Word">🔊</button>
          <button class="round-audio-btn tone-btn spec-tone-btn" title="Play Tones" style="color: var(--terracotta); border-color: rgba(212,93,59,0.3)">🎵</button>
        </div>
      `;

      card.querySelector('.spec-speak-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        IgboAudio.speakText(vocab.word);
        card.classList.add('audio-playing');
        setTimeout(() => card.classList.remove('audio-playing'), 400);
      });

      card.querySelector('.spec-tone-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        IgboAudio.playToneContour(vocab.tonePattern);
        card.classList.add('audio-playing');
        setTimeout(() => card.classList.remove('audio-playing'), 400);
      });

      vocabContainer.appendChild(card);
    });
  } else {
    vocabContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No focus vocabulary for this lesson.</p>';
  }
}


// D. Vocabulary Flashcards View
function renderVocabCard() {
  const deckName = STATE.activeVocabDeck;
  const deck = IGBO_DATA.vocabDecks[deckName];
  const index = STATE.activeVocabIndex;
  
  if (!deck || deck.length === 0) return;

  const currentItem = deck[index];
  
  // Front Face
  document.getElementById('card-deck-indicator').innerText = `Deck: ${deckName.toUpperCase()}`;
  document.getElementById('card-word-val').innerText = currentItem.word;
  document.getElementById('card-phonetics-val').innerText = `[${currentItem.phonetics}]`;
  
  // Syllables dots indicator
  const dotContainer = document.getElementById('card-syllables-container');
  dotContainer.innerHTML = '';
  currentItem.tonePattern.forEach(() => {
    const dot = document.createElement('span');
    dot.className = 'syllable-dot';
    dotContainer.appendChild(dot);
  });

  // Back Face
  document.getElementById('card-deck-indicator-back').innerText = `Deck: ${deckName.toUpperCase()}`;
  document.getElementById('card-trans-val').innerText = currentItem.translation;
  document.getElementById('card-type-val').innerText = currentItem.type || 'Noun';

  // Navigation indicator
  document.getElementById('card-count-indicator').innerText = `${index + 1} of ${deck.length}`;

  // Hook audio buttons
  const speakBtn = document.getElementById('card-speak-btn');
  const toneBtn = document.getElementById('card-tone-btn');

  const newSpeakBtn = speakBtn.cloneNode(true);
  const newToneBtn = toneBtn.cloneNode(true);
  speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
  toneBtn.parentNode.replaceChild(newToneBtn, toneBtn);

  newSpeakBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop flip trigger
    IgboAudio.speakText(currentItem.word);
    
    // Syllables pulse animation sync (simple demonstration)
    const dots = dotContainer.querySelectorAll('.syllable-dot');
    dots.forEach((dot, dIdx) => {
      setTimeout(() => {
        dot.classList.add('active-syllable');
        setTimeout(() => dot.classList.remove('active-syllable'), 300);
      }, dIdx * 250);
    });
  });

  newToneBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop flip trigger
    IgboAudio.playToneContour(currentItem.tonePattern, (syllableIdx) => {
      const dots = dotContainer.querySelectorAll('.syllable-dot');
      if (dots[syllableIdx]) {
        dots[syllableIdx].classList.add('active-syllable');
        setTimeout(() => dots[syllableIdx].classList.remove('active-syllable'), 350);
      }
    });
  });
}


// E. Greetings View
function renderGreetings() {
  const container = document.getElementById('greetings-accordion-container');
  container.innerHTML = '';

  // Group by category
  const categories = {};
  IGBO_DATA.greetings.forEach(g => {
    if (!categories[g.category]) {
      categories[g.category] = [];
    }
    categories[g.category].push(g);
  });

  Object.keys(categories).forEach(cat => {
    const block = document.createElement('div');
    block.className = 'greeting-category-block';
    
    let cardsHTML = '';
    categories[cat].forEach(phrase => {
      cardsHTML += `
        <div class="phrase-row-card">
          <div class="phrase-text-group">
            <div class="phrase-igbo">${phrase.igbo}</div>
            <div class="phrase-english">${phrase.english}</div>
            ${phrase.response ? `<div class="phrase-response">Response: ${phrase.response}</div>` : ''}
            <span class="phrase-context">${phrase.context}</span>
          </div>
          <button class="round-audio-btn phrase-audio-play" data-text="${phrase.igbo}">🔊</button>
        </div>
      `;
    });

    block.innerHTML = `
      <h3>${cat}</h3>
      <div class="phrases-list-grid">
        ${cardsHTML}
      </div>
    `;

    container.appendChild(block);
  });

  // Event bindings for audio
  container.querySelectorAll('.phrase-audio-play').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      IgboAudio.speakText(text);
      btn.classList.add('audio-playing');
      setTimeout(() => btn.classList.remove('audio-playing'), 400);
    });
  });
}


// F. Tone Trainer View
function initToneTrainerWord() {
  const dropdown = document.getElementById('tone-words-dropdown');
  const tonePlayBtn = document.getElementById('tone-trainer-play-btn');
  
  const handleDropdownChange = () => {
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const pattern = JSON.parse(selectedOption.getAttribute('data-pattern'));
    const wordText = selectedOption.value;
    
    renderToneContourGraph(wordText, pattern);
  };

  dropdown.addEventListener('change', handleDropdownChange);
  
  tonePlayBtn.addEventListener('click', () => {
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const pattern = JSON.parse(selectedOption.getAttribute('data-pattern'));
    
    // Play tones and animate nodes
    IgboAudio.playToneContour(pattern, (nodeIndex) => {
      const nodes = document.querySelectorAll('.tone-contour-node');
      if (nodes[nodeIndex]) {
        nodes[nodeIndex].classList.add('active-pitch');
        setTimeout(() => nodes[nodeIndex].classList.remove('active-pitch'), 350);
      }
    });
  });

  // Initial draw
  handleDropdownChange();
}

function renderToneContourGraph(word, pattern) {
  const container = document.getElementById('tone-nodes-container');
  container.innerHTML = '';

  // Syllable separation estimate (simple for visual)
  // Split vowels/consonants roughly, or just display letter nodes matching pattern length
  const syllables = getSyllableNames(word, pattern.length);

  pattern.forEach((toneVal, index) => {
    const node = document.createElement('div');
    let pitchClass = 'pitch-down'; // Neutral
    let toneSymbol = '◌̄';
    
    if (toneVal === 1) {
      pitchClass = 'pitch-high';
      toneSymbol = '◌́';
    } else if (toneVal === -1) {
      pitchClass = 'pitch-low';
      toneSymbol = '◌̀';
    }
    
    node.className = `tone-contour-node ${pitchClass}`;
    node.innerHTML = `
      ${syllables[index] || '?'}
      <span style="position:absolute; top:-20px; font-size: 0.75rem; color: var(--accent);">${toneSymbol}</span>
    `;
    container.appendChild(node);
  });
}

// Simple syllable name parser
function getSyllableNames(word, count) {
  // Clean word (strip punctuation / quotes)
  const clean = word.replace(/[?.,'"!]/g, '').trim();
  
  if (count === 1) return [clean];
  if (count === 2) {
    if (clean.length <= 4) return [clean.substring(0, 2), clean.substring(2)];
    return [clean.substring(0, Math.floor(clean.length / 2)), clean.substring(Math.floor(clean.length / 2))];
  }
  if (count === 3) {
    // E.g. Ịbọla
    const step = Math.ceil(clean.length / 3);
    return [clean.substring(0, step), clean.substring(step, step * 2), clean.substring(step * 2)];
  }
  
  // Fallback split indices
  const syllables = [];
  const chunkSize = Math.max(1, Math.floor(clean.length / count));
  for (let i = 0; i < count; i++) {
    syllables.push(clean.substring(i * chunkSize, (i + 1) * chunkSize));
  }
  return syllables;
}


// G. Proverbs View
function renderProverbs() {
  const container = document.getElementById('proverbs-container');
  container.innerHTML = '';

  IGBO_DATA.proverbs.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass-panel';
    card.innerHTML = `
      <div>
        <div class="proverb-card-text">"${item.proverb}"</div>
        <div class="proverb-literal">Literal: "${item.literal}"</div>
        <p class="proverb-deeper"><strong>Moral:</strong> ${item.meaning}</p>
      </div>
      <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
        <button class="audio-trigger-btn speak-proverb-btn" data-text="${item.proverb}">🔊 Read Proverb</button>
      </div>
    `;

    card.querySelector('.speak-proverb-btn').addEventListener('click', () => {
      IgboAudio.speakText(item.proverb, 0.75);
    });

    container.appendChild(card);
  });
}


// H. Quiz Orchestration
function startQuiz() {
  // Hide setup screen, show active screen
  document.getElementById('quiz-welcome-screen').style.display = 'none';
  document.getElementById('quiz-finished-screen').style.display = 'none';
  document.getElementById('quiz-active-screen').style.display = 'block';

  // Shuffle and pick 6 questions
  const shuffled = [...IGBO_DATA.quizzes].sort(() => 0.5 - Math.random());
  STATE.quizState.questions = shuffled.slice(0, 6);
  STATE.quizState.currentIndex = 0;
  STATE.quizState.score = 0;
  STATE.quizState.answered = false;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  STATE.quizState.answered = false;
  
  const qState = STATE.quizState;
  const currentQ = qState.questions[qState.currentIndex];
  
  // Counter and progress bar
  document.getElementById('quiz-q-counter').innerText = `Question ${qState.currentIndex + 1} of ${qState.questions.length}`;
  document.getElementById('quiz-score-display').innerText = `Current Score: ${qState.score}/${qState.currentIndex}`;
  
  const progressPercent = ((qState.currentIndex) / qState.questions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

  // Question Title
  document.getElementById('quiz-question-text').innerText = currentQ.question;

  // Options
  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = '';

  currentQ.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<span>${option}</span>`;
    
    btn.addEventListener('click', () => {
      if (STATE.quizState.answered) return;
      evaluateAnswer(btn, option, currentQ);
    });

    optionsContainer.appendChild(btn);
  });

  // Hide explanation and next buttons initially
  document.getElementById('quiz-explanation-box').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';
}

function evaluateAnswer(selectedBtn, selectedOption, question) {
  STATE.quizState.answered = true;
  
  const isCorrect = selectedOption === question.answer;
  const optionsContainer = document.getElementById('quiz-options-container');
  
  // Disable options and highlight values
  const optionButtons = optionsContainer.querySelectorAll('.quiz-option-btn');
  optionButtons.forEach(btn => {
    btn.classList.add('checked');
    const optionText = btn.querySelector('span').innerText;
    
    if (optionText === question.answer) {
      btn.classList.add('correct-option');
    }
  });

  if (isCorrect) {
    STATE.quizState.score += 1;
    selectedBtn.classList.add('correct-option');
    IgboAudio.playFeedbackSound('correct');
  } else {
    selectedBtn.classList.add('incorrect-option');
    IgboAudio.playFeedbackSound('incorrect');
  }

  // Show explanation
  const explanationBox = document.getElementById('quiz-explanation-box');
  document.getElementById('quiz-explanation-text').innerText = question.explanation;
  explanationBox.style.display = 'block';

  // Show Next button
  document.getElementById('quiz-next-btn').style.display = 'block';
  
  // Scroll to footer of card
  document.getElementById('quiz-next-btn').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuizQuestion() {
  const qState = STATE.quizState;
  qState.currentIndex += 1;

  if (qState.currentIndex < qState.questions.length) {
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById('quiz-active-screen').style.display = 'none';
  document.getElementById('quiz-finished-screen').style.display = 'block';

  const qState = STATE.quizState;
  const scoreText = `Score: ${qState.score} / ${qState.questions.length} (${Math.round((qState.score / qState.questions.length) * 100)}%)`;
  document.getElementById('quiz-results-score-val').innerText = scoreText;

  // Award XP based on correct answers (30 XP per correct question + 50 bonus for 100%)
  let xpGained = qState.score * 30;
  if (qState.score === qState.questions.length) {
    xpGained += 50; // Perfect score bonus
  }

  document.getElementById('quiz-results-xp-val').innerText = `+${xpGained} XP Earned`;
  awardXP(xpGained, false); // Add points without play trigger so we don't overlap finished screen sound
  
  // Re-save and sync UI
  saveUserState();
  renderDashboard();
  
  // Play finished fanfare
  IgboAudio.playFeedbackSound('level-up');
}


// 4. EVENT LISTENERS
function setupEventListeners() {
  // Flashcard flipping triggers
  const flashcard = document.getElementById('flashcard-element');
  if (flashcard) {
    flashcard.addEventListener('click', () => {
      flashcard.classList.toggle('flipped');
    });
  }

  // Flashcards deck tab triggers
  document.querySelectorAll('#vocab-deck-tabs button').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#vocab-deck-tabs button').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      STATE.activeVocabDeck = tab.getAttribute('data-deck');
      STATE.activeVocabIndex = 0;
      
      // Reset flip style
      const card = document.getElementById('flashcard-element');
      if (card) card.classList.remove('flipped');

      renderVocabCard();
    });
  });

  // Flashcard controls
  document.getElementById('card-prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const deck = IGBO_DATA.vocabDecks[STATE.activeVocabDeck];
    if (STATE.activeVocabIndex > 0) {
      STATE.activeVocabIndex -= 1;
    } else {
      STATE.activeVocabIndex = deck.length - 1; // loop around
    }
    
    const card = document.getElementById('flashcard-element');
    if (card) card.classList.remove('flipped');
    
    setTimeout(() => renderVocabCard(), 150);
  });

  document.getElementById('card-next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const deck = IGBO_DATA.vocabDecks[STATE.activeVocabDeck];
    if (STATE.activeVocabIndex < deck.length - 1) {
      STATE.activeVocabIndex += 1;
    } else {
      STATE.activeVocabIndex = 0; // loop around
    }
    
    const card = document.getElementById('flashcard-element');
    if (card) card.classList.remove('flipped');
    
    setTimeout(() => renderVocabCard(), 150);
  });

  // Quiz buttons
  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('quiz-retry-btn').addEventListener('click', startQuiz);
  document.getElementById('quiz-next-btn').addEventListener('click', nextQuizQuestion);

  // Concept cards (Tone Trainer page)
  document.querySelectorAll('.tone-concept-card').forEach(card => {
    card.addEventListener('click', () => {
      const pattern = JSON.parse(card.getAttribute('data-tone-pattern'));
      IgboAudio.playToneContour(pattern);
      card.classList.add('audio-playing');
      setTimeout(() => card.classList.remove('audio-playing'), 400);
    });
  });

  // Audio Mode Selection trigger
  const audioModeSelect = document.getElementById('audio-mode-select');
  if (audioModeSelect) {
    // Set initial value based on engine status
    audioModeSelect.value = IgboAudio.pronunciationMode;

    // Listen to changes
    audioModeSelect.addEventListener('change', () => {
      IgboAudio.setPronunciationMode(audioModeSelect.value);
    });
  }
}
