import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import omit from 'omit.js'
import { history } from '@/base/store'
import { cleanOrigin, isInternal } from '@/utils/path'
import constants from '@/constants'

const DelayLink = (props) => {
  const timeout = useRef()
  const url = useRef([])

  useEffect(() => {
    url.current = cleanOrigin(props.to).split('.')
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  const handleClick = (e) => {
    if (e.defaultPrevented) return
    const notCmdClick = (e.metaKey === undefined && e.ctrlKey === undefined) || (!e.metaKey && !e.ctrlKey)
    if (!notCmdClick) return
    e.preventDefault()
    const link = cleanOrigin(props.to)

    if (history.location.pathname !== link) {
      props.onDelayStart(e, link)

      if (props.doAnimation !== undefined) props.doAnimation()

      timeout.current = setTimeout(() => {
        if (props.replace) {
          history.replace(link)
        } else {
          history.push(link)
        }
        props.onDelayEnd(e, link)
      }, props.delay)
    }
  }

  const renderExternalLink = useCallback(() => {
    return (
      <a
        href={props.to}
        target="_blank"
        rel="noopener"
        title={props.title}
        className={props.className}
        tabIndex={props.tabIndex}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.children}
      </a>
    )
  })

  const renderInternalLink = useCallback(() => {
    return (
      <Link
        onClick={handleClick}
        to={cleanOrigin(props.to)}
        {... (props.attribute && { // eslint-disable-line
          'data-text': props.attribute,
        })}
        {...omit(props, [ // eslint-disable-line
          'back',
          'delay',
          'doAnimation',
          'hover',
          'inview',
          'onDelayEnd',
          'onDelayStart',
          'title',
          'to',
          'attribute',
        ])}
      />
    )
  })

  return !isInternal(props.to) || (url.current.length > 1)
    ? renderExternalLink()
    : renderInternalLink()
}

DelayLink.defaultProps = {
  delay: constants.CONFIG.LINK_DELAY,
  onDelayEnd: () => {},
  onDelayStart: () => {},
  to: '#',
}

export default DelayLink
