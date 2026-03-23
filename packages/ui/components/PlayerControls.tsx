import React from 'react';
import { Player } from '@my-player/core';

type Props = {
  player: Player;
};

export const PlayerControls: React.FC<Props> = ({ player }) => {
  return (
    <div>
      <button onClick={() => player.prev()}>Prev</button>
      <button onClick={() => player.toggle()}>Play/Pause</button>
      <button onClick={() => player.next()}>Next</button>
    </div>
  );
};
