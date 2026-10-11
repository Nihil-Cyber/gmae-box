import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const petSrc = readFileSync(join(root, 'src/games/garden/PetSprite.tsx'), 'utf8')
const decoSrc = readFileSync(join(root, 'src/games/garden/DecoSprite.tsx'), 'utf8')

function jsxToSvg(inner, vars = {}) {
  let out = inner
    .replace(/ className="[^"]*"/g, '')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
    .replace(/fillRule=/g, 'fill-rule=')
    .replace(/clipRule=/g, 'clip-rule=')
    .replace(/opacity=\{open\}/g, `opacity="${vars.open ?? 1}"`)
    .replace(/opacity=\{happy\}/g, `opacity="${vars.happy ?? 0}"`)
    .replace(/(\w+)=\{(\d+(?:\.\d+)?)\}/g, '$1="$2"')
    .replace(/\n {6}/g, '\n  ')
    .trim()
  return out
}

function wrap(viewBox, inner, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="512" height="512"${label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"'}>
  ${inner}
</svg>
`
}

function extractBlocks(src, startMarker) {
  const start = src.indexOf(startMarker)
  const end = src.indexOf('};', start)
  const body = src.slice(start + startMarker.length, end)
  const blocks = []
  const re = /(\w+):\s*(?:\([^)]*\)\s*)?=>\s*\(\s*<>\s*([\s\S]*?)\s*<\/>\s*\),?/g
  let match
  while ((match = re.exec(body))) {
    blocks.push({ id: match[1], inner: match[2] })
  }
  return blocks
}

const pets = extractBlocks(petSrc, 'const DRAW: Record<PetKind, Draw> = {')
const names = {
  chick: '小雞',
  rabbit: '兔仔',
  cat: '小貓',
  dog: '小狗',
  panda: '熊貓',
  dragon: '小龍',
}

mkdirSync(join(root, 'handoff/style-ref/pets'), { recursive: true })
mkdirSync(join(root, 'handoff/style-ref/decor'), { recursive: true })

for (const pet of pets) {
  const normal = wrap('0 0 120 120', jsxToSvg(pet.inner, { open: 1, happy: 0 }), names[pet.id])
  const happy = wrap('0 0 120 120', jsxToSvg(pet.inner, { open: 0, happy: 1 }), names[pet.id])
  writeFileSync(join(root, 'handoff/style-ref/pets', `${pet.id}-normal.svg`), normal)
  writeFileSync(join(root, 'handoff/style-ref/pets', `${pet.id}-happy.svg`), happy)
}

const decos = extractBlocks(decoSrc, 'const DRAW: Record<DecoKind, () => JSX.Element> = {')
for (const deco of decos) {
  writeFileSync(
    join(root, 'handoff/style-ref/decor', `${deco.id}.svg`),
    wrap('0 0 100 100', jsxToSvg(deco.inner), deco.id),
  )
}

console.log(`pets ${pets.length} × 2, decor ${decos.length}`)
console.log(pets.map((p) => p.id).join(', '))
console.log(decos.map((d) => d.id).join(', '))
