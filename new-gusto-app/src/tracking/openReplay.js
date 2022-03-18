import OpenReplay from '@openreplay/tracker'
import trackerAxios from '@openreplay/tracker-axios'
import trackerAssist from '@openreplay/tracker-assist'
import { altAxios as axios } from '@/base/axios'

const tracker = new OpenReplay({
  projectKey: 'srYKFFHVCMc9BYih9g1V',
})

tracker.use(trackerAxios({
  instance: axios,
}))

tracker.use(trackerAssist({}))

tracker.start()

export default tracker
