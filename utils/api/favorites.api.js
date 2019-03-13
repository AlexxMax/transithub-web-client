import { getUserJWToken } from '@/utils/user'

const URL_FAVORITES = `/api1/transithub/favorites`

export const getFavorites = async function() {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_FAVORITES,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid
    }
  })

  const result = {
    status,
    items: []
  }

  if (status && items.length > 0) {
    items.forEach(item => {
      result.items.push({
        id: item.object_id,
        tableName: item.table_name || '',
        createdAt: new Date(item.created_at_utc).pFormatDateTime(true),
        number: item.number || '',
        companyId: item.th_company_id,
        companyGuid: item.th_company_guid,
        companyName: item.th_company_name || '',
        authorId: item.th_author_id,
        authorGuid :item.th_author_guid,
        authorName: item.representative_name || ''
      })
    })
  }

  return result
}

export const postFavorite = async function(objectId, tableName) {
  const {
    data: {
      status
    }
  } = await this.$axios({
    method: 'post',
    url: URL_FAVORITES,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid,
      object_id: objectId,
      table_name: tableName
    }
  })

  const result = {
    status
  }

  return result
}

export const deleteFavorite = async function(objectId, tableName) {
  const {
    data: {
      status
    }
  } = await this.$axios({
    method: 'delete',
    url: URL_FAVORITES,
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid,
      object_id: objectId,
      table_name: tableName
    }
  })

  const result = {
    status
  }

  return result
}
