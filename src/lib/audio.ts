let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  const AudioCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!AudioCtor) return null
  if (!ctx) ctx = new AudioCtor()
  return ctx
}

export function unlockAudio(): void {
  const audio = getCtx()
  if (audio?.state === 'suspended') void audio.resume()
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  delay = 0,
): void {
  const audio = getCtx()
  if (!audio) return
  const t = audio.currentTime + delay
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(gainValue, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(t)
  osc.stop(t + duration + 0.02)
}

export function playTap(): void {
  tone(520, 0.06, 'triangle', 0.05)
}

export function playCorrect(): void {
  tone(523.25, 0.12, 'triangle', 0.08, 0)
  tone(659.25, 0.14, 'triangle', 0.08, 0.08)
  tone(783.99, 0.22, 'triangle', 0.09, 0.16)
}

export function playWrong(): void {
  tone(196, 0.18, 'square', 0.04)
  tone(164.81, 0.22, 'square', 0.03, 0.1)
}

export function playWin(): void {
  ;[523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    tone(freq, 0.22, 'triangle', 0.09, i * 0.09)
  })
}
