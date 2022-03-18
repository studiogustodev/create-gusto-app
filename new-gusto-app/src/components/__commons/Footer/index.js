import { memo, useCallback } from 'react'
import clsx from 'clsx'
import injectSheet from 'react-jss'
import { useSelector, shallowEqual } from 'react-redux'
import ParseText from '@/components/ParseText'
import Logo from '@/components/__commons/Logo'
import DelayLink from '@/components/__commons/DelayLink'
import style from './style'

const Footer = ({
  classes,
}) => {
  /*------------------------------
  Redux Connect
  ------------------------------*/
  const { strings } = useSelector((state) => ({
    strings: state.options.strings || {},
  }), shallowEqual)

  /*------------------------------
  Render Left
  ------------------------------*/
  const renderLeft = useCallback(() => {
    return (
      <div className={classes.footerLeft}>
        <Logo />
        <div className={classes.footerText}>
          <ParseText
            className={classes.footerText}
            text={strings.footer_colophon}
          />
        </div>
      </div>
    )
  }, [strings])

  /*------------------------------
  Render Center
  ------------------------------*/
  const renderCenter = useCallback(() => {
    return (
      <div className={classes.footerCenter}>
        <h4>{strings.footer_contacts_title}</h4>
        <div className={classes.footerText}>
          <div dangerouslySetInnerHTML={{ __html: strings.footer_address }} />
          <div dangerouslySetInnerHTML={{ __html: strings.footer_tel }} />
          <div dangerouslySetInnerHTML={{ __html: strings.footer_email }} />
        </div>
      </div>
    )
  }, [strings])

  /*------------------------------
  Render Right
  ------------------------------*/
  const renderRight = useCallback(() => {
    return (
      <div className={classes.footerRight}>
        <h4>{strings.footer_certification_title}</h4>
        <div className={classes.certification}>
          {strings.footer_certification_list.map((cert, index) => (
            <DelayLink key={index.toString()} to={cert.link}>
              <img
                src={cert.image.url}
                alt={cert.image.caption}
                width="60"
                height="60"
              />
            </DelayLink>
          ))}
        </div>
        <div className={classes.footerText}>
          <div dangerouslySetInnerHTML={{ __html: strings.footer_certification }} />
        </div>
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
    <footer
      className={clsx({
        [classes.root]: true,
        Footer__root: true,
      })}
    >
      <div className={classes.container}>
        <div className={classes.wrapper}>
          {renderLeft()}
          {renderCenter()}
          {renderRight()}
        </div>
      </div>
    </footer>
  )
}

export default injectSheet(style)(memo(Footer))
