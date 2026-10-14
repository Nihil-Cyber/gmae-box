const pictures = import.meta.glob('../assets/words/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function wordPictureSrc(id: string): string | undefined {
  const match = Object.entries(pictures).find(([path]) => path.endsWith(`/${id}.svg`))
  return match?.[1]
}

type Props = {
  id: string
  label?: string
}

export function WordPicture({ id, label }: Props) {
  const src = wordPictureSrc(id)
  if (!src) return null
  return <img className="word-art" src={src} alt={label ?? ''} />
}
