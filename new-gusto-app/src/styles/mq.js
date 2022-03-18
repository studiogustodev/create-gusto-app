export const sizes = {
  xs: 575,
  sm: 576,
  md: 720,
  lg: 992,
  xl: 1025,
  xxl: 1440,
}

export default {
  xs: `@media (max-width: ${sizes.sm - 1}px)`,
  sm: `@media (max-width: ${sizes.md - 1}px)`,
  md: `@media (max-width: ${sizes.lg - 1}px)`,
  lg: `@media (max-width: ${sizes.xl - 1}px)`,
  xl: `@media (max-width: ${sizes.xxl - 1}px)`,
  xxl: `@media (max-width: ${sizes.xxl}px)`,
}
