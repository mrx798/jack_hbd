import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

// ─── Configuration ───────────────────────────────────────
const BACKGROUND_MUSIC_VOLUME = 0.35;
const FADE_IN_DURATION_MS = 1200;
const AUDIO_SRC = '/audio/The-Metro-Proposal.mp3';

// ─── Singleton Audio State ───────────────────────────────
// This lives outside React to survive all re-renders and StrictMode double-mounts.

interface MusicState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  autoplayBlocked: boolean;
}

let audioInstance: HTMLAudioElement | null = null;
let musicState: MusicState = {
  isPlaying: false,
  isMuted: false,
  volume: BACKGROUND_MUSIC_VOLUME,
  currentTime: 0,
  duration: 0,
  autoplayBlocked: false,
};
let listeners: Set<() => void> = new Set();
let gestureListenersAttached = false;
let audioInitialized = false;
let fadeInterval: ReturnType<typeof setInterval> | null = null;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function updateState(partial: Partial<MusicState>) {
  musicState = { ...musicState, ...partial };
  notifyListeners();
}

function fadeInVolume(audio: HTMLAudioElement) {
  // Clear any existing fade
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }

  const targetVolume = musicState.isMuted ? 0 : BACKGROUND_MUSIC_VOLUME;
  const steps = 30;
  const stepDuration = FADE_IN_DURATION_MS / steps;
  const volumeStep = targetVolume / steps;
  let currentStep = 0;

  audio.volume = 0;

  fadeInterval = setInterval(() => {
    currentStep++;
    const newVolume = Math.min(volumeStep * currentStep, targetVolume);
    audio.volume = newVolume;
    if (currentStep >= steps) {
      if (fadeInterval) {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
      audio.volume = targetVolume;
      updateState({ volume: targetVolume });
    }
  }, stepDuration);
}

function getOrCreateAudio(): HTMLAudioElement {
  if (audioInstance) return audioInstance;

  console.log('[BackgroundMusic] Initializing');
  const audio = new Audio(AUDIO_SRC);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0; // Start at 0 for fade-in

  // Event listeners
  audio.addEventListener('play', () => {
    console.log('[BackgroundMusic] Playback started');
    updateState({ isPlaying: true, autoplayBlocked: false });
  });

  audio.addEventListener('pause', () => {
    updateState({ isPlaying: false });
  });

  audio.addEventListener('volumechange', () => {
    updateState({
      volume: audio.volume,
      isMuted: audio.muted,
    });
  });

  audio.addEventListener('timeupdate', () => {
    // Throttle updates — only notify if change is meaningful
    const newTime = audio.currentTime;
    if (Math.abs(newTime - musicState.currentTime) > 0.5) {
      updateState({ currentTime: newTime });
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    updateState({ duration: audio.duration });
  });

  audio.addEventListener('error', (e) => {
    const mediaError = audio.error;
    console.warn(
      `[BackgroundMusic] Audio error: ${mediaError?.message ?? 'Unknown error'}`,
      e
    );
    // Don't crash the website — silently degrade
    updateState({ isPlaying: false });
  });

  audioInstance = audio;
  return audio;
}

function attemptPlay() {
  const audio = getOrCreateAudio();

  console.log('[BackgroundMusic] Autoplay attempt');
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        fadeInVolume(audio);
        removeGestureListeners();
      })
      .catch((err: DOMException) => {
        if (err.name === 'NotAllowedError') {
          console.log('[BackgroundMusic] Autoplay blocked — waiting for interaction');
          updateState({ autoplayBlocked: true });
          attachGestureListeners();
        } else {
          console.warn('[BackgroundMusic] Play failed:', err.message);
        }
      });
  }
}

function handleUserGesture() {
  const audio = getOrCreateAudio();

  if (audio.paused) {
    console.log('[BackgroundMusic] User gesture detected — starting playback');
    audio
      .play()
      .then(() => {
        fadeInVolume(audio);
        removeGestureListeners();
      })
      .catch((err) => {
        console.warn('[BackgroundMusic] Play after gesture failed:', err.message);
      });
  }
}

function attachGestureListeners() {
  if (gestureListenersAttached) return;
  gestureListenersAttached = true;

  const events = ['pointerdown', 'touchstart', 'keydown'] as const;
  events.forEach((event) => {
    document.addEventListener(event, handleUserGesture, { once: true, passive: true });
  });
}

function removeGestureListeners() {
  if (!gestureListenersAttached) return;
  gestureListenersAttached = false;

  const events = ['pointerdown', 'touchstart', 'keydown'] as const;
  events.forEach((event) => {
    document.removeEventListener(event, handleUserGesture);
  });
}

// Handle visibility change — resume if browser suspended audio
function handleVisibilityChange() {
  if (document.visibilityState === 'visible' && audioInstance && !audioInstance.paused) {
    // Audio should be playing — browser may have suspended it
    // No aggressive retry, just a single gentle check
  } else if (
    document.visibilityState === 'visible' &&
    audioInstance &&
    audioInstance.paused &&
    musicState.isPlaying
  ) {
    // State says playing but audio is paused — browser likely suspended it
    audioInstance.play().catch(() => {
      // Browser still won't allow it, that's fine
    });
  }
}

