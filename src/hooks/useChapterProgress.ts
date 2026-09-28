import { useState, useEffect } from 'react';

export function useChapterProgress(chapterIds: string[]) {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapterIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(index);
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [chapterIds]);

  return activeChapter;
}
