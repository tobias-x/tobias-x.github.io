import React, { useEffect, useState } from 'react';

const About = () => {
  const [asciiArt, setAsciiArt] = useState('');
  const [displayText, setDisplayText] = useState('');
  const duration = 2000; // Duration for the transition (10 seconds)

  useEffect(() => {
    // Fetch the ASCII art file (me.txt) from the public folder
    fetch('/me.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load ASCII art');
        }
        return response.text();
      })
      .then((data) => setAsciiArt(data))
      .catch((error) => console.error('Error loading ASCII art:', error));
  }, []);

  useEffect(() => {
    if (!asciiArt) return; // Wait until asciiArt is loaded

    const uniqueChars = Array.from(new Set(asciiArt.replace(/\n/g, ''))); // Unique characters (exclude newlines)
    const getRandomChar = () =>
      uniqueChars[Math.floor(Math.random() * uniqueChars.length)];

    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Progress ranges from 0 to 1

      const updatedText = asciiArt
        .split('')
        .map((char, index) => {
          // Reveal characters progressively
          return index / asciiArt.length <= progress || char === '\n'
            ? char
            : getRandomChar();
        })
        .join('');

      setDisplayText(updatedText);

      if (progress === 1) {
        clearInterval(interval); // Stop updating after completion
      }
    }, 50); // Update every 50ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, [asciiArt, duration]);

  return (
    <section id="about" className="h-[95vh] py-2 text-white flex items-center">
      <div className="container mx-auto">
        <pre
          className="mx-auto text-center text-xs whitespace-pre-wrap"
          style={{
            fontFamily: 'monospace',
            fontSize: '6px',
            lineHeight: '8px',
            width: 'auto',
            overflow: 'auto',
          }}
        >
          {displayText}
        </pre>
        <p className="mt-4 text-lg text-center">I'm a ~27 year old living in Sydney who likes to build cool shit.</p>
      </div>
    </section>
  );
};

export default About;
