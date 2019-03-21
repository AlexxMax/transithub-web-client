import { getUserJWToken } from '@/utils/user'

const URL_FILTERS = '/api1/transithub/users_filters'
const URL_FILTERS_CHANGE_SUBSCRIPTION = '/api1/transithub/users_filters.make_notificator'

export const getFilters = async function(listName = null, sendNotifications = null) {
  let _sendNotifications = null
  if (sendNotifications) {
    _sendNotifications = 1
  } else if (sendNotifications === false) {
    _sendNotifications = 0
  }

  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FILTERS,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid,
      list_name: listName,
      send_notifications: _sendNotifications
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    items.forEach(({ guid, list_name: listName, json_value, send_notifications }) => {
      try {
        const { values, labels } = JSON.parse(json_value)
        const sendNotifications = send_notifications === 1 ? true : false
        result.items.push({ guid, listName, values, labels, sendNotifications })
      } catch ({ message }) {
				console.error('Error', message)
      }
    })
  }

  return result
}

export const createNewFilters = async function(listName, payload) {
  const { data: { status, guid } } = await this.$axios({
    method: 'post',
    url: URL_FILTERS,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid,
      list_name: listName
    },
    data: payload
  })

  return { status, guid }
}

export const removeFilters = async function(guid) {
  const { data: { status } } = await this.$axios({
    method: 'delete',
    url: URL_FILTERS,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid,
      guid
    }
  })

  return { status }
}

export const changeSubscription = async function(guid, sendNotifications) {
  const { data: { status } } = await this.$axios({
    method: 'post',
    url: URL_FILTERS_CHANGE_SUBSCRIPTION,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid
    },
    data: {
      guid,
      send_notifications: sendNotifications ? 1 : 0
    }
  })

  return { status }
}
