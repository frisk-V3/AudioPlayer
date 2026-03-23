export class Equalizer {
  private ctx: AudioContext;
  private source: MediaElementAudioSourceNode;
  private filters: BiquadFilterNode[] = [];

  private frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

  constructor(audio: HTMLAudioElement) {
    this.ctx = new AudioContext();
    this.source = this.ctx.createMediaElementSource(audio);

    let prev: AudioNode = this.source;

    this.frequencies.forEach((freq) => {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = freq;
      filter.Q.value = 1;
      filter.gain.value = 0;

      prev.connect(filter);
      prev = filter;

      this.filters.push(filter);
    });

    prev.connect(this.ctx.destination);
  }

  setGain(index: number, value: number) {
    if (this.filters[index]) {
      this.filters[index].gain.value = value;
    }
  }

  getGains(): number[] {
    return this.filters.map(f => f.gain.value);
  }
}
