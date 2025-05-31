// Confetti.jsx
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Celebration = () => {
  const [width, height] = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      recycle={false}
      gravity={0.3}
    />
  );
};

export default Celebration;
