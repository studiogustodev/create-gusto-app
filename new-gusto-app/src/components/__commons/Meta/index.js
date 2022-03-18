import { memo } from 'react'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import { decodeEntities } from '@/utils/decodeEntities'

const Meta = ({
  title,
  meta,
  schema,
}) => {
  const strings = useSelector((state) => state.options.strings)
  return (
    <Helmet
      title={`${decodeEntities(title)} - ${strings.site_title}`}
      meta={meta}
    >
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: '',
  meta: [],
  schema: [],
}

export default memo(Meta)
