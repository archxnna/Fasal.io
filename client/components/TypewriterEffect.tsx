import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  words: Array<{ text: string; className?: string }>;
  cursorClassName?: string;
}

export default function TypewriterEffect({ words, cursorClassName = '' }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullText = words.map((w) => w.text).join('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="inline-block">
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`inline-block w-1 h-12 ml-2 bg-gradient-to-b from-green-400 to-green-500 rounded ${cursorClassName}`}
      />
    </div>
  );
}
