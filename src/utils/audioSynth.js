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

    // Layer 1: Gentle background rain (low frequency)
    const noiseBuffer1 = this.createNoiseBuffer(8);
    const noiseNode1 = this.ctx.createBufferSource();
    noiseNode1.buffer = noiseBuffer1;
    noiseNode1.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(600, this.ctx.currentTime);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.08, this.ctx.currentTime);

    noiseNode1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.ctx.destination);

    // Layer 2: Mid-range rain droplets
    const noiseBuffer2 = this.createNoiseBuffer(6);
    const noiseNode2 = this.ctx.createBufferSource();
    noiseNode2.buffer = noiseBuffer2;
    noiseNode2.loop = true;

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter2.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noiseNode2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.ctx.destination);

    // Layer 3: Subtle high-frequency droplets with modulation
    const noiseBuffer3 = this.createNoiseBuffer(4);
    const noiseNode3 = this.ctx.createBufferSource();
    noiseNode3.buffer = noiseBuffer3;
    noiseNode3.loop = true;

    const filter3 = this.ctx.createBiquadFilter();
    filter3.type = 'highpass';
    filter3.frequency.setValueAtTime(2500, this.ctx.currentTime);

    // LFO for subtle variation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.3, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter3.frequency);

    const gain3 = this.ctx.createGain();
    gain3.gain.setValueAtTime(0.02, this.ctx.currentTime);

    noiseNode3.connect(filter3);
    filter3.connect(gain3);
    gain3.connect(this.ctx.destination);

    noiseNode1.start();
    noiseNode2.start();
    noiseNode3.start();
    lfo.start();

    this.activeNodes.rain = { noiseNode1, noiseNode2, noiseNode3, lfo, gain1, gain2, gain3 };
    this.currentSound = 'rain';
  }

  startOcean() {
    this.stopAll();
    this.initCtx();
    if (!this.ctx) return;

    // Layer 1: Deep ocean rumble (low frequency)
    const noiseBuffer1 = this.createNoiseBuffer(8);
    const noiseNode1 = this.ctx.createBufferSource();
    noiseNode1.buffer = noiseBuffer1;
    noiseNode1.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(200, this.ctx.currentTime);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noiseNode1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.ctx.destination);

    // Layer 2: Wave crash (mid frequency with swell)
    const noiseBuffer2 = this.createNoiseBuffer(7);
    const noiseNode2 = this.ctx.createBufferSource();
    noiseNode2.buffer = noiseBuffer2;
    noiseNode2.loop = true;

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(500, this.ctx.currentTime);

    // Primary LFO for wave swell (8-12 second period)
    const lfo1 = this.ctx.createOscillator();
    lfo1.frequency.setValueAtTime(0.09, this.ctx.currentTime);
    const lfoGain1 = this.ctx.createGain();
    lfoGain1.gain.setValueAtTime(250, this.ctx.currentTime);
    lfo1.connect(lfoGain1);
    lfoGain1.connect(filter2.frequency);

    // Secondary LFO for wave texture
    const lfo2 = this.ctx.createOscillator();
    lfo2.frequency.setValueAtTime(0.25, this.ctx.currentTime);
    const lfoGain2 = this.ctx.createGain();
    lfoGain2.gain.setValueAtTime(0.08, this.ctx.currentTime);
    lfo2.connect(lfoGain2);
    lfoGain2.connect(gain1.gain);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.15, this.ctx.currentTime);

    noiseNode2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.ctx.destination);

    // Layer 3: High-frequency foam/bubbles
    const noiseBuffer3 = this.createNoiseBuffer(5);
    const noiseNode3 = this.ctx.createBufferSource();
    noiseNode3.buffer = noiseBuffer3;
    noiseNode3.loop = true;

    const filter3 = this.ctx.createBiquadFilter();
    filter3.type = 'highpass';
    filter3.frequency.setValueAtTime(3000, this.ctx.currentTime);

    const gain3 = this.ctx.createGain();
    gain3.gain.setValueAtTime(0.03, this.ctx.currentTime);

    noiseNode3.connect(filter3);
    filter3.connect(gain3);
    gain3.connect(this.ctx.destination);

    noiseNode1.start();
    noiseNode2.start();
    noiseNode3.start();
    lfo1.start();
    lfo2.start();

    this.activeNodes.ocean = { noiseNode1, noiseNode2, noiseNode3, lfo1, lfo2, gain1, gain2, gain3 };
    this.currentSound = 'ocean';
  }

  startForest() {
    this.stopAll();
    this.initCtx();
    if (!this.ctx) return;

    // Layer 1: Gentle wind through leaves (low-mid frequency)
    const noiseBuffer1 = this.createNoiseBuffer(7);
    const noiseNode1 = this.ctx.createBufferSource();
    noiseNode1.buffer = noiseBuffer1;
    noiseNode1.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(500, this.ctx.currentTime);

    // LFO for wind variation
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(filter1.frequency);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.06, this.ctx.currentTime);

    noiseNode1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.ctx.destination);

    // Layer 2: Rustling leaves (mid-high frequency)
    const noiseBuffer2 = this.createNoiseBuffer(5);
    const noiseNode2 = this.ctx.createBufferSource();
    noiseNode2.buffer = noiseBuffer2;
    noiseNode2.loop = true;

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1000, this.ctx.currentTime);
    filter2.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.05, this.ctx.currentTime);

    noiseNode2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.ctx.destination);

    noiseNode1.start();
    noiseNode2.start();
    windLfo.start();

    // Occasional bird chirps with varied intervals
    const playRandomBird = () => {
      if (this.currentSound !== 'forest') return;
      this.playBirdChirp();
      // Random interval between 3-8 seconds
      const nextInterval = 3000 + Math.random() * 5000;
      setTimeout(playRandomBird, nextInterval);
    };

    const birdTimeout = setTimeout(playRandomBird, 2000);

    this.activeNodes.forest = { noiseNode1, noiseNode2, windLfo, gain1, gain2, birdTimeout };
    this.currentSound = 'forest';
  }

  playBirdChirp() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      const startFreq = 1800 + Math.random() * 1200;

      // More natural bird chirp pattern
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 800, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 400, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 200, now + 0.18);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn("Bird chirp error", e);
    }
  }

  playBubblePopSFX() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const baseFreq = 350 + Math.random() * 250;

      // Layer 1: Main pop (sine wave)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.03);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      // Layer 2: Bright sparkle (triangle wave)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 3, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.05);

      // Layer 3: Subtle noise burst for realism
      const noiseBuffer = this.createNoiseBuffer(0.1);
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(2000, now);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseNode.start(now);
      noiseNode.stop(now + 0.03);
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
      this.activeNodes.rain.noiseNode1.stop();
      this.activeNodes.rain.noiseNode2.stop();
      this.activeNodes.rain.noiseNode3.stop();
      this.activeNodes.rain.lfo.stop();
    }
    if (this.activeNodes.ocean) {
      this.activeNodes.ocean.noiseNode1.stop();
      this.activeNodes.ocean.noiseNode2.stop();
      this.activeNodes.ocean.noiseNode3.stop();
      this.activeNodes.ocean.lfo1.stop();
      this.activeNodes.ocean.lfo2.stop();
    }
    if (this.activeNodes.forest) {
      this.activeNodes.forest.noiseNode1.stop();
      this.activeNodes.forest.noiseNode2.stop();
      this.activeNodes.forest.windLfo.stop();
      if (this.activeNodes.forest.birdTimeout) clearTimeout(this.activeNodes.forest.birdTimeout);
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
