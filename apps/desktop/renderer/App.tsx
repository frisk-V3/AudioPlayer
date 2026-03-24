import React, { useEffect } from 'react';
import { Player } from '@my-player/core';
import { PlayerControls } from '@my-player/ui';

const player = new Player();

const App: React.FC = () => {

  useEffect(() => {
    // @ts-ignore
    window.electronAPI?.onOpenFile((file: string) => {
      player.loadPlaylist([
        { id: '1', title: file, url: file }
      ]);
      player.play();
    });
  }, []);

  return (
    <div>
      <h1>My Media Player</h1>
      <PlayerControls player={player} />
    </div>
  );
};

export default App;
