import { Track } from './player';

export class PlaylistManager {
  private tracks: Track[] = [];

  add(track: Track) {
    this.tracks.push(track);
  }

  remove(id: string) {
    this.tracks = this.tracks.filter(t => t.id !== id);
  }

  getAll(): Track[] {
    return this.tracks;
  }

  get(index: number): Track | undefined {
    return this.tracks[index];
  }

  clear() {
    this.tracks = [];
  }

  size(): number {
    return this.tracks.length;
  }
}
