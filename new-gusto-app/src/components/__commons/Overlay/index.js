import { memo, useEffect, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import gsap from 'gsap'
import injectSheet from 'react-jss'
import * as layerActions from '@/actions/layer'
import style from './style'

const Overlay = ({ classes }) => {
  const $root = useRef()
  const [isOverlayOpen, setOverlayOpen] = useState(false)

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { layerIsOpen } = useSelector((state) => ({
    layerIsOpen: state.layer.layerIsOpen,
  }), shallowEqual)

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const closeAllLayer = useCallback(() => dispatch(layerActions.closeAllLayer()), [dispatch])

  useEffect(() => {
    if (layerIsOpen) setOverlayOpen(true)
    if (!layerIsOpen) setOverlayOpen(false)
  }, [layerIsOpen])

  useEffect(() => {
    gsap.set($root.current, { opacity: 0 })
  }, [])

  const fadeOverlay = useCallback((opt) => {
    gsap.to($root.current, {
      duration: 1,
      opacity: opt === 'in' ? 1 : 0,
      ease: 'power3.out',
    })
  }, [])

  const handleClick = useCallback(() => {
    if (layerIsOpen) closeAllLayer()
  }, [layerIsOpen])

  useEffect(() => {
    if (isOverlayOpen) fadeOverlay('in')
    if (!isOverlayOpen) fadeOverlay('out')
  }, [isOverlayOpen])

  return (
    <div // eslint-disable-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      ref={$root}
      className={clsx({
        [classes.root]: true,
        [classes.visible]: isOverlayOpen,
      })}
      onClick={handleClick}
    />
  )
}

export default injectSheet(style)(memo(Overlay))
