type Props = {
  name: string
  line: string
}

export function PetBubble({ name, line }: Props) {
  return (
    <p className="g-bubble">
      <b>{name}</b>：{line}
    </p>
  )
}
