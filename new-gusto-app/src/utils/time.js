export const getTime = (userIndex, timestart = 100) => {
  const USER_INDEX = userIndex - 1
  const SLIDE_NAME_OFFSET = 1
  const SLIDE1_LEN = 24
  const SLIDE2_LEN = 14
  const SLIDE3_LEN = 18
  const SLIDE_DURATION = 4
  const SLIDE_TIME_START = timestart

  const coarseIdx = ~~(USER_INDEX / (SLIDE1_LEN + SLIDE2_LEN + SLIDE3_LEN)) * 3
  const idxRem = USER_INDEX % (SLIDE1_LEN + SLIDE2_LEN + SLIDE3_LEN)

  let fineIdx = 0
  if (idxRem >= (SLIDE1_LEN + SLIDE2_LEN)) {
    fineIdx = 2
  } else if (idxRem >= SLIDE1_LEN) {
    fineIdx = 1
  }
  const imageIdx = coarseIdx + fineIdx + SLIDE_NAME_OFFSET

  return (imageIdx - 1) * SLIDE_DURATION + SLIDE_TIME_START
}
