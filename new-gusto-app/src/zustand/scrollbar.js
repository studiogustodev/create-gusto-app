import create from 'zustand'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
  scrollbarInstance: null,
  setScrollbarInstance: (instance) => set(() => ({ scrollbarInstance: instance })),

  scrollbarRef: null,
  setScrollbarRef: (ref) => set(() => ({ scrollbarRef: ref })),

  speed: 0,
  setSpeed: (num) => set(() => ({ speed: num })),

  limit: { x: 0, y: 0 },
  setLimit: (num) => set(() => ({ limit: num })),

  scroll: { x: 0, y: 0 },
  setScroll: (value) => set(() => ({ scroll: value })),

  direction: null,
  setDirection: (value) => set(() => ({ direction: value })),

  isScrollbarBlock: false,
  setScrollbarBlock: (bool) => set(() => ({ isScrollbarBlock: bool })),
})

const useScrollbarStore = create(devtools(store))

export default useScrollbarStore
