export const getYYYYMMDD = (d) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
}
