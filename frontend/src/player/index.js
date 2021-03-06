import React from 'react';

const Player = ({ player }) => {
  const { x = 0, y = 0, dir = 'D' } = player;
  const translate = `translate(${x * 50}px, ${y * 50}px)`;
  return (
    <div style={{
      width: 50,
      height: 50,
      transform: translate,
      backgroundImage: `url('./images/${dir}.png')`,
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'transform 0.2s ease-in-out',
      textAlign: 'center',
    }}
    >
      <p className="player-name">
        {player.username}
      </p>
    </div>
  );
};

export default Player;
