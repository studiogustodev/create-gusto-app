import { memo, useCallback, useEffect, useState, useRef, forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import ConditionalWrapper from '@/components/ConditionalWrapper'
import DelayLink from '@/components/__commons/DelayLink'
import { useResize } from '@/components/Handlers'
import style from './style'

gsap.registerPlugin(SplitText)

const useStyles = createUseStyles(style)

const RevealText = forwardRef(({
  className,
  value,
  lineHeight,
  enterDelay,
  exitDelay,
  stagger,
  tag,
  type,
  enterDuration,
  exitDuration,
  ease,
  link,
  visible,
  inview,
  onMouseOver,
  onMouseOut,
  onComplete,
  oneLine,
  once,
}, ref) => {
  // Il line-height minimo per la visualizzazione corretta di un overflow:hidden è 1.25
  // Passo ad ogni linea il margine negativo in em per correggere il line-height passato dalle props
  const linesMargin = -1.25 + lineHeight
  const classes = useStyles({ linesMargin, lineHeight })
  const $root = useRef()
  const $words = useRef()
  const $split = useRef()
  const winWidth = useRef()
  const Tag = tag
  const [splitted, setSplitted] = useState(false)

  /*------------------------------
  Wrap Line
  ------------------------------*/
  const wrapLine = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el)
    wrapper.classList.add('line')
    wrapper.appendChild(el)
  }

  /*------------------------------
  Split
  ------------------------------*/
  const split = () => {
    if (!$words.current) return
    $split.current = new SplitText($words.current, { type: `lines ${type}` })
    gsap.set($split.current[type], {
      y: '110%',
      transformOrigin: 'center top',
    })
    gsap.set($root.current, {
      opacity: 1,
    })
    setSplitted(true)

    $split.current.lines.forEach((line) => {
      wrapLine(line, document.createElement('div'))
    })
  }

  /*------------------------------
  Resize
  ------------------------------*/
  useResize(() => {
    if (winWidth.current !== window.innerWidth && $split.current) {
      $split.current.revert()
      setSplitted(false)
      setTimeout(() => {
        split()
        winWidth.current = window.innerWidth
      }, 10)
    }
  }, [])

  /*------------------------------
  Init
  ------------------------------*/
  useEffect(() => {
    winWidth.current = window.innerWidth
    split()
  }, [value])

  const animation = () => {
    $words.current.style.opacity = 1
    gsap.killTweensOf($split.current[type])
    gsap.to($split.current[type], {
      y: (visible || inview) ? '0%' : '110%',
      scaleY: (visible || inview) ? 1 : 2,
      duration: (visible || inview) ? enterDuration : exitDuration,
      stagger,
      ease,
      delay: (visible || inview) ? enterDelay : exitDelay,
      onComplete,
    })
  }

  /*------------------------------
  Visible
  ------------------------------*/
  useEffect(() => {
    if (splitted && !once) animation()
    if (splitted && (visible || inview)) animation()
  }, [visible, inview, splitted])

  /*------------------------------
  Manage Conditional Wrapper
  ------------------------------*/
  const handleConditionalWrapper = useCallback((child) => (
    <DelayLink className={classes.link} to={link}>{child}</DelayLink>
  ), [])

  /*------------------------------
  Render Children
  ------------------------------*/
  const renderChildren = useCallback(() => (
    <div
      className={clsx({
        [classes.wrap]: true,
        'revealText--wrap': true,
      })}
      dangerouslySetInnerHTML={{ __html: value }}
      ref={$words}
    />
  ), [value])

  return (
    <Tag
      ref={(r) => {
        if (ref) ref.current = r
        $root.current = r
      }}
      className={clsx({
        [className]: className,
        [classes.root]: true,
        [classes.visible]: visible,
        [classes.oneLine]: oneLine,
      })}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <ConditionalWrapper
        condition={link}
        wrapper={handleConditionalWrapper}
        child={renderChildren}
      />
    </Tag>
  )
})

/*------------------------------
Default Props
------------------------------*/
RevealText.defaultProps = {
  className: '',
  value: '',
  type: 'chars', // chars, words, or lines
  enterDelay: 0,
  exitDelay: 0,
  lineHeight: 1.25,
  tag: 'div',
  stagger: 0.02,
  enterDuration: 2,
  exitDuration: 2,
  ease: 'power4.out',
  link: false,
  visible: false,
  inview: false,
  oneLine: false,
  once: true,
  onComplete: () => {},
}

export default memo(RevealText)
