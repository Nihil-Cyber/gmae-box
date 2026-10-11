import type { DecoKind } from './DecoSprite'
import type { PetKind } from './PetSprite'
import { PET_NAMES } from './PetSprite'

export function isPetKind(id: string): id is PetKind {
  return id in PET_NAMES
}

export function decoKind(id: string): DecoKind {
  if (id === 'berry') return 'fruittree'
  return id as DecoKind
}

export function decoSize(kind: DecoKind): number {
  if (kind === 'sun' || kind === 'rainbow') return 72
  if (kind === 'cloud' || kind === 'moon') return 52
  if (kind === 'stars') return 58
  if (kind === 'tree' || kind === 'fruittree' || kind === 'house' || kind === 'swing' || kind === 'bush') return 70
  if (kind === 'kite' || kind === 'snowman') return 64
  if (kind === 'bench') return 62
  return 56
}
