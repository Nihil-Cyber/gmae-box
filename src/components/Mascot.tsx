import { IconSprite } from './IconSprite'

type Props = {
  className?: string
}

export function Mascot({ className }: Props) {
  return <IconSprite kind="mascot" className={className} label="Gmae Box 小雞" />
}
