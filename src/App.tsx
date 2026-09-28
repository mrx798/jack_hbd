import { useState, useCallback, useMemo, useEffect } from 'react';
import { SceneManager } from './components/three/SceneManager';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { ChapterNav } from './components/ui/ChapterNav';
import { MusicPlayer } from './components/ui/MusicPlayer';
import { initBackgroundMusic, startBackgroundMusic } from './hooks/useBackgroundMusic';
import { Preloader } from './chapters/Preloader';
import { IntroTheDoor } from './chapters/IntroTheDoor';
import { BirthdayReveal } from './chapters/BirthdayReveal';
import { WhoSheIs } from './chapters/WhoSheIs';
import { HerStory } from './chapters/HerStory';
import { CollegeLife } from './chapters/CollegeLife';
import { Family } from './chapters/Family';
import { Friends } from './chapters/Friends';
import { UsMyChapter } from './chapters/UsMyChapter';
import { HerselfPortraits } from './chapters/HerselfPortraits';
import { MemoryGallery } from './chapters/MemoryGallery';
import { InteractiveMoments } from './chapters/InteractiveMoments';
import { FaithSection } from './chapters/FaithSection';

import { TwentyOneMilestone } from './chapters/TwentyOneMilestone';
import { FutureTimeCapsule } from './chapters/FutureTimeCapsule';
import { TheCake } from './chapters/TheCake';
import { FinalChapter } from './chapters/FinalChapter';
import { Credits } from './chapters/Credits';
import { chapters } from './data/config';
import { useChapterProgress } from './hooks/useChapterProgress';
import { CHAPTER_IDS } from './utils/constants';

type AppPhase = 'preloader' | 'intro' | 'experience';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('preloader');

  const chapterIdArray = useMemo(() => [...CHAPTER_IDS], []);
  const activeChapter = useChapterProgress(chapterIdArray);
  const currentMood = chapters[activeChapter]?.mood ?? chapters[0].mood;

  // Initialize background music on mount (attempts autoplay)
  useEffect(() => {
    initBackgroundMusic();
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPhase('intro');
  }, []);

  const handleEnter = useCallback(() => {
    // The "Enter" tap is a user gesture — use it to unlock and start music
    startBackgroundMusic();
    setPhase('experience');
  }, []);

  return (
    <>
      {/* 3D Background — always visible */}
      <SceneManager mood={currentMood} />

      {/* Film grain overlay */}
      <GrainOverlay opacity={0.025} />

      {/* Preloader */}
      {phase === 'preloader' && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Intro / The Door */}
      {phase === 'intro' && <IntroTheDoor onEnter={handleEnter} />}

      {/* Music Player — rendered outside experience phase so it persists */}
      {phase !== 'preloader' && <MusicPlayer />}

      {/* Main Experience */}
      {phase === 'experience' && (
        <>
          {/* Chapter Navigation */}
          <ChapterNav activeChapter={activeChapter} />

          {/* Chapters */}
          <main>
            <BirthdayReveal />
            <WhoSheIs />
            <HerStory />
            <Family />
            <FaithSection />
            <Friends />
            <CollegeLife />
            <UsMyChapter />
            <HerselfPortraits />
            <MemoryGallery />
            <InteractiveMoments />

            <TwentyOneMilestone />
            <FutureTimeCapsule />
            <TheCake />
            <FinalChapter />
            <Credits />
          </main>
        </>
      )}
    </>
  );
}
