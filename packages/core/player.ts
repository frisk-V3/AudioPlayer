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

    // 自動で次の曲へ
    this.audio.onended = () => {
      this.next();
    };
  }

  // 🎧 audioエンジンに渡す用（超重要）
  getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  // 📜 プレイリスト読み込み
  loadPlaylist(tracks: Track[]) {
    this.playlist = tracks;
    this.currentIndex = tracks.length > 0 ? 0 : -1;
  }

  // ▶ 再生
  play(index?: number) {
    if (index !== undefined) {
      this.currentIndex = index;
    }

    const track = this.playlist[this.currentIndex];
    if (!track) return;

    // 同じ曲なら再セットしない（無駄防止）
    if (this.audio.src !== track.url) {
      this.audio.src = track.url;
    }

    this.audio.play();
  }

  // ⏸ 一時停止
  pause() {
    this.audio.pause();
  }

  // 🔁 トグル
  toggle() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  // ⏭ 次
  next() {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.play();
    }
  }

  // ⏮ 前
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.play();
    }
  }

  // ⏩ シーク
  seek(time: number) {
    this.audio.currentTime = time;
  }

  // 🔊 音量
  setVolume(volume: number) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.audio.volume;
  }

  // ⏱ 現在時間
  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  // ⏱ 長さ
  getDuration(): number {
    return this.audio.duration || 0;
  }

  // 📡 イベント（UI用）
  onTimeUpdate(callback: (time: number) => void) {
    this.audio.ontimeupdate = () => {
      callback(this.audio.currentTime);
    };
  }

  onPlay(callback: () => void) {
    this.audio.onplay = callback;
  }

  onPause(callback: () => void) {
    this.audio.onpause = callback;
  }

  onEnded(callback: () => void) {
    this.audio.onended = callback;
  }

  // 🎵 現在の曲
  getCurrentTrack(): Track | null {
    return this.playlist[this.currentIndex] || null;
  }

  // 📊 状態
  isPlaying(): boolean {
    return !this.audio.paused;
  }
}
