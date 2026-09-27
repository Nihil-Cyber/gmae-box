export type SudokuMode = 'classic' | 'color' | 'challenge' | 'daily'

export type ModeConfig = {
  id: SudokuMode
  showNumbers: boolean
  showTimer: boolean
  useDailySeed: boolean
}

export function modeConfig(mode: SudokuMode): ModeConfig {
  return {
    id: mode,
    showNumbers: mode !== 'color',
    showTimer: mode === 'challenge',
    useDailySeed: mode === 'daily',
  }
}
