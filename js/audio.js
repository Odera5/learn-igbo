// Igbo Language Learning Platform - Sound & Tone Synthesis Engine

class IgboAudioEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.audioCtx = null;
    this.voice = null;
    this.isTonesEnabled = true;
    this.pronunciationMode = (typeof window !== 'undefined' && localStorage.getItem('igbo_pronunciation_mode')) || 'phonetic';

    // Load available voices when they change
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  // Initialize Web Audio Context on first user interaction
  initAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Find a voice suited for Igbo
  loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    
    // 1. Try to find a native Igbo voice (rare, but supported on some setups)
    let selectedVoice = voices.find(v => v.lang.startsWith('ig-') || v.lang === 'ig');
    
    // 2. Try Nigerian English (often has correct pronunciation cadence for local words)
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang === 'en-NG' || v.lang.startsWith('en-NG'));
    }
    
    // 3. Fallback to generic English
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en-') && v.default) || voices[0];
    }
    
    this.voice = selectedVoice;
  }

  /**
   * Set pronunciation mode ('phonetic' or 'native')
   * @param {string} mode Mode to select
   */
  setPronunciationMode(mode) {
    if (mode === 'phonetic' || mode === 'native') {
      this.pronunciationMode = mode;
      localStorage.setItem('igbo_pronunciation_mode', mode);
    }
  }

  /**
   * Translates Igbo text into a phonetic representation optimized for standard English synthesizers.
   * @param {string} text Igbo text
   * @returns {string} phonetic text
   */
  convertToPhoneticForTTS(text) {
    if (!text) return "";
    
    let clean = this.stripToneMarks(text);
    let processed = clean.toLowerCase();
    
    // 1. Syllabic nasals at word start (e.g. mba -> m-ba, nna -> n-na)
    processed = processed.replace(/\b([mn])(?=[bcdfghjklmnpqrstvwxyzñ])/g, '$1-');
    
    // 2. Digraphs (use placeholders to avoid collision)
    processed = processed.replace(/gb/g, '___B___');
    processed = processed.replace(/kp/g, '___P___');
    processed = processed.replace(/gh/g, '___H___');
    
    // 3. Double vowels (long vowels)
    processed = processed.replace(/aa/g, '___LONG_AH___');
    processed = processed.replace(/ee/g, '___LONG_AY___');
    processed = processed.replace(/ii/g, '___LONG_EE___');
    processed = processed.replace(/ịị/g, '___LONG_EE___');
    processed = processed.replace(/oo/g, '___LONG_OH___');
    processed = processed.replace(/ọọ/g, '___LONG_AW___');
    processed = processed.replace(/uu/g, '___LONG_OO___');
    processed = processed.replace(/ụụ/g, '___LONG_OO___');
    
    // 4. Single vowels (use placeholders)
    processed = processed.replace(/a/g, '___AH___');
    processed = processed.replace(/e/g, '___EH___');
    processed = processed.replace(/i/g, '___EE___');
    processed = processed.replace(/ị/g, '___EE___');
    processed = processed.replace(/o/g, '___OH___');
    processed = processed.replace(/ọ/g, '___AW___');
    processed = processed.replace(/u/g, '___OO___');
    processed = processed.replace(/ụ/g, '___OO___');
    processed = processed.replace(/ñ/g, 'ng');
    
    // 5. Replace placeholders with their phonetic equivalents
    processed = processed.replace(/___LONG_AH___/g, 'ah-ah');
    processed = processed.replace(/___LONG_AY___/g, 'ay-ay');
    processed = processed.replace(/___LONG_EE___/g, 'ee-ee');
    processed = processed.replace(/___LONG_OH___/g, 'oh-oh');
    processed = processed.replace(/___LONG_AW___/g, 'aw-aw');
    processed = processed.replace(/___LONG_OO___/g, 'oo-oo');
    
    processed = processed.replace(/___B___/g, 'b');
    processed = processed.replace(/___P___/g, 'p');
    processed = processed.replace(/___H___/g, 'h');
    
    processed = processed.replace(/___AH___/g, 'ah');
    processed = processed.replace(/___EH___/g, 'eh');
    processed = processed.replace(/___EE___/g, 'ee');
    processed = processed.replace(/___OH___/g, 'oh');
    processed = processed.replace(/___AW___/g, 'aw');
    processed = processed.replace(/___OO___/g, 'oo');
    
    return processed;
  }

  /**
   * Speak a word or phrase using SpeechSynthesis
   * @param {string} text The Igbo text to speak
   * @param {number} rate Speed rate (default 0.8 for learning clarity)
   */
  speakText(text, rate = 0.8) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    // Cancel current speaking if any
    this.synth.cancel();

    // Check if using fallback voice
    const isNativeVoice = this.voice && (this.voice.lang.startsWith('ig-') || this.voice.lang === 'ig');

    let textToSpeak = text;
    if (!isNativeVoice && this.pronunciationMode === 'phonetic') {
      textToSpeak = this.convertToPhoneticForTTS(text);
    } else {
      textToSpeak = this.stripToneMarks(text);
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (this.voice) {
      utterance.voice = this.voice;
      utterance.lang = this.voice.lang;
    } else {
      utterance.lang = 'ig-NG'; // Ask browser to match Igbo if possible
    }

    utterance.rate = rate;
    utterance.pitch = 1.0;
    
    this.synth.speak(utterance);
  }

  /**
   * Play the musical tone contour of a word using Web Audio API
   * Helps users hear the high vs low pitch contours
   * @param {Array<number>} tonePattern Array of tone indices (-1 = Low, 0 = Downstep/Neutral, 1 = High)
   * @param {Function} onSyllableCallback Callback executed as each tone plays (for UI synch)
   */
  async playToneContour(tonePattern, onSyllableCallback = null) {
    if (!tonePattern || tonePattern.length === 0) return;
    
    try {
      this.initAudioContext();
    } catch (e) {
      console.error("Web Audio API is not supported in this browser.", e);
      return;
    }

    const duration = 0.35; // Duration of each syllable beep in seconds
    const interval = 0.40; // Gap between syllable starts
    const now = this.audioCtx.currentTime;

    tonePattern.forEach((toneVal, index) => {
      // Determine pitch frequency based on tone value
      let frequency = 330.00; // Default/Neutral (E4)
      if (toneVal === 1) {
        frequency = 440.00; // High tone (A4)
      } else if (toneVal === -1) {
        frequency = 293.66; // Low tone (D4)
      } else if (toneVal === 0) {
        frequency = 370.00; // Downstep (F#4)
      }

      const startTime = now + (index * interval);

      // Create oscillator
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      
      // Triangle wave provides a warm, flute-like tone instead of an aggressive sine/square
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, startTime);

      // Smooth volume envelope to prevent clicking
      gainNode.gain.setValueAtTime(0.001, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05); // Attack
      gainNode.gain.setValueAtTime(0.2, startTime + duration - 0.05); // Sustain
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Decay

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);

      // Fire callback for visual highlights synced with audio
      if (onSyllableCallback) {
        setTimeout(() => {
          onSyllableCallback(index);
        }, index * interval * 1000);
      }
    });
  }

  /**
   * Helper to strip special tonal markings so SpeechSynthesis doesn't read them as punctuation
   */
  stripToneMarks(text) {
    return text
      .normalize('NFD') // Decompose combined characters
      .replace(/[\u0301\u0300\u0304]/g, '') // Remove acute (high), grave (low), macron (downstep)
      .normalize('NFC'); // Recompose characters
  }

  /**
   * Play standard sound effect for feedback
   * @param {string} type 'correct' or 'incorrect' or 'level-up'
   */
  playFeedbackSound(type) {
    try {
      this.initAudioContext();
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'incorrect') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150.00, now);
        osc.frequency.linearRampToValueAtTime(100.00, now + 0.25);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'level-up') {
        osc.type = 'triangle';
        const frequencies = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
        frequencies.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
        });
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    } catch (e) {
      console.warn("Feedback sound error:", e);
    }
  }
}

// Export single instance
const IgboAudio = new IgboAudioEngine();
