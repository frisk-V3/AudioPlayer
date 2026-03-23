import React from 'react';
import { Track } from '@my-player/core';

type Props = {
  tracks: Track[];
  onSelect: (index: number) => void;
};

export const Playlist: React.FC<Props> = ({ tracks, onSelect }) => {
  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={track.id} onClick={() => onSelect(index)}>
          {track.title}
        </li>
      ))}
    </ul>
  );
};
