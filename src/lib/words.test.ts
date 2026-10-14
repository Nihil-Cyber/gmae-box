import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { makeReadChar, makeVocab, wordArtIds } from './words'

const artDir = join(dirname(fileURLToPath(import.meta.url)), '../assets/words')

describe('word sticker art', () => {
  it('has an svg for every recognition and vocab picture id', () => {
    const files = new Set(readdirSync(artDir).filter((name) => name.endsWith('.svg')))
    expect(files.size).toBe(70)
    for (const id of wordArtIds()) {
      expect(files.has(`${id}.svg`), `missing ${id}.svg`).toBe(true)
    }
  })

  it('uses sticker pictures instead of emoji for look-and-choose questions', () => {
    const samples = Array.from({ length: 40 }, () => makeReadChar('easy'))
    const pictured = samples.filter((q) => q.picture)
    expect(pictured.length).toBeGreaterThan(0)
    expect(pictured.every((q) => !q.expression)).toBe(true)
    expect(pictured.every((q) => !/[\u{1F300}-\u{1FAFF}]/u.test(q.picture ?? ''))).toBe(true)

    const vocab = Array.from({ length: 40 }, () => makeVocab('easy'))
    const vocabPics = vocab.filter((q) => q.picture)
    expect(vocabPics.length).toBeGreaterThan(0)
    expect(vocabPics.every((q) => !q.expression)).toBe(true)
  })
})
