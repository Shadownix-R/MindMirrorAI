// Web Audio API Synthesizer for Ambient Nature Sounds & Bubble SFX

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.activeNodes = {
      rain: null,
      forest: null,
      ocean: null,
    };
    this.currentSound = 'mute';
    this.isMuted = false;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create pink/white noise buffer
  createNoiseBuffer(seconds = 3) {
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter approximation
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
    }
    return buffer;
  }

  startRain() {
    this.stopAll();
    this.initCtx();
    if (!this.ctx) return;

    const noiseBuffer = this.createNoiseBuffer(5);
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter for gentle rain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start();
    this.activeNodes.rain = { noiseNode, gain };
    this.currentSound = 'rain';
  }

  startOcean() {
    this.stopAll();
    this.initCtx();
    if (!this.ctx) return;

    const noiseBuffer = this.createNoiseBuffer(6);
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);

    // LFO to simulate wave swell
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // Wave period ~10s
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start();
    lfo.start();

    this.activeNodes.ocean = { noiseNode, lfo, gain };
    this.currentSound = 'ocean';
  }

  startForest() {
    this.stopAll();
    this.initCtx();
    if (!this.ctx) return;

    // Rustling leaves (filtered light noise)
    const noiseBuffer = this.createNoiseBuffer(4);
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start();

    // Occasional gentle bird chirp interval
    const birdInterval = setInterval(() => {
      if (this.currentSound !== 'forest') {
        clearInterval(birdInterval);
        return;
      }
      this.playBirdChirp();
    }, 4500);

    this.activeNodes.forest = { noiseNode, gain, birdInterval };
    this.currentSound = 'forest';
  }

  playBirdChirp() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      const startFreq = 2000 + Math.random() * 800;
      
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 1000, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 300, now + 0.16);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      console.warn("Bird chirp error", e);
    }
  }

  playBubblePopSFX() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      // Pitch drop for pop sound
      const baseFreq = 400 + Math.random() * 200;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn("Bubble pop SFX error", e);
    }
  }

  playBreathingChime() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now); // 528Hz Solfeggio frequency

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    } catch (e) {
      console.warn("Breathing chime error", e);
    }
  }

  stopAll() {
    if (this.activeNodes.rain) {
      try { this.activeNodes.rain.noiseNode.stop(); } catch (e) {}
    }
    if (this.activeNodes.ocean) {
      try {
        this.activeNodes.ocean.noiseNode.stop();
        this.activeNodes.ocean.lfo.stop();
      } catch (e) {}
    }
    if (this.activeNodes.forest) {
      try {
        this.activeNodes.forest.noiseNode.stop();
        if (this.activeNodes.forest.birdInterval) clearInterval(this.activeNodes.forest.birdInterval);
      } catch (e) {}
    }
    this.activeNodes = { rain: null, forest: null, ocean: null };
    this.currentSound = 'mute';
  }

  setSound(soundType) {
    if (soundType === 'rain') this.startRain();
    else if (soundType === 'forest') this.startForest();
    else if (soundType === 'ocean') this.startOcean();
    else this.stopAll();
  }
}

export const soundEngine = new AudioSynthesizer();
