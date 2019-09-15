import * as notify from '@/utils/notifications'
import { getUserJWToken } from '@/utils/user'

const PQ_QUEUE = Object.freeze({
  REQUEST: '/api1/transithub/pq_queue_requests',
})

export const createPQQueueRequest = async function (payload) {

  try {

    const { status } = await this.$axios.$post(PQ_QUEUE.REQUEST, null, {
      params: {
        access_token: getUserJWToken(this),
        user_guid: this.store.state.user.guid,
        race_guid: payload.raceGuid,
        queue_profile_guid: payload.queueProfileGuid,
        direction: payload.direction,
        geo_lat: payload.lat,
        geo_lng: payload.lng,
      }
    })

  } catch ({ message }) { notify.error(message) }

  return status
}
