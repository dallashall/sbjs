import React from 'react';

const Player = ({ x = 0, y = 0, dir = 'D' }) => {
  const translate = `translate(${x}px, ${y}px)`;
  return (
    <div style={{
      width: 50,
      height: 50,
      transform: translate,
      backgroundImage: `url('./images/${dir}.svg')`,
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'transform 0.2s ease-in-out',
    }}
    />
  );
};

export default Player;
