import { getUserJWToken } from '@/utils/user'
import { TABLE_NAMES } from '@/utils/constants'

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
      let _item = null

      if (item.table_name === TABLE_NAMES.railwayAggregation || item.table_name === TABLE_NAMES.railwayRequest) {
        _item = {
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
        }
      } else if (item.table_name === TABLE_NAMES.autoDriver) {
        _item = {
          tableName: item.table_name,
          id: item.driver_guid,
          fullName: (item.driver_full_name || '').pCapitalizeAllFirstWords(),
          certSerialNumber: item.driver_cert,
          companyName: (item.driver_company_name || '').pCapitalizeAllFirstWords(),
        }
      } else if (item.table_name === TABLE_NAMES.autoVehicle) {
        _item = {
          tableName: item.table_name,
          id: item.vehicle_guid,
          vNumber: item.vehicle_v_number.toUpperCase(),
          techPassport: item.vehicle_tech_passport.toUpperCase(),
          brand: (item.vehicle_brand || '').pCapitalizeAllFirstWords(),
          model: (item.vehicle_model || '').pCapitalizeAllFirstWords(),
          type: (item.vehicle_type || '').pCapitalizeAllFirstWords(),
          companyName: (item.vehicle_company_name || '').pCapitalizeAllFirstWords()
        }
      }

      if (_item) {
        result.items.push(_item)
      }
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
