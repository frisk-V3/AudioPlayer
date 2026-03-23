import React, { useEffect, useRef } from 'react';

export const Waveform: React.FC<{ audio: HTMLAudioElement }> = ({ audio }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(ctx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext('2d');

    function draw() {
      requestAnimationFrame(draw);
      if (!canvas || !canvasCtx) return;

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw();
  }, [audio]);

  return <canvas ref={canvasRef} width={600} height={200} />;
};
