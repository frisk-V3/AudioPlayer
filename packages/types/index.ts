export type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
};

export type UITrack = {
  id: string;
  title: string;
  url?: string;
};

export type EQSettings = {
  gains: number[]; // 10バンド
};

export type EffectSettings = {
  volumeBoost: number;
};
