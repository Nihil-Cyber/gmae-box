import { useEffect, useRef, useState } from 'react'

export type WanderPose = {
  x: number
  y: number
  face: 1 | -1
}

export function usePetWander(ids: string[], paused: boolean): Record<string, WanderPose> {
  const [poses, setPoses] = useState<Record<string, WanderPose>>({})
  const pausedRef = useRef(paused)
  const key = ids.join('|')

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const list = key ? key.split('|') : []
    if (list.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let alive = true
    const timers = new Map<string, number>()

    const roam = (id: string) => {
      const wait = 900 + Math.random() * 2400
      timers.set(
        id,
        window.setTimeout(() => {
          if (!alive) return
          if (!pausedRef.current) {
            const x = Math.round((Math.random() - 0.5) * 56)
            const y = Math.round((Math.random() - 0.5) * 22)
            setPoses((prev) => ({
              ...prev,
              [id]: {
                x,
                y,
                face: x < (prev[id]?.x ?? 0) ? -1 : 1,
              },
            }))
          }
          roam(id)
        }, wait),
      )
    }

    list.forEach(roam)
    return () => {
      alive = false
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [key])

  if (paused) return {}
  return poses
}
