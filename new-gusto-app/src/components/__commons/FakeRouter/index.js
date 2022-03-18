import { useState, useEffect, Children, useRef } from 'react'
import gsap from 'gsap'
import usePrevious from '@/hooks/usePrevious'
// import tracker from '@/tracking/openReplay'

const FakeRouter = ({
  children,
  location,
}) => {
  const firstLocation = useRef(location)
  const [currentLocation, setCurrentLocation] = useState(firstLocation.current)
  const $wrapper = useRef()

  const prevLocation = usePrevious(location)
  useEffect(() => {
    if (prevLocation !== undefined) {
      // tracker.event('fake_route_change', location)
      gsap.timeline()
        .to($wrapper.current.children, {
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => setCurrentLocation(location),
        })
        .to($wrapper.current.children, { autoAlpha: 1, duration: 2 })
    }
  }, [location])

  return (
    <div ref={$wrapper}>
      {Children.map(children, (child) => {
        if (child.key === currentLocation) {
          return child
        }
        return null
      })}
    </div>
  )
}

export default FakeRouter
