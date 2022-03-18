import { useContext, useRef } from 'react'
import { useRaf } from '@/components/Handlers'
import { lerp } from '@/utils/math'
import { Context } from '@/context/mouse'

export default (cb) => {
  const { mouse } = useContext(Context)
  const easeMouse = useRef({ x: 0, y: 0 })

  useRaf(() => {
    const width = global.innerWidth
    const height = global.innerHeight

    easeMouse.current.x = lerp(easeMouse.current.x, mouse.current.x, 0.1)
    easeMouse.current.y = lerp(easeMouse.current.y, mouse.current.y, 0.1)

    cb({
      x: mouse.current.x,
      y: mouse.current.y,
      normalizedX: Number((mouse.current.x / width).toFixed(2)),
      normalizedY: Number((mouse.current.y / height).toFixed(2)),
      easeX: easeMouse.current.x,
      easeY: easeMouse.current.y,
    })
  })
}
