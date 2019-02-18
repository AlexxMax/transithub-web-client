import { getUserJWToken } from '@/utils/user'

const URL_FILTERS = '/api1/transithub/users_filters'

export const getFilters = async function(listName = null) {
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
      list_name: listName
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    items.forEach(({ guid, json_value }) => {
      try {
        const { values, labels } = JSON.parse(json_value)
        result.items.push({ guid, values, labels })
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