// ─── Public API ──────────────────────────────────────────

/** Initialize and attempt autoplay. Safe to call multiple times. */
export function initBackgroundMusic() {
  if (audioInitialized) return;
  audioInitialized = true;

  getOrCreateAudio();
  document.addEventListener('visibilitychange', handleVisibilityChange);
  attemptPlay();
}

/** Explicitly start music (e.g., from "Enter" button) */
export function startBackgroundMusic() {
  const audio = getOrCreateAudio();

  if (audio.paused) {
    audio
      .play()
      .then(() => {
        fadeInVolume(audio);
        removeGestureListeners();
        updateState({ autoplayBlocked: false });
      })
      .catch((err) => {
        console.warn('[BackgroundMusic] Explicit play failed:', err.message);
      });
  }
}

export function togglePlayback() {
  const audio = getOrCreateAudio();
  if (audio.paused) {
    audio.play().catch((err) => {
      console.warn('[BackgroundMusic] Toggle play failed:', err.message);
    });
  } else {
    audio.pause();
  }
}

export function toggleMute() {
  const audio = getOrCreateAudio();
  audio.muted = !audio.muted;
  updateState({ isMuted: audio.muted });
}

export function setMusicVolume(volume: number) {
  const audio = getOrCreateAudio();
  const clampedVolume = Math.max(0, Math.min(1, volume));
  audio.volume = clampedVolume;
  updateState({ volume: clampedVolume });
}

// ─── Video Ducking ───────────────────────────────────────
// Temporarily lower the background music while a memory video plays.
// Does NOT pause, restart, or create a new audio instance.

const DUCK_VOLUME = 0.08;
const DUCK_FADE_MS = 400;
const RESTORE_FADE_MS = 600;
const DUCK_STEPS = 20;

let preDuckVolume: number | null = null;
let duckFadeTimer: ReturnType<typeof setInterval> | null = null;
let isDucked = false;

function clearDuckTimer() {
  if (duckFadeTimer) {
    clearInterval(duckFadeTimer);
    duckFadeTimer = null;
  }
}

/** Smoothly duck the background music for a memory video. */
export function duckForVideo() {
  const audio = audioInstance;
  if (!audio) return;

  clearDuckTimer();

  // Only capture the pre-duck volume if we're not already ducked
  if (!isDucked) {
    preDuckVolume = audio.volume;
  }
  isDucked = true;

  const startVol = audio.volume;
  const targetVol = DUCK_VOLUME;
  const stepDuration = DUCK_FADE_MS / DUCK_STEPS;
  const volDelta = (targetVol - startVol) / DUCK_STEPS;
  let step = 0;

  duckFadeTimer = setInterval(() => {
    step++;
    const newVol = Math.max(0, Math.min(1, startVol + volDelta * step));
    audio.volume = newVol;
    if (step >= DUCK_STEPS) {
      clearDuckTimer();
      audio.volume = targetVol;
    }
  }, stepDuration);
}

/** Smoothly restore the background music after a memory video stops. */
export function restoreFromDuck() {
  const audio = audioInstance;
  if (!audio) return;
  if (!isDucked) return;

  clearDuckTimer();

  const startVol = audio.volume;
  const targetVol = preDuckVolume ?? BACKGROUND_MUSIC_VOLUME;
  const stepDuration = RESTORE_FADE_MS / DUCK_STEPS;
  const volDelta = (targetVol - startVol) / DUCK_STEPS;
  let step = 0;

  duckFadeTimer = setInterval(() => {
    step++;
    const newVol = Math.max(0, Math.min(1, startVol + volDelta * step));
    audio.volume = newVol;
    if (step >= DUCK_STEPS) {
      clearDuckTimer();
      audio.volume = targetVol;
      isDucked = false;
      preDuckVolume = null;
      updateState({ volume: targetVol });
    }
  }, stepDuration);
}

// ─── React Hook ──────────────────────────────────────────

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): MusicState {
  return musicState;
}

export function useBackgroundMusic() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Initialize on first mount of any component using this hook
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initBackgroundMusic();
    }
  }, []);

  const play = useCallback(() => startBackgroundMusic(), []);
  const pause = useCallback(() => {
    audioInstance?.pause();
  }, []);
  const toggle = useCallback(() => togglePlayback(), []);
  const mute = useCallback(() => toggleMute(), []);
  const setVolume = useCallback((v: number) => setMusicVolume(v), []);

  return {
    isPlaying: state.isPlaying,
    isMuted: state.isMuted,
    volume: state.volume,
    currentTime: state.currentTime,
    duration: state.duration,
    autoplayBlocked: state.autoplayBlocked,
    play,
    pause,
    toggle,
    toggleMute: mute,
    setVolume,
  };
}
