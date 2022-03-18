import hexToRgba from 'hex-rgba'
import { fonts } from '@/styles/typography'
import colors from '@/styles/colors'
import easings from '@/styles/easings'
import effects from '@/styles/effects'
import header from '@/styles/header'
import mq from '@/styles/mq'
import zindex from '@/styles/zindex'
import { wrapper, smallWrapper } from '@/styles/grid'

export default {
  colors,
  easings,
  effects,
  fonts,
  header,
  mq,
  smallWrapper,
  wrapper,
  zindex,
  getRgba: (col, opacity) => hexToRgba(col, opacity * 100),
}
