// import { getUserJWToken } from '@/utils/user'
// import { getLangFromStore } from '@/utils/locale'

// const URL_TAGS = `/api1/transithub/tags`

// export const getTags = async function(objectGuid, tableName) {
//   const {
//     data: {
//       status,
//       items
//     }
//   } = await this.$axios({
//     method: 'get',
//     url: URL_TAGS,
//     params: {
//       access_token: getUserJWToken(this),
//       object_id: objectGuid,
//       table_name: tableName
//     }
//   })

//   const result = {
//     status,
//     items: []
//   }

//   if (status) {
//     items.forEach(({ guid, value }) => {
//       result.items.push({
//         guid,
//         value
//       })
//     })
//   }

//   return result
// }

// export const postTag = async function(payload) {
//   const {
//     data: {
//       status,
//       guid,
//       value
//     }
//   } = await this.$axios({
//     method: 'post',
//     url: URL_TAGS,
//     params: {
//       access_token: getUserJWToken(this),
//       locale: getLangFromStore(this.store)
//     },
//     data: payload
//   })

//   const result = {
//     status,
//     guid,
//     value
//   }

//   return result
// }

// export const deleteTag = async function(guid) {
//   const {
//     data: {
//       status
//     }
//   } = await this.$axios({
//     method: 'delete',
//     url: URL_TAGS,
//     params: {
//       access_token: getUserJWToken(this),
//       locale: getLangFromStore(this.store),
//       guid
//     }
//   })

//   const result = {
//     status
//   }

//   return result
// }
