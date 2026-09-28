import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/config';
import { getBirthdayStatus } from '../../utils/dateUtils';

export function Countdown() {
  const [status, setStatus] = useState(() => getBirthdayStatus(siteConfig.birthdayDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getBirthdayStatus(siteConfig.birthdayDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status.isBirthday || status.isPast) {
    return (
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-4xl">🎂</span>
        <p className="mt-2 font-serif text-xl text-rose-300">Today is your day</p>
      </motion.div>
    );
  }

  const units = [
    { label: 'days', value: status.daysUntil },
    { label: 'hours', value: status.hoursUntil },
    { label: 'minutes', value: status.minutesUntil },
    { label: 'seconds', value: status.secondsUntil },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm sm:h-16 sm:w-16">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.value}
                className="font-mono text-xl font-bold text-white sm:text-2xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}
