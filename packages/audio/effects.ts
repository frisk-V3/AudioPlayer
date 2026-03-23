export class AudioEffects {
  private ctx: AudioContext;
  private source: MediaElementAudioSourceNode;
  private gainNode: GainNode;
  private compressor: DynamicsCompressorNode;

  constructor(audio: HTMLAudioElement) {
    this.ctx = new AudioContext();
    this.source = this.ctx.createMediaElementSource(audio);

    this.gainNode = this.ctx.createGain();
    this.compressor = this.ctx.createDynamicsCompressor();

    // デフォルト設定（安全寄り）
    this.gainNode.gain.value = 1.0;

    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;

    this.source
      .connect(this.gainNode)
      .connect(this.compressor)
      .connect(this.ctx.destination);
  }

  setVolumeBoost(value: number) {
    this.gainNode.gain.value = value;
  }

  getVolumeBoost(): number {
    return this.gainNode.gain.value;
  }
}
