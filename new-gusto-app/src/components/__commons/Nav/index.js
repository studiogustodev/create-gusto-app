import { memo, useCallback, useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import gsap from 'gsap'
import Modernizr from '@/vendors/modernizr'
import DelayLink from '@/components/__commons/DelayLink'
import Accordion from '@/components/Accordion'
import usePrevious from '@/hooks/usePrevious'
import useMediaQuery from '@/hooks/useMediaQuery'
import { getSlug } from '@/utils/path'
import { decodeEntities } from '@/utils/decodeEntities'
import * as layerActions from '@/actions/layer'
import style from './style'

const useStyles = createUseStyles(style)

const Nav = () => {
  const $root = useRef()
  const $wrapper = useRef()
  const location = useLocation()
  const [isAccordionOpen, setAccordionOpen] = useState(false)
  const [mediaQueryKey] = useMediaQuery()

  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { pathname, isMenuOpen, mainNav, extraNav, productNav, strings, headerHeight } = useSelector((state) => ({
    pathname: state.router.location.pathname,
    isMenuOpen: state.layer.layers.some((layer) => layer.id === 'menu' && layer.isOpen),
    extraNav: state.nav.extra_menu || [],
    productNav: state.nav.product_menu || [],
    mainNav: state.nav.main_menu || [],
    strings: state.options.strings,
    headerHeight: state.bounds?.header?.height || 0,
  }), shallowEqual)

  const prevPathname = usePrevious(pathname)
  const classes = useStyles({ headerHeight, isMenuOpen })

  /*------------------------------
  Redux Actions
  ------------------------------*/
  const dispatch = useDispatch()
  const closeMenu = useCallback(() => dispatch(layerActions.closeMenu()), [dispatch])

  /*------------------------------
  Initialize
  ------------------------------*/
  const init = useCallback(() => {
    gsap.set([$root.current], {
      autoAlpha: 0,
      x: Modernizr.devicehastouch ? 0 : -20,
      y: 20,
    })
    gsap.set([$wrapper.current], {
      autoAlpha: 0,
      y: 20,
    })
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && e.keyCode === 27 && isMenuOpen) closeMenu()
  }, [isMenuOpen])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const openMainMenu = useCallback(() => {
    if (Modernizr.devicehastouch) $root.current.scrollTop = 0
    gsap.killTweensOf([$root.current, $wrapper.current])
    const tl = gsap.timeline({ ease: 'power3.out' })
    tl
      .to($root.current, {
        duration: 1,
        autoAlpha: 1,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.75)',
      })
      .to([$wrapper.current], {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
      }, '<0.2')
  }, [])

  const closeMainMenu = useCallback(() => {
    gsap.killTweensOf([$root.current, $wrapper.current])
    gsap.to([$root.current], {
      duration: 1,
      autoAlpha: 0,
      x: Modernizr.devicehastouch ? 0 : -20,
      y: 20,
      ease: 'elastic.out(1, 0.75)',
    })
    gsap.to([$wrapper.current], {
      duration: 0.5,
      autoAlpha: 0,
      y: 20,
    })
  }, [])

  /*------------------------------
  Init
  ------------------------------*/
  useEffect(() => {
    init()
  }, [])

  /*------------------------------
  Close Nav when isMenuOpen changed
  ------------------------------*/
  const prevIsOpen = usePrevious(isMenuOpen)
  useEffect(() => {
    if (prevIsOpen !== undefined && isMenuOpen) openMainMenu()
    if (prevIsOpen !== undefined && !isMenuOpen) closeMainMenu()
  }, [isMenuOpen])

  /*------------------------------
  Close Nav on change page
  ------------------------------*/
  useLayoutEffect(() => {
    if (prevPathname !== pathname) {
      setTimeout(() => {
        if (isMenuOpen) closeMenu()
      }, 500)
    }
  }, [pathname])

  /*------------------------------
  Render Main Nav
  ------------------------------*/
  const renderMainNav = useCallback(() => {
    return (
      <nav className={`${classes.nav} ${classes.mainNav}`}>
        <ul>
          {mainNav.map((item) => (
            <li
              className={item.classes.join(' ')}
              key={item.ID}
            >
              <DelayLink
                className={clsx({
                  [classes.active]: getSlug(item.url) === getSlug(location.pathname),
                })}
                to={item.url}
              >
                {decodeEntities(item.title)}
              </DelayLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }, [mainNav, location])

  /*------------------------------
  Render Extra Nav
  ------------------------------*/
  const renderExtraNav = useCallback(() => {
    return (
      <nav className={`${classes.nav} ${classes.extraNav}`}>
        <ul>
          {extraNav.map((item) => (
            <li
              className={`${item.classes.join(' ')}`}
              key={item.ID}
            >
              <DelayLink
                className={clsx({
                  [classes.active]: getSlug(item.url) === getSlug(location.pathname),
                })}
                to={item.url}
              >
                {decodeEntities(item.title)}
              </DelayLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }, [extraNav, location])

  /*------------------------------
  Render Product Nav
  ------------------------------*/
  const renderProductNav = useCallback(() => {
    return (
      <nav className={`${classes.nav} ${classes.productNav}`}>
        <ul>
          {productNav.map((item) => (
            <li
              className={`${item.classes.join(' ')}`}
              key={item.ID}
            >
              <span // eslint-disable-line
                onClick={() => setAccordionOpen(!isAccordionOpen)}
              >
                {decodeEntities(item.title)}
              </span>
              <Accordion isOpen={mediaQueryKey > 1 ? true : isAccordionOpen}>
                <ul className={classes.childNav}>
                  {item.child.map((c) => (
                    <li
                      className={`${c.classes.join(' ')}`}
                      key={c.ID}
                    >
                      <DelayLink
                        className={clsx({
                          [classes.active]: getSlug(c.url) === getSlug(location.pathname),
                        })}
                        to={c.url}
                      >
                        {decodeEntities(c.title)}
                      </DelayLink>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </li>
          ))}
        </ul>
      </nav>
    )
  }, [productNav, location, isAccordionOpen, mediaQueryKey])

  /*------------------------------
  Render Info
  ------------------------------*/
  const renderInfo = useCallback(() => {
    return (
      <div className={classes.info}>
        <div dangerouslySetInnerHTML={{ __html: strings.footer_address }} />
        <div dangerouslySetInnerHTML={{ __html: strings.footer_tel }} />
        <div dangerouslySetInnerHTML={{ __html: strings.footer_email }} />
        <div className={classes.social}>
          {strings.facebook && (
            <DelayLink to={strings.facebook}>
              <svg><use xlinkHref="#ico-facebook" /></svg>
            </DelayLink>
          )}
          {strings.linkedin && (
            <DelayLink to={strings.linkedin}>
              <svg><use xlinkHref="#ico-linkedin" /></svg>
            </DelayLink>
          )}
        </div>
      </div>
    )
  }, [strings])

  return (
    <div
      className={classes.root}
      ref={$root}
      role="dialog"
      aria-modal="true"
    >
      <div className={classes.container}>
        <div
          className={classes.wrapper}
          ref={$wrapper}
        >
          {renderMainNav()}
          {renderProductNav()}
          {renderExtraNav()}
          {renderInfo()}
        </div>
      </div>
    </div>
  )
}

export default memo(Nav)
