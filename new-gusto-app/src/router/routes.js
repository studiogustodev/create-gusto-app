import { lazy } from 'react'
import { internazionalizePath } from '@/utils/path'

const Home = lazy(() => import(/* webpackChunkName: "home" */'@/pages/Home'))
const NotFound = lazy(() => import(/* webpackChunkName: "not_found" */'@/pages/NotFound'))

export default () => [
  {
    key: 0,
    path: internazionalizePath('/'),
    exact: true,
    render: () => <Home />,
  },
  {
    key: 999,
    render: () => <NotFound />,
  },
]
