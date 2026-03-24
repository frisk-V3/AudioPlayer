import React, { useEffect, useState } from 'react';
import { Player, Track } from '@my-player/core';
import { PlayerControls, Playlist, Waveform } from '@my-player/ui';
import { Equalizer, AudioEffects } from '@my-player/audio';

const player = new Player();

const App: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    // 初期データ（テスト用）
    const demoTracks: Track[] = [
      {
        id: '1',
        title: 'Sample Audio',
        url: '/sample.mp3'
      }
    ];

    setTracks(demoTracks);
    player.loadPlaylist(demoTracks);

    // 🎧 audio接続（超重要）
    const audio = player.getAudioElement();

    const eq = new Equalizer(audio);
    const fx = new AudioEffects(audio);

    // 例：ちょい低音ブースト
    eq.setGain(0, 5);

    // 音量ちょい上げ
    fx.setVolumeBoost(1.1);

  }, []);

  const handleSelect = (index: number) => {
    player.play(index);
  };

  return (
    <div>
      <h1>Web Media Player</h1>

      <PlayerControls player={player} />

      <Playlist tracks={tracks} onSelect={handleSelect} />

      <Waveform audio={player.getAudioElement()} />
    </div>
  );
};

export default App;
