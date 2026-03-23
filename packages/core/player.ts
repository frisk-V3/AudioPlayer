// =========================
// packages/core/player.ts
// =========================

export type Track = {
  id: string;
  title: string;
  url: string;
};

export class Player {
  private audio: HTMLAudioElement;
  private playlist: Track[] = [];
  private currentIndex: number = -1;

  constructor() {
    this.audio = new Audio();
  }

  loadPlaylist(tracks: Track[]) {
    this.playlist = tracks;
    this.currentIndex = 0;
  }

  play(index?: number) {
    if (index !== undefined) {
      this.currentIndex = index;
    }

    const track = this.playlist[this.currentIndex];
    if (!track) return;

    this.audio.src = track.url;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.play();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.play();
    }
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  onTimeUpdate(callback: (time: number) => void) {
    this.audio.ontimeupdate = () => {
      callback(this.audio.currentTime);
    };
  }

  onEnded(callback: () => void) {
    this.audio.onended = callback;
  }
}


// =========================
// packages/core/playlist.ts
// =========================

import { Track } from './player';

export class PlaylistManager {
  private tracks: Track[] = [];

  add(track: Track) {
    this.tracks.push(track);
  }

  remove(id: string) {
    this.tracks = this.tracks.filter(t => t.id !== id);
  }

  getAll() {
    return this.tracks;
  }

  clear() {
    this.tracks = [];
  }
}


// =========================
// packages/core/index.ts
// =========================

export * from './player';
export * from './playlist';
